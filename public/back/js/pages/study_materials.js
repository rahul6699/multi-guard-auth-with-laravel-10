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

  var start = moment().subtract(29, 'days');
  var end = moment();
  function orderrangetimecb(start, end) {
    $('#orderrangetime span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    $('#ordertime').val(start.format('YYYY-MM-DD') + ' / ' + end.format('YYYY-MM-DD'));
  }

  $('#orderrangetime').daterangepicker({
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
 }, orderrangetimecb);

  orderrangetimecb(start, end);

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
      "url": BASE_URL+"admin/study_materials/study_materials_ajax_list",
      "type": "POST",
      "dataType": "json",
      "data": function(data){
        data.title= $('#title').val();
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
   {  "targets": 6 ,'orderable': false,},       

   ],
 });
  $('#datatable').on( 'page.dt', function () {
    $('#checkAll').prop("checked",false);
    $('.check').prop("checked",false);
  }); 

  window.order_table = $('#datatable1').DataTable({
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
      "url": BASE_URL+"admin/study_materials/study_materials_order_ajax_list",
      "type": "POST",
      "dataType": "json",
      "data": function(data){
        data.title= $('#title').val();
        data.status = $('#sreachStatus').val();
        data.date = $('#ordertime').val();
        data.is_rangepicker = $('#is_rangepicker').val();
      },
      "dataSrc": function (jsonData) {
       return jsonData.data;
     }
   },
   "columnDefs": [
   {  "targets": 0 ,"orderable": true,},
   {  "targets": 1 ,'orderable': false,},
   {  "targets": 2 ,'orderable': true,},
   {  "targets": 3 ,'orderable': true,},       
   {  "targets": 4 ,'orderable': true,},       
   {  "targets": 5 ,'orderable': false,},       
   {  "targets": 6 ,'orderable': true,},       
   {  "targets": 7 ,'orderable': true,},       
   {  "targets": 8 ,'orderable': false,},       
   {  "targets": 9 ,'orderable': false,},       
   ],
 });
  $('#datatable1').on( 'page.dt', function () {
    $('#checkAll').prop("checked",false);
    $('.check').prop("checked",false);
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

function study_materials_save(){
  $('#add_form .st_loader').show();
  $.ajax({  
   url :BASE_URL+"admin/study_materials/study_materials_save",  
   method:"POST",  
   dataType:"json",  
   data:$("#add_form").serialize(),
   success:function(res){ 
    if(res.status == 0){
     var err = JSON.parse(res.msg);
     var er = '';
     $.each(err, function(k, v) { 
      er += v+'<br>'; 
    }); 
     toastr.error(er,'Error');
   }else{
    toastr.success('Study Materials, Info Added Successfully','Success');
    $('#add_form')[0].reset();
    $('#add_form .modal-content').html('');
    window.location.href =BASE_URL+'admin/study_materials';
  }
  $('#add_form .st_loader').hide();
}  
}); 
}

function study_materials_update(){
  $('#study_materials_update .st_loader').show();
  $.ajax({  
   url :BASE_URL+"admin/study_materials/study_materials_update",  
   method:"POST",  
   dataType:"json",  
   data:$("#study_materials_update").serialize(),
   success:function(res){  
    if(res.status == 0){
     var err = JSON.parse(res.msg);
     var er = '';
     $.each(err, function(k, v) { 
      er += v+'<br>'; 
    }); 
     toastr.error(er,'Error');
   }else{
    toastr.success('Study Materials Info Updated Successfully','Success');
    window.location.href =BASE_URL+'admin/study_materials';
  }
  $('#study_materials_update .st_loader').hide();  
}
}); 
}

function upload_pdf(id){
  $('.load2').show();
  $.ajax({
    type: "POST",
    url: BASE_URL+'admin/study_materials/upload_pdf',
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
    url: BASE_URL+'admin/study_materials/upload_image',
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
function getSearchViewOrder(){
  $("#is_rangepicker").val(1);
  order_table.draw();
} 

function resetSearchView(){
  $('.filter').val('');
  table.draw();
}

function resetSearchViewOrder(){
  $("#is_rangepicker").val(0);
  order_table.draw();
}


function CheckAll(e){
 if($('#checkAll').prop("checked") == true){
  $('.check').prop("checked",true);
}else{
 $('.check').prop("checked",false);
}
}

function study_materials_delete(id){
  if(confirm("Are you sure, You want to delete this Study Materials ?")){
    $.ajax({
     url :BASE_URL+"admin/study_materials/study_materials_delete",
     method:"POST",
     dataType:"json",
     data:{id:id},
     success:function(res){
      if(res.status == 1){
        toastr.success('Study Materials  Deleted Successfully','Success');
        table.draw( false );
      }
    }
  });
  }
}


function selected_delete(){
  var count=0;
  $('.check').each(function() {
   if($(this).prop("checked") == true){
    count++;
  }
});
  if(count == 0){
   toastr.error('Please select atleat one Study Materials','Error');
 }else{
  if(confirm("Are you sure, You want to delete selected Study Materials ?")){
    $.ajax({
     url :BASE_URL+"admin/study_materials/study_materials_multiple_delete",
     method:"POST",
     dataType:"json",
     data:$("#study_materials").serialize(),
     success:function(res){
      if(res.status == 1){
        toastr.success('Study Materials Deleted Successfully','Success');
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


function display_upload(id){
  $('.load4').show();
  $.ajax({
    type: "POST",
    url: BASE_URL+'admin/study_materials/display_upload',
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

function brochure_upload_photo(id){
  $('.form_course').find('.load_b').show();
  $.ajax({
    type: "POST",
    url: BASE_URL+'admin/study_materials/featured_image',
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
      if(res.is_update == 'study_materials_update'){
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
    url: BASE_URL+'admin/study_materials/brocher_pdf',
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
     url :BASE_URL+"admin/study_materials/delete_ans_image",
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
    url: BASE_URL+'admin/study_materials/guide_file_uploads',
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

function study_materials_status (id,type){
  var status = 'Publish';
  if(type == 0){
    status = 'Unpublish';
  }
  if(confirm("Are you sure, You want to "+status+" this Study Materials ?")){
    $.ajax({
      url :BASE_URL+"admin/study_materials/study_materials_status",
      method:"POST",
      dataType:"json",
      data:{id:id,type:type},
      success:function(res){
        if(res.status == 1){
          toastr.success('Study Materials Status Changed Successfully','Success');
          table.draw( false );
        }
      }
    });
  }
}
function order_statusChange(id,e){
  var type = $(e).val(); 

  if(confirm("Are you sure, You want to status change ?")){
    $.ajax({
      url :BASE_URL+"admin/study_materials/user_order_status",
      method:"POST",
      dataType:"json",
      data:{id:id,type:type},
      success:function(res){
        if(res.status == 1){  
          if(res.mtype == 4){
            $('#modal-default .modal-content').html(res.view);
            $('#modal-default').modal('show');
          }else{
            toastr.success('Order Status Changed Successfully','Success');
            order_table.draw( false );
          }
        }
      }
    });
  }else{
    order_table.draw( false ); 
  }
}


// function order_statusChange(id,e){
//   // $('#modal-default .modal-content').html('harsh');
//   //           $('#modal-default').modal('show');
//            // return false;
//     var type = $(e).val();

//     if(confirm("Are you sure, You want to status change ?")){
//     $.ajax({
//       url :BASE_URL+"admin/study_materials/user_order_status",
//       method:"POST",
//       dataType:"json",
//       data:{id:id,type:type},
//       success:function(res){

//          $('#modal-default .modal-content').html(res.data);
//             $('#modal-default').modal('show');  
//       }
//     });
//   }
// }


function invoiceModal(orderid){
  var formData = new FormData();
  formData.append('orderid',orderid);
  $.ajax({
    url :BASE_URL+"admin/study_materials/order_invoice_recipt",
    method:"POST",
    data:  formData,
    contentType: false,
    cache: false,
    processData:false,
    dataType:'json',
    success:function(res){
      if(res.status==1){
        $('#orderInvoiceModal .modal-body .invoicePrintIframe').attr('src',res.url);
        $('#orderInvoiceModal .invoicePrintDownload').attr('href',res.url);
        $('#orderInvoiceModal').modal('show');
      }
    }
  });
}

function dispatched_save() {
  $.ajax({
    url : BASE_URL+"admin/study_materials/dispatched_save",
    method:"POST",
    dataType:"json",
    data:$("#dispatched_data").serialize(),
    success:function(res){
      if(res.status == 1){
        toastr.success('Order Status Changed Successfully','Success');
        $('#modal-default').modal('hide');
        $('#modal-default').modal({backdrop: 'static',keyboard: false });
        $('#modal-default .modal-content').html('');
        order_table.draw(false);
      }
      order_table.draw(false);
    }
  });
} 