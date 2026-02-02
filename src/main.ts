// DOM Elements
const adminWindow = document.getElementById('admin-window') as HTMLElement;
const minimizeTab = document.getElementById('minimize-tab') as HTMLElement;
const closeBtn = document.getElementById('close-btn') as HTMLElement;
const minimizeBtn = document.getElementById('minimize-btn') as HTMLElement;
const openBtn = document.getElementById('open-btn') as HTMLElement;

const editPromptBtn = document.getElementById('edit-prompt-btn') as HTMLElement;
const promptModal = document.getElementById('prompt-modal') as HTMLElement;
const cancelPrompt = document.getElementById('cancel-prompt') as HTMLElement;
const savePrompt = document.getElementById('save-prompt') as HTMLElement;
const systemPromptArea = document.getElementById('system-prompt') as HTMLTextAreaElement;

const bruteForceBtn = document.getElementById('brute-force-btn') as HTMLElement;
const planButtons = document.querySelectorAll('.plan-btn');
const planStatus = document.getElementById('plan-status') as HTMLElement;
const header = document.querySelector('.window-header') as HTMLElement;

// Dragging Logic
let isDragging = false;
let startX: number, startY: number;
let initialLeft: number, initialTop: number;

header.onmousedown = (e: MouseEvent) => {
    // Don't drag if clicking a control button
    if ((e.target as HTMLElement).classList.contains('control-btn')) return;

    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;

    // Get current position
    const rect = adminWindow.getBoundingClientRect();
    initialLeft = rect.left;
    initialTop = rect.top;

    // Remove the center transform and set absolute position to prevent jumping
    adminWindow.style.transform = 'none';
    adminWindow.style.left = `${initialLeft}px`;
    adminWindow.style.top = `${initialTop}px`;
    adminWindow.style.transition = 'none'; // Disable transition while dragging

    header.style.cursor = 'grabbing';
};

document.onmousemove = (e: MouseEvent) => {
    if (!isDragging) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    adminWindow.style.left = `${initialLeft + dx}px`;
    adminWindow.style.top = `${initialTop + dy}px`;
};

document.onmouseup = () => {
    if (isDragging) {
        isDragging = false;
        header.style.cursor = 'grab';
        adminWindow.style.transition = ''; // Re-enable transitions
    }
};

// Window Controls
minimizeBtn.onclick = () => {
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
    adminWindow.classList.remove('closed');
};

openBtn.onclick = () => {
    // Already open, maybe pulse or something
    adminWindow.style.transform = 'scale(1.02)';
    setTimeout(() => adminWindow.style.transform = 'scale(1)', 200);
};

closeBtn.onclick = () => {
    adminWindow.classList.add('closed');
    // Allow re-opening from the bottom tab as well if closed
    setTimeout(() => {
        minimizeTab.classList.remove('hidden');
    }, 300);
};

// System Prompt Logic
editPromptBtn.onclick = () => {
    promptModal.classList.remove('hidden');
    systemPromptArea.focus();
};

cancelPrompt.onclick = () => {
    promptModal.classList.add('hidden');
};

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

// Brute Force Logic
bruteForceBtn.onclick = () => {
    const originalText = bruteForceBtn.innerText;
    bruteForceBtn.innerText = 'BRUTE FORCING...';
    bruteForceBtn.style.opacity = '0.7';

    setTimeout(() => {
        bruteForceBtn.innerText = 'SUCCESS';
        bruteForceBtn.style.backgroundColor = 'var(--accent-green)';
        bruteForceBtn.style.color = 'white';

        setTimeout(() => {
            bruteForceBtn.innerText = originalText;
            bruteForceBtn.style.backgroundColor = '';
            bruteForceBtn.style.color = '';
            bruteForceBtn.style.opacity = '1';
        }, 2000);
    }, 1500);
};

// Subscription Logic
planButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const plan = btn.getAttribute('data-plan');

        // Update active class
        planButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update status text
        if (planStatus) {
            planStatus.innerHTML = `Current Tier: <strong>${plan}</strong> (Free Access)`;
        }
    });
});
