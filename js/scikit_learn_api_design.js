// Data defining each step of the explanation
const steps = [
    {
        title: "1. Consistency is Key",
        description: "The core principle of Scikit-Learn is <strong>consistency</strong>. All objects share a common interface drawn from a limited set of methods. Once you learn how to use one model (like Linear Regression), you know how to use them all (like Random Forests or Neural Networks).",
        visual: `
            <div class="flex justify-center items-center h-40 space-x-4">
                <div class="w-24 h-24 bg-blue-100 border-2 border-blue-500 rounded-xl flex flex-col items-center justify-center shadow-sm">
                    <span class="font-bold text-blue-700">Model A</span>
                    <span class="text-xs text-blue-600 font-mono mt-1">.fit()</span>
                </div>
                <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                <div class="w-24 h-24 bg-emerald-100 border-2 border-emerald-500 rounded-xl flex flex-col items-center justify-center shadow-sm">
                    <span class="font-bold text-emerald-700">Model B</span>
                    <span class="text-xs text-emerald-600 font-mono mt-1">.fit()</span>
                </div>
                <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                <div class="w-24 h-24 bg-purple-100 border-2 border-purple-500 rounded-xl flex flex-col items-center justify-center shadow-sm">
                    <span class="font-bold text-purple-700">Model C</span>
                    <span class="text-xs text-purple-600 font-mono mt-1">.fit()</span>
                </div>
            </div>
        `,
        code: `
# No matter the algorithm, the API remains the same!

model_1 = LinearRegression()
model_1.fit(X_train, y_train)

model_2 = RandomForestClassifier()
model_2.fit(X_train, y_train)
        `
    },
    {
        title: "2. The Data Representation",
        description: "Scikit-Learn expects data in two specific formats:<br><br><strong>X (Features):</strong> A 2D array (matrix) of shape <code>[n_samples, n_features]</code>. This is your input data.<br><strong>y (Target):</strong> A 1D array of shape <code>[n_samples]</code>. This is the label/value you are trying to predict.",
        visual: `
            <div class="flex justify-center items-center h-48 space-x-8">
                <div class="flex flex-col items-center">
                    <div class="grid grid-cols-3 gap-1 mb-2 bg-white p-2 shadow-md border border-slate-200 rounded">
                        <div class="w-6 h-6 bg-blue-200 rounded-sm"></div><div class="w-6 h-6 bg-blue-200 rounded-sm"></div><div class="w-6 h-6 bg-blue-200 rounded-sm"></div>
                        <div class="w-6 h-6 bg-blue-200 rounded-sm"></div><div class="w-6 h-6 bg-blue-200 rounded-sm"></div><div class="w-6 h-6 bg-blue-200 rounded-sm"></div>
                        <div class="w-6 h-6 bg-blue-200 rounded-sm"></div><div class="w-6 h-6 bg-blue-200 rounded-sm"></div><div class="w-6 h-6 bg-blue-200 rounded-sm"></div>
                        <div class="w-6 h-6 bg-blue-200 rounded-sm"></div><div class="w-6 h-6 bg-blue-200 rounded-sm"></div><div class="w-6 h-6 bg-blue-200 rounded-sm"></div>
                    </div>
                    <span class="font-bold text-blue-700 font-mono text-lg">X</span>
                    <span class="text-xs text-slate-500">2D Matrix (Features)</span>
                </div>
                <div class="flex flex-col items-center">
                    <div class="grid grid-cols-1 gap-1 mb-2 bg-white p-2 shadow-md border border-slate-200 rounded">
                        <div class="w-6 h-6 bg-amber-400 rounded-sm"></div>
                        <div class="w-6 h-6 bg-amber-400 rounded-sm"></div>
                        <div class="w-6 h-6 bg-amber-400 rounded-sm"></div>
                        <div class="w-6 h-6 bg-amber-400 rounded-sm"></div>
                    </div>
                    <span class="font-bold text-amber-600 font-mono text-lg">y</span>
                    <span class="text-xs text-slate-500">1D Array (Target)</span>
                </div>
            </div>
        `,
        code: `
# X is usually a Pandas DataFrame or NumPy 2D array
X = data[['age', 'income', 'education']]

# y is usually a Pandas Series or NumPy 1D array
y = data['purchased']
        `
    },
    {
        title: "3. Estimators (The Learners)",
        description: "An <strong>Estimator</strong> is any object that can learn from data. It does this using the <code>fit(X, y)</code> method. When you call <code>fit()</code>, the model computes parameters based on the data and stores them internally.",
        visual: `
            <div class="flex flex-col items-center justify-center h-48">
                <div class="flex items-center space-x-4 mb-4">
                    <div class="font-mono font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded border border-blue-200 shadow-sm">X, y</div>
                    <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    <div class="w-32 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg flex items-center justify-center font-bold shadow-md transform transition-transform hover:scale-105">
                        model.fit()
                    </div>
                    <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    <div class="font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded border border-indigo-200 shadow-sm">Learned<br>State</div>
                </div>
                <p class="text-sm text-slate-500 italic">The model studies the relationship between X and y.</p>
            </div>
        `,
        code: `
from sklearn.linear_model import LogisticRegression

# 1. Instantiate the Estimator (set hyperparameters)
model = LogisticRegression(max_iter=1000)

# 2. Fit the model to the data (Learning step)
model.fit(X_train, y_train)
        `
    },
    {
        title: "4. Predictors (Making Guesses)",
        description: "Once an Estimator has learned from data, it becomes a <strong>Predictor</strong>. You use the <code>predict(X_new)</code> method to make predictions on new, unseen data. It applies the learned parameters to guess the target.",
        visual: `
                <div class="flex flex-col items-center justify-center h-48">
                <div class="flex items-center space-x-4 mb-4">
                    <div class="font-mono font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded border border-blue-200 shadow-sm">X_new</div>
                    <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    <div class="w-36 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg flex items-center justify-center font-bold shadow-md border-2 border-indigo-300">
                        model.predict()
                    </div>
                    <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    <div class="font-mono font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded border border-amber-200 shadow-sm">y_pred</div>
                </div>
                <p class="text-sm text-slate-500 italic">Applying learned rules to predict the outcome.</p>
            </div>
        `,
        code: `
# 3. Predict on new, unseen data
predictions = model.predict(X_test)

# Predictors also have a score() method to evaluate performance
accuracy = model.score(X_test, y_test)
        `
    },
    {
        title: "5. Transformers (Data Prep)",
        description: "Some Estimators don't predict; they transform data (like scaling numbers or filling missing values). These are <strong>Transformers</strong>. They use <code>fit(X)</code> to learn parameters (like mean/variance) and <code>transform(X)</code> to apply the change.",
        visual: `
            <div class="flex flex-col items-center justify-center h-48">
                <div class="flex items-center space-x-4 mb-4">
                    <div class="w-16 h-16 bg-slate-200 rounded flex items-center justify-center text-xs text-slate-500 text-center shadow-inner border border-slate-300">Raw<br>Data</div>
                    <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    <div class="w-36 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold shadow-md flex-col">
                        <span class="text-xs font-normal">scaler.</span>
                        <span>transform()</span>
                    </div>
                    <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    <div class="w-16 h-16 bg-blue-100 border-2 border-blue-400 rounded flex items-center justify-center text-xs text-blue-700 font-bold text-center shadow-sm">Clean<br>Data</div>
                </div>
                <p class="text-sm text-slate-500 italic">A shortcut method <code>fit_transform(X)</code> does both steps at once!</p>
            </div>
        `,
        code: `
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
# Learn the mean and standard deviation
scaler.fit(X_train)

# Apply the transformation
X_train_scaled = scaler.transform(X_train)
        `
    },
    {
        title: "6. Inspection (Looking Inside)",
        description: "How do you see what the model actually learned? Scikit-Learn has a brilliant convention: <strong>all estimated parameters end with a trailing underscore ( <code>_</code> )</strong>. This makes it instantly clear what the model learned vs. what hyperparameters you set.",
        visual: `
            <div class="flex justify-center items-center h-48 relative">
                <div class="w-48 h-32 bg-white border-2 border-slate-300 rounded-lg shadow-lg relative overflow-hidden flex flex-col pt-3 pl-4">
                    <div class="text-xs text-slate-400 font-mono mb-2">LinearRegression object</div>
                    <div class="font-mono text-sm text-slate-700 mb-1">fit_intercept=True</div>
                    <div class="font-mono text-sm text-blue-600 font-bold mb-1">coef_ <span class="text-slate-400 font-normal">= [0.5, 1.2]</span></div>
                    <div class="font-mono text-sm text-blue-600 font-bold">intercept_ <span class="text-slate-400 font-normal">= 0.05</span></div>

                    <!-- Magnifying glass decoration -->
                    <div class="absolute -bottom-4 -right-4 w-12 h-12 bg-blue-50 rounded-full border-4 border-blue-200 opacity-50 flex items-center justify-center">
                        <svg class="w-4 h-4 text-blue-500 ml-[-5px] mt-[-5px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                </div>
            </div>
        `,
        code: `
model = LinearRegression(fit_intercept=True) # User-defined hyperparameter
model.fit(X, y)

# Trailing underscore = learned from data
print("Weights:", model.coef_)
print("Bias:", model.intercept_)
        `
    },
    {
        title: "7. Pipelines (Putting it together)",
        description: "Because the API is so consistent, Scikit-Learn allows you to chain multiple Transformers and a final Predictor into a single object called a <strong>Pipeline</strong>. Calling <code>fit()</code> on the pipeline automatically processes the data through every step!",
        visual: `
            <div class="flex flex-col items-center justify-center h-48 w-full">
                <div class="w-full max-w-md bg-slate-100 p-3 rounded-xl border border-slate-300 shadow-inner flex items-center space-x-2 relative">
                    <div class="absolute -top-3 left-4 bg-white px-2 text-xs font-bold text-slate-500 rounded border border-slate-200">Pipeline Object</div>

                    <div class="flex-1 bg-teal-100 border border-teal-400 rounded-lg p-2 text-center shadow-sm">
                        <div class="text-xs text-teal-800 font-bold">Step 1</div>
                        <div class="text-xs text-teal-600 font-mono">Imputer()</div>
                    </div>
                    <svg class="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>

                    <div class="flex-1 bg-teal-100 border border-teal-400 rounded-lg p-2 text-center shadow-sm">
                        <div class="text-xs text-teal-800 font-bold">Step 2</div>
                        <div class="text-xs text-teal-600 font-mono">Scaler()</div>
                    </div>
                    <svg class="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>

                    <div class="flex-1 bg-indigo-100 border border-indigo-400 rounded-lg p-2 text-center shadow-sm">
                        <div class="text-xs text-indigo-800 font-bold">Step 3</div>
                        <div class="text-xs text-indigo-600 font-mono">Model()</div>
                    </div>
                </div>
                <div class="mt-4 font-mono text-sm bg-blue-50 text-blue-700 px-4 py-1 rounded shadow-sm border border-blue-200">
                    pipeline.fit(X, y)
                </div>
            </div>
        `,
        code: `
from sklearn.pipeline import make_pipeline

# Create a sequence of operations
pipe = make_pipeline(
SimpleImputer(),   # Transformer 1
StandardScaler(),  # Transformer 2
LogisticRegression() # Predictor (Must be last)
)

# Fits transformers, transforms data, then fits predictor!
pipe.fit(X_train, y_train)
        `
    }
];

