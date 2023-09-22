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
						<div class="row well">
							<div class="col-md-8"></div>
							<div class="col-md-2">
								<button type="button" class="btn btn-block btn-primary  delete_all"  onclick="selected_delete();"><i class="fa fa-trash" aria-hidden="true"></i>
								&nbsp;&nbsp; Delete Selected </button>
							</div>
							<div class="col-md-2">
								<!-- <button type="button" class="btn btn-block btn-primary" onclick="add_task()">
									<i class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;Add
								</button> -->
								<a href="<?= url('/admin/task/add') ?>" class="btn btn-block btn-primary"><i class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;Add</a>
							</div>
						</div>                
					</div>                
				</div>  
				<div class="card">
					<!-- /.card-header -->
					<div class="card-body">	
						<form id="task_table">	
							<div class="table-responsive">
								<table id="datatable" class="table table-bordered table-hover">
									<thead>
										<tr>
											<th><input type="checkbox" id="checkAll" onclick="CheckAll(this);"></th>
											<th>Title</th>
											<th>Week</th>
											<th>Activity</th>
											<th>Time Minute</th>
											<th>Time Second</th>
											<th>Timer Type</th>
											<th>Description</th>
											<th>Hint Title</th>
											<th>Hint Description</th>
											<th>Hint Image</th>
											<th>Status</th>
											<th>Action</th>
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
		"url":"{{ route('task_ajax_list') }}",
		"type": "POST",
      	"dataType": "json",
	},
	columns: [
		{data: 'index', name: 'index', orderable: false, searchable: false},
		{data: 'title', name: 'title'},
		{data: 'week_name', name: 'week'},
		{data: 'activity_name', name: 'activity'},
		{data: 'time_min', name: 'time_min'},
		{data: 'time_sec', name: 'time_sec'},
		{data: 'timer_type', name: 'timer_type'},
		{data: 'description', name: 'description'},
		{data: 'hint_title', name: 'hint_title'},
		{data: 'hint_description', name: 'hint_description'},
		{data: 'hint_image', name: 'hint_image'},
		{data: 'status', name: 'status'},
		{data: 'action', name: 'action', orderable: false, searchable: false},
	]
	});

	$('#datatable').on( 'page.dt', function () {
		$('#checkAll').prop("checked",false);
		$('.task_check').prop("checked",false);
	});
});

function CheckAll(e){
	if($('#checkAll').prop("checked") == true){
		$('.task_check').prop("checked",true);
	}else{
		$('.task_check').prop("checked",false);
	}
}

function add_task(){
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});
	$.ajax({  
		url :"{{ route('task.add') }}",  
		method:"POST",  
		data:{},
		success:function(res){  
			$('#modal-default .modal-content').html(res);
			$('#modal-default').modal('show');
		}  
	});
}

function task_save(e){
	var formData = new FormData($(e)[0]);
	$(e).find('.st_loader').show();
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});
	$.ajax({  
		url :"{{ route('task_save') }}",  
		method:"POST",  
		dataType:"json",  
		data:formData,
		processData: false,
		contentType: false,
		success:function(res){  
			if(res.success == 0){
				var err = JSON.parse(res.response);
				var er = '';
				$.each(err, function(k, v) { 
					er += v+'<br>'; 
				}); 
				toastr.error(er,'Error');
			}else if(res.success == 1){
				toastr.success('Task Added Successfully','Success');
				$('#modal-default').modal('hide');
				$('#modal-default .modal-content').html('');

				table.draw(true);
			}
			// $('#add_task .st_loader').hide();
			$(e).find('.st_loader').hide();
		}  
	}); 
}



