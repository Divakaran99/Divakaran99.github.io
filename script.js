// Intersection Observer for scroll reveal animations
document.addEventListener('DOMContentLoaded', () => {
    // Add reveal class to sections
    const elementsToReveal = document.querySelectorAll('section, .card, .hero');
    elementsToReveal.forEach(el => {
        if (!el.classList.contains('hero')) {
            el.classList.add('reveal');
        }
    });
    
    // Initial reveal for hero section elements
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero > *');
        heroElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `all 0.6s cubic-bezier(0.5, 0, 0, 1) ${index * 0.15}s`;
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100);
        });
    }, 100);

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
    
    // Typing effect for the console-like elements
    const terminalTexts = document.querySelectorAll('.typewriter');
    terminalTexts.forEach(el => {
        const text = el.getAttribute('data-text');
        if (!text) return;
        
        el.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50 + Math.random() * 50);
            }
        };
        
        // Start typing when element comes into view
        const typeObserver = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) {
                setTimeout(typeWriter, 500);
                typeObserver.disconnect();
            }
        });
        typeObserver.observe(el);
    });

    // Interactive Cursor Glow
    const glowOverlay = document.createElement('div');
    glowOverlay.classList.add('cursor-glow-overlay');
    document.body.appendChild(glowOverlay);

    document.addEventListener('mousemove', (e) => {
        glowOverlay.style.setProperty('--mouse-x', `${e.clientX}px`);
        glowOverlay.style.setProperty('--mouse-y', `${e.clientY}px`);
    });
});
