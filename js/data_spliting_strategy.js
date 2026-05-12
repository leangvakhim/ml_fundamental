// Data and Content for each step
const steps = [
    {
        title: "1. The Full Dataset",
        description: "Before training a Machine Learning model, we start with a complete dataset. If we train our model on this entire dataset and then test it on the same data, the model might just memorize the answers (a problem called <strong>Overfitting</strong>).",
        render: () => `
            <div class="w-full h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 font-bold border border-gray-300 shadow-inner">
                100% Full Dataset
            </div>
        `
    },
    {
        title: "2. Train / Test Split (Holdout Method)",
        description: "To fix this, we split the data. We use the <strong>Training Set (blue)</strong> to teach the model, and hide the <strong>Testing Set (green)</strong>. Later, we evaluate the model on the testing set to see how it performs on unseen data.",
        render: () => `
            <div class="flex w-full h-16 gap-1">
                <div class="w-4/5 h-full bg-blue-500 rounded-l-lg flex items-center justify-center text-white font-bold shadow-sm transition-all">
                    80% Training Data
                </div>
                <div class="w-1/5 h-full bg-green-500 rounded-r-lg flex items-center justify-center text-white font-bold shadow-sm transition-all text-sm">
                    20% Test
                </div>
            </div>

            <div class="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 shadow-sm text-left overflow-x-auto mt-2">
                <div class="text-xs text-slate-500 font-semibold mb-1 font-sans uppercase tracking-wider">Python (scikit-learn)</div>
                <pre class="font-mono text-sm text-slate-800"><span class="text-blue-600">X_train</span>, <span class="text-blue-600">X_test</span>, <span class="text-blue-600">y_train</span>, <span class="text-blue-600">y_test</span> = train_test_split(X, y, <span class="text-orange-600">test_size</span>=<span class="text-green-600">0.2</span>)</pre>
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

            <div class="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 shadow-sm text-left overflow-x-auto mt-2 leading-relaxed">
                <div class="text-xs text-slate-500 font-semibold mb-1 font-sans uppercase tracking-wider">Python (scikit-learn)</div>
                <pre class="font-mono text-sm text-slate-800"><span class="text-slate-500 italic"># 1. Split off the test set (e.g., 15% of total)</span>
<span class="text-blue-600">X_temp</span>, <span class="text-blue-600">X_test</span>, <span class="text-blue-600">y_temp</span>, <span class="text-blue-600">y_test</span> = train_test_split(X, y, <span class="text-orange-600">test_size</span>=<span class="text-green-600">0.15</span>)

<span class="text-slate-500 italic"># 2. Split the remaining 85% into Train (70%) and Val (15%)</span>
<span class="text-blue-600">X_train</span>, <span class="text-blue-600">X_val</span>, <span class="text-blue-600">y_train</span>, <span class="text-blue-600">y_val</span> = train_test_split(X_temp, y_temp, <span class="text-orange-600">test_size</span>=<span class="text-green-600">0.176</span>) <span class="text-slate-500 italic"># (15 / 85 ≈ 0.176)</span></pre>
            </div>
        `
    },
    {
        title: "4. K-Fold Cross-Validation",
        description: "Instead of a single split, we divide the data into 'K' folds (e.g., K=5). We train K separate models. In each iteration, one fold acts as the <strong>Testing Set</strong>, while the rest are used for <strong>Training</strong>. This ensures every data point gets tested.",
        render: () => {
            let html = '<div class="w-full flex flex-col gap-1.5">';
            for (let i = 0; i < 5; i++) {
                html += '<div class="flex w-full h-6 gap-1">';
                for (let j = 0; j < 5; j++) {
                    if (j === i) {
                        html += `<div class="flex-1 bg-green-500 flex items-center justify-center text-white text-[10px] font-bold ${j === 0 ? 'rounded-l' : ''} ${j === 4 ? 'rounded-r' : ''}">Test</div>`;
                    } else {
                        html += `<div class="flex-1 bg-blue-500 flex items-center justify-center text-white text-[10px] font-bold ${j === 0 ? 'rounded-l' : ''} ${j === 4 ? 'rounded-r' : ''}">Train</div>`;
                    }
                }
                html += '</div>';
            }
            html += '</div>';

            // Add the code snippet below the visual
            html += `
                <div class="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 shadow-sm text-left overflow-x-auto mt-2 leading-relaxed">
                    <div class="text-xs text-slate-500 font-semibold mb-1 font-sans uppercase tracking-wider">Python (scikit-learn)</div>
                    <pre class="font-mono text-sm text-slate-800"><span class="text-blue-600">kf</span> = KFold(<span class="text-orange-600">n_splits</span>=<span class="text-green-600">5</span>)

<span class="text-purple-600 font-semibold">for</span> train_idx, test_idx <span class="text-purple-600 font-semibold">in</span> kf.split(X):
<span class="text-blue-600">&nbsp; X_train</span>, <span class="text-blue-600">X_test</span> = X[train_idx], X[test_idx]
<span class="text-blue-600">&nbsp; y_train</span>, <span class="text-blue-600">y_test</span> = y[train_idx], y[test_idx]</pre>
                </div>
            `;
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

        // Update visualization and code
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