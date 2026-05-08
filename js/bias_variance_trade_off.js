// --- State Management ---
let currentStep = 0;
const totalSteps = 5;

// --- Canvas Setup ---
const canvas = document.getElementById('viz-canvas');
const ctx = canvas.getContext('2d');

// Handle responsive canvas resolution
function resizeCanvas() {
    canvas.width = canvas.clientWidth * window.devicePixelRatio;
    canvas.height = canvas.clientHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    drawCurrentStep();
}
window.addEventListener('resize', resizeCanvas);

// --- Data Generation (fixed to keep consistency across steps) ---
// We will simulate data based on a sine wave + random noise
const points = [];
const numPoints = 25;
// Pre-generate points to ensure they don't change randomly on redraw
Math.seedrandom = 42; // arbitrary seed concept
for (let i = 0; i < numPoints; i++) {
    // Distribute mostly evenly, with a little random horizontal jitter
    let xNorm = (i / (numPoints - 1)) * 0.9 + 0.05 + (Math.random() - 0.5) * 0.02;
    // Underlying pattern is a sine wave
    let trueY = Math.sin(xNorm * Math.PI * 1.5) * 0.4 + 0.5;
    // Add noise
    let noise = (Math.random() - 0.5) * 0.3;
    let yNorm = trueY + noise;

    // Constrain y
    yNorm = Math.max(0.1, Math.min(0.9, yNorm));

    points.push({ xNorm, yNorm });
}

// --- Step Definitions ---
const steps = [
    {
        title: "1. The Raw Data",
        desc: "Here is our training data (the blue dots). In the real world, data has an underlying true pattern (a signal), but it's also messy and contains random variations (noise). Our machine learning model needs to find the true pattern.",
        draw: drawDataOnly
    },
    {
        title: "2. Underfitting (High Bias)",
        desc: "<span class='font-semibold text-orange-600'>High Bias</span> means our model makes strong assumptions and is too simple. Here, we try to fit a straight line to curvy data. It ignores the true underlying pattern entirely. It performs poorly on both training data and new data.",
        draw: drawUnderfit
    },
    {
        title: "3. Overfitting (High Variance)",
        desc: "<span class='font-semibold text-red-600'>High Variance</span> means our model is overly complex. It perfectly memorizes the training data, including the random noise! If we give this model new, unseen data, its wild fluctuations will cause massive errors. It doesn't generalize.",
        draw: drawOverfit
    },
    {
        title: "4. The Sweet Spot (Good Balance)",
        desc: "<span class='font-semibold text-emerald-600'>Balanced Complexity</span> is the goal. This smooth curve captures the true underlying pattern (the signal) without twisting itself to touch every single noisy data point. It will perform best on new, unseen data.",
        draw: drawOptimal
    },
    {
        title: "5. The Trade-off Graph",
        desc: "As model complexity increases, <b>Bias decreases</b> (it learns the training data better), but <b>Variance increases</b> (it becomes too sensitive to noise). The optimal model minimizes the Total Error on unseen test data. This is the <b>Bias-Variance Trade-off</b>.",
        draw: drawGraph
    }
];

// --- Drawing Helper Functions ---
function getCanvasDimensions() {
    // Using clientWidth/Height because we scaled the context
    return { w: canvas.clientWidth, h: canvas.clientHeight };
}

function drawGrid(w, h) {
    ctx.strokeStyle = '#f1f5f9'; // slate-100
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i <= 10; i++) {
        let x = (w / 10) * i;
        let y = (h / 10) * i;
        ctx.moveTo(x, 0); ctx.lineTo(x, h);
        ctx.moveTo(0, y); ctx.lineTo(w, y);
    }
    ctx.stroke();
}

function drawPoints(w, h) {
    ctx.fillStyle = '#3b82f6'; // blue-500
    ctx.strokeStyle = '#ffffff'; // white border
    ctx.lineWidth = 2;
    points.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.xNorm * w, (1 - p.yNorm) * h, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    });
}

function drawLine(startX, startY, endX, endY, color, width = 3, dashed = false) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    if (dashed) ctx.setLineDash([5, 5]);
    else ctx.setLineDash([]);
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.setLineDash([]); // Reset
}

function drawLegend(text, color, yOffset) {
    const { w } = getCanvasDimensions();
    ctx.fillStyle = color;
    ctx.fillRect(w - 150, 20 + yOffset, 15, 15);
    ctx.fillStyle = '#475569'; // slate-600
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(text, w - 125, 33 + yOffset);
}

