$(document).ready(function() {
    $('input[number-code]').each(function() {
        var input = this;
        var preferredCountries = $(input).attr('number-code').split(',');

        // Ensure the library is loaded before using
        if (typeof intlTelInput === 'undefined') {
            console.error('intl-tel-input library not loaded');
            return;
        }

        // Initialize the intl-tel-input library
        var iti = window.intlTelInput(input, {
            preferredCountries: preferredCountries,
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.0/build/js/utils.js"
        });

        // Set the default country code to a specific one if needed, e.g., 'IN' for India
        iti.setCountry('IN');  // For default country

        $.get("https://ipinfo.io", function(response) {
            var countryCode = response.country;
            iti.setCountry(countryCode);  // Set country based on the IP info
        }, "jsonp");

        iti.promise.then(function() {
            // Now utils are loaded!
            input.addEventListener('change', formatPhoneNumber);
            input.addEventListener('keyup', formatPhoneNumber);

            function formatPhoneNumber() {
                if (input.value.trim() !== '') {
                    var formattedNumber = iti.getNumber(iti.constructor.numberFormat.NATIONAL);
                    input.value = formattedNumber;
                }
            }

            // Simple regex for validating phone numbers
            // This regex accepts digits, spaces, hyphens, and parentheses
            // Minimum 8 digits, maximum 15 digits
            function validatePhoneWithRegex(phone) {
                // Strip non-digit characters to count actual digits
                var digits = phone.replace(/\D/g, '');
                var regex = /^[\d\s\-()]{7,20}$/;
                return regex.test(phone) && digits.length >= 8 && digits.length <= 15;
            }

            var form = $(input).closest('form');
            
            // Phone number validation on form submission only
            form.submit(function(event) {
                // Check if the input field is empty
                if (input.value.trim() === '') {
                    event.preventDefault();  // Prevent form submission if empty
                    $('#phone-error-text').text('Please enter phone number').show();
                    return;
                }
                
                // Perform both validations
                var isValidFormat = iti.isValidNumber();
                var isValidRegex = validatePhoneWithRegex(input.value);
                
                if (!isValidFormat || !isValidRegex) {
                    event.preventDefault();  // Prevent form submission if the phone number is invalid
                    $('#phone-error-text').text('Please enter a valid phone number').show();
                } else {
                    var formattedNumber = iti.getNumber(iti.constructor.numberFormat.INTERNATIONAL);
                    input.value = formattedNumber;
                    $('#phone-error-text').hide();
                }
            });

            // Optional: Add validation only for format errors when the user leaves the input
            input.addEventListener('blur', function() {
                if (input.value.trim() !== '') {
                    var isValidFormat = iti.isValidNumber();
                    var isValidRegex = validatePhoneWithRegex(input.value);
                    
                    if (!isValidFormat || !isValidRegex) {
                        $('#phone-error-text').text('Please enter a valid phone number').show();
                    } else {
                        $('#phone-error-text').hide();
                    }
                }
            });
        }).catch(function(error) {
            console.error("Error initializing intl-tel-input:", error);
        });
    });
});