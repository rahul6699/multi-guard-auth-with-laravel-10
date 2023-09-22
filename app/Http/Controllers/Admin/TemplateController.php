<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use DB;
use DataTables;
use Validator;

class TemplateController extends Controller
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

	public function aadTemplates(){
		$template_01 = array(
			[
				'label'=>'Image',
				'type'=>'file',
				'name'=>'image'
			],
			[
				'label'=>'Heading',
				'type'=>'text',
				'name'=>'heading'
			],
			[
				'label'=>'Q.1',
				'type'=>'text',
				'name'=>'q1'
			],
			[
				'label'=>'Q.2',
				'type'=>'text',
				'name'=>'q2'
			],
		);
		
		$template_02 = array(
			[
				'label'=>'Image',
				'type'=>'file',
				'name'=>'image'
			],
			[
				'label'=>'Heading',
				'type'=>'text',
				'name'=>'heading'
			],
			[
				'label'=>'Q.1',
				'type'=>'text',
				'name'=>'q1'
			],
			[
				'label'=>'Q.2',
				'type'=>'text',
				'name'=>'q2'
			],
		);
		
		$template_03 = array(
			[
				'label'=>'Image',
				'type'=>'file',
				'name'=>'image2'
			],
			[
				'label'=>'Images',
				'type'=>'file',
				'name'=>'image'
			],
			[
				'label'=>'Content',
				'type'=>'textarea',
				'name'=>'content'
			],
			[
				'label'=>'Q',
				'type'=>'text',
				'name'=>'q'
			],
		);
		
		$template_04 = array(
			[
				'label'=>'Image',
				'type'=>'file',
				'name'=>'image'
			],
			[
				'label'=>'Content',
				'type'=>'textarea',
				'name'=>'content'
			],
		);
		
		$template_05 = array(
			[
				'label'=>'Image',
				'type'=>'file',
				'name'=>'image'
			],
			[
				'label'=>'Content',
				'type'=>'textarea',
				'name'=>'content'
			],
			
		);

		$template_06 = array(
			[
				'label'=>'Content',
				'type'=>'textarea',
				'name'=>'content'
			],
			[
				'label'=>'Add more',
				'type'=>'button',
				'name'=>'add_more'
			],
		);
		
		

		$data = array(
			[
			'title'=>'Template 01',
			'image'=>'template_01.jpg',
			'content'=>json_encode($template_01),
			'status'=>1,
			'is_delete'=>0,
			'created_at'=>time(),
			'updated_at'=>time()
			],
			[
			'title'=>'Template 02',
			'image'=>'template_02.jpg',
			'content'=>json_encode($template_02),
			'status'=>1,
			'is_delete'=>0,
			'created_at'=>time(),
			'updated_at'=>time()
			],
			[
			'title'=>'Template 03',
			'image'=>'template_03.jpg',
			'content'=>json_encode($template_03),
			'status'=>1,
			'is_delete'=>0,
			'created_at'=>time(),
			'updated_at'=>time()
			],
			[
			'title'=>'Template 04',
			'image'=>'template_04.jpg',
			'content'=>json_encode($template_04),
			'status'=>1,
			'is_delete'=>0,
			'created_at'=>time(),
			'updated_at'=>time()
			],
			[
			'title'=>'Template 05',
			'image'=>'template_05.jpg',
			'content'=>json_encode($template_05),
			'status'=>1,
			'is_delete'=>0,
			'created_at'=>time(),
			'updated_at'=>time()
			],
			[
			'title'=>'Template 06',
			'image'=>'template_06.jpg',
			'content'=>json_encode($template_06),
			'status'=>1,
			'is_delete'=>0,
			'created_at'=>time(),
			'updated_at'=>time()
			]
		);

		foreach($data as $row){
			// $this->base_model->insert_data('templates',$row);
			DB::table('templates')->insert($row);
			// echo '<pre>'; print_r($row);
		}
		
	}
}