// --- Specific Step Drawing Functions ---

function drawDataOnly() {
    const { w, h } = getCanvasDimensions();
    ctx.clearRect(0, 0, w, h);
    drawGrid(w, h);
    drawPoints(w, h);
    drawLegend('Training Data', '#3b82f6', 0);
}

function drawUnderfit() {
    drawDataOnly();
    const { w, h } = getCanvasDimensions();

    // Draw a straight line (Linear Regression approx)
    ctx.beginPath();
    ctx.strokeStyle = '#f97316'; // orange-500
    ctx.lineWidth = 4;
    ctx.moveTo(0, h * 0.7);
    ctx.lineTo(w, h * 0.3);
    ctx.stroke();

    drawLegend('Underfitted Model', '#f97316', 30);
}

function drawOverfit() {
    drawDataOnly();
    const { w, h } = getCanvasDimensions();

    // Draw jagged line connecting points perfectly
    // Sort points by X first
    const sorted = [...points].sort((a, b) => a.xNorm - b.xNorm);

    ctx.beginPath();
    ctx.strokeStyle = '#ef4444'; // red-500
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';

    ctx.moveTo(sorted[0].xNorm * w, (1 - sorted[0].yNorm) * h);
    for (let i = 1; i < sorted.length; i++) {
        ctx.lineTo(sorted[i].xNorm * w, (1 - sorted[i].yNorm) * h);
    }
    ctx.stroke();

    drawLegend('Overfitted Model', '#ef4444', 30);
}

function drawOptimal() {
    drawDataOnly();
    const { w, h } = getCanvasDimensions();

    // Draw the true underlying sine wave
    ctx.beginPath();
    ctx.strokeStyle = '#10b981'; // emerald-500
    ctx.lineWidth = 4;

    for (let x = 0; x <= w; x += 2) {
        let xNorm = x / w;
        let trueY = Math.sin(xNorm * Math.PI * 1.5) * 0.4 + 0.5;
        let canvasY = (1 - trueY) * h;

        if (x === 0) ctx.moveTo(x, canvasY);
        else ctx.lineTo(x, canvasY);
    }
    ctx.stroke();

    drawLegend('Optimal Model', '#10b981', 30);
}

function drawGraph() {
    const { w, h } = getCanvasDimensions();
    ctx.clearRect(0, 0, w, h);

    const margin = 50;
    const graphW = w - margin * 2;
    const graphH = h - margin * 2;

    // Draw Axes
    drawLine(margin, h - margin, w - margin, h - margin, '#94a3b8', 2); // X axis
    drawLine(margin, h - margin, margin, margin, '#94a3b8', 2); // Y axis

    // Axis Labels
    ctx.fillStyle = '#475569';
    ctx.font = '16px font-bold sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Model Complexity (Low → High)', w / 2, h - margin + 40);

    ctx.save();
    ctx.translate(margin - 30, h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Error', 0, 0);
    ctx.restore();

    // Draw Bias^2 line (decreases with complexity)
    ctx.beginPath();
    ctx.strokeStyle = '#f97316'; // orange
    ctx.lineWidth = 3;
    for (let x = 0; x <= graphW; x += 5) {
        let normX = x / graphW;
        // exponential decay
        let y = Math.pow(1 - normX, 3) * graphH * 0.8 + 20;
        if (x === 0) ctx.moveTo(margin + x, h - margin - y);
        else ctx.lineTo(margin + x, h - margin - y);
    }
    ctx.stroke();

    // Draw Variance line (increases with complexity)
    ctx.beginPath();
    ctx.strokeStyle = '#ef4444'; // red
    ctx.lineWidth = 3;
    for (let x = 0; x <= graphW; x += 5) {
        let normX = x / graphW;
        // exponential growth
        let y = Math.pow(normX, 3) * graphH * 0.8 + 20;
        if (x === 0) ctx.moveTo(margin + x, h - margin - y);
        else ctx.lineTo(margin + x, h - margin - y);
    }
    ctx.stroke();

    // Draw Total Error line (U-shape)
    ctx.beginPath();
    ctx.strokeStyle = '#8b5cf6'; // purple
    ctx.lineWidth = 4;
    let minErrorY = Infinity;
    let minErrorX = 0;

    for (let x = 0; x <= graphW; x += 5) {
        let normX = x / graphW;
        let biasSq = Math.pow(1 - normX, 3) * graphH * 0.8 + 20;
        let variance = Math.pow(normX, 3) * graphH * 0.8 + 20;
        // Total error = Bias^2 + Variance + Irreducible Error
        let totalErr = biasSq + variance + 30;

        if (totalErr < minErrorY) {
            minErrorY = totalErr;
            minErrorX = margin + x;
        }

        if (x === 0) ctx.moveTo(margin + x, h - margin - totalErr);
        else ctx.lineTo(margin + x, h - margin - totalErr);
    }
    ctx.stroke();

    // Optimal spot line
    drawLine(minErrorX, h - margin, minErrorX, h - margin - minErrorY, '#10b981', 2, true);

    // Draw Optimal Point dot
    ctx.beginPath();
    ctx.fillStyle = '#10b981';
    ctx.arc(minErrorX, h - margin - minErrorY, 6, 0, Math.PI * 2);
    ctx.fill();

    // Graph Legend
    ctx.textAlign = 'left';
    ctx.fillStyle = '#f97316'; ctx.fillText('Bias²', margin + 20, margin + 20);
    ctx.fillStyle = '#ef4444'; ctx.fillText('Variance', w - margin - 80, margin + 40);
    ctx.fillStyle = '#8b5cf6'; ctx.fillText('Total Test Error', w / 2 + 30, margin + 20);

    // Regions text
    ctx.font = '13px sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'center';
    ctx.fillText('Underfitting Zone', margin + 80, h - margin - 15);
    ctx.fillText('Overfitting Zone', w - margin - 80, h - margin - 15);
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('Sweet Spot', minErrorX, h - margin + 20);
}

