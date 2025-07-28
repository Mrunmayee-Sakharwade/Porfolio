// Enhanced Animations with IntersectionObserver and AOS
function initIntersectionObserver() {
    // Initialize AOS (Animate On Scroll) library
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // Enhanced intersection observer for custom animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation for children
                const children = entry.target.querySelectorAll('.animate-child, .skill-item, .project-card, .cert-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                        child.style.animationDelay = `${index * 0.1}s`;
                        
                        // Add floating animation to skill items
                        if (child.classList.contains('skill-item')) {
                            child.style.animation = `float 6s ease-in-out ${index * 0.1}s infinite`;
                        }
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.scroll-reveal, .project-card, .skill-item, .about-highlight, section, .cert-card');
    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

// Enhanced Dynamic Effects
function initEnhancedAnimations() {
    // Add fade-up animation classes to text blocks
    const textBlocks = document.querySelectorAll('p, h2, h3, h4, .about-text, .highlight-content');
    textBlocks.forEach((block, index) => {
        block.classList.add('fade-up-element');
        block.style.animationDelay = `${index * 0.1}s`;
    });

    // Add hover effects to images and project thumbnails
    const images = document.querySelectorAll('img, .project-card');
    images.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
            img.style.filter = 'brightness(0.8)';
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
            img.style.filter = 'brightness(1)';
        });
    });

    // Enhanced cursor effects
    initCustomCursor();
    
    // Add ripple effect to buttons
    addRippleEffect();
}

// Custom Cursor Effects
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorFollower = document.createElement('div');

    // Position the cursor
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    const speed = 0.15;

    const animateCursor = () => {
        // Add easing to cursor movement
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * speed;
        cursorY += dy * speed;
        
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        
        requestAnimationFrame(animateCursor);
    };

    // Update mouse position
    const updateCursorPosition = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    };

    // Add cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-item, input, textarea, .nav-link, .cert-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            cursor.classList.add('cursor-hover');
            cursorDot.classList.add('cursor-dot-hover');
            
            // Add custom text for different elements
            if (el.classList.contains('project-card')) {
                cursorText.textContent = 'View';
                cursorText.style.opacity = '1';
            } else if (el.tagName === 'A') {
                cursorText.textContent = 'Click';
                cursorText.style.opacity = '1';
            } else if (el.tagName === 'BUTTON') {
                cursorText.textContent = 'Tap';
                cursorText.style.opacity = '1';
            }
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorDot.classList.remove('cursor-dot-hover');
            cursorText.style.opacity = '0';
        });
    });

    // Click effect
    document.addEventListener('mousedown', () => {
        cursor.classList.add('cursor-click');
        cursorDot.classList.add('cursor-dot-click');
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%) scale(0.8)`;
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('cursor-click');
        cursorDot.classList.remove('cursor-dot-click');
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%) scale(1)`;
    });

    // Follow mouse movement
    document.addEventListener('mousemove', updateCursorPosition);
    
    // Start animation
    animateCursor();
}

// Ripple Effect for Buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('button, .btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Parallax scroll effects for enhanced depth
function initParallaxScrolling() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Text reveal animation on scroll
function initTextRevealAnimation() {
    const textElements = document.querySelectorAll('.reveal-text');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${index * 0.05}s`;
            span.classList.add('char-reveal');
            element.appendChild(span);
        });
    });
}
