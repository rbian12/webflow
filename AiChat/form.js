// when the DOM is ready
$(document).ready(function() {
    // make an array of invalid domains
    const invalidDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'mail.ru', 'rudiplomust.com'];

    // get the submit button
    const submitBtn = $('#wf-form-Contact-Us .btn-primary.submit');

    // on submit button click
    submitBtn.click((event) => {
        // get the email field
        const email = $('#Business-Email-Address');
        const errorMessage = $('#error-email-1');
        const emailValue = email.val();
        const domainPart = emailValue.split('@')[1];

        // get the honeypot field
        const honeypot = $('#honeypot');

        // if the domain is invalid or honeypot is filled
        if (domainPart && invalidDomains.includes(domainPart) || honeypot.val()) {
            // clear the email field
            email.val('');
            // set the error message text
            errorMessage.text('Business email required');
            // show the error message
            errorMessage.addClass('show');
            // prevent form submission
            event.preventDefault();
        } else {
            // hide the error message if email is corrected
            errorMessage.removeClass('show');
        }
    });

    // allow revalidation when the user rewrites the email
    $('#Business-Email-Address').on('input', function() {
        const email = $(this);
        const errorMessage = $('#error-email-1');
        const domainPart = email.val().split('@')[1];

        // if the domain is invalid
        if (domainPart && invalidDomains.includes(domainPart)) {
            // keep the error message visible
            errorMessage.text('Please enter a business email address');
            errorMessage.addClass('show');
        } else {
            // hide the error message if the input becomes valid
            errorMessage.removeClass('show');
        }
    });
});