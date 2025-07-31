// Modern Portfolio JavaScript - Enhanced Interactivity

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initSkillsTabs();
    initTimelineProjects();
    initModeToggle();
    initScrollAnimations();
    initSmoothScrolling();
    initSkillProgressBars();
    initStickyNavigation();
    initIntersectionObserver();
    initEnhancedAnimations();
    initHorizontalScroll();
    initContactForm();
    initHeaderEmailLink();
});

// Toggle project description
function toggleDescription(button) {
    const projectCard = button.closest('.project-card');
    const description = projectCard.querySelector('.project-description');
    const buttonText = button.querySelector('span');
    const icon = button.querySelector('i');
    
    if (description.classList.contains('show')) {
        description.classList.remove('show');
        button.classList.remove('expanded');
        buttonText.textContent = 'View Description';
        setTimeout(() => {
            description.style.display = 'none';
        }, 300);
    } else {
        description.style.display = 'block';
        setTimeout(() => {
            description.classList.add('show');
            button.classList.add('expanded');
            buttonText.textContent = 'Hide Description';
        }, 10);
    }
}

// Initialize skill progress bars animation
function initSkillProgressBars() {
    const skillBars = document.querySelectorAll('.skill-progress[data-width]');
    
    const animateSkillBars = () => {
        skillBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.setProperty('--width', width);
            }, index * 100);
        });
    };
    
    // Trigger animation when skills section comes into view
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(skillsSection);
    }
}

// Interactive Skills Tabs functionality
function initSkillsTabs() {
    const tabs = document.querySelectorAll('.skills-tab');
    const panels = document.querySelectorAll('.skills-panel');
    
    // Ensure the first panel is visible by default
    const firstPanel = document.getElementById('languages-panel');
    if (firstPanel) {
        firstPanel.classList.add('active');
    }
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Hide all panels
            panels.forEach(panel => {
                panel.classList.remove('active');
            });
            
            // Show the target panel with animation
            const targetPanel = document.getElementById(tab.dataset.tab + '-panel');
            if (targetPanel) {
                // Small delay to ensure smooth transition
                setTimeout(() => {
                    targetPanel.classList.add('active');
                    // Trigger skill bar animations for the active panel
                    animateSkillBarsInPanel(targetPanel);
                }, 100);
            }
        });
    });
    
    // Animate skill bars in the initially active panel
    if (firstPanel) {
        setTimeout(() => {
            animateSkillBarsInPanel(firstPanel);
        }, 500);
    }
}

// Animate skill bars in a specific panel
function animateSkillBarsInPanel(panel) {
    const skillBars = panel.querySelectorAll('.skill-progress[data-width]');
    
    skillBars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        // Reset the animation
        bar.style.setProperty('--width', '0%');
        
        setTimeout(() => {
            bar.style.setProperty('--width', width);
        }, index * 100 + 200);
    });
}

// Enhanced project cards with better interactions
function initProjectCards() {
    const moreButtons = document.querySelectorAll('.more-btn');
    
    moreButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const details = document.getElementById(btn.dataset.project + '-details');
            const isVisible = details.style.display === 'block';
            
            if (isVisible) {
                // Hide details with smooth animation
                details.style.opacity = '0';
                details.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    details.style.display = 'none';
                    btn.textContent = 'More';
                    btn.classList.remove('active');
                }, 300);
            } else {
                // Hide all other project details first
                document.querySelectorAll('.project-details').forEach(d => {
                    d.style.opacity = '0';
                    d.style.transform = 'translateY(-20px)';
                    setTimeout(() => d.style.display = 'none', 300);
                });
                document.querySelectorAll('.more-btn').forEach(b => {
                    b.textContent = 'More';
                    b.classList.remove('active');
                });
                
                // Show current details with smooth animation
                setTimeout(() => {
                    details.style.display = 'block';
                    details.style.opacity = '0';
                    details.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        details.style.opacity = '1';
                        details.style.transform = 'translateY(0)';
                    }, 50);
                    btn.textContent = 'Less';
                    btn.classList.add('active');
                }, 300);
            }
        });
    });
}

