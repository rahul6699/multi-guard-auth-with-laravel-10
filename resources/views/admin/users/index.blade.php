@extends('admin.layouts.admin')

@section('content')
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
	<!-- Content Header (Page header) -->
	<section class="content-header">
		<div class="container-fluid">
			<div class="row mb-2">
				<div class="col-sm-6">
					<h1><?= $title ?></h1>
				</div>
			</div>
		</div><!-- /.container-fluid -->
	</section>
	<!-- Main content -->
	<section class="content">
		<div class="row">
			<div class="col-12">
				<div class="card">
					<!-- /.card-header -->
					<div class="card-body">	
						<form id="users_table">	
							<div class="table-responsive">
								<table id="datatable" class="table table-bordered table-hover">
									<thead>
										<tr>
											<th>Name</th>
											<th>Email</th>
											<th>Age</th>
											<th>Phone</th>
											<th>Gender</th>
											<th>City</th>
										</tr>
									</thead>
								</table>
							</div>
						</form>
					</div>
				</div>
				<!-- /.card -->
			</div>
			<!-- /.col -->
		</div>
		<!-- /.row -->
	</div><!-- /.container-fluid -->
</section>
<!-- /.content -->
</div>
</div>
<!-- /.modal-content -->
</div>
<!-- /.modal-dialog -->
</div>
<!-- /.row -->
</section>
<!-- /.content -->
</div>


<!-- Control Sidebar -->
<aside class="control-sidebar control-sidebar-dark">
	<!-- Control sidebar content goes here -->
</aside>
<!-- /.control-sidebar -->
</div>
<!-- ./wrapper -->

@endsection

@section('page-js-script')
<script>
  $(function () {
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});
	window.table = $('#datatable').DataTable({
	processing: true,
	serverSide: true,
	ajax: {
		"url":"{{ route('users_ajax_list') }}",
		"type": "POST",
      	"dataType": "json",
	},
	columns: [
		{data: 'name', name: 'name'},
		{data: 'email', name: 'email'},
		{data: 'age', name: 'age'},
		{data: 'phone', name: 'phone'},
		{data: 'gender', name: 'gender'},
		{data: 'city', name: 'city'},
	]
	});

	$('#datatable').on( 'page.dt', function () {
		$('#checkAll').prop("checked",false);
		$('.users_check').prop("checked",false);
	});
});

function CheckAll(e){
	if($('#checkAll').prop("checked") == true){
		$('.users_check').prop("checked",true);
	}else{
		$('.users_check').prop("checked",false);
	}
}




</script>
@endsection