$(document).ready(function() {
myfunctionchange('load');
$('.select2').select2();

 var start = moment().subtract(29, 'days');
  var end = moment(); 

    function cb1(start, end) {
      $('#datetimerange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
      $('#comments_date').val(start.format('YYYY-MM-DD') + ' / ' + end.format('YYYY-MM-DD'));
      //rojgarnirjan_data(start,end);
  }

  $('#datetimerange').daterangepicker({
      startDate: start,
      endDate: end,
      ranges: {
         'Today': [moment(), moment()],
         'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
         'Last 7 Days': [moment().subtract(6, 'days'), moment()],
         'Last 30 Days': [moment().subtract(29, 'days'), moment()],
         'This Month': [moment().startOf('month'), moment().endOf('month')],
         'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      }
  }, cb1);
    cb1(start, end);

  get_datetimepicker();

  var ext_name = $('#ext_name').val();
   if(ext_name == 'mp4' || ext_name == 'webm' || ext_name == 'ogg'){
    $('#disp_video_id').show();
  }else{
    $('#disp_img_id').show();
  }
  $(".price").keypress(function (e) {
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
      event.preventDefault();
    }
  });

  $('.select2').select2();
  window.table = $('#datatable').DataTable({
    "paging": true,
    "lengthChange": true,
    "searching": true,
    "order": [],
    "info": true,
    "autoWidth": false,
    "responsive": false,
    "serverSide": true, 
    "lengthMenu": [[10, 25, 50, 100000], [10, 25, 50, "All"]],
    "pageLength": 10,
    "ajax":{
      "url": BASE_URL+"admin/test_series/mains/test_series_ajax_list",
      "type": "POST",
      "dataType": "json",
      "data": function(data){
        data.forumName= $('#forumName').val();
        data.sreachCategory = $('#sreachCategory').val();
        data.status = $('#sreachStatus').val();
      },
      "dataSrc": function (jsonData) {
       return jsonData.data;
     }
   },
   "columnDefs": [
   {  "targets": 0 ,'orderable': false,},
   {  "targets": 1,"orderable": true,},
   {  "targets": 2,'orderable': false,},
   {  "targets": 3 ,'orderable': true,},
   {  "targets": 4 ,'orderable': true,},       
   {  "targets": 5 ,'orderable': false,},       
   {  "targets": 6 ,'orderable': false,},       
   ],
 });

  $('#datatable').on( 'page.dt', function () {
    $('#checkAll').prop("checked",false);
    $('.forum_check').prop("checked",false);
  }); 

  window.table_question = $('#datatable_question').DataTable({
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
      "url": BASE_URL+"admin/test_series/mains/question_ajax_list",
      "type": "POST",
      "dataType": "json",
      "data": function(data){
        data.test_series_id= $('#test_view_id').val();
      },
      "dataSrc": function (jsonData) {
       return jsonData.data;
     }
   },
   "columnDefs": [
   {  "targets": 0 ,'orderable': true,},
   {  "targets": 1,'orderable': false,},
   {  "targets": 2 ,'orderable': false,},
   {  "targets": 3 ,'orderable': false,},

   ],
 });

});

tinymce.init({
  selector:'.textarea',
  height: 400,
  menubar: true,
  plugins: [
  'advlist autolink lists link image charmap print preview anchor',
  'searchreplace visualblocks code fullscreen',
  'insertdatetime media table paste code help wordcount image'
  ],
  toolbar: ' undo redo | formatselect | ' +
  'bold italic backcolor | alignleft aligncenter ' +
  'alignright alignjustify | bullist numlist outdent indent | ' +
  'removeformat | image',
  image_title: true,
  /* enable automatic uploads of images represented by blob or data URIs*/
  automatic_uploads: true,
  file_picker_types: 'image',
  /* and here's our custom image picker*/
  file_picker_callback: function (cb, value, meta) {
    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.onchange = function () {
      var file = this.files[0];

      var reader = new FileReader();
      reader.onload = function () {
        var id = 'blobid' + (new Date()).getTime();
        var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
        var base64 = reader.result.split(',')[1];
        var blobInfo = blobCache.create(id, file, base64);
        blobCache.add(blobInfo);

        /* call the callback and populate the Title field with the file name */
        cb(blobInfo.blobUri(), { title: file.name });
      };
      reader.readAsDataURL(file);
    };

    input.click();
  },
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
  setup: function (editor){
    editor.on('change', function () {
      tinymce.triggerSave();
    });
  },
});

