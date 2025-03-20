document.addEventListener('DOMContentLoaded', function() {
  const splideTestimonialElement = document.querySelector('#splide-testimonials');

  // Initialize Splide for the testimonials slider
  if (splideTestimonialElement) {
    const splideTestimonial = new Splide(splideTestimonialElement, {
      type: 'loop',
      drag: 'free',
      focus: 'center',
      pagination: false,
      arrows: false,
      autoWidth: true,
      gap: '1.5rem',
      autoScroll: {
        speed: 1,
      }
    });
    splideTestimonial.mount({ AutoScroll: window.splide.Extensions.AutoScroll });
  }
});

