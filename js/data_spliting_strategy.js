// Data and Content for each step
const steps = [
    {
        title: "1. The Full Dataset",
        description: "Before training a Machine Learning model, we start with a complete dataset. If we train our model on this entire dataset and then test it on the same data, the model might just memorize the answers (a problem called <strong>Overfitting</strong>).",
        render: () => `
            <div class="w-full h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 font-bold border border-gray-300 shadow-inner w-full">
                100% Full Dataset
            </div>
        `
    },
    {
        title: "2. Train / Test Split (Holdout Method)",
        description: "To fix this, we split the data (e.g., using scikit-learn's <code>train_test_split</code>). We use the <strong>Training Set (blue)</strong> to teach the model, and hide the <strong>Testing Set (green)</strong>. Later, we evaluate the model on the testing set to see how it performs on unseen data.",
        render: () => `
            <div class="flex w-full h-16 gap-1">
                <div class="w-4/5 h-full bg-blue-500 rounded-l-lg flex items-center justify-center text-white font-bold shadow-sm transition-all">
                    80% Training Data
                </div>
                <div class="w-1/5 h-full bg-green-500 rounded-r-lg flex items-center justify-center text-white font-bold shadow-sm transition-all text-sm">
                    20% Test
                </div>
            </div>
        `
    },
    {
        title: "3. Train / Validation / Test Split",
        description: "When we need to tune model settings (Hyperparameters), we need a third set. We train on the <strong>Training Set</strong>, tune settings using the <strong>Validation Set (orange)</strong>, and keep the <strong>Testing Set</strong> completely locked away for a final, unbiased evaluation.",
        render: () => `
            <div class="flex w-full h-16 gap-1">
                <div class="w-[70%] h-full bg-blue-500 rounded-l-lg flex items-center justify-center text-white font-bold shadow-sm transition-all">
                    70% Training
                </div>
                <div class="w-[15%] h-full bg-orange-400 flex items-center justify-center text-white font-bold shadow-sm transition-all text-sm">
                    15% Val
                </div>
                <div class="w-[15%] h-full bg-green-500 rounded-r-lg flex items-center justify-center text-white font-bold shadow-sm transition-all text-sm">
                    15% Test
                </div>
            </div>
        `
    },
    {
        title: "4. K-Fold Cross-Validation",
        description: "Instead of a single split, we divide the data into 'K' folds (e.g., K=5). We train K separate models. In each iteration, one fold acts as the <strong>Testing Set</strong>, while the rest are used for <strong>Training</strong>. This ensures every data point gets tested, giving a more reliable performance score.",
        render: () => {
            let html = '<div class="w-full flex flex-col gap-2">';
            for (let i = 0; i < 5; i++) {
                html += '<div class="flex w-full h-8 gap-1">';
                for (let j = 0; j < 5; j++) {
                    // If current chunk is the test fold, color it green, else blue
                    if (j === i) {
                        html += `<div class="flex-1 bg-green-500 flex items-center justify-center text-white text-xs font-bold ${j === 0 ? 'rounded-l' : ''} ${j === 4 ? 'rounded-r' : ''}">Test</div>`;
                    } else {
                        html += `<div class="flex-1 bg-blue-500 flex items-center justify-center text-white text-xs font-bold ${j === 0 ? 'rounded-l' : ''} ${j === 4 ? 'rounded-r' : ''}">Train</div>`;
                    }
                }
                html += '</div>';
            }
            html += '</div>';
            return html;
        }
    }
];

let currentStep = 0;

// DOM Elements
const canvas = document.getElementById('visualization-canvas');
const titleEl = document.getElementById('step-title');
const descEl = document.getElementById('step-description');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const dotsContainer = document.getElementById('step-indicators');

// Initialize progress dots
function initDots() {
    dotsContainer.innerHTML = '';
    steps.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `w-2.5 h-2.5 rounded-full transition-colors duration-300 ${index === currentStep ? 'bg-blue-600' : 'bg-gray-300'}`;
        dotsContainer.appendChild(dot);
    });
}

// Update the UI based on the current step
function updateUI() {
    const step = steps[currentStep];

    // Remove and re-add animation class to trigger fade-in
    canvas.classList.remove('fade-in');
    document.getElementById('text-content').classList.remove('fade-in');

    // Short timeout to allow browser to register class removal
    setTimeout(() => {
        // Update text
        titleEl.innerHTML = step.title;
        descEl.innerHTML = step.description;

        // Update visualization
        canvas.innerHTML = step.render();

        // Trigger animations
        canvas.classList.add('fade-in');
        document.getElementById('text-content').classList.add('fade-in');

        // Update dots
        Array.from(dotsContainer.children).forEach((dot, index) => {
            dot.className = `w-2.5 h-2.5 rounded-full transition-colors duration-300 ${index === currentStep ? 'bg-blue-600' : 'bg-gray-300'}`;
        });

        // Update Button States
        btnPrev.disabled = currentStep === 0;
        btnNext.disabled = currentStep === steps.length - 1;

        if (currentStep === steps.length - 1) {
            btnNext.innerHTML = "Finish";
        } else {
            btnNext.innerHTML = "Next Step &rarr;";
        }
    }, 50);
}

// Event Listeners
btnNext.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
        currentStep++;
        updateUI();
    }
});

btnPrev.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        updateUI();
    }
});

// Initial render
initDots();
updateUI();