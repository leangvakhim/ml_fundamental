document.addEventListener('DOMContentLoaded', () => {
    const totalSteps = 5;
    let currentStep = 1;

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    const currentStepDisplay = document.getElementById('current-step-display');
    const clusterArea = document.getElementById('cluster-area');

    // Initialization for Step 3 Clustering Animation
    let dotsCreated = false;

    function updateUI() {
        // Update Step Display
        currentStepDisplay.textContent = currentStep;

        // Update Progress Bar
        const progressPercentage = ((currentStep) / totalSteps) * 100;
        progressBar.style.width = `${progressPercentage}%`;

        // Handle active step classes
        for (let i = 1; i <= totalSteps; i++) {
            const stepElement = document.getElementById(`step-${i}`);
            if (i === currentStep) {
                stepElement.classList.add('active');
                // Small timeout to ensure display:block applies before opacity transition
                setTimeout(() => stepElement.style.opacity = '1', 50);
            } else {
                stepElement.classList.remove('active');
                stepElement.style.opacity = '0';
            }
        }

        // Button States
        if (currentStep === 1) {
            prevBtn.disabled = true;
            prevBtn.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            prevBtn.disabled = false;
            prevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }

        if (currentStep === totalSteps) {
            nextBtn.innerHTML = 'Finish <i class="fa-solid fa-check"></i>';
            nextBtn.classList.replace('bg-green-600', 'bg-indigo-600');
            nextBtn.classList.replace('hover:bg-green-700', 'hover:bg-indigo-700');
        } else {
            nextBtn.innerHTML = 'Next Concept <i class="fa-solid fa-arrow-right"></i>';
            nextBtn.classList.replace('bg-indigo-600', 'bg-green-600');
            nextBtn.classList.replace('hover:bg-indigo-700', 'hover:bg-green-700');
        }

        // Initialize specific step content if needed
        if (currentStep === 3 && !dotsCreated) {
            createUnclusteredDots();
            dotsCreated = true;
        }
    }

    // Event Listeners for Navigation
    nextBtn.addEventListener('click', () => {
        if (currentStep < totalSteps) {
            currentStep++;
            updateUI();
        } else {
            currentStep.disabled = true;
            // Custom message box instead of alert
            // showCompletionMessage();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateUI();
        }
    });

    // Initialize UI on load
    updateUI();
});

// --- Step 2 Interaction ---
function animatePrediction() {
    const point = document.getElementById('mystery-point');
    const text = document.getElementById('prediction-text');

    // Animate moving to the "Pass" side
    point.style.transition = 'all 1.5s ease-in-out';
    point.style.top = '70%';
    point.style.left = '70%';
    point.style.backgroundColor = '#ef4444'; // Red color (pass)

    text.innerHTML = 'Looks like a <span class="text-red-500">Pass</span>!';

    // Reset after a delay
    setTimeout(() => {
        point.style.transition = 'none';
        point.style.top = '1rem';
        point.style.left = '1rem';
        point.style.backgroundColor = '#9ca3af'; // Gray
        text.innerHTML = 'Where does it belong?';
    }, 3000);
}

// --- Step 3 Interaction ---
const dots = [];

function createUnclusteredDots() {
    const area = document.getElementById('cluster-area');
    area.innerHTML = ''; // Clear existing
    dots.length = 0;

    for (let i = 0; i < 40; i++) {
        const dot = document.createElement('div');
        dot.className = 'w-3 h-3 rounded-full absolute bg-gray-400';
        dot.style.transition = 'all 1.5s cubic-bezier(0.25, 0.8, 0.25, 1)';

        // Random position
        const x = Math.random() * 90; // percentage
        const y = Math.random() * 85;

        dot.style.left = `${x}%`;
        dot.style.top = `${y}%`;

        // Assign a hidden "type" for clustering logic later
        let type = Math.floor(Math.random() * 3);
        dot.dataset.type = type;

        area.appendChild(dot);
        dots.push(dot);
    }
}

function animateClustering() {
    const desc = document.getElementById('cluster-desc');
    desc.textContent = "Clustering... Grouping similar data points together based on characteristics.";

    // Centers for 3 clusters
    const centers = [
        { x: 20, y: 30, color: '#f97316' }, // Orange-ish
        { x: 70, y: 20, color: '#3b82f6' }, // Blue
        { x: 50, y: 70, color: '#10b981' }  // Green
    ];

    dots.forEach(dot => {
        const type = parseInt(dot.dataset.type);
        const center = centers[type];

        // Add some random scatter around the center
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;

        dot.style.left = `calc(${center.x}% + ${offsetX}px)`;
        dot.style.top = `calc(${center.y}% + ${offsetY}px)`;
        dot.style.backgroundColor = center.color;
    });

    setTimeout(() => {
        desc.textContent = "Found 3 distinct groups (clusters) without any prior labels!";
        // Reset button functionality
        const btn = document.getElementById('cluster-btn');
        btn.innerHTML = '<i class="fa-solid fa-undo"></i> Reset';
        btn.onclick = resetClustering;
    }, 1500);
}

function resetClustering() {
    createUnclusteredDots();
    const btn = document.getElementById('cluster-btn');
    btn.innerHTML = '<i class="fa-solid fa-magic"></i> Find Clusters';
    btn.onclick = animateClustering;
    document.getElementById('cluster-desc').textContent = "Click to see how the algorithm groups similar items based on how close they are.";
}

// --- Custom Message Box ---
function showCompletionMessage() {
    // Check if already exists
    if (document.getElementById('custom-alert')) return;

    const alertHtml = `
        <div id="custom-alert" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4 transition-opacity duration-300">
            <div class="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl transform scale-95 transition-transform duration-300 text-center">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fa-solid fa-graduation-cap text-3xl text-green-600"></i>
                </div>
                <h2 class="text-2xl font-bold text-gray-800 mb-2">Great Job!</h2>
                <p class="text-gray-600 mb-6">You've reviewed the core concepts of Machine Learning. Ready to learn more?</p>
                <button onclick="closeMessage()" class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl transition-colors">
                    Close & Review
                </button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', alertHtml);

    // Trigger animation
    setTimeout(() => {
        const alertBox = document.querySelector('#custom-alert > div');
        alertBox.classList.remove('scale-95');
        alertBox.classList.add('scale-100');
    }, 10);
}

function closeMessage() {
    const alertEl = document.getElementById('custom-alert');
    if (alertEl) {
        alertEl.style.opacity = '0';
        setTimeout(() => alertEl.remove(), 300);
    }
}