// Enhanced dark/bright mode toggle with smooth transitions
function initModeToggle() {
    const modeToggle = document.getElementById('mode-toggle');

    // Set initial mode based on user preference or default to dark
    let savedMode = localStorage.getItem('portfolioMode');
    if (!savedMode) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            savedMode = 'bright-mode';
        } else {
            savedMode = 'dark-mode';
        }
    }
    document.body.classList.remove('dark-mode', 'bright-mode');
    document.body.classList.add(savedMode);
    updateModeIcon(savedMode);

    // Ensure the button is clickable and toggles mode
    if (modeToggle) {
        modeToggle.onclick = function() {
            document.body.style.transition = 'all 0.3s ease';

            const isDarkMode = document.body.classList.contains('dark-mode');
            if (isDarkMode) {
                document.body.classList.remove('dark-mode');
                document.body.classList.add('bright-mode');
                localStorage.setItem('portfolioMode', 'bright-mode');
                updateModeIcon('bright-mode');
            } else {
                document.body.classList.remove('bright-mode');
                document.body.classList.add('dark-mode');
                localStorage.setItem('portfolioMode', 'dark-mode');
                updateModeIcon('dark-mode');
            }

            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        };
    }
}

function updateModeIcon(mode) {
    const modeToggle = document.getElementById('mode-toggle');
    if (modeToggle) {
        if (mode === 'bright-mode') {
            modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Add staggered animation for skill badges
                if (entry.target.classList.contains('skills-panel')) {
                    const badges = entry.target.querySelectorAll('.skill-badge');
                    badges.forEach((badge, index) => {
                        setTimeout(() => {
                            badge.style.opacity = '1';
                            badge.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections and scroll-reveal elements
    document.querySelectorAll('section, .scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

// Smooth scrolling for navigation (if added later)
function initSmoothScrolling() {
    // Add smooth scrolling to any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Loading animations for skill badges
function initLoadingAnimations() {
    const skillBadges = document.querySelectorAll('.skill-badge');
    
    skillBadges.forEach((badge, index) => {
        // Make sure badges are visible initially
        badge.style.opacity = '1';
        badge.style.transform = 'translateY(0)';
        
        // Add staggered animation with delay
        setTimeout(() => {
            badge.style.transition = 'all 0.3s ease';
        }, index * 100);
        
        // Add hover effects
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Subtle parallax effects
function initParallaxEffects() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.project-card, .skill-badge');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index % 3) * 0.1;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    // Only enable parallax on larger screens
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', requestTick);
    }
}

// Add typing animation for the main title
function initTypingAnimation() {
    const title = document.querySelector('header h1');
    const text = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        title.textContent += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(typeInterval);
        }
    }, 100);
}

// Add floating animation to contact buttons
function initFloatingButtons() {
    const contactButtons = document.querySelectorAll('.contact-info .btn');
    
    contactButtons.forEach((btn, index) => {
        btn.style.animationDelay = `${index * 0.1}s`;
        btn.classList.add('floating');
    });
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add resize handler for responsive adjustments
window.addEventListener('resize', debounce(() => {
    // Reinitialize parallax based on screen size
    if (window.innerWidth <= 768) {
        // Disable parallax on mobile
        document.querySelectorAll('.project-card, .skill-badge').forEach(element => {
            element.style.transform = 'translateY(0)';
        });
    }
}, 250));

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Tab navigation for skills
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const activeTab = document.querySelector('.skills-tab.active');
        if (activeTab && document.activeElement === activeTab) {
            e.preventDefault();
            const tabs = Array.from(document.querySelectorAll('.skills-tab'));
            const currentIndex = tabs.indexOf(activeTab);
            let nextIndex;
            
            if (e.key === 'ArrowRight') {
                nextIndex = (currentIndex + 1) % tabs.length;
            } else {
                nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
            }
            
            tabs[nextIndex].click();
            tabs[nextIndex].focus();
        }
    }
});

// Add loading screen (optional)
function showLoadingScreen() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>Loading Portfolio...</p>
        </div>
    `;
    document.body.appendChild(loader);
    
    // Remove loader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 1000);
    });
}

// Initialize loading screen
// showLoadingScreen();

// Sticky Navigation
function initStickyNavigation() {
    const stickyNav = document.getElementById('stickyNav');
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (!stickyNav || !header) return;
    
    let headerHeight = header.offsetHeight;
    let isNavVisible = false;
    
    // Show/hide sticky nav based on scroll
    const handleScroll = debounce(() => {
        const scrollY = window.scrollY;
        
        if (scrollY > headerHeight && !isNavVisible) {
            stickyNav.classList.add('visible');
            isNavVisible = true;
        } else if (scrollY <= headerHeight && isNavVisible) {
            stickyNav.classList.remove('visible');
            isNavVisible = false;
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    }, 10);
    
    // Update active navigation link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Smooth scroll to sections
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            navLinksContainer.classList.remove('active');
        });
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', () => {
        headerHeight = header.offsetHeight;
    });
}

// IntersectionObserver for scroll animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation for children
                const children = entry.target.querySelectorAll('.animate-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.scroll-reveal, .project-card, .skill-item, .about-highlight, section');
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

    // Add enhanced hover effects to images and project thumbnails
    const images = document.querySelectorAll('img, .project-card');
    images.forEach(img => {
        img.addEventListener('mouseenter', () => {
            if (!img.style.transform.includes('scale')) {
                img.style.transform += ' scale(1.05)';
            }
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.transform = img.style.transform.replace(' scale(1.05)', '');
        });
    });

    // Add ripple effect to buttons
    addRippleEffect();
}

// Ripple Effect for Buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('button, .btn, .more-btn');
    
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

// Horizontal scroll functionality for projects
function initHorizontalScroll() {
    const scrollContainer = document.getElementById('projectsScroll');
    if (!scrollContainer) return;
    
    // Add smooth scrolling behavior
    scrollContainer.style.scrollBehavior = 'smooth';
    
    // Update scroll navigation visibility
    updateScrollNavigation();
    
    // Add scroll event listener to update navigation
    scrollContainer.addEventListener('scroll', debounce(updateScrollNavigation, 100));
}

// Scroll projects left or right
function scrollProjects(direction) {
    const scrollContainer = document.getElementById('projectsScroll');
    if (!scrollContainer) return;
    
    const scrollAmount = 420; // Card width + gap
    const currentScroll = scrollContainer.scrollLeft;
    
    if (direction === 'left') {
        scrollContainer.scrollLeft = currentScroll - scrollAmount;
    } else {
        scrollContainer.scrollLeft = currentScroll + scrollAmount;
    }
    
    // Update navigation after scroll
    setTimeout(updateScrollNavigation, 300);
}

// Update scroll navigation visibility
function updateScrollNavigation() {
    const scrollContainer = document.getElementById('projectsScroll');
    const leftNav = document.querySelector('.scroll-nav-left');
    const rightNav = document.querySelector('.scroll-nav-right');
    
    if (!scrollContainer || !leftNav || !rightNav) return;
    
    const isAtStart = scrollContainer.scrollLeft <= 0;
    const isAtEnd = scrollContainer.scrollLeft >= (scrollContainer.scrollWidth - scrollContainer.clientWidth);
    
    leftNav.style.opacity = isAtStart ? '0.5' : '1';
    leftNav.style.pointerEvents = isAtStart ? 'none' : 'auto';
    
    rightNav.style.opacity = isAtEnd ? '0.5' : '1';
    rightNav.style.pointerEvents = isAtEnd ? 'none' : 'auto';
}

// Toggle project details
function toggleProjectDetails(button) {
    const projectCard = button.closest('.project-card-horizontal');
    const details = projectCard.querySelector('.project-details');
    const buttonText = button.querySelector('span');
    const icon = button.querySelector('i');
    
    if (details.style.display === 'none' || !details.style.display) {
        details.style.display = 'block';
        setTimeout(() => {
            details.style.opacity = '1';
            details.style.transform = 'translateY(0)';
        }, 10);
        buttonText.textContent = 'Hide Details';
        icon.classList.remove('fa-arrow-right');
        icon.classList.add('fa-arrow-up');
    } else {
        details.style.opacity = '0';
        details.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            details.style.display = 'none';
        }, 300);
        buttonText.textContent = 'View Details';
        icon.classList.remove('fa-arrow-up');
        icon.classList.add('fa-arrow-right');
    }
}

// Initialize contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleContactFormSubmit);
    
    // Add input animations
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
}

// Handle contact form submission
function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Create mailto link (since we don't have a backend)
    const mailtoLink = `mailto:sakharawademrunmayee@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Simulate sending delay
    setTimeout(() => {
        // Open email client
        window.location.href = mailtoLink;
        
        // Reset form
        e.target.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showNotification('Message prepared! Your email client should open shortly.', 'success');
        
        // Remove focused class from form groups
        const formGroups = e.target.querySelectorAll('.form-group');
        formGroups.forEach(group => group.classList.remove('focused'));
        
    }, 1500);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Initialize header email link functionality
function initHeaderEmailLink() {
    const headerEmailBtn = document.querySelector('header .contact-info a[href^="mailto:"]');
    if (headerEmailBtn) {
        headerEmailBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const email = 'sakharawademrunmayee@gmail.com';
        
            // Try to open email client
            try {
                window.location.href = `mailto:${email}`;
            } catch (error) {
                // Fallback: copy email to clipboard and show notification
                navigator.clipboard.writeText(email).then(() => {
                    showNotification(`Email address copied to clipboard: ${email}`, 'success');
                }).catch(() => {
                    // Final fallback: show email in alert
                    alert(`Email: ${email}\n\nPlease copy this email address manually.`);
                });
            }
        });
    }
}
