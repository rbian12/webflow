document.addEventListener('DOMContentLoaded', function() {
    // Get all elements
    const rangeMin = document.querySelector('.range-min');
    const rangeMax = document.querySelector('.range-max');
    const inputMin = document.querySelector('.input-min');
    const inputMax = document.querySelector('.input-max');
    const progress = document.querySelector('.progress');
    const labelMin = document.querySelector('.label-min');
    const labelMax = document.querySelector('.label-max');
  
    // Set min and max values
    const minValue = 50000;
    const maxValue = 20000000;
  
    // Format currency function
    function formatCurrency(value) {
      if (value >= 1000000) {
        return '$' + (value / 1000000).toFixed(1) + 'M';
      } else if (value >= 1000) {
        return '$' + (value / 1000).toFixed(0) + 'K';
      } else {
        return '$' + value;
      }
    }
  
    // Format input value function
    function formatInputValue(value) {
      // Remove non-numeric characters
      let numericValue = value.toString().replace(/\D/g, '');
      if (numericValue === '') return '';
      
      // Parse to number
      numericValue = parseInt(numericValue);
      
      // Format with commas for thousands
      return numericValue.toLocaleString('en-US');
    }
  
    // Update progress bar
    function updateProgress() {
      const minPercent = ((rangeMin.value - minValue) / (maxValue - minValue)) * 100;
      const maxPercent = ((rangeMax.value - minValue) / (maxValue - minValue)) * 100;
      progress.style.left = minPercent + '%';
      progress.style.right = (100 - maxPercent) + '%';
    }
  
    // Initialize inputs and sliders
    inputMin.value = formatInputValue(rangeMin.value);
    inputMax.value = formatInputValue(rangeMax.value);
    updateProgress();
  
    // Min range input event
    rangeMin.addEventListener('input', function() {
      // Prevent min from exceeding max
      if (parseInt(rangeMin.value) > parseInt(rangeMax.value)) {
        rangeMin.value = rangeMax.value;
      }
      
      inputMin.value = formatInputValue(rangeMin.value);
      updateProgress();
    });
  
    // Max range input event
    rangeMax.addEventListener('input', function() {
      // Prevent max from being less than min
      if (parseInt(rangeMax.value) < parseInt(rangeMin.value)) {
        rangeMax.value = rangeMin.value;
      }
      
      inputMax.value = formatInputValue(rangeMax.value);
      updateProgress();
    });
  
    // Min input field event
    inputMin.addEventListener('input', function() {
      let value = this.value.replace(/\D/g, '');
      if (value === '') {
        value = minValue;
      } else {
        value = Math.max(minValue, Math.min(parseInt(value), parseInt(rangeMax.value)));
      }
      
      // Update slider position when input changes
      rangeMin.value = value;
      updateProgress();
    });
  
    // Max input field event
    inputMax.addEventListener('input', function() {
      let value = this.value.replace(/\D/g, '');
      if (value === '') {
        value = maxValue;
      } else {
        value = Math.max(parseInt(rangeMin.value), Math.min(parseInt(value), maxValue));
      }
      
      // Update slider position when input changes
      rangeMax.value = value;
      updateProgress();
    });
  
    // Handle focus and blur events for input fields
    inputMin.addEventListener('focus', function() {
      this.value = this.value.replace(/[^\d]/g, '');
    });
  
    inputMax.addEventListener('focus', function() {
      this.value = this.value.replace(/[^\d]/g, '');
    });
  
    inputMin.addEventListener('blur', function() {
      if (this.value === '') {
        this.value = formatInputValue(minValue);
        rangeMin.value = minValue;
      } else {
        // Make sure the value is within valid range
        let value = parseInt(this.value.replace(/\D/g, ''));
        value = Math.max(minValue, Math.min(value, parseInt(rangeMax.value)));
        
        // Update the input and slider
        this.value = formatInputValue(value);
        rangeMin.value = value;
      }
      updateProgress();
    });
  
    inputMax.addEventListener('blur', function() {
      if (this.value === '') {
        this.value = formatInputValue(maxValue);
        rangeMax.value = maxValue;
      } else {
        // Make sure the value is within valid range
        let value = parseInt(this.value.replace(/\D/g, ''));
        value = Math.max(parseInt(rangeMin.value), Math.min(value, maxValue));
        
        // Update the input and slider
        this.value = formatInputValue(value);
        rangeMax.value = value;
      }
      updateProgress();
    });
  });