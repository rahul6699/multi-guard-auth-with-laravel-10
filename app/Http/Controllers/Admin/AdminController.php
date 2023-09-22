<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use Validator;
use DB;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('guest')->except('logout');
        // $this->middleware('guest:admin')->except('logout');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data['nav'] = 'dashboard';
        $data['sub_nav'] = '';
        $data['title'] = 'Dashboard';
        return view('admin.index',$data);
        // return $this->AdminTemplate('admin.index',$data);
    }

    public function resetpassword()
	{
		$data['nav'] ='setting';
		$data['sub_nav'] ='resetpassword';
		$data['title'] ='resetpassword';
		return $this->AdminTemplate('admin.resetpassword',$data);
	}

	public function update_password(Request $request){

        $rules = array(
            'opass'        => 'required', 
            'new_pass'        => 'required|same:cpass', 
            'cpass'        => 'required', 
        );
        // do the validation ----------------------------------
        // validate against the inputs from our form
        $validator = Validator::make($request->all(), $rules , $messages = [
            'opass.required' => 'The Old Password field is required.',
            'new_pass.required' => 'The New Password field is required.',
            'cpass.required' => 'The Confirm Password field is required.',
        ]);
        if ($validator->fails()) {
            return response()->json(['success'=>0,'response'=>$validator->errors()->toJson()]);
        } else {
            // echo Hash::make($request->input('opass'));die;
            $uinfo = DB::table('admins')->where(['password'=>Hash::make($request->input('opass')),'id'=>Auth::user()->id])->first();
            
            echo '<pre>'; print_r($uinfo);die;
            if(!$uinfo){
				$res =array('success'=>2,'response'=>'Old Password Not Valid');
				echo json_encode($res);die;
			}else{
                $udata =array(
                    'password'=>Hash::make($request->input('new_pass')),
                );
                DB::table('admins')->where(['id'=>Auth::user()->id])->update($udata);
                $res =array('success'=>1);
                echo json_encode($res);die;
			}
        }

	}

}
