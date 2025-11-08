// Smooth scroll for navigation links
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

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
    } else {
        navbar.style.background = 'white';
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
const animateElements = document.querySelectorAll('.step-card, .feature-card, .tech-card, .module-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Button click animations
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple effect CSS dynamically
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - scrolled / 700;
    }
});

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Dynamic text highlighting
const highlights = document.querySelectorAll('.highlight');
highlights.forEach(highlight => {
    highlight.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.display = 'inline-block';
    });
    
    highlight.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Progress bar animation for stat bars
const statBars = document.querySelectorAll('.stat-bar');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'grow 1.5s ease-out forwards';
        }
    });
}, { threshold: 0.5 });

statBars.forEach(bar => statObserver.observe(bar));

// Mobile menu toggle (for future implementation)
const createMobileMenu = () => {
    const navContent = document.querySelector('.nav-content');
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    menuButton.style.display = 'none';
    
    const checkWidth = () => {
        if (window.innerWidth <= 768) {
            menuButton.style.display = 'block';
        } else {
            menuButton.style.display = 'none';
        }
    };
    
    window.addEventListener('resize', checkWidth);
    checkWidth();
    
    navContent.appendChild(menuButton);
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('PaddleCoach website loaded successfully!');
    createMobileMenu();
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Tech card hover effects
document.querySelectorAll('.tech-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.tech-icon i');
        if (icon) {
            icon.style.transform = 'rotate(360deg) scale(1.2)';
            icon.style.transition = 'transform 0.5s ease';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.tech-icon i');
        if (icon) {
            icon.style.transform = 'rotate(0deg) scale(1)';
        }
    });
});

// Module card interactions
document.querySelectorAll('.module-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = 'var(--secondary-purple)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderColor = 'rgba(124, 58, 237, 0.2)';
    });
});

// Add scroll progress indicator
const createScrollIndicator = () => {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #7C3AED, #A855F7);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        indicator.style.width = scrolled + '%';
    });
};

createScrollIndicator();
