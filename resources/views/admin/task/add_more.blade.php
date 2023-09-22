<div class="row">
    <div class="col-md-11">
        <div class="form-group">
          <label>Q<sup class="text-danger">*</sup></label>
          <input type="text" name="<?= $template_key?>[<?= $template_id ?>][add_more][]" id="qustion" class="form-control" required>
        </div>
    </div>
    <div class="col-md-1">
        <div class="form-group">
          <label>&nbsp;</label>
          <button title="remove this schedule" onclick="removeMore(this);" type="button" class="form-control btn btn-danger btn-sm"><i class="fa fa-times" aria-hidden="true"></i></button>
        </div>
    </div>
</div>

