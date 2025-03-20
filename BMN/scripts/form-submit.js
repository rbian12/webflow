
  document.addEventListener('DOMContentLoaded', function() {
    // Select the form element by its ID
    var form = document.getElementById('wf-form-VA-loan-lead-form');

    // Listen for the form submission event
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission

      // Extract form data
      var formData = new FormData(form);
      var data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      // Send data to Follow Up Boss
      sendDataToFUB(data);
    });
  });

  function sendDataToFUB(data) {
    var apiKey = 'YOUR_API_KEY'; // Replace with your FUB API key
    var endpoint = 'https://api.followupboss.com/v1/people';

    // Prepare the payload
    var payload = {
      firstName: data.Name.split(' ')[0],
      lastName: data.Name.split(' ').slice(1).join(' '),
      emails: [{ value: data.Email }],
      phones: [{ value: data.Phone }],
      custom: {
        isVeteranActive: data.isVeteranActive,
        state: data.field,
        payMonthly: data.payMonthly
      }
    };

    // Send the data to FUB
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(apiKey + ':')
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (response.ok) {
        // Show success message
        document.querySelector('.w-form-done').style.display = 'block';
        document.querySelector('.w-form-fail').style.display = 'none';
      } else {
        // Show error message
        document.querySelector('.w-form-done').style.display = 'none';
        document.querySelector('.w-form-fail').style.display = 'block';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Show error message
      document.querySelector('.w-form-done').style.display = 'none';
      document.querySelector('.w-form-fail').style.display = 'block';
    });
  }

