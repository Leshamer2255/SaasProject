// Smooth scrolling for anchor links
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

// Sticky header
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Pricing toggle
const billingToggle = document.getElementById('billing-toggle');
const monthlyPrices = document.querySelectorAll('.price .amount');
const yearlyPrices = ['$290', '$790', '$1990'];

billingToggle.addEventListener('change', () => {
    monthlyPrices.forEach((price, index) => {
        if (billingToggle.checked) {
            price.textContent = yearlyPrices[index];
        } else {
            price.textContent = price.textContent.replace('0', '');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card').forEach(el => {
    observer.observe(el);
});

// Form validation
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;
    
    // Name validation
    if (name.value.trim().length < 2) {
        showError(name, 'Name must be at least 2 characters long');
        isValid = false;
    } else {
        removeError(name);
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    } else {
        removeError(email);
    }
    
    // Message validation
    if (message.value.trim().length < 10) {
        showError(message, 'Message must be at least 10 characters long');
        isValid = false;
    } else {
        removeError(message);
    }
    
    if (isValid) {
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        setTimeout(() => {
            contactForm.reset();
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Message sent successfully!';
            contactForm.appendChild(successMessage);
            
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        }, 1500);
    }
});

function showError(input, message) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message') || document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(error);
    }
    
    input.classList.add('error');
}

function removeError(input) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message');
    
    if (error) {
        error.remove();
    }
    
    input.classList.remove('error');
}

// Mobile menu toggle
const createMobileMenu = () => {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelector('.nav-links');
    const navButtons = document.querySelector('.nav-buttons');
    
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    nav.insertBefore(mobileMenuButton, navLinks);
    
    mobileMenuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navButtons.classList.toggle('active');
        mobileMenuButton.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
};

// Initialize mobile menu
createMobileMenu();

// Add hover effects to cards
document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// Add CSS for error states
const style = document.createElement('style');
style.textContent = `
    .error {
        border-color: var(--error-color) !important;
    }
    
    .error-message {
        color: var(--error-color);
        font-size: 0.875rem;
        margin-top: 0.5rem;
    }
    
    .success-message {
        color: var(--success-color);
        font-size: 0.875rem;
        margin-top: 1rem;
        text-align: center;
    }
    
    .mobile-menu-button {
        display: none;
        background: none;
        border: none;
        color: var(--text-primary);
        font-size: 1.5rem;
        cursor: pointer;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-button {
            display: block;
        }
        
        .nav-links,
        .nav-buttons {
            display: none;
        }
        
        .nav-links.active,
        .nav-buttons.active {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }
    }
`;

