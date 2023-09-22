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
  
  allowno();
  $(".price").keypress(function (e) {
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
      event.preventDefault();
    }
  }); 
  $('.price').on('paste',function (e){
    if (e.originalEvent.clipboardData.getData('Text').match(/[^\d]/)) {
      e.preventDefault();
    }
  });
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
      "url": BASE_URL+"admin/test_series/prilims_package/test_series_ajax_list",
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

  window.table_quiz = $('#datatable_quiz').DataTable({
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
      "url": BASE_URL+"admin/daily_quiz/daily_quiz_ajax_list",
      "type": "POST",
      "dataType": "json",
      "data": function(data){
        data.Name= $('#materialName').val();
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
   {  "targets": 2,'orderable': true,},
   {  "targets": 3,'orderable': true,},
   {  "targets": 4 ,'orderable': true,},
   {  "targets": 5 ,'orderable': false,},     
   ],
 });

  
  $('#datatable_quiz').on( 'page.dt', function () {
    $('#checkAll').prop("checked",false);
    $('.daily_quiz_check').prop("checked",false);
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
      "url": BASE_URL+"admin/test_series/prilims_package/test_package_ajax_list",
      "type": "POST",
      "dataType": "json",
      "data": function(data){
        data.id= $('#packageID').val();
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
});

function  get_datetimepicker(){
  $('.datetimepicker').datetimepicker({
    format: "yyyy-mm-dd HH:ii P",
    showMeridian: true,
    autoclose: true,
    todayBtn: true
  });
}

function allowno(){
  $(".allowno").keypress(function (e) {
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
      event.preventDefault();
    }
  });

}

function test_save(){
  $('#add_sub_test .st_loader').show();
  $.ajax({  
   url :BASE_URL+"admin/test_series/prilims_package/test_save",  
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
          window.location.href =BASE_URL+'admin/test_series/prilims_package/add_quiz/'+res.pid;
        }
        $('#add_sub_test .st_loader').hide();
      }  
    }); 
}

