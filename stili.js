/* N'HAP AGENCY - MODERN INTERACTIONS */
/* ============================================ */

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });

    // Initialize all functionality
    initNavbar();
    initSmoothScroll();
    initContactForm();
    initCounters();
    initMobileMenu();
    initFAQ();
    initServiceCircles();
});

// ============== NAVBAR FUNCTIONALITY ==============
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link highlighting
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// ============== SMOOTH SCROLL ==============
function initSmoothScroll() {
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

// ============== CONTACT FORM ==============
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateForm = (formData) => {
        const errors = [];
        if (!formData.name || formData.name.length < 2) {
            errors.push('Emri duhet të ketë të paktën 2 karaktere');
        }
        if (!validateEmail(formData.email)) {
            errors.push('Email nuk është valid');
        }
        if (!formData.message || formData.message.length < 10) {
            errors.push('Mesazhi duhet të ketë të paktën 10 karaktere');
        }
        return errors;
    };

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formStatus = document.getElementById('formStatus');
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Collect form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // Validation
        const errors = validateForm(formData);
        if (errors.length > 0) {
            showFormStatus(errors.join('. '), 'error', formStatus);
            return;
        }

        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Po dërgon...';
        showFormStatus('Po dërgon...', 'loading', formStatus);

        try {
            // Simulate network delay for better UX
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Save to localStorage as fallback (no backend)
            const messages = JSON.parse(localStorage.getItem('nhap_contact_messages') || '[]');
            messages.push({
                ...formData,
                timestamp: new Date().toISOString(),
                id: Date.now()
            });
            localStorage.setItem('nhap_contact_messages', JSON.stringify(messages));
            
            showFormStatus('✓ Mesazhi u dërgua me sukses! Shpejt do t\'ju kontaktojmë.', 'success', formStatus);
            form.reset();
            
            // Clear status after 5 seconds
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = '';
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 5000);
        } catch (error) {
            showFormStatus('✗ Gabim në dërgim: ' + error.message, 'error', formStatus);
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

function showFormStatus(message, type, element) {
    element.textContent = message;
    element.className = `form-status ${type}`;
}

// ============== ANIMATED COUNTERS ==============
function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);

    statNumbers.forEach(num => observer.observe(num));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 30);
}

// ============== MOBILE MENU ==============
function initMobileMenu() {
    const toggle = document.getElementById('navbarToggle');
    const menu = document.getElementById('navbarMenu');
    
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
        });

        // Close menu when link is clicked
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.classList.remove('active');
            });
        });
    }
}

// ============== FAQ SECTION ==============
function initFAQ() {
    const faqButtons = document.querySelectorAll('.faq-question');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            
            // Close other open FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            faqItem.classList.toggle('active');
        });
    });
}

// ============== SERVICE CIRCLES ==============
function initServiceCircles() {
    const circles = document.querySelectorAll('.service-circle');
    
    circles.forEach(circle => {
        circle.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        circle.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}
