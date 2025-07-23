// Example function for handling animations
function splitAndAnimateLetters(elementId, baseDelay = 0) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const text = element.textContent;
    element.textContent = '';

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const span = document.createElement('span');
        span.textContent = char;
        span.classList.add('animated-letter');
        if (char === ' ') {
            span.classList.add('space');
        }
        span.style.animationDelay = `${baseDelay + (i * 0.02)}s`;
        fragment.appendChild(span);
    }
    element.appendChild(fragment);
}

// Example function for showing a message box
function showMessageBox(message, duration = 3000, isError = false) {
    const messageBox = document.getElementById('message-box');
    const messageText = document.getElementById('message-text');

    messageText.textContent = message;
    messageBox.classList.remove('bg-red-600', 'bg-green-600');
    messageBox.classList.add(isError ? 'bg-red-600' : 'bg-green-600');
    messageBox.querySelector('i').className = isError ? 'fas fa-times-circle' : 'fas fa-check-circle';

    messageBox.classList.add('show');

    setTimeout(() => {
        messageBox.classList.remove('show');
    }, duration);
}

// Add more functions as needed