let currentIndex = 0;

// DOM Elements
const contentContainer = document.getElementById('content-container');
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');
const progressBar = document.getElementById('progress-bar');
const stepCounter = document.getElementById('step-counter');
const dotsContainer = document.getElementById('dots-container');

// Initialize dots
function initDots() {
    steps.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `w-2 h-2 rounded-full transition-colors duration-300 ${index === 0 ? 'bg-blue-600' : 'bg-slate-300'}`;
        dot.id = `dot-${index}`;
        dotsContainer.appendChild(dot);
    });
}

// Render current step content
function renderStep(index) {
    const step = steps[index];

    // Apply animation classes
    contentContainer.classList.remove('fade-enter-active');
    contentContainer.classList.add('fade-enter');

    // Build inner HTML
    setTimeout(() => {
        contentContainer.innerHTML = `
            <div class="max-w-2xl mx-auto">
                <h2 class="text-2xl font-bold text-slate-800 mb-4">${step.title}</h2>
                <p class="text-slate-600 leading-relaxed mb-8 text-[15px] sm:text-base">${step.description}</p>

                <!-- Visual Area -->
                <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-8 shadow-sm">
                    ${step.visual}
                </div>

                <!-- Code Area -->
                <div class="bg-slate-800 rounded-xl overflow-hidden shadow-md">
                    <div class="bg-slate-900 px-4 py-2 flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-red-500"></div>
                        <div class="w-3 h-3 rounded-full bg-amber-500"></div>
                        <div class="w-3 h-3 rounded-full bg-green-500"></div>
                        <span class="ml-2 text-xs text-slate-400 font-mono">python</span>
                    </div>
                    <pre class="p-4 overflow-x-auto"><code class="code-font text-sm text-blue-300">${syntaxHighlight(step.code.trim())}</code></pre>
                </div>
            </div>
        `;

        // Trigger reflow for animation
        void contentContainer.offsetWidth;
        contentContainer.classList.add('fade-enter-active');
    }, 50); // Small delay to allow fade-out

    // Update UI State
    updateUI(index);
}

