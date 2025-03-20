document.addEventListener('DOMContentLoaded', function() {
    const splideTestimonialElement = document.querySelector('#splide-testimonials');
    const splideVaformElement = document.querySelector('#splide-vaform');
  
    if (splideTestimonialElement) {
      const splideTestimonial = new Splide(splideTestimonialElement, {
        type: 'loop',
        drag: 'free',
        focus: 'center',
        pagination: false,
        arrows: false,
        autoWidth: true,
        gap: '2rem',
        autoScroll: {
          speed: 1,
        }
      });
      splideTestimonial.mount({ AutoScroll: window.splide.Extensions.AutoScroll });
    }
  
    if (splideVaformElement) {
      const splideVaform = new Splide(splideVaformElement, {
        pagination: false,
        arrows: false,
        perPage: 1,
        aria: false,
        drag: false,
      });
  
      splideVaform.mount();
  
      const progressDots = document.querySelectorAll('.va-progress .progress-dot');
  
      splideVaform.on('move', (newIndex) => {
        progressDots.forEach((dot, index) => {
          dot.classList.remove('current');
          if (index < newIndex) {
            dot.classList.add('active');
          } else if (index === newIndex) {
            dot.classList.add('active', 'current');
          } else {
            dot.classList.remove('active');
          }
        });
      });
  
      const backButtons = ['back-1', 'back-2', 'back-3'];
  
      backButtons.forEach(id => {
        const btn = document.querySelector(`#${id}`);
        if (btn) {
          btn.addEventListener('click', function(e) {
            e.preventDefault();
            splideVaform.go('<');
          });
        }
      });
  
      const radiosStep1 = document.querySelectorAll('input[name="military_status"]');
      radiosStep1.forEach(radio => {
        radio.addEventListener('change', () => {
          splideVaform.go('>');
        });
      });
  
      const stateSelect = document.querySelector('select[name="state"]');
      if (stateSelect) {
        stateSelect.addEventListener('change', () => {
          splideVaform.go('>');
        });
      }
  
      const radiosStep3 = document.querySelectorAll('input[name="monthly_payment"]');
      radiosStep3.forEach(radio => {
        radio.addEventListener('change', () => {
          splideVaform.go('>');
        });
      });
  
      const sliderContinueBtn = document.querySelector('.silder-continue-button');
      if (sliderContinueBtn) {
        sliderContinueBtn.addEventListener('click', function(e) {
          e.preventDefault();
          splideVaform.go('>');
        });
      }
    }
  });