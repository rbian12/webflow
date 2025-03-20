document.addEventListener('DOMContentLoaded', function () {
    const swiperContainer = document.querySelector('#swiper-vaform');
    const progressWrap = document.querySelector('.va-progress');
    const buyingSlide = document.querySelector('.buying-steps');
    const refinanceSlide = document.querySelector('.refinance-steps');

    if (swiperContainer) {
        const swiperVaform = new Swiper(swiperContainer, {
            slidesPerView: 1,
            spaceBetween: 0,
            allowTouchMove: false, // Prevent manual swiping
            loop: false, // Ensure looping is disabled for a linear form experience
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: false,
            }
        });

        let slidesToMoveBack = 1;
        let slidesToMoveForward = 1;

        // Dynamically create progress dots
        const totalSlides = swiperVaform.slides.length;
        progressWrap.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('progress-dot');
            progressWrap.appendChild(dot);
        }

        const progressDots = document.querySelectorAll('.va-progress .progress-dot');
        if (progressDots[0]) {
            progressDots[0].classList.add('active');
        }

        // Update progress dots on slide change
        swiperVaform.on('slideChange', function () {
            progressDots.forEach((dot, index) => {
                dot.classList.remove('current', 'active');
                if (index < swiperVaform.activeIndex) {
                    dot.classList.add('active');
                } else if (index === swiperVaform.activeIndex) {
                    dot.classList.add('active', 'current');
                }
            });
            if (progressDots[0]) {
                progressDots[0].classList.add('active');
            }
        });

        // Handle military status selection
        document.querySelectorAll('input[name="military_status"]').forEach(radio => {
            radio.addEventListener('click', () => {
                swiperVaform.slideNext();
            });
        });

        // Handle mortgage service selection
        document.querySelectorAll('input[name="mortgage_service"]').forEach(radio => {
            radio.addEventListener('click', () => {
                const selectedValue = document.querySelector('input[name="mortgage_service"]:checked').value;
                if (selectedValue === 'Refinance/Modifying your current mortgage') {
                    slidesToMoveForward = 3;
                    slidesToMoveBack = 1;
                    buyingSlide.classList.add('is-hidden');
                    refinanceSlide.classList.remove('is-hidden');
                } else {
                    slidesToMoveForward = 1;
                    slidesToMoveBack = 2;
                    buyingSlide.classList.remove('is-hidden');
                    refinanceSlide.classList.add('is-hidden');
                }
                swiperVaform.slideNext();
            });
        });

        // Handle state selection
        const stateSelect = document.querySelector('select[name="state"]');
        if (stateSelect) {
            stateSelect.addEventListener('change', function () {
                swiperVaform.slideNext();
            });
        }

        // Handle refinance time selection
        document.querySelectorAll('input[name="refinance_time"]').forEach(radio => {
            radio.addEventListener('click', () => {
                swiperVaform.slideNext();
            });
        });

        // Handle monthly payment selection
        document.querySelectorAll('input[name="monthly_payment"]').forEach(radio => {
            radio.addEventListener('click', () => {
                const newIndex = swiperVaform.activeIndex + slidesToMoveForward;
                if (newIndex < swiperVaform.slides.length) {
                    swiperVaform.slideTo(newIndex);
                } else {
                    swiperVaform.slideTo(swiperVaform.slides.length - 1);
                }
            });
        });

        // Handle current living selection
        document.querySelectorAll('input[name="current_living"]').forEach(radio => {
            radio.addEventListener('click', () => {
                swiperVaform.slideNext();
            });
        });

        // Handle process state selection
        document.querySelectorAll('input[name="process_state"]').forEach(radio => {
            radio.addEventListener('click', () => {
                const newIndex = swiperVaform.activeIndex + 2;
                if (newIndex < swiperVaform.slides.length) {
                    swiperVaform.slideTo(newIndex);
                } else {
                    swiperVaform.slideTo(swiperVaform.slides.length - 1);
                }
            });
        });

        // Handle refinance goal selection
        document.querySelectorAll('input[name="refinance_goal"]').forEach(radio => {
            radio.addEventListener('click', () => {
                swiperVaform.slideNext();
            });
        });

        // Handle back button clicks
        document.querySelectorAll('[btn-type="back"]').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                swiperVaform.slidePrev();
            });
        });

        // Handle refinance back button clicks
        document.querySelectorAll('[btn-type="back-refinance"]').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const newIndex = swiperVaform.activeIndex - 3;
                swiperVaform.slideTo(newIndex >= 0 ? newIndex : 0);
            });
        });

        // Handle last back button clicks
        document.querySelectorAll('[btn-type="back-last"]').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const newIndex = swiperVaform.activeIndex - slidesToMoveBack;
                swiperVaform.slideTo(newIndex >= 0 ? newIndex : 0);
            });
        });
    }
});
