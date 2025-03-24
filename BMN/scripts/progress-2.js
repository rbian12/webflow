document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.swiper', {
      loop: false,
      speed: 500,
      noSwiping: true,
      allowTouchMove: false,
    });
  
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    const formSliderTopFlex = document.querySelector('.form-slider-top-flex');
    const backButton = document.querySelector('[btn-type="back"]');
    const progressBar = document.querySelector('.slider-progress');
    let visibleIndex = 0; // Tracks user's actual progress through visible slides
  
    function getVisibleSlides() {
      return Array.from(swiper.slides).filter(slide => slide.offsetParent !== null);
    }
  
    function updateProgress() {
      const totalVisibleSlides = getVisibleSlides().length;
  
      // Handle divide-by-zero or weird counts
      if (totalVisibleSlides <= 1) {
        progressBar.style.width = `100%`;
        return;
      }
  
      const progressPercentage = (visibleIndex / (totalVisibleSlides - 1)) * 100;
  
      progressBar.style.width = `${Math.min(Math.max(progressPercentage, 0), 100)}%`;
    }
  
    function nextSlide() {
      const totalVisibleSlides = getVisibleSlides().length;
  
      // Move to the next slide
      swiper.slideNext();
  
      // Increment index unless we're at the last visible slide
      if (visibleIndex < totalVisibleSlides - 1) {
        visibleIndex++;
      }
  
      updateProgress();
    }
  
    function prevSlide() {
      swiper.slidePrev();
  
      // Decrement index unless we're at zero
      if (visibleIndex > 0) {
        visibleIndex--;
      }
  
      updateProgress();
    }
  
    // Function to clear radio buttons for current_living, process_state, and refinance_goal
    function clearRelatedRadios() {
      const currentLivingRadios = document.querySelectorAll('input[name="current_living"]');
      const processStateRadios = document.querySelectorAll('input[name="process_state"]');
      const refinanceGoalRadios = document.querySelectorAll('input[name="refinance_goal"]');
  
      currentLivingRadios.forEach(radio => radio.checked = false); // Uncheck all 'current_living' radios
      processStateRadios.forEach(radio => radio.checked = false); // Uncheck all 'process_state' radios
      refinanceGoalRadios.forEach(radio => radio.checked = false); // Uncheck all 'refinance_goal' radios
    }
  
    radioButtons.forEach((radioButton) => {
      radioButton.addEventListener('click', function() {
        if (radioButton.name === 'military_status' && radioButton.checked) {
          backButton.classList.remove('is-hidden');
          document.querySelector('#slider-progress').classList.remove('is-hidden');
          document.querySelector('#top-text').classList.add('is-hidden');
        }
  
        if (radioButton.name === 'mortgage_service') {
          // Clear the related radios when mortgage_service changes
          clearRelatedRadios();
  
          const buyingSections = document.querySelectorAll('[question="if-buying"]');
          const refinanceSections = document.querySelectorAll('[question="if-refinance"]');
  
          if (radioButton.id === 'Buying-a-new-home' && radioButton.checked) {
            refinanceSections.forEach(section => {
              section.style.display = 'none';
            });
            buyingSections.forEach(section => {
              section.style.display = 'block';
            });
          } else if (radioButton.id === 'Refinance-Modifying-your-current-mortgage' && radioButton.checked) {
            buyingSections.forEach(section => {
              section.style.display = 'none';
            });
            refinanceSections.forEach(section => {
              section.style.display = 'block';
            });
          }
  
          // Recalculate visible slides and adjust visibleIndex based on new visibility
          const newVisibleSlides = getVisibleSlides();
          const currentSlide = swiper.slides[swiper.realIndex];
  
          // Only reset index if current slide becomes hidden
          if (currentSlide.offsetParent === null) {
            visibleIndex = 0;
          } else {
            visibleIndex = newVisibleSlides.indexOf(currentSlide);
          }
  
          updateProgress();
        }
  
        nextSlide();
      });
    });
  
    backButton.addEventListener('click', function(e) {
      e.preventDefault();
  
      if (swiper.realIndex === 0) {
        backButton.classList.add('is-hidden');
        document.querySelector('#slider-progress').classList.add('is-hidden');
        document.querySelector('#top-text').classList.remove('is-hidden');
      }
  
      prevSlide();
    });
  
    swiper.on('slideChange', function() {
      // Revert visibility when user reaches the first slide
      if (swiper.realIndex === 0) {
        backButton.classList.add('is-hidden');
        document.querySelector('#slider-progress').classList.add('is-hidden');
        document.querySelector('#top-text').classList.remove('is-hidden');
      } else {
        // When not on the first slide, show back button and progress bar
        backButton.classList.remove('is-hidden');
        document.querySelector('#slider-progress').classList.remove('is-hidden');
        document.querySelector('#top-text').classList.add('is-hidden');
      }
    });
  
    $('#state').on('select2:select', function() {
      nextSlide();
    });
  
    // Initialize on page load
    visibleIndex = 0;
    updateProgress();
  });
  