function task_update(e){
	var formData = new FormData($(e)[0]);
	$(e).find('.st_loader').show();
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});
	$.ajax({  
		url :"{{ route('task_update') }}",  
		method:"POST",  
		dataType:"json",  
		data:formData,
		processData: false,
		contentType: false,
		success:function(res){  
			if(res.success == 0){
				var err = JSON.parse(res.response);
				var er = '';
				$.each(err, function(k, v) { 
					er += v+'<br>'; 
				}); 
				toastr.error(er,'Error');
			}else if(res.success == 1){
				toastr.success('Task Added Successfully','Success');
				$('#modal-default').modal('hide');
				$('#modal-default .modal-content').html('');

				table.draw(true);
			}
			// $('#add_task .st_loader').hide();
			$(e).find('.st_loader').hide();
		}  
	}); 
}

function task_view(id){
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});
	$.ajax({
		url :"{{ route('task_view') }}",
		method:"POST",
		data:{id:id},
		success:function(res){
			$('#modal-default .modal-content').html(res);
			$('#modal-default').modal('show');
		}
	});
	
}

function task_status(id,type){
	var status = 'Publish';
	if(type == 0){
		status = 'Unpublish';
	}
	if(confirm("Are you sure, You want to "+status+" this Task ?")){
		$.ajaxSetup({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			}
		});
		$.ajax({
			url :"{{ route('task_status') }}", 
			method:"POST",
			dataType:"json",
			data:{id:id,type:type},
			success:function(res){
				if(res.success == 1){
					toastr.success('Task Status Changed Successfully','Success');
					table.draw( false );
				}
			}
		});
	}
}

function task_delete(id){
	if(confirm("Are you sure, You want to delete this Task ?")){
		$.ajaxSetup({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			}
		});
		$.ajax({
			url :"{{ route('task_delete') }}", 
			method:"POST",
			dataType:"json",
			data:{id:id},
			success:function(res){
				if(res.success == 1){
					toastr.success('Task Deleted Successfully','Success');
					table.draw( false );
				}
			}
		});
	}
}

