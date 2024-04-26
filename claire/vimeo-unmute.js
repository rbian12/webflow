var player = new Vimeo.Player($("#vimeo-video")[0]);

$("[vimeo=unmute]").click(function() {
  player.setCurrentTime(0);
  player.setMuted(false);
});

$("[vimeo=play]").click(function() {
  player.play();
});

$("[vimeo=pause]").click(function() {
  player.pause();
});