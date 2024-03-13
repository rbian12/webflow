const busySlider = new Swiper(".swiper", {
    // // Parameters
    slidesPerView: 3,
    spaceBetween: 16,
  
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-next",
      prevEl: ".swiper-prev"
    },
  
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 480px

      767:{
        slidesPerView: 3,
      },

      480: {
        slidesPerView: 2,
      },


      0:{
        slidesPerView: 1,

      }
    }
  });