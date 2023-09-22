<?php 
/*    if(!empty($images_datas)){
      $order = $images_datas;
      usort($image_data, function ($a, $b) use ($order) {
            $pos_a = array_search($a->id, $order);
            $pos_b = array_search($b->id, $order);
            return $pos_a - $pos_b;
      });
   } */
?>
<?php
   foreach ($image_data as $key => $image) { ?>
   <div class="float-left mr-1 mb-1 position-relative muiltiple_view">
   	<a href="javascript:void(0);" class="position-absolute cross-icon-span" onclick="remove_image('<?= $image->id; ?>','<?= $task_id; ?>','<?= $template_key; ?>','<?= $template_id; ?>','<?= $input_name; ?>');"><i class="fa fa-times position-absolute cross-icon" aria-hidden="true"></i></a>
      <img src="<?= url('assets/uploads/task/',$image->file) ?>" width="100" height="60">
   </div>
 <?php } ?>
<!--  <div class="row">
 <button type="button" class="btn btn-success btn-xs" onclick="projects_reorder_images('<?php // $template_key; ?>','<?php // $template_id; ?>','<?php // $input_name; ?>','<?php // $project_id; ?>')"><small>Reorder</small></button>
 </div> -->
