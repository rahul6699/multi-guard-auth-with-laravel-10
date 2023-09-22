<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use App\User;
use DB;
use DataTables;
use Validator;

class UsersController extends Controller
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
        $data['nav'] = 'users';
        $data['sub_nav'] = 'users_list';
        $data['title'] = 'Users';
        // return view('admin.task.index',$data);
        return $this->AdminTemplate('admin.users.index',$data);
    }

    public function usersAajaxList(Request $request)
    {

        $data = User::latest()->get();

        return Datatables::of($data)
                ->addIndexColumn()
                ->make(true);

    }	

    public function usersStatus(Request $request){
        $data = array(
            'status'=> $request->input('type'), 
        );
        $product = users::where("id",$request->input('id'))->update($data);
        return response()->json(['success'=>1,'response'=>'users status change successfully']);
	}


}