// --- UI Updates ---
const titleEl = document.getElementById('step-title');
const descEl = document.getElementById('step-description');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const counterEl = document.getElementById('step-counter');
const dotsContainer = document.getElementById('dots-container');

function initDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSteps; i++) {
        const dot = document.createElement('div');
        dot.className = `w-2.5 h-2.5 rounded-full transition-colors duration-300 ${i === currentStep ? 'bg-blue-600' : 'bg-slate-200'}`;
        dotsContainer.appendChild(dot);
    }
}

function updateDots() {
    const dots = dotsContainer.children;
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = `w-2 h-2 rounded-full transition-all duration-300 ${i === currentStep ? 'bg-blue-600 w-6' : 'bg-slate-300'}`;
    }
}

function updateUI() {
    // Apply text transition by briefly hiding
    titleEl.style.opacity = '0';
    descEl.style.opacity = '0';

    setTimeout(() => {
        const stepData = steps[currentStep];
        titleEl.innerHTML = stepData.title;
        descEl.innerHTML = stepData.desc;

        titleEl.style.opacity = '1';
        descEl.style.opacity = '1';
    }, 150);

    // Update Counter & Dots
    counterEl.innerText = `Step ${currentStep + 1} of ${totalSteps}`;
    updateDots();

    // Update Button States
    btnPrev.disabled = currentStep === 0;

    if (currentStep === totalSteps - 1) {
        btnNext.disabled = true;
        btnNext.innerText = "Finish";
        btnNext.classList.replace('bg-blue-600', 'bg-emerald-500');
        btnNext.classList.replace('hover:bg-blue-700', 'hover:bg-emerald-600');
        btnNext.classList.replace('shadow-blue-200', 'shadow-emerald-200');
    } else {
        btnNext.innerHTML = 'Next Step &rarr;';
    }

    // Draw Canvas
    drawCurrentStep();
}

function drawCurrentStep() {
    // Re-ensure canvas dimensions match display for sharp rendering
    canvas.width = canvas.clientWidth * window.devicePixelRatio;
    canvas.height = canvas.clientHeight * window.devicePixelRatio;
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    steps[currentStep].draw();
}

// --- Event Listeners ---
btnNext.addEventListener('click', () => {
    if (currentStep < totalSteps - 1) {
        currentStep++;
    } else {
        currentStep = 0; // Loop back
    }
    updateUI();
});

btnPrev.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        updateUI();
    }
});

// --- Initialization ---
// Need a slight delay to ensure canvas clientWidth is calculated by browser
window.onload = () => {
    initDots();
    resizeCanvas();
    updateUI();
};