// set unique id to videoplayer for the Webflow video element
var src = $('#claire-action').children('iframe').attr('src');

// when object with class open-popup is clicked...
$('#button-watch').click(function(e) {
  e.preventDefault();

  // change the src value of the video
  $('#claire-action').children('iframe').attr('src', src);
  $('.watch_in_action').css({'display': 'flex'}).fadeIn();
});

// when object with class close-popup is clicked...
$('.action_close').click(function(e) {
  e.preventDefault();
  $('#claire-action').children('iframe').attr('src', '');
  $('.watch_in_action').css({'display': 'none'}).fadeOut();
});