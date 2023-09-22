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
                        <form id="update_activities" method="post" onsubmit="activities_update(this);return false;" enctype="multipart/form-data">
                            <input type="hidden" name="id" value="<?php echo $tInfo->id; ?>">

                            <div class="row">
                                <!-- left column -->
                                <div class="col-md-12">
                                    <!-- general form elements -->

                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label>Name<sup class="text-danger">*</sup></label>
                                                <input type="text" class="form-control" name="name" placeholder="Name" value="<?php echo $tInfo->name; ?>" readonly>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label>Description<sup class="text-danger">*</sup></label>
                                                <textarea class="form-control" name="description" placeholder="Description"><?php echo $tInfo->description; ?></textarea>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="form-group">
                                                <label for="update_image">Image </label><sup class="text-danger">*</sup><small></small>

                                                <div class="input-group">
                                                    <div class="custom-file">
                                                        <input type="file" class="custom-file-input" name="image_name" onchange="upload_photo('update_activities','.load1')" id="update_image">
                                                        <input type="hidden" name="image" id="file_id" value="<?php echo $tInfo->image; ?>">
                                                        <label class="custom-file-label" for="exampleInputFile">Choose file</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <label style="width:100%;">&nbsp;</label>
                                            <span class="load1" style="display:none;"><i class="fa fa-refresh fa-spin fa-1x fa-fw"></i></span>
                                            <?php if(!empty($tInfo->image_name)){ ?>
                                                <img id="simage" class="preview_comman simage" src="<?php echo url('assets/uploads/activities/',$tInfo->image_name); ?>" class="img-fluid">
                                            <?php }else{ ?>
                                                <img id="simage" class="preview_comman simage" src="" class="img-fluid">
                                            <?php } ?>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label>Status<sup class="text-danger">*</sup></label>
                                                <select class="form-control" name="status">
                                                    <option value="0" <?php if ($tInfo->status == 0) {
                                                                            echo 'selected';
                                                                        } ?>>Unpublish</option>
                                                    <option value="1" <?php if ($tInfo->status == 1) {
                                                                            echo 'selected';
                                                                        } ?>>Publish</option>
                                                </select>
                                            </div>
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
        function upload_photo(form_name, loading) {
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
                url: "{{ route('activities_image_data') }}",
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
                        $('.simage').attr('src', res.image_data);
                        $('.simage').show();
                        $('#file_id').val(res.image_id);

                    }
                    $(loading).hide();
                }
            });
        }



        function activities_update(e) {
            var formData = new FormData($(e)[0]);
            $('.st_loader').show();
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url: "{{ route('activities_update') }}",
                method: "POST",
                dataType: "json",
                data: formData,
                processData: false,
                contentType: false,
                success: function(res) {
                    if (res.success == 0) {
                        var err = JSON.parse(res.response);
                        var er = '';
                        $.each(err, function(k, v) {
                            er += v + '<br>';
                        });
                        toastr.error(er, 'Error');
                    } else if (res.success == 1) {
                        toastr.success(res.response, 'Success');
                        var surl = '<?php echo url('admin/activities') ?>';
                        window.setTimeout(function() {
                            window.location = surl;
                        }, 500);
                    }
                    // $('#add_activities .st_loader').hide();
                    $('.st_loader').hide();
                }
            });
        }
    </script>
    @endsection