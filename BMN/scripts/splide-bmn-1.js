document.addEventListener('DOMContentLoaded', function () {
    const splideVaformElement = document.querySelector('#splide-vaform');
    const progressWrap = document.querySelector('.va-progress');

    if (splideVaformElement) {
        
        const splideVaform = new Splide(splideVaformElement, {
            type: 'fade',
            pagination: false,
            arrows: false,
            perPage: 1,
            aria: false,
            drag: false,
            speed: 200,
            easing: 'ease-in-out',
        });

        splideVaform.mount();

        let slidesToMoveBack = 1;
        let slidesToMoveForward = 1;

        const totalSlides = splideVaform.length;
        progressWrap.innerHTML = '';

        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('progress-dot');
            progressWrap.appendChild(dot);
        }

        const progressDots = document.querySelectorAll('.va-progress .progress-dot');
        if (progressDots[0]) progressDots[0].classList.add('active');

        splideVaform.on('move', (newIndex) => {
            progressDots.forEach((dot, index) => {
                dot.classList.remove('current', 'active');
                if (index < newIndex) dot.classList.add('active');
                if (index === newIndex) dot.classList.add('active', 'current');
            });
            if (progressDots[0]) progressDots[0].classList.add('active');
        });

        document.querySelectorAll('input[name="military_status"]').forEach(radio => {
            radio.addEventListener('click', () => splideVaform.go('>'));
        });

        document.querySelectorAll('input[name="mortgage_service"]').forEach(radio => {
            radio.addEventListener('click', () => {
                const selectedValue = document.querySelector('input[name="mortgage_service"]:checked').value;

                if (selectedValue === 'Refinance/Modifying your current mortgage') {
                    slidesToMoveForward = 3;
                    slidesToMoveBack = 1;
                    
                } else {
                    slidesToMoveForward = 1;
                    slidesToMoveBack = 2;
                }
                splideVaform.go('>');
            });
        });

        const stateSelect = document.querySelector('select[name="state"]');
        if (stateSelect) {
            $(stateSelect).on('change', function () {
                splideVaform.go('>');
            });
        }

        document.querySelectorAll('input[name="refinance_time"]').forEach(radio => {
            radio.addEventListener('click', () => splideVaform.go('>'));
        });

        document.querySelectorAll('input[name="monthly_payment"]').forEach(radio => {
            radio.addEventListener('click', () => {
                const newIndex = splideVaform.index + slidesToMoveForward;
                splideVaform.go(newIndex < splideVaform.length ? newIndex : splideVaform.length - 1);
            });
        });

        document.querySelectorAll('input[name="current_living"]').forEach(radio => {
            radio.addEventListener('click', () => splideVaform.go('>'));
        });

        document.querySelectorAll('input[name="process_state"]').forEach(radio => {
            radio.addEventListener('click', () => {
                const newIndex = splideVaform.index + 2;
                splideVaform.go(newIndex < splideVaform.length ? newIndex : splideVaform.length - 1);
            });
        });

        document.querySelectorAll('input[name="refinance_goal"]').forEach(radio => {
            radio.addEventListener('click', () => splideVaform.go('>'));
        });

        document.querySelectorAll('[btn-type="back"]').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                splideVaform.go('<');
            });
        });

        document.querySelectorAll('[btn-type="back-refinance"]').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const newIndex = splideVaform.index - 3;
                splideVaform.go(newIndex >= 0 ? newIndex : 0);
            });
        });

        document.querySelectorAll('[btn-type="back-last"]').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const newIndex = splideVaform.index - slidesToMoveBack;
                splideVaform.go(newIndex >= 0 ? newIndex : 0);
            });
        });
    }

    // Ensure inert is used for elements that need to be hidden, replacing aria-hidden
    function applyInertToHiddenElements() {
        document.querySelectorAll('[aria-hidden="true"]').forEach((el) => {
            if (el.querySelector(':focus')) {
                el.removeAttribute('aria-hidden');  // Remove aria-hidden to avoid focus conflicts
                el.setAttribute('inert', '');  // Use inert instead of aria-hidden
            }
        });
    }

    // Call the function to check elements on page load
    applyInertToHiddenElements();
});
