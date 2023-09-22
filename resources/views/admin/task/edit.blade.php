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
                    <form  id="update_task" method="post" onsubmit="task_update(this);return false;" enctype="multipart/form-data">
                    <input type="hidden"  name="id"  value="<?php echo $tInfo->id;?>">
                    
                        <div class="row">
                            <!-- left column -->
                            <div class="col-md-12">
                                <!-- general form elements -->

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Title<sup class="text-danger">*</sup></label>
                                            <input type="text" class="form-control" name="title" placeholder="Title" value="<?php echo $tInfo->title;?>">
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Description<sup class="text-danger">*</sup></label>
                                            <textarea class="form-control" name="description" placeholder="Description"><?php echo $tInfo->description;?></textarea>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Weeks<sup class="text-danger">*</sup></label>
                                            <select class="form-control select2" name="week">
                                                <option value="">Select Week</option>
                                                <?php foreach($weeks as $week){ ?>
                                                    <option value="<?= $week->id ?>" <?php if($week->id==$tInfo->week){ echo 'selected'; } ?>><?= $week->name ?></option>
                                                <?php } ?>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Activity<sup class="text-danger">*</sup></label>
                                            <select class="form-control select2" name="activity">
                                                <option value="">Select Activity</option>
                                                <?php foreach($activitys as $activity){ ?>
                                                    <option value="<?= $activity->id ?>" <?php if($activity->id==$tInfo->activity){ echo 'selected'; } ?>><?= $activity->name ?></option>
                                                <?php } ?>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Time in Minute<sup class="text-danger">*</sup></label>
                                                    <select class="form-control select2" name="time_min">
                                                        <option value="">Select Min</option>
                                                        <?php for ($i=1; $i <= 60; $i++) { ?>
                                                            <option value="<?= $i ?>" <?php if($i==$tInfo->time_min){ echo 'selected'; } ?>><?= $i ?> min</option>
                                                        <?php } ?>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Time In Second<sup class="text-danger">*</sup></label>
                                                    <select class="form-control select2" name="time_sec">
                                                        <option value="">Select Sec</option>
                                                        <?php for ($i=1; $i <= 60; $i++) { ?>
                                                            <option value="<?= $i ?>" <?php if($i==$tInfo->time_sec){ echo 'selected'; } ?>><?= $i ?> sec</option>
                                                        <?php } ?>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Timer Type<sup class="text-danger">*</sup></label>
                                            <select class="form-control select2" name="timer_type">
                                                <option value="">Select Type</option>
                                                <option value="up" <?php if('up'==$tInfo->timer_type){ echo 'selected'; } ?>>UP</option>
                                                <option value="down" <?php if('down'==$tInfo->timer_type){ echo 'selected'; } ?>>Down</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Hint Title<sup class="text-danger">*</sup></label>
                                            <input type="text" class="form-control" name="hint_title" placeholder="Title" value="<?php echo $tInfo->hint_title;?>">
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Hint Description<sup class="text-danger">*</sup></label>
                                            <textarea class="form-control" name="hint_description" placeholder="Description"><?php echo $tInfo->hint_description;?></textarea>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="update_image">Hint Image </label><sup class="text-danger">*</sup><small></small>

                                            <div class="input-group">
                                                <div class="custom-file">
                                                    <input type="file" class="custom-file-input" name="hint_image_name" onchange="upload_photo_hint('update_task','.load1')" id="update_image">
                                                    <input type="hidden" name="hint_image" id="file_id" value="<?php echo $tInfo->hint_image; ?>">
                                                    <label class="custom-file-label" for="exampleInputFile">Choose file</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <label style="width:100%;">&nbsp;</label>
                                        <span class="load1" style="display:none;"><i class="fa fa-refresh fa-spin fa-1x fa-fw"></i></span>
                                        <?php if(!empty($tInfo->hint_image_name)){ ?>
                                            <img id="simage" class="preview_comman simage1" src="<?php echo url('assets/uploads/task_hint/',$tInfo->hint_image_name); ?>" class="img-fluid">
                                        <?php }else{ ?>
                                            <img id="simage" class="preview_comman simage1" src="" class="img-fluid">
                                        <?php } ?>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Status<sup class="text-danger">*</sup></label>
                                            <select class="form-control" name="status">
                                                <option value="0" <?php if($tInfo->status==0){ echo 'selected'; } ?>>Unpublish</option>
                                                <option value="1" <?php if($tInfo->status==1){ echo 'selected'; } ?>>Publish</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                    <?php $templates = json_decode($tInfo->templates); if($templates){ 
                                      ?>
                                    
                                        <div class="row">
                                        
                                      <?php 
                                        foreach($templates as $key => $value){ 
                                        //$row = $this->base_model->select_row('templates',array('is_delete'=>0,'status'=>1,'id'=>$value));
                                        $row = DB::table('templates')->where(['is_delete'=>0,'status'=>1,'id'=>$value])->first();
                                        $data['contents'] = json_decode($row->content);
                                        $data['template_key'] = $key;
                                        $data['template_id'] = $value;
                                        //$path = 'assets/uploads/task/templates/templates_img/';
                                        //$data['temp_image'] =base_url().$path.$row->image;
                                        $data['task_id'] = $tInfo->id;
                                        $joins = array();
                                        
                                        // echo '<pre>'; print_r($data['projects_meta']);
                                      ?>
                                      <input type="hidden" name="template_key" value="<?= $key ?>">
                                      <div class="col-md-12">
                                        <div class="form-group">
                                          <label for="sel2">Choose Template<span class="text-danger"></span></label>
                                          <select name="templates[<?= $key ?>]" class="form-control" onchange="selectTemplate(this,'<?= $key ?>')">
                                            <!-- <option value="">All Templates</option> -->
                                            <?php foreach($lists as $list){ ?>
                                              <?php if($list->id==$value){ ?>
                                            <option value="<?= $list->id ?>"><?= $list->title ?></option>
                                          
                                            <?php } } ?>
                                          </select>
                                        </div>
                                      </div>
                                      <div class="templateFileds_<?= $key ?> col-sm-12">
                                        <?= view('admin/task/template_fileds',$data) ?>
                                      </div>
                                      <?php  } ?>
                                      
                                      <div class="input_fields_wrap col-sm-12"></div>
                                    </div> 
                                    <?php  }else{ ?>
                                        <input type="hidden" name="template_key" value="<?= $template_key ?>">
                                      <div class="row">
                                        <div class="col-md-12">
                                          <div class="form-group">
                                            <label for="sel2">Choose Template<span class="text-danger"></span></label>
                                            <select name="templates[<?= $template_key ?>]" class="form-control" onchange="selectTemplate(this,'<?= $template_key ?>')">
                                              <option value="">All Templates</option>
                                              <?php foreach($lists as $list){ ?>
                                              <option value="<?= $list->id ?>"><?= $list->title ?></option>
                                              <?php } ?>
                                            </select>
                                          </div>
                                        </div>
                                        <div class="templateFileds_<?= $template_key ?> col-sm-12"></div>
                                        <div class="templateLoadFileds_<?= $template_key ?> col-sm-12 text-center" style="display:none;">
                                          <i class="fa-btn-loader fa fa-spinner fa-spin fa-1x fa-fw" ></i>
                                        </div>
                                        <div class="input_fields_wrap col-sm-12"></div>
                                      </div> 
                                    <?php } ?>
                                    </div>
                                </div>
                                <!-- /.card-body -->
                            </div>
                        </div>
                    
                    </div>
                    <div class="card-footer">
                        <div class="row">
                            <!-- <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> -->
                            <div class="col-sm-12">
                                <button type="submit" class="btn btn-primary">Save changes <i class="st_loader fa-btn-loader fa fa-refresh fa-spin fa-1x fa-fw" style="display:none;"></i></button>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
    @endsection
    @section('page-js-script')
    <script>
    $('.select2').select2();
        function selectTemplate(e,template_key){
            $('.templateLoadFileds_'+template_key).show();
            var id = $(e).val();
            if(id){
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
                $.ajax({  
                    url :"{{ route('template_fileds') }}",  
                    method:"POST",  
                    dataType:"json",  
                    data:{'id':id,'template_key':template_key},
                    success:function(res){  
                        if(res.success == 1){
                            $('.templateLoadFileds_'+template_key).hide();
                            var wrapper= $(".templateFileds"); //Fields wrapper
                            // $(wrapper).html(''); //add input box
                            $(e).parent().parent().parent().find('.templateFileds_'+template_key).html('');
                            $(e).parent().parent().parent().find('.templateFileds_'+template_key).html(res.response); //add input box

                        }
                    }  
                }); 
            }else{
                $('.templateLoadFileds_'+template_key).hide();
                var wrapper= $(".templateFileds"); //Fields wrapper
                //alert($(e).parent().parent().parent().find('.templateFileds').html()); //add input box
                $(e).parent().parent().parent().find('.templateFileds_'+template_key).html('');
            }
        }

        function upload_photo(form_name,template_key,template_id,input_name){
            var id='add_team';
            var form_id=$("#update_"+form_name)[0];
            var form_data=new FormData(form_id);
            form_data.append('img_name',template_key+'_'+template_id+'_'+input_name);
            $('.load_'+template_key+'_'+template_id+'_'+input_name).show();
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: "POST",
                url :"{{ route('task_image_data') }}",  
                contentType: false,       
                cache: false,             
                processData:false,
                dataType: "json",
                data: form_data, 
                success: function(res)
                { 

                    if(res.status == 0){
                        var err = res.response;
                        var er = '';
                        $.each(err, function(k, v) { 
                            er = ' * ' + v; 
                            toastr.error(er,'Error');
                        });
                        $(".custom_"+template_key+'_'+template_id+'_'+input_name).val('');
                    }else{
                        $('.'+template_key+'_'+template_id+'_'+input_name).attr('src',res.image_data);
                        $('.'+template_key+'_'+template_id+'_'+input_name).show();        
                        $('#'+template_key+'_'+template_id+'_'+input_name).val(res.image_id);  
                        $(".custom_"+template_key+'_'+template_id+'_'+input_name).val('');
                    }
                    $('.load_'+template_key+'_'+template_id+'_'+input_name).hide();
                }
            });
        }


        function task_update(e){
            var formData = new FormData($(e)[0]);
            $('.st_loader').show();
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
                        toastr.success(res.response,'Success');
                        var surl = '<?php echo url('admin/task') ?>'; 
                        window.setTimeout(function() { window.location = surl; }, 500);
                    }
                    // $('#add_task .st_loader').hide();
                    $('.st_loader').hide();
                }  
            }); 
        }

        function multiple_upload_photo(form_name,template_key,template_id,input_name,random_code){
            var id='add_team';
            var form_id=$("#update_"+form_name)[0];
            var form_data=new FormData(form_id);
            form_data.append('img_name',template_key+'_'+template_id+'_'+input_name);
            form_data.append('template_key',template_key);
            form_data.append('template_id',template_id);
            form_data.append('random_code',random_code);
            $('.load_'+template_key+'_'+template_id+'_'+input_name).show();
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: "POST",
                url :"{{ route('task_multiple_image_data') }}",  
                contentType: false,       
                cache: false,             
                processData:false,
                dataType: "json",
                data: form_data, 
                success: function(res)
                { 

                    if(res.status == 0){
                        var err = JSON.parse(res.msg);
                        var er = '';
                        $.each(err, function(k, v) { 
                            er = ' * ' + v; 
                            toastr.error(er,'Error');
                        });
                        $(".custom_"+template_key+'_'+template_id+'_'+input_name).val('');
                    }else{
                        // $('.'+template_key+'_'+template_id+'_'+input_name).attr('src',res.image_data);
                        $('.multiple_image'+template_key+'_'+template_id).html('');
                        $('.multiple_image'+template_key+'_'+template_id).html(res.image_data);
                        $('.'+template_key+'_'+template_id+'_'+input_name).show();
                        $('#'+template_key+'_'+template_id+'_'+input_name).val('');        
                        $('#'+template_key+'_'+template_id+'_'+input_name).val(res.image_id);  
                        $('#'+template_key+'_'+template_id+'_'+input_name+'_order').val('');        
                        $('#'+template_key+'_'+template_id+'_'+input_name+'_order').val(res.image_id);  
                        $(".custom_"+template_key+'_'+template_id+'_'+input_name).val('');
                    }
                    $('.load_'+template_key+'_'+template_id+'_'+input_name).hide();
                }
            });
        }

        function remove_image(id,task_id='',template_key='',template_id='',input_name=''){
            var image_ids = $('#'+template_key+'_'+template_id+'_'+input_name).val();
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                method:"POST",
                url :"{{ route('remove_image') }}", 
                dataType:"json",
                data:{'id':id,'task_id':task_id,'template_key':template_key,'template_id':template_id,'input_name':input_name,'image_ids':image_ids},
                success: function(res){ 
                if(res.status == 1){
                    $('.multiple_image'+template_key+'_'+template_id).html('');
                    $('.multiple_image'+template_key+'_'+template_id).html(res.image_data);
                    $('#'+template_key+'_'+template_id+'_'+input_name).val('');
                    $('#'+template_key+'_'+template_id+'_'+input_name).val(res.image_id);
                    $('#'+template_key+'_'+template_id+'_'+input_name+'_order').val('');        
                    $('#'+template_key+'_'+template_id+'_'+input_name+'_order').val(res.image_id); 
                    toastr.success(res.msg);
                }
                }
            });
        }

        function addMore(e,id){
            $(e).html('<i class="fa-btn-loader fa fa-refresh fa-spin fa-1x fa-fw"></i>');
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({  
                url :"{{ route('add_more') }}", 
                method:"POST", 
                data:$("#update_"+id).serialize(),
                success:function(res){  
                $('.addMore').append(res);
                $(e).html('<i class="fa fa-plus" aria-hidden="true"></i>'); 
                }
            });
        }

        function removeMore(e){
            $(e).parent().parent().parent().remove();
        }

        function upload_photo_hint(form_name, loading) {
            var form_id = $("#" + form_name)[0];
            var form_data = new FormData(form_id);
            $(loading).show();
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: "POST",
                url: "{{ route('task_hint_image_data') }}",
                contentType: false,
                cache: false,
                processData: false,
                dataType: "json",
                data: form_data,
                success: function(res) {

                    if (res.status == 0) {
                        var err = JSON.parse(res.msg);
                        var er = '';
                        $.each(err, function(k, v) {
                            er = ' * ' + v;
                            toastr.error(er, 'Error');
                        });
                        $(".custom-file-input").val('');
                    } else {
                        $('.simage1').attr('src', res.image_data);
                        $('.simage1').show();
                        $('#file_id').val(res.image_id);

                    }
                    $(loading).hide();
                }
            });
        }
    </script>
    @endsection