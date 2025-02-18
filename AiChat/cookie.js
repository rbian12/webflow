
document.addEventListener("DOMContentLoaded", function () {
    // Elements
    const cookieConsent = document.querySelector(".cookie-consent1");
    const manageCookieWrap = document.querySelector(".manage-cookie-wrap");
    const manageCookiePanel = document.querySelector(".manage-cookie");

    const acceptAllBtn = document.getElementById("cookie-accept-all");
    const manageCookiesBtn = document.getElementById("manage-cookie");
    const manageCookiesNBtn = document.getElementById("manage-cookie-n"); // Additional Button
    const savePreferencesBtn = document.getElementById("save-my-preferences");
    const closeManageCookiesBtn = document.getElementById("cookie-close-m");
    const closeCookieBannerBtn = document.getElementById("close-cookie-m"); // Close Banner

    const functionalToggle = document.querySelector("#checkbox-functional input");
    const advertisingToggle = document.querySelector("#checkbox-advertising input");

    let openedFromManageCookies = false; // Track how the modal was opened

    // Function to set cookies
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + "; path=/" + expires;
    }

    // Function to get cookies
    function getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Function to check if user is visiting for the first time
    function isFirstTimeUser() {
        return getCookie("cookieAccepted") === null;
    }

    // Show cookie banner if preferences are not saved
    function checkCookieConsent() {
        if (isFirstTimeUser()) {
            cookieConsent.classList.add("show");
            functionalToggle.checked = true; // Default checked for new users
            advertisingToggle.checked = true; // Default checked for new users
        } else {
            functionalToggle.checked = getCookie("functionalCookies") === "true";
            advertisingToggle.checked = getCookie("advertisingCookies") === "true";
        }
    }

    // Accept all cookies
    acceptAllBtn.addEventListener("click", function () {
        setCookie("cookieAccepted", "true", 365);
        setCookie("functionalCookies", "true", 365);
        setCookie("advertisingCookies", "true", 365);
        cookieConsent.classList.remove("show"); // Hide banner
    });

    // Open Manage Cookies Modal (from `#manage-cookie`)
    manageCookiesBtn.addEventListener("click", function () {
        openedFromManageCookies = true;
        cookieConsent.classList.remove("show"); // Hide banner
        manageCookieWrap.classList.add("show"); // Show modal
        setTimeout(() => manageCookiePanel.classList.add("show"), 300);
    });

    // Open Manage Cookies Modal (from `#manage-cookie-n`)
    manageCookiesNBtn.addEventListener("click", function () {
        openedFromManageCookies = false;
        cookieConsent.classList.remove("show"); // Hide banner
        manageCookieWrap.classList.add("show"); // Show modal
        setTimeout(() => manageCookiePanel.classList.add("show"), 300);
    });

    // Close Manage Cookies Modal
    closeManageCookiesBtn.addEventListener("click", function () {
        manageCookiePanel.classList.remove("show");
        setTimeout(() => manageCookieWrap.classList.remove("show"), 300);

        // If the user opened it via `#manage-cookie`, show `cookie-consent1` again
        if (openedFromManageCookies) {
            setTimeout(() => cookieConsent.classList.add("show"), 300);
        }
    });

    // Hide Cookie Banner if "X" (close-cookie-m) is clicked
    closeCookieBannerBtn.addEventListener("click", function () {
        cookieConsent.classList.remove("show");
    });

    // Save Preferences
    savePreferencesBtn.addEventListener("click", function () {
        setCookie("functionalCookies", functionalToggle.checked, 365);
        setCookie("advertisingCookies", advertisingToggle.checked, 365);
        setCookie("cookieAccepted", "true", 365);
        
        // Close modal
        manageCookiePanel.classList.remove("show");
        setTimeout(() => manageCookieWrap.classList.remove("show"), 300);
    });

    checkCookieConsent(); // Ensure banner is shown if needed
});
//adf