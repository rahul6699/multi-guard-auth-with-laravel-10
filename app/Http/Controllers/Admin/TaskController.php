<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use App\Models\Task;
use DB;
use DataTables;
use Validator;

class TaskController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth:admin');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data['nav'] = 'task';
        $data['sub_nav'] = 'task_list';
        $data['title'] = 'Task';
        // return view('admin.task.index',$data);
        return $this->AdminTemplate('admin.task.index',$data);
    }

    public function taskAajaxList(Request $request)
    {

        $data = Task::latest()->select('tasks.*','upload_images.file as hint_image_name','weeks.name as week_name','activity.name as activity_name')->leftJoin('upload_images','upload_images.id','=','tasks.hint_image')->leftJoin('weeks','weeks.id','=','tasks.week')->leftJoin('activity','activity.id','=','tasks.activity')->get();

        return Datatables::of($data)
                ->addIndexColumn()
                ->addColumn('index', function($row){
                    return '<input type="checkbox" name="check[]" id="'.$row->id.'" class="task_check"  value="'.$row->id.'">';
                })
                ->addColumn('status', function($row){
                    if($row->status == 0){
                        $status = '<button type="button" class="btn btn-danger btn-xs" onclick="task_status('.$row->id.',1)"><small>Unpublish</small></button>';
                    }else{
                       $status = '<button type="button" class="btn btn-success btn-xs" onclick="task_status('.$row->id.',0)"><small>Publish</small></button>';	
                    }
                    return $status;
                })
                ->addColumn('action', function($row){
                    $btn = '<a href="'.url('admin/task/edit',$row->id).'"  class="btn btn-primary btn-sm">Edit</a>';
                    //$btn .= ' <a href="javascript:void(0)" onclick="task_view('.$row->id.')" class="btn btn-info btn-sm">View</a>';
                    $btn = $btn.' <a href="javascript:void(0)" onclick="task_delete('.$row->id.')" class="btn btn-danger btn-sm">Delete</a>';
                        return $btn;
                })
				->addColumn('hint_image', function($row){
                    $img ="";
                    if(!empty($row->hint_image_name)){
                        $img = '<img src="'.url('assets/uploads/task_hint/',$row->hint_image_name).'"  class="img-fluid" height="100px" width="100px">';
                    }
                    
					return $img;
                })
                ->rawColumns(['index','hint_image','status','action'])
                ->make(true);

    }

    public function taskAdd()
	{
		$data['weeks'] = DB::table('weeks')->select('*')->get();
		$data['activitys'] = DB::table('activity')->select('*')->get();
		$data['lists'] = DB::table('templates')->select('*')->where(['is_delete'=>0,'status'=>1])->get();
		$data['nav'] = 'task';
        $data['sub_nav'] = 'task_add';
        $data['title'] = 'Task Add';
		$data['template_key'] =time();
        return $this->AdminTemplate('admin.task.add',$data);
		// return view('admin.task.add');
	}

    public function taskSave(Request $request){
		// echo "<pre>"; print_r($_POST);die;
        $rules = array(
            'title'        => 'required', 
            'description'        => 'required', 
            'week'        => 'required', 
            'activity'        => 'required', 
            'timer_type'        => 'required', 
            'time_min'        => 'required', 
            'time_sec'        => 'required', 
            'hint_title'        => 'required', 
            'hint_description'        => 'required', 
            'hint_image'        => 'required', 
            'status'        => 'required', 
        );
        // do the validation ----------------------------------
        // validate against the inputs from our form
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            // echo "<pre>"; print_r($validator->errors()->toJson());die;
            return response()->json(['success'=>0,'response'=>$validator->errors()->toJson()]);
        }else{
			$new_templates =array();
			$templates = $request->input('templates');
			foreach($templates as $key1 => $value1){
				if($value1){
					$new_templates[$key1] =$value1;
				}
			}
			if(!empty($new_templates)){
				$newTemplate = json_encode($new_templates);
			}else{
				$newTemplate = "";
			}
			$data = array(
				'title' =>$request->input('title'),
				'description' =>$request->input('description'),
				'week' =>$request->input('week'),
				'activity' =>$request->input('activity'),
				'timer_type' =>$request->input('timer_type'),
				'time_min' =>$request->input('time_min'),
				'time_sec' =>$request->input('time_sec'),
				'hint_title' =>$request->input('hint_title'),
				'hint_description' =>$request->input('hint_description'),
				'hint_image' =>$request->input('hint_image'),
				'status' =>$request->input('status'),
				'templates' =>$newTemplate,
			);
            $task = Task::create($data);
			foreach($templates as $key => $value){
				if($value){
					$template = $_POST[$key][$value];
					foreach($template as $key2 => $value2){
						if($value2){
							if($key2=='add_more'){
								// echo '<pre>'; print_r($value2);die;
								$l = 1;
								foreach ($value2 as $k => $q) {
									$update_data = array(
										'task_id'=>$task->id,
										'template_id'=>$value,
										'template_key'=>$key,
										'meta_type'=>$key2,
										'meta_key'=>'q'.$l,
										'meta_value'=>$q,
										'created_at'=>time(),
										'updated_at'=>time()
									);
									DB::table('task_meta')->insert($update_data);
									$l++;
								}
							}else{
								$update_data = array(
									'task_id'=>$task->id,
									'template_id'=>$value,
									'template_key'=>$key,
									'meta_key'=>$key2,
									'meta_value'=>$value2,
									'created_at'=>time(),
									'updated_at'=>time()
								);
								DB::table('task_meta')->insert($update_data);
							}
							// $this->base_model->insert_data('task_meta',$update_data);
							
						}
					}
					
				}
			}
            return response()->json(['success'=>1,'response'=>'Task added successfully']);
        }
        
	}	

    public function taskEdit($id)
	{
        $tModel = new Task();
        $data['tInfo'] = Task::select('tasks.*','upload_images.file as hint_image_name')->where("tasks.id",$id)->leftJoin('upload_images','upload_images.id','=','tasks.hint_image')->first();
        // echo '<pre>'; print_r(($data['tInfo']));die;
		$data['weeks'] = DB::table('weeks')->select('*')->get();
		$data['activitys'] = DB::table('activity')->select('*')->get();
		$data['lists'] = DB::table('templates')->select('*')->where(['is_delete'=>0,'status'=>1])->get();
		$data['nav'] = 'task';
        $data['sub_nav'] = 'task_list';
        $data['title'] = 'Task Edit';
		$data['template_key'] =time();
        return $this->AdminTemplate('admin.task.edit',$data);
		// return view('admin.task.edit',$data);
	}

    public function taskUpdate(Request $request){
        $rules = array(
            'title'        => 'required', 
            'description'        => 'required', 
			'week'        => 'required', 
            'activity'        => 'required', 
			'timer_type'        => 'required', 
            'time_min'        => 'required', 
            'time_sec'        => 'required', 
			'hint_title'        => 'required', 
            'hint_description'        => 'required', 
            'hint_image'        => 'required', 
            'status'        => 'required', 
        );
        // do the validation ----------------------------------
        // validate against the inputs from our form
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            // echo "<pre>"; print_r($validator->errors()->toJson());die;
            return response()->json(['success'=>0,'response'=>$validator->errors()->toJson()]);
        }else{
			$new_templates =array();
			$templates = $request->input('templates');
			foreach($templates as $key1 => $value1){
				if($value1){
					$new_templates[$key1] =$value1;
				}
			}
			if(!empty($new_templates)){
				$newTemplate = json_encode($new_templates);
			}else{
				$newTemplate = "";
			}
			$data = array(
				'title' =>$request->input('title'),
				'description' =>$request->input('description'),
				'week' =>$request->input('week'),
				'activity' =>$request->input('activity'),
				'timer_type' =>$request->input('timer_type'),
				'time_min' =>$request->input('time_min'),
				'time_sec' =>$request->input('time_sec'),
				'hint_title' =>$request->input('hint_title'),
				'hint_description' =>$request->input('hint_description'),
				'hint_image' =>$request->input('hint_image'),
				'status' =>$request->input('status'),
				'templates' =>$newTemplate,
			);
            $task = Task::where("id",$request->input('id'))->update($data);
			foreach($templates as $key => $value){
				if($value){
					$template = $_POST[$key][$value];
					foreach($template as $key2 => $value2){
						$task_meta = DB::table('task_meta')->where(['task_id'=>$request->input('id'),'template_id'=>$value,'template_key'=>$key,'meta_key'=>$key2])->first();
						DB::table('task_meta')->select('task_meta.*')->where(['task_id'=>$request->input('id'),'template_id'=>$value,'template_key'=>$key,'meta_type'=>'add_more'])->delete();
						if($task_meta){
							$update_data = array(
								'meta_key'=>$key2,
								'meta_value'=>$value2,
								'updated_at'=>time()
							);
							DB::table('task_meta')->where(['task_id'=>$request->input('id'),'template_id'=>$value,'template_key'=>$key,'meta_key'=>$key2])->update($update_data);
						}else{
							if($value2){
								if($key2=='add_more'){
									// echo '<pre>'; print_r($value2);die;
									$l = 1;
									foreach ($value2 as $k => $q) {
										$update_data = array(
											'task_id'=>$request->input('id'),
											'template_id'=>$value,
											'template_key'=>$key,
											'meta_type'=>$key2,
											'meta_key'=>'q'.$l,
											'meta_value'=>$q,
											'created_at'=>time(),
											'updated_at'=>time()
										);
										DB::table('task_meta')->insert($update_data);
										$l++;
									}
								}else{
									$update_data = array(
										'task_id'=>$request->input('id'),
										'template_id'=>$value,
										'template_key'=>$key,
										'meta_key'=>$key2,
										'meta_value'=>$value2,
										'created_at'=>time(),
										'updated_at'=>time()
									);
									DB::table('task_meta')->insert($update_data);
								}
							}
						}
					}
					
				}
			}
            return response()->json(['success'=>1,'response'=>'Task updated successfully']);
        }
        
	}	

    public function taskView(Request $request)
	{
        $tModel = new Task();
        $data['tInfo'] = Task::select('*')->where("id",$request->input('id'))->first();
        // echo '<pre>'; print_r(($data['tInfo']));die;
		return view('admin.task.view',$data);
	}

    public function taskStatus(Request $request){
        $data = array(
            'status'=> $request->input('type'), 
        );
        $product = Task::where("id",$request->input('id'))->update($data);
        return response()->json(['success'=>1,'response'=>'Task status change successfully']);
	}

    public function taskDelete(Request $request){
        Task::find($request->input('id'))->delete();
        return response()->json(['success'=>1,'response'=>'Task deleted successfully']);
    }

    public function taskMultipleDelete(Request $request){		
		$checks =$request->input('check');
		foreach($checks as $value){
           Task::find($value)->delete();
		}
		return response()->json(['success'=>1,'response'=>'Task deleted successfully']);
	}

    public function task_ajax_list2(){
		$requestData= $_REQUEST;

		/*  $where_in = $where_condition1 =array();
		if(isset($_POST['TagName']) && !empty($_POST['TagName'])){
            $where_condition1 = array('tags.id'=>$_POST['TagName']);
       } */
    
        // $where = array_merge($where_condition1);

	   //$where = array_filter($where_condition);
		/* $coloum_search = array('tags.name');
		$order_by = array('tags.id'=>'DESC');
		if(isset($requestData['order'])){
			if($requestData['order']['0']['column'] == 1){
			$order_by = array('tags.name'=>$requestData['order']['0']['dir']);
			}elseif($requestData['order']['0']['column'] == 2){
				$order_by = array('tags.status'=>$requestData['order']['0']['dir']);
			}
		}
	     $joins= array();
		$columns="tags.*"; */
		$lists = $this->base_model->get_where_in_lists('tags',$coloum_search,$order_by,'',$where_in,$joins,$columns,'tags.id',$where);
		//echo $this->db->last_query();die;
		$data = array();
		$no = $_POST['start'];
		if($lists){
        foreach ($lists as $list) {
        	$is_tag = $this->tag_model->is_tag_exist($list->id);
        	$is_disabled='';
			if(!$is_tag){
				$is_disabled='disabled';
			}
			$no++;
			$row = array();
			$row[] = '<input type="checkbox" name="check[]" '.$is_disabled.' id="'.$list->id.'" class="tag_check"  value="'.$list->id.'">';
			$row[] = $list->name;
			if($list->status == 0){
				$status = '<button type="button" class="btn btn-danger btn-xs" onclick="tag_status('.$list->id.',1)"><small>Unpublish</small></button>';
			}else{
			   $status = '<button type="button" class="btn btn-success btn-xs" onclick="tag_status('.$list->id.',0)"><small>Publish</small></button>';	
			}
			$row[] = $status;
		   $buttons = '<button type="button" class="btn btn-success btn-xs" onclick="tag_edit('.$list->id.')"><small>Edit</small></button>';
			$buttons .= '&nbsp;&nbsp;<button type="button" class="btn btn-danger btn-xs" onclick="tag_delete('.$list->id.')" '.$is_disabled.'><small>Delete</small></button>';
			$row[] = $buttons;
			$row['id'] = $list->id;
			$data[] = $row;
			
			}
		}

		$output = array(
			"draw" => $_POST['draw'],
			"recordsTotal" => $this->base_model->count_all_where_in('tags',$where_in,'tags.id',$where,$joins),
			"recordsFiltered" =>$this->base_model->count_filtered_where_in('tags',$coloum_search,$order_by,'',$where_in,$joins,$columns,'tags.id',$where),
			"data" => $data,
		);

		echo json_encode($output);
	}
	
	public function template_fileds(){
		$data = array();
		$data['row'] = DB::table('templates')->select('*')->where(['is_delete'=>0,'status'=>1,'id'=>$_POST['id']])->first();
		$data['contents'] = json_decode($data['row']->content);
		$data['template_id'] = $_POST['id'];
		$data['template_key'] = $_POST['template_key'];
		// $path = 'assets/uploads/projects/templates/templates_img/';
        // $data['temp_image'] =base_url().$path.$data['row']->image;
		// echo '<pre>'; print_r($data['row']);die;
		$output['success'] = 1;
		$output['response'] = view('admin.task.template_fileds',$data)->render();
		echo json_encode($output);
	}

	public function task_image_data(Request $request){
		// echo '<pre>'; print_r($_FILES);die;
		$img_name='update_'.$_POST['img_name'];
/* 		request()->validate([
            $img_name => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]); */
		$validator = Validator::make($request->all(), [
            $img_name => 'required',
        ]);

        if($validator->passes()){
			$m="";
			$res = array();
			$name = $_FILES[$img_name]["name"];
			$ext = pathinfo($name, PATHINFO_EXTENSION);
			$time=time();
			$rand=rand(1111,9999);
			$path = public_path('assets/uploads/task/');	
			$new_name = $rand."_".$time.'.'.$ext;
			if ( !is_dir($path) ){
				mkdir($path, 0777, TRUE);
			}
			request()->$img_name->move(public_path('assets/uploads/task'), $new_name);
			
			$data = array(
				'file'=>$new_name,
				'ext'=>$ext,
				'created_at'=>time(),
				'updated_at'=>time(),
			);
			$insert_id = DB::table('upload_images')->insertGetId($data);
			$image_data = DB::table('upload_images')->where(['id'=>$insert_id])->first();
	/* 		$insert_id = $this->base_model->insert_data('upload_images',$data);
			$image_data = $this->base_model->select_row('upload_images',array('id'=>$insert_id)); */
			
			$res = array('status'=>1,'image_id'=>$insert_id,'image_data'=>url('/assets/uploads/task',$image_data->file));	
			
			echo  json_encode($res);die;
		}

		return response()->json(['status'=>0,'response'=>$validator->errors()->all()]);
		
	}

	public function task_multiple_image_data(Request $request){
		$path = 'assets/uploads/task/';
		$img_name='update_'.$_POST['img_name'];
        $template_code = $request->input('template_key');
        $random_code = $request->input('random_code');
		$m="";
		$res = array();
		/* $config = array(
			'upload_path'   => $path,
			'allowed_types' => 'jpg|jpeg|png',
		);
		$this->load->library('upload', $config); */
		if ( !is_dir($path) ){
			mkdir($path, 0777, TRUE);
		}
		$file_data = $errors=array();

		$count = count($_FILES[$img_name]['name']);
		if ($request->hasFile($img_name)) {
			// $destinationPath = 'path/th/save/file/';
			$files = $request->file($img_name); // will get all files
		
			foreach ($files as $file) {//this statement will loop through all files.
				//$file_name = $file->getClientOriginalName(); //Get file original name
				$ext = $file->getClientOriginalExtension();
				$new_name = time().'.'.$ext;
				$file->move(public_path('assets/uploads/task') , $new_name); // move files to destination folder
				$file_data[] = $new_name;
			}
		}
/* 		for($i=0;$i<$count;$i++){

			if(!empty($_FILES[$img_name]['name'][$i])){

				$_FILES['file']['name'] = $_FILES[$img_name]['name'][$i];
				$_FILES['file']['type'] = $_FILES[$img_name]['type'][$i];
				$_FILES['file']['tmp_name'] = $_FILES[$img_name]['tmp_name'][$i];
				$_FILES['file']['error'] = $_FILES[$img_name]['error'][$i];
				$_FILES['file']['size'] = $_FILES[$img_name]['size'][$i];

				$image= "";
				$ext = pathinfo($_FILES[$img_name]['name'][$i], PATHINFO_EXTENSION);
				$new_name = time().'.'.$ext;
				request()->$_FILES['file']['name']->move(public_path('assets/uploads/task'), $new_name);
				$file_data[] = $new_name;
				/* $config['file_name'] = $new_name;

				$this->upload->initialize($config);

				if($this->upload->do_upload('file')){
					$uploadData = $this->upload->data();
					$filename = $uploadData['file_name'];
					$file_data[] = $filename;
				}else{
					$errors[] =$this->upload->display_errors(); 
				} 
			}

		} */
		$errs_status=0;
		$success_status =0;
		$errs=$succ =$img_data='';
		if(count($errors)>0){
			$errs_status=1;  
			$errs_imp = implode(',',$errors);
			$errs = json_encode(array('file_error' => $errs_imp));
		}
					  
		if(count($file_data)>0){
			$where_in = $where_in2 = array();
			$success_status=1;  
			$projects_meta = DB::table('task_meta')->where(['template_key'=>$template_code,'meta_key'=>'image'])->first();
			if(isset($projects_meta->meta_value)){
				$where_in2 = json_decode($projects_meta->meta_value);
			}
			foreach($file_data as $fdata){
				$data = array(
					'file'=>$fdata,
					'ext'=>'',
					'code'=>$random_code,
					'img_id'=>0,
					'created_at'=>time(),
					'updated_at'=>time(),
				);
				//  $this->base_model->insert_data('upload_images',$data);
				 DB::table('upload_images')->insert($data);
			}

			$upload_images = DB::table('upload_images')->where(['code'=>$random_code])->get();
			foreach($upload_images as $upload){
				$where_in[] = $upload->id;
			}
			// $idata['path']=$path;		
			$arr_merge = array_merge($where_in2,$where_in);
			/* $this->db->where_in('id',$arr_merge);
			$query = $this->db->get('upload_images'); */
			$idata['image_data'] = DB::table('upload_images')->whereIn('id',$arr_merge)->get();

			/* if(!empty($where_in2)){
				$order = $where_in2;
				usort($idata['image_data'], function ($a, $b) use ($order) {
					  $pos_a = array_search($a->id, $order);
					  $pos_b = array_search($b->id, $order);
					  return $pos_a - $pos_b;
				});
			} */
			// $idata['image_data'] = $this->base_model->select_data('upload_images',array('code'=>$template_code));
			$idata['template_key'] = $template_code;
			$idata['template_id'] = $request->input('template_id');
			$idata['input_name'] = 'image';
			$idata['task_id'] ='';
			if($request->input('id') != ''){
			$idata['task_id'] = $request->input('id');
		     }
			$images_id_arr = array();
			foreach ($idata['image_data'] as  $images_id) {
				$images_id_arr[]= $images_id->id;
			}
			$images_id = json_encode($images_id_arr);
			$image_data = view('admin/task/multiple_image_view',$idata)->render();

		}

		$res = array('success_status'=>$success_status,'errs_status'=>$errs_status,'image_data'=>$image_data,'error'=>$errs,'image_id'=>$images_id);
		echo  json_encode($res);die;
	}

	function remove_image(Request $request){
		$img_d = DB::table('upload_images')->where(['id'=>$request->input('id')])->first()->file;
		// $this->base_model->delete_data('upload_images',array('id'=>$this->input->post('id')));
		DB::table('upload_images')->where(['id'=>$request->input('id')])->delete();
		$filename = url('/assets/uploads/task/',$img_d);
		//$this->base_model->image_delete($filename);
		if (file_exists($filename)) {
			unlink($filename);
		}
		$imgId = $request->input('id');
		$image_ids =json_decode($request->input('image_ids'));
		if (($key = array_search($imgId, $image_ids)) !== false) {
			unset($image_ids[$key]);
		}
		$idata['image_data'] = $image_data = DB::table('upload_images')->whereIn('id',$image_ids)->get();
       // $idata['image_data'] = $image_data = $this->base_model->select_data('upload_images',array('code'=>$request->input('template_key')));
        $idata['task_id'] = $request->input('task_id');
        $idata['template_id'] = $request->input('template_id');
       $idata['template_key'] = $request->input('template_key');
      $idata['input_name'] = $request->input('input_name');
     // echo $idata['input_name']; die;
      $images_id_arr = array();
         foreach ($image_data as $images_id) {
         	$images_id_arr[] = $images_id->id;
         }
         $images_id = json_encode($images_id_arr);
         if($request->input('task_id') != ''){
         
       
		 /* $this->base_model->update_data('task_meta',array('task_id'=>$request->input('task_id'),'template_key'=>$request->input('template_key'),'template_id'=>$request->input('template_id'),'meta_key'=>$request->input('input_name')),array('meta_value'=>$images_id)); */
		 DB::table('task_meta')->where(['task_id'=>$request->input('task_id'),'template_key'=>$request->input('template_key'),'template_id'=>$request->input('template_id'),'meta_key'=>$request->input('input_name')])->update(['meta_value'=>$images_id]);
         }
        $image_data = view('admin/task/multiple_image_view',$idata)->render();
		$response = array('status'=>1,'msg'=>'Image remove Successfully','image_data'=>$image_data,'image_id'=>$images_id);
		echo json_encode($response);die;
	}

	public function add_more(Request $request)
	{
		$data['template_key'] = $template_key = $_POST['template_key'];
		$data['template_id'] = $_POST['templates'][$template_key];
		// echo "<pre>"; print_r($_POST);die;
        // echo '<pre>'; print_r(($data['tInfo']));die;
		return view('admin.task.add_more',$data);
	}

	public function task_hint_image_data(Request $request){
		$validator = Validator::make($request->all(), [
            'hint_image_name'=> 'required',
        ]);
			// echo "<pre>";print_r($_FILES);die;
        if($validator->passes()){
			$m="";
			$res = array();
			$name = $_FILES['hint_image_name']["name"];
			$ext = pathinfo($name, PATHINFO_EXTENSION);
			$time=time();
			$rand=rand(1111,9999);
			$path = public_path('assets/uploads/task_hint/');	
			$new_name = $rand."_".$time.'.'.$ext;
			if ( !is_dir($path) ){
				mkdir($path, 0777, TRUE);
			}
			request()->hint_image_name->move(public_path('assets/uploads/task_hint'), $new_name);
			
			$data = array(
				'file'=>$new_name,
				'ext'=>$ext,
				'created_at'=>time(),
				'updated_at'=>time(),
			);
			$insert_id = DB::table('upload_images')->insertGetId($data);
			$image_data = DB::table('upload_images')->where(['id'=>$insert_id])->first();
			
			$res = array('status'=>1,'image_id'=>$insert_id,'image_data'=>url('/assets/uploads/task_hint',$image_data->file));	
			
			echo  json_encode($res);die;
		}

		return response()->json(['status'=>0,'response'=>$validator->errors()->all()]);
		
	}
}
