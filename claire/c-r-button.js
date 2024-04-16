window.addEventListener('DOMContentLoaded', function() {
  const mainButtons = document.querySelectorAll('a[data-main="true"]');
  const currentURL = window.location.href;

  if (currentURL === 'https://claire-web.realpha.com/') {
    mainButtons.forEach(function(button) {
      button.href = '#';
      button.querySelector('.button-text').textContent = 'Join Waitlist';
    });
  }
});