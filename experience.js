// Experience Page Interactive JavaScript

class ExperiencePageEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.setupThemeSync();
        this.setupScrollEffects();
        this.setupProjectCardAnimations();
        this.setupProgressBar();
        this.setupPageAnimations();
    }

    // Theme synchronization with main page
    setupThemeSync() {
        // Create theme toggle button
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '🌙';
        themeToggle.title = 'Toggle theme';
        document.body.appendChild(themeToggle);

        // Load saved theme from main page
        const savedTheme = localStorage.getItem('theme');
        const isLight = savedTheme === 'light';
        
        if (isLight) {
            document.body.classList.add('light-theme');
            themeToggle.innerHTML = '☀️';
            this.applyLightTheme();
        }

        // Toggle theme functionality
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLightMode = document.body.classList.contains('light-theme');
            themeToggle.innerHTML = isLightMode ? '☀️' : '🌙';
            
            // Save preference (syncs with main page)
            localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
            
            if (isLightMode) {
                this.applyLightTheme();
            } else {
                this.applyDarkTheme();
            }
        });

        this.addThemeStyles();
    }

    applyLightTheme() {
        document.documentElement.style.setProperty('--bg-color', '#f8fafc');
        document.documentElement.style.setProperty('--text-color', '#334155');
        document.documentElement.style.setProperty('--secondary-color', '#e2e8f0');
        document.documentElement.style.setProperty('--accent-color', '#cbd5e1');
        document.documentElement.style.setProperty('--primary-color', '#2dd4bf');
        document.body.style.backgroundColor = '#f8fafc';
    }

    applyDarkTheme() {
        document.documentElement.style.setProperty('--bg-color', '#0f172a');
        document.documentElement.style.setProperty('--text-color', '#cbd5e1');
        document.documentElement.style.setProperty('--secondary-color', '#1e293b');
        document.documentElement.style.setProperty('--accent-color', '#334155');
        document.documentElement.style.setProperty('--primary-color', '#2dd4bf');
        document.body.style.backgroundColor = '#0f172a';
    }

    // Scroll effects for better UX
    setupScrollEffects() {
        const scrollTopBtn = this.createScrollTopButton();
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            // Scroll to top button visibility
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

            this.updateProgressBar();
        });

        // Scroll to top functionality
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    createScrollTopButton() {
        const scrollTopBtn = document.createElement('button');
        scrollTopBtn.className = 'scroll-top-btn';
        scrollTopBtn.innerHTML = '&uarr;';
        scrollTopBtn.title = 'Go to top';
        scrollTopBtn.style.display = 'none';
        document.body.appendChild(scrollTopBtn);
        return scrollTopBtn;
    }

    // Project card animations (if any project cards exist)
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

    // Progress bar for reading progress
    setupProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
        this.updateProgressBar();
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

    // Page load animations
    setupPageAnimations() {
        // Fade in content on page load
        window.addEventListener('load', () => {
            document.body.classList.add('page-loaded');
        });

        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe main content elements
        const elementsToAnimate = document.querySelectorAll('.details-content > *, .project-card');
        elementsToAnimate.forEach(element => {
            element.classList.add('fade-in-up');
            observer.observe(element);
        });

        this.addAnimationStyles();
    }

    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            body {
                opacity: 0;
                transition: opacity 0.6s ease;
            }
            
            body.page-loaded {
                opacity: 1;
            }
            
            .fade-in-up {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .fade-in-up.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .experience-image-container {
                overflow: hidden;
                border-radius: 12px;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            
            .experience-image-container:hover {
                transform: translateY(-5px);
                box-shadow: 0 20px 40px rgba(0,0,0,0.2), 0 0 20px rgba(45, 212, 191, 0.2);
            }
            
            .back-link {
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }
            
            .back-link:hover {
                transform: translateX(-5px);
                color: #2dd4bf;
            }
            
            .back-link::before {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 0;
                height: 2px;
                background-color: #2dd4bf;
                transition: width 0.3s ease;
            }
            
            .back-link:hover::before {
                width: 100%;
            }
        `;
        document.head.appendChild(style);
    }

    addThemeStyles() {
        const style = document.createElement('style');
        style.textContent = `
            :root {
                --bg-color: #0f172a;
                --text-color: #cbd5e1;
                --primary-color: #2dd4bf;
                --secondary-color: #1e293b;
                --accent-color: #334155;
            }
            
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
            
            .scroll-top-btn {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: var(--primary-color);
                color: var(--bg-color);
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                font-size: 1.5rem;
                cursor: pointer;
                z-index: 99;
                transition: all 0.3s ease;
                opacity: 0;
            }
            
            .scroll-top-btn:hover {
                transform: scale(1.1);
                background-color: #5eead4;
            }
            
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
            
            /* Light theme styles */
            .light-theme .experience-title,
            .light-theme .achievements-heading,
            .light-theme .card-description {
                color: #1e293b !important;
            }
            
            .light-theme .back-link {
                color: #475569 !important;
            }
            
            .light-theme .back-link:hover {
                color: #2dd4bf !important;
            }
            
            .light-theme .project-card {
                background-color: #e2e8f0 !important;
                border: 1px solid #cbd5e1;
            }
            
            .light-theme body {
                background-color: #f8fafc !important;
                color: #334155 !important;
            }
            
            .light-theme .period {
                color: #64748b !important;
            }
            
            .light-theme .description {
                color: #475569 !important;
            }
            
            .light-theme li {
                color: #475569 !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ExperiencePageEnhancer();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});