// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections for animation
    const animatedElements = document.querySelectorAll('.blog-card, .project-card, .social-card, .hobby-card, .section-title');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add loading animation to elements
    const loadingElements = document.querySelectorAll('.blog-card, .project-card, .social-card, .hobby-card');
    loadingElements.forEach((el, index) => {
        el.classList.add('loading');
        setTimeout(() => {
            el.classList.add('loaded');
        }, index * 100);
    });
    
    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.blog-card, .project-card, .social-card, .hobby-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Counter animation for statistics (if you want to add them later)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    // Add click to copy functionality for email
    const emailElement = document.querySelector('.footer-section p');
    if (emailElement && emailElement.textContent.includes('@')) {
        emailElement.style.cursor = 'pointer';
        emailElement.addEventListener('click', function() {
            const email = this.textContent;
            navigator.clipboard.writeText(email).then(() => {
                // Show a temporary tooltip
                const tooltip = document.createElement('div');
                tooltip.textContent = 'Email copied!';
                tooltip.style.cssText = `
                    position: absolute;
                    background: #2563eb;
                    color: white;
                    padding: 8px 12px;
                    border-radius: 4px;
                    font-size: 12px;
                    z-index: 1000;
                    pointer-events: none;
                `;
                document.body.appendChild(tooltip);
                
                const rect = this.getBoundingClientRect();
                tooltip.style.left = rect.left + 'px';
                tooltip.style.top = (rect.top - 30) + 'px';
                
                setTimeout(() => {
                    document.body.removeChild(tooltip);
                }, 2000);
            });
        });
    }
    
    // Add theme toggle functionality (optional)
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        z-index: 1001;
        transition: all 0.3s ease;
    `;
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const icon = this.querySelector('i');
        if (document.body.classList.contains('dark-theme')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    });
    
    document.body.appendChild(themeToggle);
    
    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 1002;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
    
    // Add back to top button
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        z-index: 1001;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    `;
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(backToTop);
    
    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
});

// Load all sections content
function loadSection(containerId, filePath) {
    const container = document.getElementById(containerId);
    if (container) {
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${filePath}`);
                }
                return response.text();
            })
            .then(html => {
                container.innerHTML = html;
            })
            .catch(error => {
                console.error(`Error loading ${filePath}:`, error);
                container.innerHTML = `<p>Error loading ${filePath}</p>`;
            });
    }
}

// Initialize card interactions
function initializeCards() {
    // Project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Blog cards
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Social cards
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Hobby cards
    const hobbyCards = document.querySelectorAll('.hobby-card');
    hobbyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Load all sections when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Load all sections
    loadSection('hero-container', '../html/hero.html');
    loadSection('blog-container', '../html/blog.html');
    loadSection('projects-container', '../html/projects.html');
    loadSection('social-container', '../html/social.html');
    loadSection('hobbies-container', '../html/hobbies.html');
    loadSection('footer-container', '../html/footer.html');

    // Initialize interactions after a short delay to ensure content is loaded
    setTimeout(() => {
        initializeCards();
    }, 100);
});

// Add CSS for dark theme (optional)
const darkThemeCSS = `
    .dark-theme {
        background-color: #1f2937;
        color: #f9fafb;
    }
    
    .dark-theme .navbar {
        background: rgba(31, 41, 55, 0.95);
    }
    
    .dark-theme .section-alt {
        background: #374151;
    }
    
    .dark-theme .blog-card,
    .dark-theme .project-card,
    .dark-theme .social-card,
    .dark-theme .hobby-card {
        background: #374151;
        color: #f9fafb;
    }
    
    .dark-theme .blog-card-content h3,
    .dark-theme .project-content h3,
    .dark-theme .social-card h3,
    .dark-theme .hobby-card h3 {
        color: #f9fafb;
    }
    
    .dark-theme .blog-card-content p,
    .dark-theme .project-content p,
    .dark-theme .social-card p,
    .dark-theme .hobby-card p {
        color: #d1d5db;
    }
    
    .dark-theme .section-title {
        color: #f9fafb;
    }
    
    .dark-theme .nav-menu a {
        color: #d1d5db;
    }
    
    .dark-theme .nav-menu a:hover {
        color: #ffffff;
    }
`;

// Inject dark theme CSS
const style = document.createElement('style');
style.textContent = darkThemeCSS;
document.head.appendChild(style); 