tinymce.init({
 selector:'.answerReply',
 height:300,
 menubar: true,
 plugins: [
 'advlist autolink lists link image charmap print preview anchor',
 'searchreplace visualblocks code fullscreen',
 'insertdatetime media table paste code help wordcount image'
 ],
 toolbar: ' undo redo | formatselect | ' +
 'bold italic backcolor | alignleft aligncenter ' +
 'alignright alignjustify | bullist numlist outdent indent | ' +
 'removeformat | image',
 image_title: true,
 /* enable automatic uploads of images represented by blob or data URIs*/
 automatic_uploads: true,
 file_picker_types: 'image',
 /* and here's our custom image picker*/
 file_picker_callback: function (cb, value, meta) {
   var input = document.createElement('input');
   input.setAttribute('type', 'file');
   input.setAttribute('accept', 'image/*');
   input.onchange = function () {
     var file = this.files[0];

     var reader = new FileReader();
     reader.onload = function () {
       var id = 'blobid' + (new Date()).getTime();
       var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
       var base64 = reader.result.split(',')[1];
       var blobInfo = blobCache.create(id, file, base64);
       blobCache.add(blobInfo);

       /* call the callback and populate the Title field with the file name */
       cb(blobInfo.blobUri(), { title: file.name });
     };
     reader.readAsDataURL(file);
   };
   
   input.click();
 },
 content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
 setup: function (editor){
   editor.on('change', function () {
     tinymce.triggerSave();
   });
 },
});

function  get_datetimepicker(){
 $('.datetimepicker').datetimepicker({
  format: "yyyy-mm-dd HH:ii P",
  showMeridian: true,
  autoclose: true,
  todayBtn: true
});
}

function test_sub_save(){
  $('#add_sub_test .st_loader').show();
  $.ajax({  
   url :BASE_URL+"admin/test_series/mains/test_sub_save",  
   method:"POST",  
   dataType:"json",  
   data:$("#add_sub_test").serialize(),
   success:function(res){ 
    if(res.status == 0){
     var err = JSON.parse(res.msg);
     var er = '';
     $.each(err, function(k, v) { 
      er += v+'<br>'; 
    }); 
     toastr.error(er,'Error');
   }else{
    toastr.success('Test Series, Info Added Successfully','Success');
    $('#add_sub_test')[0].reset();
    $('#add_sub_test .modal-content').html('');
          //$('#textarea2').summernote("isEmpty");
          //$('#textarea1').summernote("isEmpty");
          window.location.href =BASE_URL+'admin/test_series/mains/add_question/'+res.id;
        }
        $('#add_sub_test .st_loader').hide();
      }  
    }); 
}

function test_sub_update(){
  $('#test_sub .st_loader').show();
  $.ajax({  
   url :BASE_URL+"admin/test_series/mains/test_sub_update",  
   method:"POST",  
   dataType:"json",  
   data:$("#test_sub").serialize(),
   success:function(res){  
    if(res.status == 0){
     var err = JSON.parse(res.msg);
     var er = '';
     $.each(err, function(k, v) { 
      er += v+'<br>'; 
    }); 
     toastr.error(er,'Error');
   }else{
    toastr.success('Test  Series Info Updated Successfully','Success');
    $('#modal-default').modal('hide');
    $('#modal-default .modal-content').html('');
    window.location.href =BASE_URL+'admin/test_series/mains';
  }
  $('#test_sub .st_loader').hide();

}

}); 
}

function upload_pdf(id){
  $('.load2').show();
  $.ajax({
    type: "POST",
    url: BASE_URL+'admin/test_series/mains/sub_pdf_data',
    contentType: false,       
    cache: false,             
    processData:false,
    dataType: "json",
    data: new FormData ($("#"+id)[0]), 
    success: function(res)
    { 

      if(res.status == 0){
        var err = JSON.parse(res.msg);
        var er = '';
        $.each(err, function(k, v) { 
          er = ' * ' + v; 
          toastr.error(er,'Error');
        });
        $(".custom-file-input").val('');
      }else{
        $('#simage').html('<a href='+res.image_data+' download>(Download)</a>');
        $('#simage').show();        
        $('#file_id').val(res.image_id);  
      }
      $('.load2').hide();
    }
  });
}

