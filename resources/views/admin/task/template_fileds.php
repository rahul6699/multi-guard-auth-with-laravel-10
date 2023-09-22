<div class="row">
 <?php if(isset($temp_image) && !empty($temp_image)){ ?>
        <div class="col-md-12">
            <img src="<?= $temp_image ?>" alt="" height="100px" width="100" onClick="templateView(this)" >
        </div>
    <?php } ?>
<?php $joins=array(); foreach($contents as $key => $content){  
    if(isset($task_id) && !empty($task_id)){
        $where = array('task_meta.task_id'=>$task_id,'task_meta.template_id'=>$template_id,'task_meta.template_key'=>$template_key,'task_meta.meta_key'=>$content->name);
		//$task_meta = $this->base_model->select_join_row('task_meta',$where,$joins,$columns);
        $task_meta = DB::table('task_meta')->select('task_meta.*','upload_images.file as meta_value2')->where($where)->leftJoin('upload_images','upload_images.id','=','task_meta.meta_value')->first();
        $joins=array();
    }else{
        $task_meta ="";
    }
    // echo '<pre>'; print_r($task_meta);
?>
    <?php if( $content->type=='text' ){ ?>
        <div class="col-md-6">
            <div class="form-group">
                <label><?= $content->label ?></label>
                <input type="<?= $content->type ?>" class="form-control" name="<?= $template_key?>[<?= $template_id ?>][<?= $content->name ?>]" value="<?php if(isset($task_meta->meta_key) && !empty($task_meta->meta_key) && $task_meta->meta_key==$content->name){ echo $task_meta->meta_value; } ?>" <?php if(isset($is_view) && $is_view==1){ echo 'disabled'; } ?>>
            </div>
        </div>
    <?php } ?>
 
    <?php if($content->type=='textarea'){ ?>
        <div class="col-md-6">
            <div class="form-group">
                <label><?= $content->label ?></label>
                <textarea type="<?= $content->type ?>" class="form-control" name="<?= $template_key?>[<?= $template_id ?>][<?= $content->name ?>]" <?php if(isset($is_view) && $is_view==1){ echo 'disabled'; } ?>><?php if(isset($task_meta->meta_key) && !empty($task_meta->meta_key) && $task_meta->meta_key==$content->name){ echo $task_meta->meta_value; } ?></textarea>
            </div>
        </div>
    <?php } ?>
    <?php if($content->type=='file'){ ?>
        <div class="<?php if($content->label == 'Images' && $template_id == 3){  echo 'col-sm-12'; }else{ echo 'col-sm-12';} ?>">
            <div class="row">
                <div class="<?php if($content->label == 'Images' && $template_id == 3){  echo 'col-6'; }else{ echo 'col-10';} ?> p-0">
                    <div class="form-group">
                        <label><?= $content->label ?> </label>
                        <div class="input-group">
                            <div class="custom-file">
                                <input type="<?= $content->type ?>"   class="custom-file-input custom_<?= $template_key?>_<?= $template_id ?>_<?= $content->name ?>" name="update_<?= $template_key?>_<?= $template_id ?>_<?= $content->name ?><?php if($content->label == 'Images' && $template_id ==3){ echo '[]'; } ?>" <?php if($content->label == 'Images' && $template_id ==3){ ?>  onchange="multiple_upload_photo('task','<?= $template_key?>','<?= $template_id ?>','<?= $content->name ?>','<?= time(); ?>')" <?php }else{ ?>onchange="upload_photo('task','<?= $template_key?>','<?= $template_id ?>','<?= $content->name ?>')" <?php } ?> <?php if(isset($is_view) && $is_view==1){ echo 'disabled'; } ?> <?php if($content->label == 'Images' && $template_id ==3){ echo 'multiple'; } ?>  >
                                <input type="hidden" name="<?= $template_key?>[<?= $template_id ?>][<?= $content->name ?>]" id="<?= $template_key?>_<?= $template_id ?>_<?= $content->name ?>" value='<?php if(isset($task_meta->meta_key) && !empty($task_meta->meta_key) && $task_meta->meta_key==$content->name){ echo $task_meta->meta_value; } ?>'>
                                <?php if($content->label == 'Images' && $template_id == 3){ ?>
                                <input type="hidden" name="<?= $template_key?>[<?= $template_id ?>][order]" id="<?= $template_key?>_<?= $template_id ?>_<?= $content->name ?>_order" value='<?php if(isset($task_meta->meta_key) && !empty($task_meta->meta_key) && $task_meta->meta_key==$content->name){ echo $task_meta->meta_value; } ?>'>
                                <?php } ?>
                                <label class="custom-file-label" for="exampleInputFile">Choose file</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="<?php if($content->label == 'Images' && $template_id == 3){  echo 'col-6'; }else{ echo 'col-2';} ?>">
                    <label style="width:100%;">&nbsp;</label>
                    <span class="load_<?= $template_key?>_<?= $template_id ?>_<?= $content->name ?> load2"  style="display:none;"><i class="fa fa-refresh fa-spin fa-1x fa-fw" ></i></span>
                    <?php if($content->label != 'Images' ){ ?>
                    <?php if(isset($task_meta->meta_key) && !empty($task_meta->meta_key) && $task_meta->meta_key==$content->name){ ?>
                        <img src="<?php  echo url('/assets/uploads/task',$task_meta->meta_value2);  ?>" class="<?= $template_key?>_<?= $template_id ?>_<?= $content->name ?> preview_comman simage" class="img-fluid">
                    <?php }else{ ?>
                        <img id="simage" class="<?= $template_key?>_<?= $template_id ?>_<?= $content->name ?> preview_comman simage" src="" class="img-fluid">
                    <?php } } ?>
                    <?php if($content->label == 'Images' && $template_id == 3){ ?>
                    <div class="multiple_image<?= $template_key?>_<?= $template_id ?>">

                       <?php 
                        if(isset($task_meta->meta_key) && !empty($task_meta->meta_key) && $task_meta->meta_key==$content->name && !empty($task_meta->meta_value)){ 
                        $images_data['images_datas'] = $images_datas = json_decode($task_meta->meta_value);
                        if(count($images_datas) >0 && !empty($images_datas)){
                            
                        //$this->db->where_in('id',$images_datas);
                        //$query = $this->db->get('upload_images'); //echo $str = $this->db->last_query(); die;
                        $images_data['image_data'] = DB::table('upload_images')->whereIn('id',$images_datas)->get();
                        $images_data['task_id'] = $task_id;
                        $images_data['template_key'] = $template_key;
                        $images_data['template_id'] = $template_id;
                        $images_data['input_name'] = $content->name;
                        echo view('admin.task.multiple_image_view',$images_data);
                            } }  ?>
                    </div>
                <?php } ?>
                    
                </div>
            </div>
        </div>
    <?php } ?>
    <?php if($content->type=='button' && $content->name=='add_more'){ ?>
        
        <?php
            if(isset($task_id) && !empty($task_id)){
                $where2 = array('task_meta.task_id'=>$task_id,'task_meta.template_id'=>$template_id,'task_meta.template_key'=>$template_key,'task_meta.meta_type'=>$content->name);
                //$task_meta = $this->base_model->select_join_row('task_meta',$where,$joins,$columns);
                $task_meta = DB::table('task_meta')->select('task_meta.*')->where($where2)->get();
            }else{
                $task_meta ="";
            }
            // echo '<pre>';print_r($task_meta);die;
            if(!empty($task_meta)){
                $h= 1;
                foreach ($task_meta as $meta_key => $meta_value) {
        ?>
        <div class="col-md-12">
            <div class="row">
                <div class="col-md-11">
                    <div class="form-group">
                        <label>Q</label>
                        <input type="text" class="form-control" name="<?= $template_key?>[<?= $template_id ?>][<?= $content->name ?>][]" value="<?= $meta_value->meta_value ?>" <?php if(isset($is_view) && $is_view==1){ echo 'disabled'; } ?> required>
                    </div>
                </div>
                <?php if($h>1){ ?>
                <div class="col-md-1">
                    <div class="form-group">
                        <label>&nbsp;</label>
                        <button title="remove this schedule" onclick="removeMore(this);" type="button" class="form-control btn btn-danger btn-sm"><i class="fa fa-times" aria-hidden="true"></i></button>
                    </div>
                </div>
                <?php } ?>
            </div>
        </div>
        <?php  $h++; }  }else{ ?>
            <div class="col-md-11">
                <div class="form-group">
                    <label>Q</label>
                    <input type="text" class="form-control" name="<?= $template_key?>[<?= $template_id ?>][<?= $content->name ?>][]" value="" <?php if(isset($is_view) && $is_view==1){ echo 'disabled'; } ?> required>
                </div>
            </div>
        <?php }  ?>
        
        <div class="addMore col-sm-12"></div>
        <div class="col-md-2">
            <button type="button" class="btn btn-info" onclick="addMore(this,'task')"><i class="fa fa-plus" aria-hidden="true"></i></button>
        </div>
    <?php } ?>
<?php } ?>
</div> 