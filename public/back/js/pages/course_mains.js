$(document).ready(function() { 

  get_datetimepicker();

  $('.select2').select2();
 
  $('#display_type').on('change', function() {
   $('#disp_img_id').hide();
   $('#disp_video_id').hide();
   var disp_hide= this.value;
   if(disp_hide==3){
    $('.upload-col').hide();
    $('.url-col').show();
  }else{
    $('.url-col').hide();
    $('.upload-col').show();
  }
})
  
  $(".price").keypress(function (e) {
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
      event.preventDefault();
    }
  });

  $('.select2').select2();

   var ext_name = $('#ext_name').val();
   if(ext_name == 'mp4' || ext_name == 'webm' || ext_name == 'ogg'){
    $('#disp_video_id').show();
  }else{
    $('#disp_img_id').show();
  }

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
      "url": BASE_URL+"admin/courses/mains_course/course_mains_ajax_list",
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
   {  "targets": 1 ,"orderable": true,},
   {  "targets": 2 ,'orderable': false,},
   {  "targets": 3 ,'orderable': false,},
   {  "targets": 4 ,'orderable': true,},       
   {  "targets": 5 ,'orderable': true,},       
   {  "targets": 5 ,'orderable': false,},       
   {  "targets": 5 ,'orderable': false,},       
   ],
 });



  $('#datatable').on( 'page.dt', function () {
    $('#checkAll').prop("checked",false);
    $('.course_check').prop("checked",false);
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
      "url": BASE_URL+"admin/courses/mains_course/question_ajax_list",
      "type": "POST",
      "dataType": "json",
      "data": function(data){
       data.course_id= $('#course_id').val();
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

window.table_question_123 = $('#datatable_package123').DataTable({
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
      "url": BASE_URL+"admin/courses/prilims_course/course_prilims_ajax_list",
      "type": "POST",
      "dataType": "json",
      "data": function(data){
        data.id= $('#course_id').val();
      },
      "dataSrc": function (jsonData) {
       return jsonData.data;
     }
   },
   "columnDefs": [
   {  "targets": 0 ,'orderable': true,},
   {  "targets": 1,"orderable": true,},
   {  "targets": 2,'orderable': false,},
   {  "targets": 3 ,'orderable': false,},
   {  "targets": 4 ,'orderable': false,},
   {  "targets": 5 ,'orderable': false,},
   
   
   ],
 });


window.datatable_test_series_mains = $('#datatable_test_series_mains').DataTable({
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
      "url": BASE_URL+"admin/courses/mains_course/test_series_mains_ajax_list",
      "type": "POST",
      "dataType": "json",
      "data": function(data){
        data.id= $('#course_id').val();
      },
      "dataSrc": function (jsonData) {
        return jsonData.data;
      }
    },
    "columnDefs": [
    {  "targets": 0 ,'orderable': true,},
    {  "targets": 1 ,"orderable": false,},
    {  "targets": 2 ,"orderable": false,},
    ],
 });

window.datatable_test_series_prelims = $('#datatable_test_series_prelims').DataTable({
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
      "url": BASE_URL+"admin/courses/mains_course/test_series_prelims_ajax_list",
      "type": "POST",
      "dataType": "json",
      "data": function(data){
        data.id= $('#course_id').val();
      },
      "dataSrc": function (jsonData) {
        return jsonData.data;
      }
    },
    "columnDefs": [
    {  "targets": 0 ,'orderable': true,},
    {  "targets": 1 ,"orderable": false,},
    {  "targets": 2 ,"orderable": false,},
    ],
 });

 window.datatable_study_materials = $('#datatable_study_materials').DataTable({
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
      "url": BASE_URL+"admin/courses/mains_course/study_materials_ajax_list",
      "type": "POST",
      "dataType": "json",
      "data": function(data){
        data.id= $('#course_id').val();
      },
      "dataSrc": function (jsonData) {
        return jsonData.data;
      }
    },
    "columnDefs": [
    {  "targets": 0 ,'orderable': true,},
    {  "targets": 1 ,"orderable": false,},


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

function mains_course_save(){
  $('#add_mains .st_loader').show();
  $.ajax({  
   url :BASE_URL+"admin/courses/mains_course/mians_course_save",  
   method:"POST",  
   dataType:"json",  
   data:$("#add_mains").serialize(),
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
    $('#add_mains')[0].reset();
    $('#add_mains .modal-content').html('');
    window.location.href =BASE_URL+'admin/courses/mains_course';
  }
  $('#add_mains .st_loader').hide();
}  
}); 
}

