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
    const userSlider = document.getElementById('users');
    const storageSlider = document.getElementById('storage');
    const yearlyToggle = document.getElementById('yearly');
    const userValue = document.getElementById('userValue');
    const storageValue = document.getElementById('storageValue');
    const totalPrice = document.getElementById('totalPrice');

    function updatePrice() {
        const users = parseInt(userSlider.value);
        const storage = parseInt(storageSlider.value);
        const isYearly = yearlyToggle.checked;

        // Base price calculation
        let price = users * 10; // $10 per user
        price += storage * 0.5; // $0.5 per GB

        // Apply yearly discount if selected
        if (isYearly) {
            price = price * 0.8; // 20% discount
        }

        // Update display
        totalPrice.textContent = `$${price.toFixed(2)}`;
    }

    userSlider.addEventListener('input', () => {
        userValue.textContent = userSlider.value;
        updatePrice();
    });

    storageSlider.addEventListener('input', () => {
        storageValue.textContent = storageSlider.value;
        updatePrice();
    });

    yearlyToggle.addEventListener('change', updatePrice);

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
}); 