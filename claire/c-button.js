const mainButton = document.querySelector('button[data-main="true"]');
    const currentURL = window.location.href;

    if (currentURL.includes('claire-web.realpha.com')) {
      mainButton.href = '#';
      mainButton.textContent = 'Join Waitlist';
    } 