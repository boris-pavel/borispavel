document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-dot-outline');

    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows instantly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline follows with slight delay handled by CSS transition, just update position
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        });
    }

    // Typing Effect Logic
    const textElement = document.getElementById('typing-text');
    const phrases = [
        "Human-Centric Engineering",
        "Python & Systems",
        "Intelligent Design",
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            // Remove previous character
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Faster deletion
        } else {
            // Add next character
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // Normal typing speed
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Finished typing phrase, pause before deleting
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, move to next phrase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing effect
    setTimeout(type, 1000);

    // Smooth Scroll for Anchor Links (Polyfill-like behavior if needed, essentially ensures smooth scroll)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Code Block Syntax Highlighting (Simple Fake Logic for visual)
    const codeBlock = document.getElementById('code-display');
    if (codeBlock) {
        let html = codeBlock.innerHTML;
        // Simple regex based replacers for color
        // Keywords
        html = html.replace(/(class|def|self|return)/g, '<span style="color: #ff5f56;">$1</span>');
        // Strings
        html = html.replace(/(".*?")/g, '<span style="color: #a5d6ff;">$1</span>');
        // Function names
        html = html.replace(/(init|build)/g, '<span style="color: #d2a8ff;">$1</span>');

        codeBlock.innerHTML = html;
    }
});
