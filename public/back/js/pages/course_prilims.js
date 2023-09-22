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
     url :BASE_URL+"admin/courses/prilims_course/quiz_save",  
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
      
      window.location.href =BASE_URL+'admin/courses/mains_course';
    }
    $('#add_daily_quiz .st_loader').hide();
  }  
}); 
  }
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

function  get_datetimepicker(){
  $('.datetimepicker').datetimepicker({
    format: "yyyy-mm-dd HH:ii P",
    showMeridian: true,
    autoclose: true,
    todayBtn: true
  });
}

function upload_quiz(e,id){
  $('.errMsg').html('');
  $('.load4').show();
  $.ajax({
    type: "POST",
    url: BASE_URL+'admin/courses/prilims_course/import_quiz',
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

function remove_question(e){
  $(e).parent().parent().parent().parent().parent().remove();
  reset_que_order();
}

function add_question(){
  $.ajax({  
    url :BASE_URL+"admin/courses/prilims_course/dummy_ques",  
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
  get_datetimepicker();
function  get_datetimepicker(){
  $('.datetimepicker').datetimepicker({
    format: "yyyy-mm-dd HH:ii P",
    showMeridian: true,
    autoclose: true,
    todayBtn: true
  });
}

function add_new_question(){
  $('#add_daily_quiz .st_loader').show();
  $.ajax({  
   url :BASE_URL+"admin/courses/prilims_course/add_new_question_save",  
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
    
    window.location.href =BASE_URL+'admin/courses/mains_course';
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
     url :BASE_URL+"admin/courses/prilims_course/quiz_update",  
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
      
      window.location.href =BASE_URL+'admin/courses/mains_course';
    }
    $('#add_quiz .st_loader').hide();
  }  
}); 
  }
}

