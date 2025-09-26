// Simplified Interactive Portfolio JavaScript

class PortfolioEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollEffects();
        this.setupTypingAnimation();
        this.setupProjectCardAnimations();
        this.setupThemeToggle();
        this.setupProgressBar();
    }

    setupScrollEffects() {
        const header = document.getElementById('header');
        const scrollTopBtn = document.getElementById('scrollTopBtn');

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            if (scrollTopBtn) {
                if (currentScrollY > 300) {
                    scrollTopBtn.style.display = 'block';
                    scrollTopBtn.style.opacity = '1';
                } else {
                    scrollTopBtn.style.opacity = '0';
                    setTimeout(() => {
                        if (window.scrollY <= 300) {
                            scrollTopBtn.style.display = 'none';
                        }
                    }, 300);
                }
            }

            this.updateProgressBar();
        });

        if (scrollTopBtn) {
            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Typing animation for hero section
    setupTypingAnimation() {
        const heroName = document.querySelector('.hero-name');
        if (!heroName) return;

        const text = heroName.textContent;
        heroName.textContent = '';
        heroName.style.borderRight = '2px solid #2dd4bf';

        let index = 0;
        const typingSpeed = 50;

        const typeWriter = () => {
            if (index < text.length) {
                heroName.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    heroName.style.borderRight = 'none';
                }, 1000);
            }
        };

        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);
    }

    // Enhanced project card interactions
    setupProjectCardAnimations() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            // 3D tilt effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        });
    }

    // Theme toggle functionality - FIXED
    setupThemeToggle() {
        // Create theme toggle button
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '🌙';
        themeToggle.title = 'Toggle theme';
        document.body.appendChild(themeToggle);

        // Toggle theme
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            themeToggle.innerHTML = isLight ? '☀️' : '🌙';
            
            // Save preference
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            
            // Update CSS variables for light theme
            if (isLight) {
                document.documentElement.style.setProperty('--bg-color', '#f8fafc');
                document.documentElement.style.setProperty('--text-color', '#334155');
                document.documentElement.style.setProperty('--secondary-color', '#e2e8f0');
                document.documentElement.style.setProperty('--accent-color', '#cbd5e1');
            } else {
                // Reset to dark theme
                document.documentElement.style.setProperty('--bg-color', '#0f172a');
                document.documentElement.style.setProperty('--text-color', '#cbd5e1');
                document.documentElement.style.setProperty('--secondary-color', '#1e293b');
                document.documentElement.style.setProperty('--accent-color', '#334155');
            }
        });

        // Load saved theme on page load
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            themeToggle.innerHTML = '☀️';
            // Apply light theme CSS variables
            document.documentElement.style.setProperty('--bg-color', '#f8fafc');
            document.documentElement.style.setProperty('--text-color', '#334155');
            document.documentElement.style.setProperty('--secondary-color', '#e2e8f0');
            document.documentElement.style.setProperty('--accent-color', '#cbd5e1');
        }

        this.addThemeStyles();
    }

    // Progress bar for reading progress
    setupProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);

        this.updateProgressBar();
        
        // Add progress bar styles
        this.addProgressBarStyles();
    }

    updateProgressBar() {
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        }
    }

    // Add progress bar styles
    addProgressBarStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .scroll-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, #2dd4bf, #5eead4);
                z-index: 1001;
                transition: width 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }

    // Add theme toggle styles
    addThemeStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .theme-toggle {
                position: fixed;
                bottom: 80px;
                right: 20px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: none;
                background: var(--secondary-color);
                color: var(--text-color);
                font-size: 1.5rem;
                cursor: pointer;
                z-index: 100;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            }
            
            .theme-toggle:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(0,0,0,0.3);
            }
            
            .light-theme .main-header {
                background-color: rgba(248, 250, 252, 0.8);
            }
            
            .light-theme .section-heading,
            .light-theme .card-title,
            .light-theme .experience-title {
                color: #1e293b !important;
            }
            
            .light-theme .logo-link {
                color: #1e293b !important;
            }
            
            .light-theme .hero-name {
                color: #1e293b !important;
            }
            
            .light-theme body {
                background-image: none;
                background-color: #f8fafc;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioEnhancer();
});

// Performance utility functions
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};