function upload_pdf1(id){
  $('.load9').show();
  $.ajax({
    type: "POST",
    url: BASE_URL+'admin/test_series/mains/sub_pdf_data1',
    contentType: false,       
    cache: false,             
    processData:false,
    dataType: "json",
    data: new FormData ($("#"+id)[0]), 
    success: function(res)
    { 

      if(res.status == 0){
        var err = JSON.parse(res.msg);
        var er = '';
        $.each(err, function(k, v) { 
          er = ' * ' + v; 
          toastr.error(er,'Error');
        });
        $(".custom-file-input").val('');
      }else{
        $('#simage1').html('<a href='+res.image_data+' download>(Download)</a>');
        $('#simage1').show();        
        $('#file_id1').val(res.image_id);  
      }
      $('.load9').hide();
    }
  });
}

function brocher_pdf(id){
  $('.load5').show();
  $.ajax({
    type: "POST",
    url: BASE_URL+'admin/test_series/mains/brocher_pdf',
    contentType: false,       
    cache: false,             
    processData:false,
    dataType: "json",
    data: new FormData ($("#"+id)[0]), 
    success: function(res)
    { 

      if(res.status == 0){
        var err = JSON.parse(res.msg);
        var er = '';
        $.each(err, function(k, v) { 
          er = ' * ' + v; 
          toastr.error(er,'Error');
        });
        $(".custom-file-input").val('');
      }else{
        $('#brochuer_pdf').attr('href',res.image_data);
        $('#brochure_pdf').show();        
        $('#brochurepdf_id').val(res.image_id);  
      }
      $('.load5').hide();
    }
  });
}

function upload_photo(id){
  $('.load3').show();
  $.ajax({
    type: "POST",
    url: BASE_URL+'admin/test_series/mains/upload_image',
    contentType: false,       
    cache: false,             
    processData:false,
    dataType: "json",
    data: new FormData ($("#"+id)[0]), 
    success: function(res)
    { 

      if(res.status == 0){
        var err = JSON.parse(res.msg);
        var er = '';
        $.each(err, function(k, v) { 
          er = ' * ' + v; 
          toastr.error(er,'Error');
        });
        $(".custom-file-input").val('');
      }else{
        $('#s_image').attr('src',res.image_data);
        $('#s_image').show();        
        $('#image_id').val(res.image_id);  
      }
      $('.load3').hide();
    }
  });
}

function brochure_upload_photo(id){
   $('.form_test').find('.load_b').show();
  $.ajax({
    type: "POST",
    url: BASE_URL+'admin/test_series/mains/featured_image',
    contentType: false,       
    cache: false,             
    processData:false,
    dataType: "json",
    data: new FormData ($("#"+id)[0]), 
    success: function(res)
    { 
        
       if(res.errs_status > 0){
          toastr.error(res.error,'Error');
          $('#'+id).find('.custom-file-label').val('');
        }
        if(res.success_status > 0){
          
          if(res.is_update == 'test_sub'){
          $('#'+id).find('.multiple_simages').append(res.img_data);
          }else{
           $('#'+id).find('.multiple_simages').html(res.img_data);
          }
          $('#'+id).find('.pimage_code').val(res.pimage_code);
          $('#'+id).find('.multiple_simages').show();
          $('#'+id).find('.is_pimage').val(res.total_images);
        }
         $('.form_test').find('.load_b').hide();
     }    
   });
}

function remove_img(e,id,img_id=''){
    if(confirm("Are you sure, You want to delete this image ?")){
    $.ajax({
       url :BASE_URL+"admin/test_series/mains/delete_ans_image",
       method:"POST",
       dataType:"json",
       data:{id:id,img_id:img_id},
       success:function(res){
      $(e).parent().remove();
      if($('.multiple_simages div .prv_img').length == 0){
        $('#pimage_code').val('');
      }else{
       $('#is_pimage').val(res.count);
      }
      if(res.count >0){
           $('#is_pimage').val(res.count);
         }else{
           $('#is_pimage').val('');
         }
      }
    });
    }
  }


function upload_photo_current(e){
  $('.load3').show();
  var name = $(e).closest('#answer_reply_form')[0];
  var formdata = new FormData(name);
  // formdata.append('image',name);
  $.ajax({
    type: "POST",
    url: BASE_URL+'admin/test_series/mains/upload_image',
    contentType: false,       
    cache: false,             
    processData:false,
    dataType: "json",
    data: formdata, 
    success: function(res)
    { 

      if(res.status == 0){
        var err = JSON.parse(res.msg);
        var er = '';
        $.each(err, function(k, v) { 
          er = ' * ' + v; 
          toastr.error(er,'Error');
        });
        $(".custom-file-input").val('');
      }else{
        $(e).closest('#answer_reply_form').find('#s_image').attr('src',res.image_data);
        $(e).closest('#answer_reply_form').find('#s_image').show();        
        $(e).closest('#answer_reply_form').find('#image_id').val(res.image_id);  
      }
      $('.load3').hide();
    }
  });
}