function test_sub_update(){
  $('#test_sub .st_loader').show();
  $.ajax({  
   url :BASE_URL+"admin/test_series/prilims_package/test_sub_update",  
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
    toastr.success('Prelim Package Info Updated Successfully','Success');
    $('#modal-default').modal('hide');
    $('#modal-default .modal-content').html('');
    window.location.href =BASE_URL+'admin/test_series/prilims_package';
  }
  $('#test_sub .st_loader').hide();
  
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

function test_delete(id){
  if(confirm("Are you sure, You want to delete this Test Series ?")){
    $.ajax({
     url :BASE_URL+"admin/test_series/prilims_package/test_delete",
     method:"POST",
     dataType:"json",
     data:{id:id},
     success:function(res){
      if(res.status == 1){
        toastr.success('Test Series Deleted Successfully','Success');
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
   toastr.error('Please select atleat one Test Series','Error');
 }else{
  if(confirm("Are you sure, You want to delete selected Test Series ?")){
    $.ajax({
     url :BASE_URL+"admin/test_series/prilims_package/test_multiple_delete",
     method:"POST",
     dataType:"json",
     data:$("#buyer_table").serialize(),
     success:function(res){
      if(res.status == 1){
        toastr.success('Test Series Deleted Successfully','Success');
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

function test_status(id,type){
  var status = 'Publish';
  if(type == 0){
    status = 'Unpublish';
  }
  if(confirm("Are you sure, You want to "+status+" this Test Status ?")){
    $.ajax({
     url :BASE_URL+"admin/test_series/prilims_package/test_status",
     method:"POST",
     dataType:"json",
     data:{id:id,type:type},
     success:function(res){
      if(res.status == 1){
        toastr.success('Test Status Changed Successfully','Success');
        table.draw( false );
      }
    }
  });
  }
}

function quiz_delete(id){
  if(confirm("Are you sure, You want to delete this Test Series ?")){
    $.ajax({
     url :BASE_URL+"admin/test_series/prilims_package/quiz_delete",
     method:"POST",
     dataType:"json",
     data:{id:id},
     success:function(res){
      if(res.status == 1){
        toastr.success('Test Series Deleted Successfully','Success');
        table.draw( false );
      }
    }
  });
  }
}

function add_question(){

  $.ajax({  
    url :BASE_URL+"admin/test_series/prilims_package/dummy_ques",  
    method:"POST",  
    data:{},
    success:function(res){  
      var que= res;
      var question_count= $('#question_count').val();
      question_count++;
      $('#question_count').val(question_count);
      var new_html='<div class="question_card card" id="card_'+question_count+'">'+que+'</div>'; 
      $('#question_box').append(new_html);
      reset_que_order();
      allowno();
    }  
  });
}  

function remove_question(e){
  $(e).parent().parent().parent().parent().parent().remove();
  reset_que_order();
}

function reset_que_order(){
  var count=1;
  $('.question_card .que_no').each(function(){
    $(this).text(count);
    count++;
  });

}

function quiz_save(){
  var err=0;
  var total_que= $('#add_daily_quiz .question_card').length;
  if(total_que < 2){
    toastr.error('Please add minimum 5 questions','Error');
    err++;
    return false;
  }
  
  if(err == 0){
    $('#add_daily_quiz .st_loader').show();
    $.ajax({  
     url :BASE_URL+"admin/test_series/prilims_package/quiz_save",  
     method:"POST",  
     dataType:"json",  
     data:$("#add_daily_quiz").serialize(),
     success:function(res){  
      if(res.status == 0){
       var err = JSON.parse(res.msg);
       var er = '';
       $.each(err, function(k, v) { 
        er += v+'<br>'; 
      }); 
       toastr.error(er,'Error');
     }else{
      toastr.success('Daily Quiz Added Successfully','Success');
      $('#add_daily_quiz')[0].reset();
      
      window.location.href =BASE_URL+'admin/test_series/prilims_package';
    }
    $('#add_daily_quiz .st_loader').hide();
  }  
}); 
  }
}

function add_more(){

 var question_count= $('#question_count').val();
 question_count++;
 var count = $('#question_count').val(question_count);
 $.ajax({  
  url :BASE_URL+"admin/test_series/prilims_package/dummy_ques",  
  method:"POST",  
  data:{count:count},
  success:function(res){  
    var x =res.html();
  }  
});
}

function add_new_question(){
  $('#add_daily_quiz .st_loader').show();
  $.ajax({  
   url :BASE_URL+"admin/test_series/prilims_package/add_new_question_save",  
   method:"POST",  
   dataType:"json",  
   data:$("#add_daily_quiz").serialize(),
   success:function(res){  
    if(res.status == 0){
     var err = JSON.parse(res.msg);
     var er = '';
     $.each(err, function(k, v) { 
      er += v+'<br>'; 
    }); 
     toastr.error(er,'Error');
   }else{
    toastr.success('Daily Quiz Added Successfully','Success');
    $('#add_daily_quiz')[0].reset();
    
    window.location.href =BASE_URL+'admin/test_series/prilims_package';
  }
  $('#add_daily_quiz .st_loader').hide();
}  
}); 
}

function quiz_update(){
  var err=0;
  var total_que= $('#add_quiz .question_card').length;
  if(total_que < 1){
    toastr.error('Please add minimum 1 questions','Error');
    err++;
    return false;
  }
  
  if(err == 0){
    $('#add_quiz .st_loader').show();
    $.ajax({  
     url :BASE_URL+"admin/test_series/prilims_package/quiz_update",  
     method:"POST",  
     dataType:"json",  
     data:$("#add_quiz").serialize(),
     success:function(res){  
      if(res.status == 0){
       var err = JSON.parse(res.msg);
       var er = '';
       $.each(err, function(k, v) { 
        er += v+'<br>'; 
      }); 
       toastr.error(er,'Error');
     }else{
      toastr.success('Prelims Quiz  Added Successfully','Success');
      $('#add_quiz')[0].reset();
      
      window.location.href =BASE_URL+'admin/test_series/prilims_package';
    }
    $('#add_quiz .st_loader').hide();
  }  
}); 
  }
}

function daily_quiz_status(id,type){
  var status = 'Publish';
  if(type == 0){
    status = 'Unpublish';
  }
  if(confirm("Are you sure, You want to "+status+" this Daily quiz ?")){
    $.ajax({
     url :BASE_URL+"admin/daily_quiz/daily_quiz_status",
     method:"POST",
     dataType:"json",
     data:{id:id,type:type},
     success:function(res){
      if(res.status == 1){
        toastr.success('Daily quiz Status Changed Successfully','Success');
        table_quiz.draw( false );
      }
    }
  });
  }
}

function daily_quiz_delete(id){
  if(confirm("Are you sure, You want to delete this Daily quiz ?")){
    $.ajax({
     url :BASE_URL+"admin/daily_quiz/daily_quiz_delete",
     method:"POST",
     dataType:"json",
     data:{id:id},
     success:function(res){
      if(res.status == 1){
        toastr.success('Daily quiz Deleted Successfully','Success');
        table_quiz.draw( false );
      }
    }
  });
  }
}

function daily_quiz_view(id){
  $.ajax({
   url :BASE_URL+"admin/daily_quiz/daily_quiz_view",
   method:"POST",
   data:{id:id},
   success:function(res){
    $('#modal-default .modal-content').html(res);
    $('#modal-default').modal('show');
  }
}); 
}  

function selected_delete_quiz(){
  var count=0;
  $('.daily_quiz_check').each(function() {
   if($(this).prop("checked") == true){
    count++;
  }
});
  if(count == 0){
   toastr.error('Please select atleat one Daily quiz','Error');
 }else{
  if(confirm("Are you sure, You want to delete selected Daily quiz ?")){
    $.ajax({
     url :BASE_URL+"admin/daily_quiz/daily_quiz_multiple_delete",
     method:"POST",
     dataType:"json",
     data:$("#daily_quiz_table").serialize(),
     success:function(res){
      if(res.status == 1){
        toastr.success('Daily quiz Deleted Successfully','Success');
        table_quiz.draw();
        $('#checkAll').prop("checked",false);
      }else{
        toastr.error('Something went wrong !','Error');
      }
    }
  });
  }
}
}

function getSearchViewQuiz(){
  table_quiz.draw();
} 

function resetSearchViewQuiz(){
 $('.filter').val('');
 table_quiz.draw();
}

function CheckAllQuiz(e){
 if($('#checkAllQuiz').prop("checked") == true){
  $('.daily_quiz_check').prop("checked",true);
}else{
 $('.daily_quiz_check').prop("checked",false);
}
}

function tnymce_tinymcetextarea1(){
  tinymce.init({
    selector:'.tinymcetextarea1',
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
}  


function test_view(id){
  $.ajax({
    url :BASE_URL+"admin/test_series/prilims_package/test_view",
    method:"POST",
    data:{id:id},
    success:function(res){
      $('#wrapper-testseries').html(res);
    }
  });
  
}

function getTableData(){
  table_question_123.table(false);
}

function display_upload(id){
  $('.load4').show();
  $.ajax({
    type: "POST",
    url: BASE_URL+'admin/test_series/prilims_package/display_upload',
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

function upload_photo(id){
  $('.load3').show();
  $.ajax({
    type: "POST",
    url: BASE_URL+'admin/test_series/prilims_package/package_image_data',
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
       $('#simage').attr('src',res.file_data);
       $('#simage').show();        
       $('#image_id').val(res.file_id);  
     }
     $('.load3').hide();
   }
 });
}

function addMoreSchedule(e,id){
  $(e).html('<i class="fa-btn-loader fa fa-refresh fa-spin fa-1x fa-fw"></i>');
  $.ajax({  
    url :BASE_URL+"admin/test_series/prilims_package/add_more_schedule",
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


function upload_quiz(e,id){
  $('.errMsg').html('');
  $('.load4').show();
  $.ajax({
    type: "POST",
    url: BASE_URL+'admin/test_series/prilims_package/import_quiz',
    data: new FormData($("#"+id)[0]),
    processData:false,
    contentType:false,
    cache:false,
    datatype:"json",
    success: function(res)
    {  
      var r = JSON.parse(res)

      $('.load4').hide();
      $(e).val('');
      if(r.status == 0){
        var err = r.data;
        var er = '';
        $.each(err, function(k, v) {
         $('#'+k).html(''+v);
       });
      }else if(r.status == 2){ 
        if(r.success > 0){
          toastr.success(r.success+" Data Inserted","Success");
        }
        var err = JSON.parse(r.data);
        var er = '';
        $.each(err, function(k, v) { 
          er += "Row No "+k+"-"+v+'<br>'; 
        }); 
        toastr.error(er,'Error');

            //$('#question_box').html(res.qlist);
            var card1 = $('#card_1').find(".question1").val();
            // alert(card1);
            if(card1==''){
              $('#card_1').html('');
            }
            var new_html= r.qlist;
            //var new_html='<div class="question_card card" id="card_'+question_count+'">'+que+'</div>';
            $('#question_box').html(new_html);
            var que_count = $('#que_count').val();
            $('#question_count').val(que_count);
            reset_que_order();
            allowno();

          }else{
            toastr.success(r.success+" Data Inserted","Success");  
            var card1 = $('#card_1').find(".question1").val();
            // alert(card1);
            if(card1==''){
              $('#card_1').html('');
            }
            var new_html= r.qlist;
            $('#question_box').html(new_html);
            var que_count = $('#que_count').val();
            $('#question_count').val(que_count);
            reset_que_order();
            allowno();      
          }
        }
      });  
}

function brochure_upload_photo(id){
   $('.form_prelims').find('.load_b').show();
  $.ajax({
    type: "POST",
    url: BASE_URL+'admin/test_series/prilims_package/featured_image',
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
      $('#'+id).find('.is_pimage').val(1);
    }
   $('.form_prelims').find('.load_b').hide();
  }
});
}

function brocher_pdf(id){
  $('.load5').show();
  $.ajax({
    type: "POST",
    url: BASE_URL+'admin/test_series/prilims_package/brocher_pdf',
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
        $('#brochuer_pdf').html('<a href='+res.image_data+' download>Download</a>');
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
     url :BASE_URL+"admin/test_series/prilims_package/delete_ans_image",
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


function test_status_quiz(id,type){
  var status = 'Publish';
  if(type == 0){
    status = 'Unpublish';
  }
  if(confirm("Are you sure, You want to "+status+" this Prelims Quiz Status ?")){
    $.ajax({
     url :BASE_URL+"admin/test_series/prilims_package/test_status_quiz",
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

function myfunctionchange(load='')
{
  var bid = $('#f_batch_comments').val();
  var pid = $('#post_id').val();
  var type = $('#post_type').val();
  var userID = '';
  if(load!=''){
    userID = $('#userID').val();
  }
  $.ajax({  
   url :BASE_URL+"admin/test_series/prilims_package/f_batch_comments",  
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
   url :BASE_URL+"admin/test_series/prilims_package/get_search_comments_data",  
   method:"POST",  
   dataType:"json",  
   data:$("#get_search_comments_data").serialize(),
   success:function(res){
       if(res.type=='prelims_course') {
      $('#comments1').html(res.comments);
    }else{
       $('#comments').html(res.comments);
      }  
    }
    });
}

function new_uploads(id,num){
  var formData = new FormData ($("#"+id)[0])
  $('.guid_loader'+num).show();
  formData.append("num", num);
  $.ajax({
    type: "POST",
    url: BASE_URL+'admin/test_series/prilims_package/guide_file_uploads',
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

