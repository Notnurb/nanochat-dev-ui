// Compiled JavaScript for NanoChat Admin Panel

// DOM Elements
const adminWindow = document.getElementById('admin-window');
const minimizeTab = document.getElementById('minimize-tab');
const closeBtn = document.getElementById('close-btn');
const minimizeBtn = document.getElementById('minimize-btn');
const openBtn = document.getElementById('open-btn');

const editPromptBtn = document.getElementById('edit-prompt-btn');
const promptModal = document.getElementById('prompt-modal');
const cancelPrompt = document.getElementById('cancel-prompt');
const savePrompt = document.getElementById('save-prompt');
const systemPromptArea = document.getElementById('system-prompt');

const bruteForceBtn = document.getElementById('brute-force-btn');
const planButtons = document.querySelectorAll('.plan-btn');
const planStatus = document.getElementById('plan-status');
const header = document.querySelector('.window-header');

// Dragging Logic
let isDragging = false;
let startX, startY;
let initialLeft, initialTop;

if (header) {
    header.onmousedown = (e) => {
        if (e.target.classList.contains('control-btn')) return;

        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;

        const rect = adminWindow.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;

        adminWindow.style.transform = 'none';
        adminWindow.style.left = initialLeft + 'px';
        adminWindow.style.top = initialTop + 'px';
        adminWindow.style.transition = 'none';

        header.style.cursor = 'grabbing';
    };
}

document.onmousemove = (e) => {
    if (!isDragging) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    adminWindow.style.left = (initialLeft + dx) + 'px';
    adminWindow.style.top = (initialTop + dy) + 'px';
};

document.onmouseup = () => {
    if (isDragging) {
        isDragging = false;
        if (header) header.style.cursor = 'grab';
        adminWindow.style.transition = '';
    }
};

// Window Controls
minimizeBtn.onclick = () => {
    // Save current transform if needed, but here we just hide
    adminWindow.style.opacity = '0';
    adminWindow.style.pointerEvents = 'none';
    setTimeout(() => {
        minimizeTab.classList.remove('hidden');
    }, 300);
};

minimizeTab.onclick = () => {
    minimizeTab.classList.add('hidden');
    adminWindow.style.opacity = '1';
    adminWindow.style.pointerEvents = 'all';
};

openBtn.onclick = () => {
    adminWindow.style.transform = 'scale(1.02)';
    setTimeout(() => adminWindow.style.transform = 'scale(1)', 200);
};

closeBtn.onclick = () => {
    adminWindow.classList.add('closed');
    setTimeout(() => {
        minimizeTab.classList.remove('hidden');
    }, 300);
};

// System Prompt Logic
if (editPromptBtn) {
    editPromptBtn.onclick = () => {
        promptModal.classList.remove('hidden');
        systemPromptArea.focus();
    };
}

if (cancelPrompt) {
    cancelPrompt.onclick = () => {
        promptModal.classList.add('hidden');
    };
}

if (savePrompt) {
    savePrompt.onclick = () => {
        const prompt = systemPromptArea.value;
        console.log('Saving system prompt:', prompt);
        savePrompt.innerText = 'Saving...';
        setTimeout(() => {
            savePrompt.innerText = 'Saved!';
            setTimeout(() => {
                savePrompt.innerText = 'Save Changes';
                promptModal.classList.add('hidden');
            }, 800);
        }, 1000);
    };
}

// Brute Force Logic
if (bruteForceBtn) {
    bruteForceBtn.onclick = () => {
        const originalText = bruteForceBtn.innerText;
        bruteForceBtn.innerText = 'BRUTE FORCING...';
        bruteForceBtn.style.opacity = '0.7';

        setTimeout(() => {
            bruteForceBtn.innerText = 'SUCCESS';
            bruteForceBtn.style.backgroundColor = '#10b981'; // accent-green
            bruteForceBtn.style.color = 'white';

            setTimeout(() => {
                bruteForceBtn.innerText = originalText;
                bruteForceBtn.style.backgroundColor = '';
                bruteForceBtn.style.color = '';
                bruteForceBtn.style.opacity = '1';
            }, 2000);
        }, 1500);
    };
}

// Subscription Logic
planButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const plan = btn.getAttribute('data-plan');

        planButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (planStatus) {
            planStatus.innerHTML = `Current Tier: <strong>${plan}</strong> (Free Access)`;
        }
    });
});
