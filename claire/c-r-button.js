// conditional rendering button js
window.addEventListener("DOMContentLoaded", function () {
  const mainButtons = document.querySelectorAll('a[data-main="true"]');


  const isAuthenticated = document.cookie.split(';').some(c=>c.includes('CognitoIdentityServiceProvider'))

  if (isAuthenticated) {
    mainButtons.forEach(function (button) {
      button.href = "/dashboard";
      button.querySelector(".button-text").textContent = "Go To Dashboard";
    });
  } else {
    const currentHost = window.location.host;
    // Get the waitlist popup div
    const waitlistPopup = document.querySelector(".waitlist_popup");

    if (
      currentHost === "claire-web.realpha.com" ||
      currentHost === "claire.realpha.com"
    ) {
      mainButtons.forEach(function (button) {
        button.href = "#";
        button.querySelector(".button-text").textContent = "Join Waitlist";
        button.addEventListener("click", function (event) {
          event.preventDefault(); // Prevent the default link behavior
          waitlistPopup.style.display = "flex"; // Show the waitlist popup
        });
      });
    }

    // Function to close the popup defined globally if needed elsewhere
    window.closePopup = function () {
      if (waitlistPopup) {
        waitlistPopup.style.display = "none";
      }
    };

    // Setup mutation observer
    // Select the node that will be observed for mutations
    const targetNode = document.getElementById("getWaitlistContainer");

    // Options for the observer (which mutations to observe)
    const config = { childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = function (mutationsList, observer) {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          // Check if the specific elements you are interested in are modified
          const ddElements = targetNode.querySelectorAll("dd");
          const dtElements = targetNode.querySelectorAll("dt");

          let positionTitle = null;

          dtElements.forEach((element) => {
            if (element.textContent.trim() === "Your Position") {
              positionTitle = element;
            }
          });

          ddElements.forEach((element) => {
            if (element.textContent.trim() === "Offboarded!") {
              if (positionTitle) {
                positionTitle.textContent = "You're now in!";
              }
              element.style.color = "blue";
              element.style.backgroundColor = "#ffffff";
              // Note: '!important' can't be used with element.style in JavaScript
              element.style.textDecoration = "underline";
              element.innerHTML =
                '<a href="https://claire.realpha.com/login">Log In to Claire</a>';
              // You might want to disconnect the observer after the changes are made
              // to avoid it running multiple times in case of further DOM changes
              // observer.disconnect();
            }
          });
        }
      }
    };

    // Create an instance of the observer with the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
  }

  // Now, whenever #getWaitlistContainer has child nodes added or removed, the callback will run
});