document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    // Feature Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.querySelector(`#${tabId}`).classList.add('active');
        });
    });

    // Dashboard Preview
    const previewButtons = document.querySelectorAll('.preview-btn');
    const previewImages = document.querySelectorAll('.preview-image');

    previewButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and images
            previewButtons.forEach(btn => btn.classList.remove('active'));
            previewImages.forEach(img => img.classList.remove('active'));

            // Add active class to clicked button and corresponding image
            button.classList.add('active');
            const previewId = button.getAttribute('data-preview');
            document.querySelector(`#${previewId}`).classList.add('active');
        });
    });

    // Pricing Calculator
    function initializePricingCalculator() {
        const usersInput = document.getElementById('users');
        const storageInput = document.getElementById('storage');
        const usersValue = usersInput.nextElementSibling;
        const storageValue = storageInput.nextElementSibling;
        const resultAmount = document.querySelector('.calculator-result .amount');
        const billingToggle = document.getElementById('billing-toggle');
        
        // Update range input values
        function updateRangeValue(input, valueElement) {
            valueElement.textContent = input.value;
            calculatePrice();
        }
        
        // Calculate price based on inputs
        function calculatePrice() {
            const users = parseInt(usersInput.value);
            const storage = parseInt(storageInput.value);
            const isYearly = billingToggle.checked;
            
            // Base price calculation
            let basePrice = 29; // Basic plan price
            
            // Add cost for additional users
            if (users > 1) {
                basePrice += (users - 1) * 10;
            }
            
            // Add cost for additional storage
            if (storage > 5) {
                basePrice += (storage - 5) * 0.5;
            }
            
            // Apply yearly discount if selected
            if (isYearly) {
                basePrice = basePrice * 0.8; // 20% discount
            }
            
            // Update price display
            resultAmount.textContent = `$${Math.round(basePrice)}`;
        }
        
        // Event listeners
        usersInput.addEventListener('input', () => updateRangeValue(usersInput, usersValue));
        storageInput.addEventListener('input', () => updateRangeValue(storageInput, storageValue));
        billingToggle.addEventListener('change', calculatePrice);
        
        // Initialize calculator
        calculatePrice();
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');

            // Toggle answer visibility
            answer.style.maxHeight = answer.style.maxHeight ? null : answer.scrollHeight + 'px';
            
            // Rotate icon
            icon.style.transform = icon.style.transform === 'rotate(180deg)' ? 'rotate(0)' : 'rotate(180deg)';
        });
    });

    // FAQ Search
    const faqSearch = document.getElementById('faqSearch');
    const faqItems = document.querySelectorAll('.faq-item');

    faqSearch.addEventListener('input', () => {
        const searchTerm = faqSearch.value.toLowerCase();

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();

            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Floating Cards Animation
    const floatingCards = document.querySelectorAll('.floating-card');

    floatingCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.animationPlayState = 'paused';
        });

        card.addEventListener('mouseleave', () => {
            card.style.animationPlayState = 'running';
        });
    });

    // Smooth Scroll for Navigation Links
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

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature, .integration-card, .testimonial-card').forEach(el => {
        observer.observe(el);
    });

    // Form Validation
    const contactForm = document.getElementById('contactForm');
    const formInputs = contactForm.querySelectorAll('input, textarea, select');

    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateInput(input);
        });
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        formInputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Here you would typically send the form data to a server
            alert('Form submitted successfully!');
            contactForm.reset();
        }
    });

    function validateInput(input) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (input.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'tel':
                const phoneRegex = /^\+?[\d\s-]{10,}$/;
                if (!phoneRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number';
                }
                break;
            default:
                if (input.required && !value) {
                    isValid = false;
                    errorMessage = 'This field is required';
                }
        }

        // Update input styling
        input.classList.toggle('error', !isValid);
        
        // Update error message
        let errorElement = input.parentElement.querySelector('.error-message');
        if (!isValid) {
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                input.parentElement.appendChild(errorElement);
            }
            errorElement.textContent = errorMessage;
        } else if (errorElement) {
            errorElement.remove();
        }

        return isValid;
    }

    // Enhanced Financial Card Animations
    function initializeFinancialCards() {
        const cards = document.querySelectorAll('.financial-card');
        
        cards.forEach(card => {
            // Add 3D tilt effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
            
            // Add ripple effect on click
            card.addEventListener('click', (e) => {
                const ripple = document.createElement('div');
                ripple.className = 'ripple';
                card.appendChild(ripple);
                
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                setTimeout(() => ripple.remove(), 1000);
            });
        });
    }

    // Enhanced Budget Progress Animations
    function initializeBudgetProgress() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const targetWidth = bar.dataset.progress;
                        const currentWidth = 0;
                        const duration = 1500;
                        const startTime = performance.now();
                        
                        function animate(currentTime) {
                            const elapsed = currentTime - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            
                            const width = currentWidth + (targetWidth - currentWidth) * progress;
                            bar.style.width = `${width}%`;
                            
                            if (progress < 1) {
                                requestAnimationFrame(animate);
                            }
                        }
                        
                        requestAnimationFrame(animate);
                        observer.unobserve(bar);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(bar);
        });
    }

    // Enhanced Transaction List Animations
    function initializeTransactionList() {
        const transactionList = document.querySelector('.transaction-list');
        if (!transactionList) return;
        
        // Filter functionality
        const filterButtons = document.querySelectorAll('.filter-btn');
        const transactions = document.querySelectorAll('.transaction-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.textContent.toLowerCase();
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                transactions.forEach(transaction => {
                    const type = transaction.dataset.type;
                    if (filter === 'all' || type === filter) {
                        transaction.style.display = 'flex';
                        transaction.style.animation = 'slideIn 0.5s ease forwards';
                    } else {
                        transaction.style.display = 'none';
                    }
                });
            });
        });
        
        // Enhanced hover effects
        transactions.forEach(transaction => {
            transaction.addEventListener('mouseenter', () => {
                const icon = transaction.querySelector('.transaction-icon');
                const amount = transaction.querySelector('.transaction-amount');
                
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                amount.style.transform = 'scale(1.1)';
            });
            
            transaction.addEventListener('mouseleave', () => {
                const icon = transaction.querySelector('.transaction-icon');
                const amount = transaction.querySelector('.transaction-amount');
                
                icon.style.transform = 'scale(1) rotate(0)';
                amount.style.transform = 'scale(1)';
            });
        });
    }

    // Enhanced Chart Animations
    function initializeCharts() {
        const charts = document.querySelectorAll('.chart-container');
        
        charts.forEach(chart => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        chart.classList.add('animate');
                        
                        // Add hover effect for chart data points
                        const dataPoints = chart.querySelectorAll('.chart-point');
                        dataPoints.forEach((point, index) => {
                            point.style.animationDelay = `${index * 0.1}s`;
                        });
                        
                        observer.unobserve(chart);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(chart);
        });
    }

    // Add CSS for new animations
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 1s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .chart-point {
            transition: all 0.3s ease;
        }
        
        .chart-point:hover {
            transform: scale(1.5);
            filter: brightness(1.2);
        }
        
        .transaction-item {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .transaction-icon {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .transaction-amount {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
    `;

    document.head.appendChild(style);

    // Initialize all enhanced components
    initializeFinancialCards();
    initializeBudgetProgress();
    initializeTransactionList();
    initializeCharts();

    // FAQ Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    const faqSearch = document.querySelector('.faq-search input');

    // Toggle FAQ items
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // FAQ Search functionality
    faqSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        faqItems.forEach(item => {
            const question = item.querySelector('h3').textContent.toLowerCase();
            const answer = item.querySelector('p').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Initialize all components
    initializePricingCalculator();
    initializeTransactionList();
    initializeCharts();
    initializeFAQ();
}); 