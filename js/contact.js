document.addEventListener('DOMContentLoaded', function() {
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: this.querySelector('#name').value,
            email: this.querySelector('#email').value,
            subject: this.querySelector('#subject').value,
            message: this.querySelector('#message').value
        };
        
        // Here you would typically send the data to your backend
        console.log('Form submitted:', formData);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
        this.appendChild(successMessage);
        
        // Clear form
        this.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    });

    // Form validation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateInput(this);
            }
        });
    });
    
    function validateInput(input) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        switch(input.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
                errorMessage = 'Please enter a valid email address';
                break;
            case 'text':
                isValid = value.length >= 2;
                errorMessage = 'This field is required';
                break;
            case 'textarea':
                isValid = value.length >= 10;
                errorMessage = 'Message must be at least 10 characters long';
                break;
        }
        
        if (!isValid) {
            input.classList.add('error');
            showError(input, errorMessage);
        } else {
            input.classList.remove('error');
            removeError(input);
        }
    }
    
    function showError(input, message) {
        const errorElement = input.parentElement.querySelector('.error-message') || 
            document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        if (!input.parentElement.querySelector('.error-message')) {
            input.parentElement.appendChild(errorElement);
        }
    }
    
    function removeError(input) {
        const errorElement = input.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    // Social media links hover effect
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // FAQ items hover effect
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });

    // Map interaction
    const mapContainer = document.querySelector('.map-container');
    
    mapContainer.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
    });
    
    mapContainer.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Add CSS for error states
    const style = document.createElement('style');
    style.textContent = `
        .error {
            border-color: #ff4444 !important;
        }
        .error-message {
            color: #ff4444;
            font-size: 0.9rem;
            margin-top: 5px;
        }
    `;
    document.head.appendChild(style);
}); 