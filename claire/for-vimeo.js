// JavaScript
document.getElementById('button-vimeo').addEventListener('click', function() {
    var watchInActionTwo = document.querySelector('.watch_in_action_two');
    var vimeoVideo = document.getElementById('vimeo-video');
  
    watchInActionTwo.style.display = 'flex';
    vimeoVideo.src = 'https://player.vimeo.com/video/939476362?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479';
  });
  
  var closeButton = document.querySelector('.action_close_vimeo');
  closeButton.addEventListener('click', function() {
    var watchInActionTwo = document.querySelector('.watch_in_action_two');
    var vimeoVideo = document.getElementById('vimeo-video');
  
    watchInActionTwo.style.display = 'none';
    vimeoVideo.removeAttribute('src');
  });