function selected_delete(){
	var count=0;
	$('.task_check').each(function() {
		if($(this).prop("checked") == true){
			count++;
		}
	});

	if(count == 0){
		toastr.error('Please select atleat one Task','Error');
	}else{
		if(confirm("Are you sure, You want to delete selected Task ?")){
			var formData = new FormData($('#task_table')[0]);
			$.ajaxSetup({
				headers: {
					'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				}
			});
			$.ajax({
				url :"{{ route('task_multiple_delete') }}", 
				method:"POST",
				dataType:"json",
				data:formData,
				processData: false,
				contentType: false,
				success:function(res){
					if(res.success == 1){
						toastr.success('Task Deleted Successfully','Success');
						table.draw(true);
						$('#checkAll').prop("checked",false);
					}else{
						toastr.error('Something went wrong !','Error');
					}
				}
			});
		}
	}
}
/* 	$(document).ready(function(){
		$('.select2').select2();
		window.table = $('#datatable').DataTable({
			"paging": true,
			"lengthChange": true,
			"searching": true,
			"order": [],
		// "ordering": true,
		"info": true,
		"autoWidth": false,
		"responsive": false,
		"serverSide": true, 
		"lengthMenu": [[10, 25, 50, 100000], [10, 25, 50, "All"]],
		"pageLength": 10,
		"ajax": {
			"url": "<?php //echo base_url();?>admin/tags/tags_ajax_list",
			"type": "POST",
			"dataType": "json",
			"data": function(data){
				data.TagName= $('#sreachRole').val();
			},
			"dataSrc": function (jsonData) {
				return jsonData.data;
			}
		},
		"columnDefs": [
		{  "targets": 0 ,'orderable': false,},
		{  "targets": 1,"orderable": true,},
		{  "targets": 2,"orderable": true,},
		{  "targets": 3,'orderable': false,},

		],
	});


		$('#datatable').on( 'page.dt', function () {
			$('#checkAll').prop("checked",false);
			$('.tag_check').prop("checked",false);
		});

	}); */

/* 	function getSearchView(){
		table.draw();
	} 

	function resetSearchView(){
		$('.filter').val('');
		table.draw();
	}

	function CheckAll(e){
		if($('#checkAll').prop("checked") == true){
			$('.tag_check').prop("checked",true);
		}else{
			$('.tag_check').prop("checked",false);
		}
	}

	function add_tag(){
		$.ajax({  
			url :BASE_URL+"admin/tags/add",  
			method:"POST",  
			data:{},
			success:function(res){  
				$('#modal-default .modal-content').html(res);
				$('#modal-default').modal('show');
			}  
		});
	}
	
	function tag_save(){
		$('#add_tag .st_loader').show();
		$.ajax({  
			url :BASE_URL+"admin/tags/tag_save",  
			method:"POST",  
			dataType:"json",  
			data:$("#add_tag").serialize(),
			success:function(res){  
				if(res.status == 0){
					var err = JSON.parse(res.msg);
					var er = '';
					$.each(err, function(k, v) { 
						er += v+'<br>'; 
					}); 
					toastr.error(er,'Error');
				}else{
					toastr.success('Tag Info Added Successfully','Success');
					$('#modal-default').modal('hide');
					$('#modal-default .modal-content').html('');

					table.draw();
				}
				$('#add_tag .st_loader').hide();
			}  
		}); 
	}
	
	
	function tag_delete(id){
		if(confirm("Are you sure, You want to delete this Tag ?")){
			$.ajax({
				url :"<?php //echo base_url();?>admin/tags/tag_delete",
				method:"POST",
				dataType:"json",
				data:{id:id},
				success:function(res){
					if(res.status == 1){
						toastr.success('Tag Deleted Successfully','Success');
						table.draw( false );
					}
				}
			});
		}
	}
	
	function tag_edit(id){
		$.ajax({
			url :"<?php //echo base_url();?>admin/tags/tag_edit",
			method:"POST",
			data:{id:id},
			success:function(res){
				$('#modal-default .modal-content').html(res);
				$('#modal-default').modal('show');
			}
		});
		
	}
	
	function tag_update(){
		$('#update_tag .st_loader').show();
		$.ajax({  
			url :BASE_URL+"admin/tags/tag_update",  
			method:"POST",  
			dataType:"json",  
			data:$("#update_tag").serialize(),
			success:function(res){  
				if(res.status == 0){
					var err = JSON.parse(res.msg);
					var er = '';
					$.each(err, function(k, v) { 
						er += v+'<br>'; 
					}); 
					toastr.error(er,'Error');
				}else{
					toastr.success('Tag Info Updated Successfully','Success');
					$('#modal-default').modal('hide');
					$('#modal-default .modal-content').html('');
					table.draw( false );
				}
				$('#update_tag .st_loader').hide();
			}  
		}); 
	}
	
	function selected_delete(){
		var count=0;
		$('.tag_check').each(function() {
			if($(this).prop("checked") == true){
				count++;
			}
		});

		if(count == 0){
			toastr.error('Please select atleat one Tag','Error');
		}else{
			if(confirm("Are you sure, You want to delete selected Tag ?")){
				$.ajax({
					url :"<?php //echo base_url();?>admin/tags/tag_multiple_delete",
					method:"POST",
					dataType:"json",
					data:$("#tag_table").serialize(),

					success:function(res){
						if(res.status == 1){
							toastr.success('Tag Deleted Successfully','Success');
							table.draw();
							$('#checkAll').prop("checked",false);
						}else{
							toastr.error('Something went wrong !','Error');
						}
					}
				});
			}
		}
	}

	function tag_status(id,type){
		var status = 'Publish';
		if(type == 0){
			status = 'Unpublish';
		}
		if(confirm("Are you sure, You want to "+status+" this Tag ?")){
			$.ajax({
				url :"<?php //echo base_url();?>admin/tags/tag_status",
				method:"POST",
				dataType:"json",
				data:{id:id,type:type},
				success:function(res){
					if(res.status == 1){
						toastr.success('Tag Status Changed Successfully','Success');
						table.draw( false );
					}
				}
			});
		}
	} */
</script>
@endsection