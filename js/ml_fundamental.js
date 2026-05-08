// Data structure containing the pipeline steps
const pipelineSteps = [
    {
        title: "1. Data Collection",
        shortLabel: "Data",
        description: "Every machine learning project starts with data. Features (X) are the input variables, and Labels (y) are what we want to predict.",
        code: `from sklearn.datasets import load_iris\n\n# Load the built-in Iris dataset\ndata = load_iris()\nX = data.data    # Features (sepal length, etc.)\ny = data.target  # Labels (flower species)`,
        icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>`
    },
    {
        title: "2. Data Preprocessing",
        shortLabel: "Preprocess",
        description: "Raw data is rarely perfect. We often need to scale features so they are on the same level, which helps many algorithms perform better and train faster.",
        code: `from sklearn.preprocessing import StandardScaler\n\n# Initialize the scaler\nscaler = StandardScaler()\n\n# Fit on data and transform it\nX_scaled = scaler.fit_transform(X)`,
        icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>`
    },
    {
        title: "3. Train / Test Split",
        shortLabel: "Split",
        description: "We must never evaluate a model on the data it was trained on. We split our data into a 'Training Set' to teach the model, and a 'Testing Set' to evaluate it.",
        code: `from sklearn.model_selection import train_test_split\n\n# Split: 80% for training, 20% for testing\nX_train, X_test, y_train, y_test = train_test_split(\n    X_scaled, y, test_size=0.2, random_state=42\n)`,
        icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>`
    },
    {
        title: "4. Model Selection",
        shortLabel: "Model",
        description: "Next, we choose an algorithm. scikit-learn makes this incredibly easy by standardizing the way models are instantiated.",
        code: `from sklearn.ensemble import RandomForestClassifier\n\n# Initialize the model with chosen hyperparameters\nmodel = RandomForestClassifier(n_estimators=100)\n\n# The model is currently 'empty' and untrained`,
        icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>`
    },
    {
        title: "5. Model Training (Fitting)",
        shortLabel: "Train",
        description: "The learning phase! We use the .fit() method to pass our training data to the model so it can learn the hidden patterns mapping Features to Labels.",
        code: `# Teach the model using the training data\n# This is where the actual 'Machine Learning' happens\n\nmodel.fit(X_train, y_train)\n\nprint("Model training complete!")`,
        icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>`
    },
    {
        title: "6. Evaluation & Prediction",
        shortLabel: "Evaluate",
        description: "Finally, we ask the model to predict outcomes on the unseen Test data, and we compare its predictions to the actual answers to measure accuracy.",
        code: `from sklearn.metrics import accuracy_score\n\n# Make predictions on the unseen test data\npredictions = model.predict(X_test)\n\n# Calculate accuracy\naccuracy = accuracy_score(y_test, predictions)\nprint(f"Model Accuracy: {accuracy * 100:.2f}%")`,
        icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
    }
];

// State variables
let currentStepIndex = 0;
const totalSteps = pipelineSteps.length;

// DOM Elements
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const stepContent = document.getElementById('step-content');

const elTitle = document.getElementById('step-title');
const elDesc = document.getElementById('step-desc');
const elCode = document.getElementById('step-code');
const elIcon = document.getElementById('step-icon');
const elProgressFill = document.getElementById('progress-fill');
const elStepCounter = document.getElementById('step-counter');
const elProgressLabels = document.getElementById('progress-labels');

// Initialize App
function init() {
    // Build progress labels
    pipelineSteps.forEach((step, index) => {
        const label = document.createElement('span');
        label.className = `w-1/6 text-center transition-colors duration-300 ${index === 0 ? 'text-blue-600' : ''}`;
        label.id = `label-${index}`;
        label.innerText = step.shortLabel;
        elProgressLabels.appendChild(label);
    });

    renderStep();

    // Event Listeners
    btnPrev.addEventListener('click', () => {
        if (currentStepIndex > 0) {
            currentStepIndex--;
            triggerAnimationAndRender();
        }
    });

    btnNext.addEventListener('click', () => {
        if (currentStepIndex < totalSteps - 1) {
            currentStepIndex++;
            triggerAnimationAndRender();
        }
    });
}

// Trigger CSS animation by removing and re-adding the class
function triggerAnimationAndRender() {
    stepContent.classList.remove('fade-in');
    // Trigger reflow
    void stepContent.offsetWidth;
    stepContent.classList.add('fade-in');

    renderStep();
}

// Main render function
function renderStep() {
    const step = pipelineSteps[currentStepIndex];

    // Update content
    elTitle.innerText = step.title;
    elDesc.innerText = step.description;
    elIcon.innerHTML = step.icon;

    // Update Header/Footer info
    elStepCounter.innerText = `Step ${currentStepIndex + 1} of ${totalSteps}`;

    // Update Progress Bar
    const progressPercentage = ((currentStepIndex + 1) / totalSteps) * 100;
    elProgressFill.style.width = `${progressPercentage}%`;

    // Update Progress Labels styling
    for (let i = 0; i < totalSteps; i++) {
        const label = document.getElementById(`label-${i}`);
        if (i <= currentStepIndex) {
            label.classList.add('text-blue-600');
            label.classList.remove('text-slate-400');
        } else {
            label.classList.add('text-slate-400');
            label.classList.remove('text-blue-600');
        }
    }

    // Update Button States
    btnPrev.disabled = currentStepIndex === 0;

    if (currentStepIndex === totalSteps - 1) {
        btnNext.disabled = true;
        btnNext.innerText = "Finish";
        btnNext.classList.replace('bg-blue-600', 'bg-emerald-500');
        btnNext.classList.replace('hover:bg-blue-700', 'hover:bg-emerald-600');
        btnNext.classList.replace('shadow-blue-200', 'shadow-emerald-200');
    } else {
        btnNext.disabled = false;
        btnNext.innerHTML = "Next Step &rarr;";
        btnNext.classList.replace('bg-emerald-500', 'bg-blue-600');
        btnNext.classList.replace('hover:bg-emerald-600', 'hover:bg-blue-700');
        btnNext.classList.replace('shadow-emerald-200', 'shadow-blue-200');
    }

    // Apply syntax highlighting cleanly directly from the source array
    highlightCode();
}

// Basic keyword highlighter to make the code look nice without external libraries
function highlightCode() {
    const step = pipelineSteps[currentStepIndex];
    let codeHtml = step.code;

    // 1. Escape basic HTML entities to prevent rendering issues
    codeHtml = codeHtml.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // 2. Single-pass regex to avoid matching inside newly injected HTML tags
    // This safely matches: Strings OR Comments OR Keywords
    const highlightRegex = /("|')(?:(?!\1)[^\\]|\\.)*\1|#.*|\b(from|import|print|data|target|fit_transform|fit|predict)\b/g;

    codeHtml = codeHtml.replace(highlightRegex, (match) => {
        if (match.startsWith('"') || match.startsWith("'")) {
            return `<span class="text-amber-300">${match}</span>`;
        } else if (match.startsWith('#')) {
            return `<span class="text-slate-400 italic">${match}</span>`;
        } else {
            return `<span class="text-pink-400">${match}</span>`;
        }
    });

    // Set the carefully constructed HTML into the code block
    elCode.innerHTML = codeHtml;
}

// Run
init();