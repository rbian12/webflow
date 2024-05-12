const rangeInput = document.getElementById('myRange');
const pricePill = document.querySelector('.div_listprice_pill');
const sliderContainer = document.querySelector('.div_rangeslider');
const textListPrice = document.getElementById('t-listprice');

// Variable to store the last valid left position
let lastValidLeft = '';

function updatePricePill() {
    const value = rangeInput.value;
    const min = rangeInput.min || 200000; // Default min
    const max = rangeInput.max || 1000000; // Default max
    const newVal = Number((value - min) * 100 / (max - min));

    // Calculate the new potential left position
    let newLeft = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;

    // Temporarily apply the new left position to measure if it goes out of bounds
    pricePill.style.left = newLeft;
    const pillRect = pricePill.getBoundingClientRect();
    const containerRect = sliderContainer.getBoundingClientRect();

    // Check if the new position goes out of the bounds
    if (pillRect.left >= containerRect.left && pillRect.right <= containerRect.right) {
        // New position is valid, update the last valid left
        lastValidLeft = newLeft;
    }

    // Apply the last valid left position
    pricePill.style.left = lastValidLeft;
    pricePill.textContent = `$${parseInt(value).toLocaleString()}`;
}

// Function to handle start of interaction
    function handleStart() {
        pricePill.classList.add('show');
        textListPrice.style.opacity = '0';
    }

    // Function to handle end of interaction
    function handleEnd() {
        pricePill.classList.remove('show');
        textListPrice.style.opacity = '1';
    }

    // Add event listeners for mouse and touch events
    rangeInput.addEventListener('mousedown', handleStart);
    rangeInput.addEventListener('touchstart', handleStart);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchend', handleEnd);
    rangeInput.addEventListener('input', updatePricePill)

// Initial call to set position correctly
updatePricePill();

function updateFill(slider) {
    const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
    slider.style.setProperty('--percent', `${value}%`);
}

function updatePriceDisplay(value) {
    document.getElementById('priceDisplay').textContent = `$${parseInt(value).toLocaleString()}`;
    
    // Calculate and update the commission display
    const commission = value * 0.03; // 3% of the home price
    document.getElementById('commissionDisplay').textContent = `${Math.round(commission).toLocaleString()}`;
}