function getSearchView(){
  table.draw();
} 

function resetSearchView(){
  $('.filter').val('');
  table.draw();
}

function CheckAll(e){
 if($('#checkAll').prop("checked") == true){
  $('.forum_check').prop("checked",true);
}else{
 $('.forum_check').prop("checked",false);
}
}

function test_sub_delete(id){
  if(confirm("Are you sure, You want to delete this Test Subjective ?")){
    $.ajax({
     url :BASE_URL+"admin/test_series/mains/test_sub_delete",
     method:"POST",
     dataType:"json",
     data:{id:id},
     success:function(res){
      if(res.status == 1){
        toastr.success('Test Subjective Deleted Successfully','Success');
        table.draw( false );
      }
    }
  });
  }
}


function selected_delete(){
  var count=0;
  $('.forum_check').each(function() {
   if($(this).prop("checked") == true){
    count++;
  }
});
  if(count == 0){
   toastr.error('Please select atleat one Test Subjective','Error');
 }else{
  if(confirm("Are you sure, You want to delete selected Test Subjective ?")){
    $.ajax({
     url :BASE_URL+"admin/test_series/mains/test_sub_multiple_delete",
     method:"POST",
     dataType:"json",
     data:$("#buyer_table").serialize(),
     success:function(res){
      if(res.status == 1){
        toastr.success('Test Subjective Deleted Successfully','Success');
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

function test_sub_status(id,type){
  var status = 'Active';
  if(type == 0){
    status = 'Inactive';
  }
  if(confirm("Are you sure, You want to "+status+" this Test Subjective ?")){
    $.ajax({
     url :BASE_URL+"admin/test_series/mains/test_sub_status",
     method:"POST",
     dataType:"json",
     data:{id:id,type:type},
     success:function(res){
      if(res.status == 1){
        toastr.success('Test Subjective Status Changed Successfully','Success');
        table.draw( false );
      }
    }
  });
  }
}

function question_save(){
  $('#add_sub_test .st_loader').show();
  $.ajax({  
   url :BASE_URL+"admin/test_series/mains/question_save",  
   method:"POST",  
   dataType:"json",  
   data:$("#add_sub_test").serialize(),
   success:function(res){  
    if(res.status == 0){
     var err = JSON.parse(res.msg);
     var er = '';
     $.each(err, function(k, v) { 
      er += v+'<br>'; 
    }); 
     toastr.error(er,'Error');
   }else{
    toastr.success('Test Series, Info Added Successfully','Success');
    $('#add_sub_test')[0].reset();
    $('#add_sub_test .modal-content').html('');
    window.location.href =BASE_URL+'admin/test_series/mains/view/'+res.id;
  }
  $('#add_sub_test .st_loader').hide();
}  
}); 
}

function question_update(){
  $('#add_sub_test .st_loader').show();
  $.ajax({  
   url :BASE_URL+"admin/test_series/mains/question_update",  
   method:"POST",  
   dataType:"json",  
   data:$("#add_sub_test").serialize(),
   success:function(res){  
    if(res.status == 0){
     var err = JSON.parse(res.msg);
     var er = '';
     $.each(err, function(k, v) { 
      er += v+'<br>'; 
    }); 
     toastr.error(er,'Error');
   }else{
    toastr.success('Test Series, Info Added Successfully','Success');
    $('#add_sub_test')[0].reset();
    $('#add_sub_test .modal-content').html('');
    window.location.href =BASE_URL+'admin/test_series/mains/view/'+res.id;
  }
  $('#add_sub_test .st_loader').hide();
}  
}); 
}

function question_delete(id){
 if(confirm("Are you sure, You want to delete this Question ?")){
   $.ajax({
    url :BASE_URL+"admin/test_series/mains/question_delete",
    method:"POST",
    dataType:"json",
    data:{id:id},
    success:function(res){
     if(res.status == 1){
       toastr.success('Anncouncement Deleted Successfully','Success');
     }
   }
 });
 }
}

function test_ques_status(id,type){
 var status = 'Publish';
 if(type == 0){
   status = 'Unpublish';
 }
 if(confirm("Are you sure, You want to "+status+" this Test Subjective ?")){
   $.ajax({
    url :BASE_URL+"admin/test_series/mains/test_ques_status",
    method:"POST",
    dataType:"json",
    data:{id:id,type:type},
    success:function(res){
     if(res.status == 1){
       toastr.success('Test Subjective Status Changed Successfully','Success');
       table_question.draw(false);
     }
   }
 });
 }
}

function answerFormReply(e,answer_id){
  $('.commentFormBox_'+answer_id).toggle();
}

function answer_reply_save(e,answer_id){    
 $('.st_loader').show();     
 $.ajax({  
   url :BASE_URL+"admin/test_series/mains/answer_reply_save",
   method:"POST",  
   dataType:"json",  
   data:$(e).serialize(),
   success:function(res){  
     if(res.status == 0){
      var err = JSON.parse(res.msg);
      var er = '';
      $.each(err, function(k, v) { 
       er += v+'<br>';
     }); 
      toastr.error(er,'Error');
    }else{
     toastr.success('Answers Reply successfully Added','Success');
     $(e)[0].reset();
             // location.reload();
             $('.answerReActivity2_'+answer_id).html('');
             $('.answerReActivity2_'+answer_id).html(res.answer);
           }
           $('.st_loader').hide();    
           $(e).find('#s_image').attr('src','');
         }

       }); 
}

function answerLike(mains_id,answer_id,e){
 var is_user_login = is_admin_login;
 if(is_user_login!=''){
   $.ajax({
    url :BASE_URL+"admin/test_series/mains/answerLike",
    method:"POST",
    dataType:"json",
    data:{mains_id:mains_id,answer_id:answer_id},
    success:function(res){
      var like_lable = ''; 
      $(e).attr('class','');
      if(res.success==0){
        like_lable +='<i class="fa fa-thumbs-up" aria-hidden="true"></i>';
      }else{
        $(e).addClass('text-primary');  
        like_lable +='<i class="fa fa-thumbs-up" aria-hidden="true"></i>';
      }

      if(res.likes_count == 0){
        like_lable +=' Like ';
      }else{
        if(res.likes_count == 1){
         like_lable +=' 1 Like';
       }else{
        like_lable +=' '+res.likes_count+' Likes';
      }
    }
    $(e).html(like_lable);

  }
});
 }else{
   toastr.error('Sign In/Register to like.','Error');
 }
}

function mainsAnswerReplyLike(mains_id,answer_id,answer_reply_id,e){
 var is_user_login = is_admin_login;
 if(is_user_login!=''){
   $.ajax({
    url :BASE_URL+"admin/test_series/mains/answerReplyLike",
    method:"POST",
    dataType:"json",
    data:{mains_id:mains_id,answer_id:answer_id,'answer_reply_id':answer_reply_id},
    success:function(res){

      var like_lable = ''; 
      $(e).attr('class','');
      if(res.success==0){
        like_lable +='<i class="fa fa-thumbs-up" aria-hidden="true"></i>';
      }else{
        $(e).addClass('text-primary');  
        like_lable +='<i class="fa fa-thumbs-up" aria-hidden="true"></i>';
      }


      if(res.likes_count == 0){
        like_lable +=' Like ';
      }else{
        if(res.likes_count == 1){
         like_lable +=' 1 Like';
       }else{
        like_lable +=' '+res.likes_count+' Likes';
      }
    }
    $(e).html(like_lable);

  }
});
 }else{
   toastr.error('Sign In/Register to Like.','Error');
 }
}

function addMoreSchedule(e){
  $(e).html('<i class="fa-btn-loader fa fa-refresh fa-spin fa-1x fa-fw"></i>');
  $.ajax({  
    url :BASE_URL+"admin/test_series/mains/add_more_schedule",
    method:"POST", 
    data:$("#add_sub_test").serialize(),
    success:function(res){  
      $('.addMoreSchedule').append(res);
      $(e).html('<i class="fa fa-plus" aria-hidden="true"></i>'); 
    }
  });
}

function removeMoreSchedule(e){
 $(e).parent().parent().parent().remove();
 $('.batchSelect option').removeAttr('disabled');
 $('.batch_select').each(function(){
   var sid = $(this).val();
   if(sid != ''){
    $('.batchSelect option[value='+sid+']').attr('disabled','disabled');
    $(this).parent().find('.batchSelect option[value='+sid+']').removeAttr('disabled');
  }
 });
}

function batchSelect(e){
 var id= $(e).val(); 
 $(e).parent().parent().parent().find('.batch_select').val(id);
 $('.batchSelect option').removeAttr('disabled');
 $('.batch_select').each(function(){
   var sid = $(this).val();
   if(sid != ''){
    $('.batchSelect option[value='+sid+']').attr('disabled','disabled');
    $(this).parent().find('.batchSelect option[value='+sid+']').removeAttr('disabled');
  }
});
}

function displayType(e){
 $('#disp_img_id').hide();
 $('#disp_video_id').hide();
 var disp_hide= $(e).val();
 if(disp_hide==3){
  $('.upload-col').hide();
  $('.url-col').show();
}else{
  $('.url-col').hide();
  $('.upload-col').show();
}
}

function display_upload(id){
  $('.load4').show();    
  $.ajax({
    type: "POST",
    url: BASE_URL+'admin/test_series/mains/display_upload',
    contentType: false,       
    cache: false,             
    processData:false,
    dataType: "json",
    data: new FormData ($("#"+id)[0]), 
    success: function(res)
    { 
      if(res.status == 0){
        var err = JSON.parse(res.msg);
        var er = '';
        $.each(err, function(k, v) { 
          er = ' * ' + v; 
          toastr.error(er,'Error');
        });
        $(".custom-file-input").val('');
      }else{
        if(res.ext_type == 0){
          $('#disp_img_id').attr('src',res.image_data);
          $('#disp_img_id').show();
          $('#disp_video_id').hide();
        } else{
          $('#disp_video_id').attr('href',res.image_data);
          $('#disp_img_id').hide();
          $('#disp_video_id').show();
        }       
        $('#display_multi').val(res.image_id);  
      }
      $('.load4').hide();
    }
  });
}

function myfunctionchange(load='')
{
  var bid = $('#f_batch_comments').val();
  var userID = '';
  if(load!=''){
    userID = $('#userID').val();
  }  
  var pid = $('#post_id').val();
  var type = $('#post_type').val();
  $.ajax({  
   url :BASE_URL+"admin/test_series/mains/f_batch_comments",  
   method:"POST",  
   dataType:"json",  
   data:{bid:bid,pid:pid,type:type,userID:userID},
   success:function(res){ 
      $('#candidate_id').html(res.option);
      if(load!=''){ get_search_comments_data(); }      
      }  
    });
}

function get_search_comments_data()
{
  $.ajax({  
   url :BASE_URL+"admin/test_series/mains/get_search_comments_data",  
   method:"POST",  
   dataType:"json",  
   data:$("#get_search_comments_data").serialize(),
   success:function(res){ 
      $('#comments').html(res.comments);
      }  
    });
}

function new_uploads(id,num){
  var formData = new FormData ($("#"+id)[0])
  $('.guid_loader'+num).show();
  formData.append("num", num);
  $.ajax({
    type: "POST",
    url: BASE_URL+'admin/test_series/mains/guide_file_uploads',
    contentType: false,       
    cache: false,             
    processData:false,
    dataType: "json",
    data: formData, 
    success: function(res)
    { 
      if(res.status == 0){
        var err = JSON.parse(res.msg);
        var er = '';
        $.each(err, function(k, v) { 
          er = ' * ' + v; 
          toastr.error(er,'Error');
        });
        $(".custom-file-input").val('');
      }else{
        $('#guide_pdf'+num).attr('href',res.image_data);
        $('#guide_pdf'+num).show();        
        $('#nfile_id'+num).val(res.image_id);  
      }
      $('.guid_loader'+num).hide();
    }
  });
}

 function remove_guide_pdf(e){
  $(e).parent().parent().find('.comm_guide').val('');
  $(e).parent().parent().find('.comm_guide').hide();
  $(e).hide();
 }

function question_upload_photo(id){
   $('#add_sub_test').find('.load10').show();
  $.ajax({
    type: "POST",
    url: BASE_URL+'admin/test_series/mains/question_upload_photo',
    contentType: false,       
    cache: false,             
    processData:false,
    dataType: "json",
    data: new FormData ($("#"+id)[0]), 
    success: function(res)
    { 
        
      if(res.status == 0){
        var err = JSON.parse(res.msg);
        var er = '';
        $.each(err, function(k, v) { 
          er = ' * ' + v; 
          toastr.error(er,'Error');
        });
        $(".custom-file-input").val('');
      }else{
        $("#pimage").attr('src',res.image_data);
        $("#pimage").show();        
        $('#image_id').val(res.image_id);  
      }
      $('#add_sub_test').find('.load10').hide();
     }    
   });
}