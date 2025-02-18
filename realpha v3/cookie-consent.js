document.addEventListener('DOMContentLoaded', function () {
  //const localCookieConsent = JSON.parse(localStorage.getItem("cookieConsent") || "") ?? null;
  const localCookieConsent = localStorage.getItem('cookieConsent')
  // Check if the user has already accepted cookies from localStorage
  if (!localCookieConsent) {
    showCookieConsent();
  } 
});

// Show cookie consent banner
function showCookieConsent() {
  var cookieConsent = document.getElementById('cookieConsent');
  setTimeout(function () {
    cookieConsent.style.display = 'flex';
  }, 200);

  // Trigger reflow to enable the transition
  void cookieConsent.offsetWidth;

  cookieConsent.classList.add('show');
}

// Accept cookies and hide the consent banner
function acceptCookies() {
  localStorage.setItem('cookieConsent', '"accepted"'); // Save consent in localStorage
  hideCookieConsent();
}

// Reject cookies and hide the consent banner (optional behavior if needed)
function rejectCookies() {
  localStorage.setItem('cookieConsent', '"dismissed"'); // Save consent in localStorage

  hideCookieConsent();
}

// Hide the cookie consent banner
function hideCookieConsent() {
  var cookieConsent = document.getElementById('cookieConsent');
  cookieConsent.classList.remove('show');

  // Remove the element from the DOM after the transition
  setTimeout(function () {
    cookieConsent.style.display = 'none';
  }, 200); // Adjust the timeout to match the transition duration
}


// Remove 'show' class from 'cookie-consent' when buttons with data-accept="true" are clicked
document.querySelectorAll('[data-accept="true"]').forEach(button => {
  button.addEventListener('click', () => {
    acceptCookies();
  });
});

// Add 'show' class to 'manage-cookie-wrap' and 'manage-cookie' with a delay, and set body overflow to hidden
const manageCookiesButton = document.getElementById('manage-cookies');
if (manageCookiesButton) {
  manageCookiesButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior if needed
    const manageCookieWrap = document.querySelector('.manage-cookie-wrap');
    const manageCookie = document.querySelector('.manage-cookie');
    if (manageCookieWrap) {
      manageCookieWrap.classList.add('show');
      document.body.style.overflow = 'hidden'; // Disable scrolling
      // Add 'show' class to 'manage-cookie' after a 500ms delay (can be adjusted)
      setTimeout(() => {
        if (manageCookie) {
          manageCookie.classList.add('show');
        }
      }, 300); // Delay in milliseconds
    }
  });
}

// Remove 'show' class from 'manage-cookie' first, then 'manage-cookie-wrap' after a delay, and reset body overflow
const closeButtons = ['close-cookie-m-btn', 'close-cookie-m'];

closeButtons.forEach(id => {
  const button = document.getElementById(id);
  if (button) {
    button.addEventListener('click', () => {
      const manageCookieWrap = document.querySelector('.manage-cookie-wrap');
      const manageCookie = document.querySelector('.manage-cookie');
      if (manageCookie) {
        manageCookie.classList.remove('show');
        // Remove 'show' class from 'manage-cookie-wrap' after a 500ms delay (can be adjusted)
        setTimeout(() => {
          if (manageCookieWrap) {
            manageCookieWrap.classList.remove('show');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
          }
        }, 300); // Delay in milliseconds
      }
    });
  }
});