function course_mains_update(){
  $('#course_mains_update .st_loader').show();
  $.ajax({  
   url :BASE_URL+"admin/courses/mains_course/course_mains_update",  
   method:"POST",  
   dataType:"json",  
   data:$("#course_mains_update").serialize(),
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
    window.location.href =BASE_URL+'admin/courses/mains_course';
  }
  $('#course_mains_update .st_loader').hide();
  
}

}); 
}

function upload_pdf(id){
  $('.load2').show();
  $.ajax({
    type: "POST",
    url: BASE_URL+'admin/courses/mains_course/upload_pdf',
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
        $('#simage').html('<a href='+res.image_data+' download>Download</a>');
        $('#simage').show();        
        $('#file_id').val(res.image_id);  
      }
      $('.load2').hide();
    }
  });
}

function upload_photo(id){
  $('.load3').show();
  $.ajax({
    type: "POST",
    url: BASE_URL+'admin/courses/mains_course/upload_image',
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

function getSearchView(){
  table.draw();
} 

function resetSearchView(){
  $('.filter').val('');
  table.draw();
}

function CheckAll(e){
 if($('#checkAll').prop("checked") == true){
  $('.course_check').prop("checked",true);
}else{
 $('.course_check').prop("checked",false);
}
}

function course_mains_delete(id){
  if(confirm("Are you sure, You want to delete this Course Mains ?")){
    $.ajax({
     url :BASE_URL+"admin/courses/mains_course/course_mains_delete",
     method:"POST",
     dataType:"json",
     data:{id:id},
     success:function(res){
      if(res.status == 1){
        toastr.success('Course Mains  Deleted Successfully','Success');
        table.draw( false );
      }
    }
  });
  }
}


function selected_delete(){
  var count=0;
  $('.course_check').each(function() {
   if($(this).prop("checked") == true){
    count++;
  }
});
  if(count == 0){
   toastr.error('Please select atleat one Courses','Error');
 }else{
  if(confirm("Are you sure, You want to delete selected Courses ?")){
    $.ajax({
     url :BASE_URL+"admin/courses/mains_course/course_multiple_delete",
     method:"POST",
     dataType:"json",
     data:$("#mains_table").serialize(),
     success:function(res){
      if(res.status == 1){
        toastr.success('Courses Deleted Successfully','Success');
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

function course_mains_status(id,type){
  var status = 'Publish';
  if(type == 0){
    status = 'Unpublish';
  }
  if(confirm("Are you sure, You want to "+status+" this Mains Course ?")){
    $.ajax({
     url :BASE_URL+"admin/courses/mains_course/course_mains_status",
     method:"POST",
     dataType:"json",
     data:{id:id,type:type},
     success:function(res){
      if(res.status == 1){
        toastr.success('Mains Course Status Changed Successfully','Success');
        table.draw( false );
      }
    }
  });
  }
}

function question_save(){
  $('#add_mains_ques .st_loader').show();
  $.ajax({  
   url :BASE_URL+"admin/courses/mains_course/question_save",  
   method:"POST",  
   dataType:"json",  
   data:$("#add_mains_ques").serialize(),
   success:function(res){  
    if(res.status == 0){
     var err = JSON.parse(res.msg);
     var er = '';
     $.each(err, function(k, v) { 
      er += v+'<br>'; 
    }); 
     toastr.error(er,'Error');
   }else{
    toastr.success('Mains Course, Info Added Successfully','Success');
    $('#add_mains_ques')[0].reset();
    $('#add_mains_ques .modal-content').html('');
    window.location.href =BASE_URL+'admin/courses/mains_course';
  }
  $('#add_mains_ques .st_loader').hide();
}  
}); 
}

function question_update(){
  $('#add_ques_update .st_loader').show();
  $.ajax({  
   url :BASE_URL+"admin/courses/mains_course/question_update",  
   method:"POST",  
   dataType:"json",  
   data:$("#add_ques_update").serialize(),
   success:function(res){  
    if(res.status == 0){
     var err = JSON.parse(res.msg);
     var er = '';
     $.each(err, function(k, v) { 
      er += v+'<br>'; 
    }); 
     toastr.error(er,'Error');
   }else{
    toastr.success('Question, Info Added Successfully','Success');
    $('#add_ques_update')[0].reset();
    window.location.href =BASE_URL+'admin/courses/mains_course/mains_course_view/'+res.id;
  }
  $('#add_ques_update .st_loader').hide();
}  
}); 
}

function question_delete(id){

 if(confirm("Are you sure, You want to delete this Question ?")){
   $.ajax({
    url :BASE_URL+"admin/courses/mains_course/question_delete",
    method:"POST",
    dataType:"json",
    data:{id:id},
    success:function(res){
     if(res.status == 1){
       toastr.success('Question Deleted Successfully','Success');
       table_question.draw( false );
     }
   }
 });
 }
}

function mains_ques_status(id,type){
 var status = 'Publish';
 if(type == 0){
   status = 'Unpublish';
 }
 if(confirm("Are you sure, You want to "+status+" this Mains Question ?")){
   $.ajax({
    url :BASE_URL+"admin/courses/mains_course/mains_ques_status",
    method:"POST",
    dataType:"json",
    data:{id:id,type:type},
    success:function(res){
     if(res.status == 1){
       toastr.success('Mains Question Status Changed Successfully','Success');
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
   url :BASE_URL+"admin/courses/mains_course/answer_reply_save",
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
     location.reload();
     $('.answerReActivity2_'+answer_id).html('');
     $('.answerReActivity2_'+answer_id).html(res.answer);
   }
   $('.st_loader').hide();    
 }

}); 
}

function answerLike(course_id,answer_id,e){
 var is_user_login = is_admin_login;
 if(is_user_login!=''){
   $.ajax({
    url :BASE_URL+"admin/courses/mains_course/answerLike",
    method:"POST",
    dataType:"json",
    data:{course_id:course_id,answer_id:answer_id},
    success:function(res){
      var like_lable = ''; 
      $(e).attr('class','');
      if(res.success==0){
        $(e).addClass('text-dark text-sm mr-2'); 
        like_lable +='<i class="fa fa-thumbs-up" aria-hidden="true"></i>';
      }else{
        $(e).addClass('text-primary text-sm mr-2');  
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

function mainsAnswerReplyLike(course_id,answer_id,answer_reply_id,e){
 var is_user_login = is_admin_login;
 if(is_user_login!=''){
   $.ajax({
    url :BASE_URL+"admin/courses/mains_course/answerReplyLike",
    method:"POST",
    dataType:"json",
    data:{course_id:course_id,answer_id:answer_id,'answer_reply_id':answer_reply_id},
    success:function(res){

      var like_lable = ''; 
      $(e).attr('class','');
      if(res.success==0){
        $(e).addClass('text-dark text-sm mr-2 text-dark');
        like_lable +='<i class="fa fa-thumbs-up" aria-hidden="true"></i>';
      }else{
        $(e).addClass('text-primary text-sm mr-2');  
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

function display_upload(id){
  $('.load4').show();
  $.ajax({
    type: "POST",
    url: BASE_URL+'admin/courses/mains_course/display_upload',
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

function addMoreSchedule(e,id){
  $(e).html('<i class="fa-btn-loader fa fa-refresh fa-spin fa-1x fa-fw"></i>');
  $.ajax({  
    url :BASE_URL+"admin/courses/mains_course/add_more_schedule",
    method:"POST", 
    data:$("#"+id).serialize(),
    success:function(res){  
      $('.addMoreSchedule').append(res);
      $(e).html('<i class="fa fa-plus" aria-hidden="true"></i>'); 
    }
  });
}

function removeMoreSchedule(e){
 $(e).parent().parent().parent().remove();
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

function brochure_upload_photo(id){
  $('.form_course').find('.load_b').show();
  $.ajax({
    type: "POST",
    url: BASE_URL+'admin/courses/mains_course/featured_image',
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
      if(res.is_update == 'course_mains_update'){
        $('#'+id).find('.multiple_simages').append(res.img_data);
      }else{
        $('#'+id).find('.multiple_simages').html(res.img_data);
      }
      $('#'+id).find('.pimage_code').val(res.pimage_code);
      $('#'+id).find('.multiple_simages').show();
      $('#'+id).find('.is_pimage').val(1);
      $('.form_course').find('.load_b').hide();
    }
    $('.form_course').find('.load_b').hide();
  }
});
}

function brocher_pdf(id){
  $('.load5').show();
  $.ajax({
    type: "POST",
    url: BASE_URL+'admin/courses/mains_course/brocher_pdf',
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
        $('#brochure_pdf').attr('href',res.image_data);
        $('#brochure_pdf').show();        
        $('#brochurepdf_id').val(res.image_id);  
      }
      $('.load5').hide();
    }
  });
}

function remove_img(e,id,img_id=''){
  if(confirm("Are you sure, You want to delete this image ?")){
    $.ajax({
     url :BASE_URL+"admin/courses/mains_course/delete_ans_image",
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
     if(res.count > 0){
       $('#is_pimage').val(res.count);
     }else{
       $('#is_pimage').val('');
     }
   }
 });
  }
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

function new_uploads(id,num){
  var formData = new FormData ($("#"+id)[0])
  $('.guid_loader'+num).show();
  formData.append("num", num);
  $.ajax({
    type: "POST",
    url: BASE_URL+'admin/courses/mains_course/guide_file_uploads',
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

 function test_status_quiz(id,type){
  var status = 'Publish';
  if(type == 0){
    status = 'Unpublish';
  }
  if(confirm("Are you sure, You want to "+status+" this Prelims Quiz Status ?")){
    $.ajax({
     url :BASE_URL+"admin/courses/prilims_course/test_status_quiz",
     method:"POST",
     dataType:"json",
     data:{id:id,type:type},
     success:function(res){
      if(res.status == 1){
        toastr.success('Prelims Quiz Status Changed Successfully','Success');
        table_question_123.draw( true );
      }
    }
  });
  }
}

function quiz_delete(id){
  if(confirm("Are you sure, You want to delete this Course quiz ?")){
    $.ajax({
     url :BASE_URL+"admin/courses/prilims_course/quiz_delete",
     method:"POST",
     dataType:"json",
     data:{id:id},
     success:function(res){
      if(res.status == 1){
        toastr.success('Course quiz Deleted Successfully','Success');
        table_question_123.draw( false );
      }
    }
  });
  }
}


 function syllabus_status(id,type){
    var status = 'Publish';
    if(type == 0){
      status = 'Unpublish';
    }
    if(confirm("Are you sure, You want to "+status+" this Course Syllabus ?")){
      $.ajax({
        url :BASE_URL+"admin/courses/syllabus_course/syllabus_status",
        method:"POST",
        dataType:"json",
        data:{id:id,type:type},
        success:function(res){
          if(res.status == 1){
            toastr.success('Course Syllabus Status Changed Successfully','Success');
            datatable_syllabus.draw( false );
          }
        }
      });
    }
  }


  function syllabus_delete(id){
    if(confirm("Are you sure, You want to delete this Course Syllabus ?")){
      $.ajax({
        url :BASE_URL+"admin/courses/syllabus_course/syllabus_delete",
        method:"POST",
        dataType:"json",
        data:{id:id},
        success:function(res){
          if(res.status == 1){
            toastr.success('Course Syllabus Deleted Successfully','Success');
            datatable_syllabus.draw( false );
          }
        }
      });
    }
  }  

  function course_mains_items_delete(id){
    if(confirm("Are you sure, You want to delete this Course Item ?")){
      $.ajax({
        url :BASE_URL+"admin/courses/mains_course/course_items_delete",
        method:"POST",
        dataType:"json",
        data:{id:id},
        success:function(res){
          if(res.status == 1){
            toastr.success('Course Item Deleted Successfully','Success');
            get_mains_packages();
            datatable_test_series_mains.draw( false );
          }
        }
      });
    }
  }  

  function course_prelims_items_delete(id){
    if(confirm("Are you sure, You want to delete this Course Item ?")){
      $.ajax({
        url :BASE_URL+"admin/courses/mains_course/course_items_delete",
        method:"POST",
        dataType:"json",
        data:{id:id},
        success:function(res){
          if(res.status == 1){
            toastr.success('Course Item Deleted Successfully','Success');
            get_prilims_packages();
            datatable_test_series_prelims.draw( false );
          }
        }
      });
    }
  }  

  function new_courses_mains_add(e){
    if(confirm("Are you sure, You want to Add this Test Series Mains ?")){
      $.ajax({
        url :BASE_URL+"admin/courses/mains_course/new_courses_item_add",
        method:"POST",
        dataType:"json",
        data:$(e).serialize(),
        success:function(res){
          if(res.status == 0){
            var err = JSON.parse(res.msg);
            var er = '';
            $.each(err, function(k, v) { 
              er = ' * ' + v; 
              toastr.error(er,'Error');
            });
          }else if(res.status == 1){
            toastr.success(res.msg,'Success');
            get_mains_packages();
            datatable_test_series_mains.draw( false );
          }else if(res.status == 2){
            toastr.error(res.msg,'Error');
          }
        }
      });
    }
  }  

  function new_courses_prelims_add(e){
    if(confirm("Are you sure, You want to Add this Test Series Prelims ?")){
      $.ajax({
        url :BASE_URL+"admin/courses/mains_course/new_courses_item_add",
        method:"POST",
        dataType:"json",
        data:$(e).serialize(),
        success:function(res){
          if(res.status == 0){
            var err = JSON.parse(res.msg);
            var er = '';
            $.each(err, function(k, v) { 
              er = ' * ' + v; 
              toastr.error(er,'Error');
            });
          }else if(res.status == 1){
            toastr.success(res.msg,'Success');
            get_prilims_packages();
            datatable_test_series_prelims.draw( false );
          }else if(res.status == 2){
            toastr.error(res.msg,'Error');
          }
        }
      });
    }
  }  

  function course_study_materials_items_delete(id){
    if(confirm("Are you sure, You want to delete this Course Item ?")){
      $.ajax({
        url :BASE_URL+"admin/courses/mains_course/course_items_delete",
        method:"POST",
        dataType:"json",
        data:{id:id},
        success:function(res){
          if(res.status == 1){
            toastr.success('Course Item Deleted Successfully','Success');
            get_study_materials();
            datatable_study_materials.draw( false );
          }
        }
      });
    }
  }

  function new_courses_study_materials_add(e){
    if(confirm("Are you sure, You want to Add this Study Materials ?")){
      $.ajax({
        url :BASE_URL+"admin/courses/mains_course/new_courses_item_add",
        method:"POST",
        dataType:"json",
        data:$(e).serialize(),
        success:function(res){
          if(res.status == 0){
            var err = JSON.parse(res.msg);
            var er = '';
            $.each(err, function(k, v) { 
              er = ' * ' + v; 
              toastr.error(er,'Error');
            });
          }else if(res.status == 1){
            toastr.success(res.msg,'Success');
            get_study_materials();
            datatable_study_materials.draw( false );
          }else if(res.status == 2){
            toastr.error(res.msg,'Error');
          }
        }
      });
    }
  }

  function get_study_materials(e){
    var course_id = $('#course_id').val();
    $.ajax({
      url :BASE_URL+"admin/courses/mains_course/get_study_materials",
      method:"POST",
      dataType:"json",
      data:{'course_id':course_id},
      success:function(res){
        $('#study_materials_add_form').html('');
        $('#study_materials_add_form').html(res);
      }
    });
  }  

  function get_prilims_packages(e){
    var course_id = $('#course_id').val();
    $.ajax({
      url :BASE_URL+"admin/courses/mains_course/get_prilims_packages",
      method:"POST",
      dataType:"json",
      data:{'course_id':course_id},
      success:function(res){
        $('#prilims_packages_add_form').html('');
        $('#prilims_packages_add_form').html(res);
      }
    });
  }  

  function get_mains_packages(e){
    var course_id = $('#course_id').val();
    $.ajax({
      url :BASE_URL+"admin/courses/mains_course/get_mains_packages",
      method:"POST",
      dataType:"json",
      data:{'course_id':course_id},
      success:function(res){
        $('#mains_packages_add_form').html('');
        $('#mains_packages_add_form').html(res);
      }
    });
  }