// Basic mock syntax highlighting for python snippet
function syntaxHighlight(code) {
    // A single regex to match comments, strings, keywords, functions, and operators
    const tokenRegex = /(#.*)|('.*?'|".*?")|\b(from|import|class|def|return|if|else|for|while|print)\b|\b([a-zA-Z_0-9]+)(?=\()|(\=|\+|\-|\*|\/)/g;

    return code.replace(tokenRegex, function (match, comment, string, keyword, func, operator) {
        if (comment) return '<span class="text-slate-500 italic">' + comment + '</span>';
        if (string) return '<span class="text-green-400">' + string + '</span>';
        if (keyword) return '<span class="text-purple-400">' + keyword + '</span>';
        if (func) return '<span class="text-blue-200">' + func + '</span>';
        if (operator) return '<span class="text-pink-400">' + operator + '</span>';
        return match;
    });
}

function updateUI(index) {
    // Update Text & Progress
    stepCounter.innerText = `Step ${index + 1} of ${steps.length}`;
    progressBar.style.width = `${((index + 1) / steps.length) * 100}%`;

    // Update Dots
    steps.forEach((_, i) => {
        const dot = document.getElementById(`dot-${i}`);
        if (i === index) {
            dot.classList.remove('bg-slate-300');
            dot.classList.add('bg-blue-600');
        } else {
            dot.classList.remove('bg-blue-600');
            dot.classList.add('bg-slate-300');
        }
    });

    // Update Buttons
    btnPrev.disabled = index === 0;

    if (index === steps.length - 1) {
        btnNext.innerHTML = `Finish <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
        btnNext.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        btnNext.classList.add('bg-emerald-600', 'hover:bg-emerald-700');
    } else {
        btnNext.innerHTML = `Next Step <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>`;
        btnNext.classList.remove('bg-emerald-600', 'hover:bg-emerald-700');
        btnNext.classList.add('bg-blue-600', 'hover:bg-blue-700');
    }
}

// Event Listeners
btnNext.addEventListener('click', () => {
    if (currentIndex < steps.length - 1) {
        currentIndex++;
        renderStep(currentIndex);
    } else {
        btnNext.disabled = true;
        // Finish state - loop back to start or show a completion message
        // currentIndex = 0;
        // renderStep(currentIndex);
    }
});

btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        renderStep(currentIndex);
    }
});

// Initialize App
initDots();
renderStep(currentIndex);