let currentStep = 1;

function nextStep(step) {
    // Hide the current step
    const currentStepElement = document.getElementById(`step-${currentStep}`);
    currentStepElement.classList.remove('active');

    // Move to the next step
    currentStep++;
    if (step === 'buying') {
        document.getElementById('step-buying').classList.add('active');
    } else {
        const nextStepElement = document.getElementById(`step-${currentStep}`);
        nextStepElement.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('step-1').classList.add('active');
});
