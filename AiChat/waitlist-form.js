$(document).ready(function() {
    const invalidDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'mail.ru', 'rudiplomust.com'];
    const submitBtn = $('#wf-form-join-waitlist .btn-primary.submit');
    const email = $('#Business-Email-Address');
    const errorMessage = $('#email-error-txt');
    const honeypot = $('#honeypot');
    let isValidating = false;

    const validateDomain = async (domain) => {
        try {
            const response = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
            if (!response.ok) throw new Error('DNS check failed');
            
            const data = await response.json();
            if (data.Status !== 0 || !data.Answer?.length) return false;

            const mxResponse = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`);
            if (!mxResponse.ok) throw new Error('MX check failed');
            
            const mxData = await mxResponse.json();
            return mxData.Answer?.length > 0;

        } catch (error) {
            console.error('Domain validation error:', error);
            return false;
        }
    };

    submitBtn.click(async (event) => {
        event.preventDefault();  // Prevent default initially

        const emailValue = email.val();
        const domainPart = emailValue.includes('@') ? emailValue.split('@')[1] : '';

        if (domainPart && (invalidDomains.includes(domainPart) || honeypot.val())) {
            email.val('');
            errorMessage.text('Business email required').addClass('show');
        } else if (domainPart) {
            isValidating = true;
            const isValid = await validateDomain(domainPart);
            isValidating = false;

            if (!isValid) {
                email.val('');
                errorMessage.text('Please enter an email with an active business domain').addClass('show');
            } else {
                errorMessage.removeClass('show');
                $('#wf-form-join-waitlist').submit();  // Submit the form properly
            }
        } else {
            errorMessage.removeClass('show');
        }
    });

    email.on('input', function() {
        const emailValue = $(this).val();
        const domainPart = emailValue.includes('@') ? emailValue.split('@')[1] : '';

        if (!emailValue) {
            errorMessage.removeClass('show');
        } else if (domainPart && invalidDomains.includes(domainPart)) {
            errorMessage.text('Please enter a business email address').addClass('show');
        } else if (domainPart && !isValidating) {
            validateDomain(domainPart).then(isValid => {
                if (!isValid) {
                    errorMessage.text('Please enter an email with an active business domain').addClass('show');
                } else {
                    errorMessage.removeClass('show');
                }
            });
        } else {
            errorMessage.removeClass('show');
        }
    });
});
