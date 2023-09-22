<div class="modal-header">
  <h4 class="modal-title">View Task</h4>

  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
<form id="update_tag" method="post" >
@csrf
  <input type="hidden" name="id" value="<?php echo $tInfo->id; ?>">
  <div class="modal-body">
    <div class="row">
      <!-- left column -->
      <div class="col-md-12">
        <!-- general form elements -->

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>Title<sup class="text-danger">*</sup></label>
              <input type="text" class="form-control" name="title" placeholder="Title" value="<?php echo $tInfo->title; ?>" disabled>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group">
              <label>Description<sup class="text-danger">*</sup></label>
              <textarea class="form-control" name="description" placeholder="Description" disabled><?php echo $tInfo->description; ?></textarea>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group">
              <label>Status<sup class="text-danger">*</sup></label>
              <select class="form-control" name="status" disabled>
                <option <?php if ($tInfo->status == 0) {
                          echo 'selected';
                        } else {
                          echo '';
                        } ?> value="0">Unpublish</option>
                <option <?php if ($tInfo->status == 1) {
                          echo 'selected';
                        } else {
                          echo '';
                        } ?> value="1">Publish</option>
              </select>
            </div>
          </div>

        </div>
        <!-- /.card-body -->
      </div>
    </div>
  </div>
  </div>


  <div class="modal-footer justify-content-between">
    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
  </div>
</form>