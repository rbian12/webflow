// conditional rendering button js
window.addEventListener('DOMContentLoaded', function() {
  const mainButtons = document.querySelectorAll('a[data-main="true"]');
  const currentHost = window.location.host;
   // Get the waitlist popup div
   const waitlistPopup = document.querySelector('.waitlist_popup');

  if (currentHost === 'claire-web.realpha.com' || currentHost === 'claire.realpha.com') {
    mainButtons.forEach(function(button) {
      button.href = '#';
      button.querySelector('.button-text').textContent = 'Join Waitlist';
      button.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default link behavior
        waitlistPopup.style.display = 'flex'; // Show the waitlist popup
      });
    });
  }

    // Function to close the popup defined globally if needed elsewhere
  window.closePopup = function() {
      if (waitlistPopup) {
          waitlistPopup.style.display = 'none';
      }
  };
});