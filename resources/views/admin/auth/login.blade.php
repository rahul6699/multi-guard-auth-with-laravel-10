@extends('admin.layouts.auth')

@section('content')
<div class="login-box">
  <!-- /.login-logo -->
  <div class="card">
    <div id="message"></div>
    <div class="card-body login-card-body">
      <div class="text-center position-relative" >
        <div>
          <img src="{{ asset('/back/images/logo.png') }}" alt="" style="background-repeat: no-repeat;height: 190px;
    width: 260px;">
        </div>
        <h5 style="
    position: absolute;
    bottom: 60px;
    left: 0;
    right: 0;
"><strong>Welcome to ForestTwin</strong></h5>
<p class="login-box-msg position-absolute" style="bottom: 10px; left: 0;right: 0;">Sign In to access your account</p>
      </div>
      
      <form class="appxpo-form" name="loginforms" id="loginforms" method="post" onsubmit="loginSubmit(this);return false;">
         @csrf 
        <div class="input-group mb-3">
          <input type="email" name="email" class="form-control" placeholder="Enter your Email" value="">
        </div>
        <div class="input-group mb-3 password_only">
          <input type="password" name="password" id="pass_log_id" class="form-control" placeholder="Password" value="">
          <span toggle="#password-field" class="fa fa-fw fa-eye field_icon toggle-password"></span>
        </div>
       <!-- <a href="">Forget password?</a> -->
        <div class="row">
          <div class="col-8">
            <div class="icheck-primary">
              <input type="checkbox" id="remember" name="remember">
              <label for="remember">
                Remember Me 
              </label>
            </div>
          </div>
          <!-- /.col -->
          <div class="col-12">
            <button type="submit" name="submit" id="login_submit1" class="btn btn-primary btn-block" > Sign in <i class="st_loader fa-btn-loader fa fa-refresh fa-spin fa-1x fa-fw" style="display:none;"></i></button>
          </div>
          <!-- /.col -->
        </div>
      </form>
      <!-- /.social-auth-links -->
      <p class="mb-1 d-none" >
        <!-- <a href="">Forget Password?</a> -->
      </p>
    </div>
    <!-- /.login-card-body -->
  </div>
</div>
<!-- /.login-box -->
@endsection

@section('page-js-script')
<script>
  $(document).ready(function(){
    $("body").on('click', '.toggle-password', function() {
      $(this).toggleClass("fa-eye fa-eye-slash");
      var input = $("#pass_log_id");
      if (input.attr("type") === "password") {
       input.attr("type", "text");
     } else {
       input.attr("type", "password");
     }
   });
  });

    function loginSubmit(e){
        $(e).find('button').attr('disabled',true);
        $(e).find('.st_loader').show();
        $.ajax({  
          url :"{{ route('admin.login') }}",  
          method:"POST",  
          dataType:"json", 
          data:$(e).serialize(),
          success: function(res){ 
            $(e).find('.st_loader').hide();
            $(e).find('button').attr('disabled',false);
            
            if(res.status == 0){
                var err = JSON.parse(res.msg);
                var er = '';
                $.each(err, function(k, v) { 
                    er += v+'<br>'; 
                }); 
                toastr.error(er,'Error');
                $('#loginforms .st_loader').hide();
            } else if(res.status == 1) {
                $(e)[0].reset();
                toastr.success('Login Success','Success');
                var surl = "{{ url('admin') }}";
                window.setTimeout(function() { window.location = surl; }, 500);
            }
          },
          error: function(data){ 
            if(typeof data.responseJSON.status !== 'undefined'){
              toastr.error(data.responseJSON.error,'Error');
            }else{
              $.each(data.responseJSON.errors, function( key, value ) {
                  toastr.error(value,'Error');
              });
            }
            $(e).find('.st_loader').hide();
            $(e).find('button').attr('disabled',false);
          } 
           
        }); 
    }
</script>
@endsection