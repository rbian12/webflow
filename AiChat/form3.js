$(document).ready(function() {
    const invalidDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'mail.ru', 'rudiplomust.com'];
    const submitBtn = $('#wf-form-Contact-Us .btn-primary.submit');
    const email = $('#Business-Email-Address');
    const errorMessage = $('#error-email-1');
    const honeypot = $('#honeypot');
    let isValidating = false;

    const validateDomain = async (domain) => {
        try {
            // Check DNS records (A record)
            const response = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
            if (!response.ok) throw new Error('DNS check failed');
            
            const data = await response.json();
            if (data.Status !== 0 || !data.Answer?.length) return false;

            // Check MX records
            const mxResponse = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`);
            if (!mxResponse.ok) throw new Error('MX check failed');
            
            const mxData = await mxResponse.json();
            return mxData.Answer?.length > 0;  // Return true if MX records exist

        } catch (error) {
            console.error('Domain validation error:', error);
            return false;
        }
    };

    submitBtn.click(async (event) => {
        const emailValue = email.val();
        const domainPart = emailValue.includes('@') ? emailValue.split('@')[1] : '';

        if (domainPart && domainPart !== undefined && (invalidDomains.includes(domainPart) || honeypot.val())) {
            email.val('');
            errorMessage.text('Business email required');
            errorMessage.addClass('show');
            event.preventDefault();
        } else if (domainPart && domainPart !== '') {
            event.preventDefault();
            if (domainPart) {
                isValidating = true;
                const isValid = await validateDomain(domainPart);
                if (!isValid) {
                    email.val('');
                    errorMessage.text('Please enter an email with an active business domain');
                    errorMessage.addClass('show');
                } else {
                    errorMessage.removeClass('show');
                    submitBtn.trigger('click');
                }
                isValidating = false;
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
        } else if (domainPart && domainPart !== '' && invalidDomains.includes(domainPart)) {
            errorMessage.text('Please enter a business email address');
            errorMessage.addClass('show');
        } else if (domainPart && domainPart !== '') {
            if (!isValidating) {
                validateDomain(domainPart).then(isValid => {
                    if (!isValid) {
                        errorMessage.text('Please enter an email with an active business domain');
                        errorMessage.addClass('show');
                    } else {
                        errorMessage.removeClass('show');
                    }
                });
            }
        } else {
            errorMessage.removeClass('show');
        }
    });
});