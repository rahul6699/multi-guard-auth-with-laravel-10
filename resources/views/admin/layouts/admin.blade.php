<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
<title>{{ config('app.name', 'Laravel') }}</title>
<!-- CSRF Token -->
<meta name="csrf-token" content="{{ csrf_token() }}">
<script src="{{ asset('back/plugins/jquery/jquery.min.js') }}"></script>
    @vite(['resources/sass/app.scss', 'resources/js/app.js'])
    <script src="{{ asset('back/js/custom.js') }}" defer></script>
    <script>
        var BASE_URL = "<?= env('APP_URL') ?>";
    </script>
</head>
<body class="hold-transition sidebar-mini ">
<div class="wrapper">
    <!-- Navbar -->
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav ml-2">
      <li class="nav-item">
        <a class="nav-link " data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
    </ul>
    
      <ul class="navbar-nav ml-auto mr-2">
        <li><a href="javascript:void(0)" onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();" class="btn logoutbutton btn-primary">
          <span class="glyphicon glyphicon-log-out"></span><i class="fas fa-sign-out-alt" aria-hidden="true"></i>          
        </a>
        <form id="logout-form" action="{{ route('admin.logout') }}" method="POST" style="display: none;">@csrf</form>
        </li> 

      </ul>
    </nav>
    <!-- /.navbar -->
@include('admin.common.sidebar')

    @yield('content')

{{-- @include('admin.common.footer') --}}

<div class="modal fade" id="modal-default">
	<div class="modal-dialog">
		<div class="modal-content">
			
		</div>
	</div>
</div>

@yield('page-js-script')
  </body>
</html>