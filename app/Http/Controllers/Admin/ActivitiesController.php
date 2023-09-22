<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use App\Activities;
use DB;
use DataTables;
use Validator;

class ActivitiesController extends Controller
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
        $data['nav'] = 'activities';
        $data['sub_nav'] = 'activities_list';
        $data['title'] = 'Activities';
        // return view('admin.task.index',$data);
        return $this->AdminTemplate('admin.activities.index',$data);
    }

    public function activitiesAajaxList(Request $request)
    {

        $data = Activities::latest()->select('activity.*','upload_images.file as image_name')->leftJoin('upload_images','upload_images.id','=','activity.image')->get();

        return Datatables::of($data)
                ->addIndexColumn()
                ->addColumn('status', function($row){
                    if($row->status == 0){
                        $status = '<button type="button" class="btn btn-danger btn-xs" onclick="activities_status('.$row->id.',1)"><small>Unpublish</small></button>';
                    }else{
                       $status = '<button type="button" class="btn btn-success btn-xs" onclick="activities_status('.$row->id.',0)"><small>Publish</small></button>';	
                    }
                    return $status;
                })
                ->addColumn('action', function($row){
                    $btn = '<a href="'.url('admin/activities/edit',$row->id).'"  class="btn btn-primary btn-sm">Edit</a>';
					return $btn;
                })
                ->addColumn('image', function($row){
                    $img ="";
                    if(!empty($row->image_name)){
                        $img = '<img src="'.url('assets/uploads/activities/',$row->image_name).'"  class="img-fluid" height="100px" width="100px">';
                    }
                    
					return $img;
                })
                ->rawColumns(['image','status','action'])
                ->make(true);

    }	

    public function activitiesEdit($id)
	{
        $data['tInfo'] = Activities::select('activity.*','upload_images.file as image_name')->where("activity.id",$id)->leftJoin('upload_images','upload_images.id','=','activity.image')->first();
		$data['nav'] = 'activities';
        $data['sub_nav'] = 'activities_list';
        $data['title'] = 'activities Edit';
        return $this->AdminTemplate('admin.activities.edit',$data);
	}

    public function activitiesUpdate(Request $request){
        $rules = array(
            'name'        => 'required', 
            'image'        => 'required', 
            'description'        => 'required', 
            'status'        => 'required', 
        );
        // do the validation ----------------------------------
        // validate against the inputs from our form
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            // echo "<pre>"; print_r($validator->errors()->toJson());die;
            return response()->json(['success'=>0,'response'=>$validator->errors()->toJson()]);
        }else{
			$data = array(
				'name' =>$request->input('name'),
				'description' =>$request->input('description'),
				'image' =>$request->input('image'),
				'status' =>$request->input('status'),
			);
            Activities::where("id",$request->input('id'))->update($data);

            return response()->json(['success'=>1,'response'=>'activities updated successfully']);
        }
        
	}	


    public function activitiesStatus(Request $request){
        $data = array(
            'status'=> $request->input('type'), 
        );
        $product = Activities::where("id",$request->input('id'))->update($data);
        return response()->json(['success'=>1,'response'=>'activities status change successfully']);
	}


	public function activities_image_data(Request $request){
		$validator = Validator::make($request->all(), [
            'image_name'=> 'required',
        ]);
			// echo "<pre>";print_r($_FILES);die;
        if($validator->passes()){
			$m="";
			$res = array();
			$name = $_FILES['image_name']["name"];
			$ext = pathinfo($name, PATHINFO_EXTENSION);
			$time=time();
			$rand=rand(1111,9999);
			$path = public_path('assets/uploads/activities/');	
			$new_name = $rand."_".$time.'.'.$ext;
			if ( !is_dir($path) ){
				mkdir($path, 0777, TRUE);
			}
			request()->image_name->move(public_path('assets/uploads/activities'), $new_name);
			
			$data = array(
				'file'=>$new_name,
				'ext'=>$ext,
				'created_at'=>time(),
				'updated_at'=>time(),
			);
			$insert_id = DB::table('upload_images')->insertGetId($data);
			$image_data = DB::table('upload_images')->where(['id'=>$insert_id])->first();
			
			$res = array('status'=>1,'image_id'=>$insert_id,'image_data'=>url('/assets/uploads/activities',$image_data->file));	
			
			echo  json_encode($res);die;
		}

		return response()->json(['status'=>0,'response'=>$validator->errors()->all()]);
		
	}

}
