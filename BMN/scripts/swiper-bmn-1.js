document.addEventListener("DOMContentLoaded", function() {
  // Swiper Initialization
  const swiperContainers = document.querySelectorAll('.swiper');
  swiperContainers.forEach(container => {
    const swiper = new Swiper(container, {
      loop: false,
      speed: 500,
      on: {
        init: function() {
          console.log('Swiper initialized');
        },
        slideChange: function() {
          // Update progress bar when slide changes
          const progressElement = document.querySelector('[data-progress="bar"]');
          if (progressElement) {
            const progress = (swiper.realIndex + 1) / swiper.slides.length;
            progressElement.style.width = `${progress * 100}%`;
          }
        }
      }
    });

    // If navigation buttons are provided outside the swiper container, initialize them
    const nextButton = document.querySelector('[data-nav="next"]');
    const prevButton = document.querySelector('[data-nav="prev"]');

    if (nextButton) {
      nextButton.addEventListener('click', function(e) {
        e.preventDefault();
        swiper.slideNext(); // Move to the next slide
      });
    }

    if (prevButton) {
      prevButton.addEventListener('click', function(e) {
        e.preventDefault();
        swiper.slidePrev(); // Move to the previous slide
      });
    }

    // Add event listener to move the swiper slide forward on radio input change
    const radioButtons = container.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
      radio.addEventListener('click', function() {
        if (radio.checked) {
          swiper.slideNext(); // Move to the next slide when a radio button is selected
        }
      });
    });
  });

  // jQuery event listener for Select2 change using select2:select
  $('#state').on('select2:select', function() {
    nextSlide(); // Move to the next slide when a Select2 value is selected
  });

  // Function to move to the next slide for all swipers
  function nextSlide() {
    const swiperContainers = document.querySelectorAll('.swiper');
    swiperContainers.forEach(container => {
      const swiper = container.swiper;
      if (swiper) {
        swiper.slideNext(); // Move to the next slide for the swiper instance
      }
    });
  }

  // Conditional logic based on data attributes
  const logicContainers = document.querySelectorAll('[data-logic]');

  logicContainers.forEach(container => {
    const logicKey = container.dataset.logic; // Get the dynamic 'answer' (e.g., 'buying', 'question')

    // Loop through the inner elements that match data-{logicKey}
    const conditionalElements = container.querySelectorAll(`[data-${logicKey}]`);

    conditionalElements.forEach(element => {
      const answer = element.dataset[logicKey]; // Get the value of the dynamic attribute (e.g., 'yes' or 'no')

      // Apply styles based on the answer
      if (answer === 'yes') {
        element.style.display = 'block'; // Show the element
      } else if (answer === 'no') {
        element.style.display = 'none'; // Hide the element
      }
    });
  });
});
