/*
 * Blackhole - updload images and provide URL
 */
$(function() {


'use strict';

$('#hole').on('paste', function(event) {
  if (event.originalEvent.clipboardData &&
      event.originalEvent.clipboardData.items &&
      event.originalEvent.clipboardData.items.length > 0)
  upload(event.originalEvent.clipboardData.items[0].getAsFile());
});
$('#hole').on('dragover', function(event) {
  event.preventDefault();
  event.stopPropagation();
});
$('#hole').on('dragleave', function(event) {
  event.preventDefault();
  event.stopPropagation();
});
$('#hole').on('drop', function(event) {
  event.preventDefault();
  event.stopPropagation();

  if (event.originalEvent.dataTransfer) {
    if(event.originalEvent.dataTransfer.files.length) {
      upload(event.originalEvent.dataTransfer.files[0]);
    }
  }
});

function upload(file) {
  var formData = new FormData();
  formData.append('file', file);

  $.ajax({
    url: location.origin + '/upload',
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function(response) {
      prompt("Link to uploaded file:", response.url);
    },
    error: function(jqXHR, textStatus, errorMessage) {
      alert(errorMessage);
      console.log(errorMessage); // Optional
    }
  });


}



});