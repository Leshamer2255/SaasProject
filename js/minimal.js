document.addEventListener('DOMContentLoaded', () => {
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
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Pricing toggle
    const billingToggle = document.getElementById('billing-toggle');
    const monthlyPrices = {
        basic: 29,
        pro: 79,
        enterprise: 199
    };
    const yearlyPrices = {
        basic: 290,
        pro: 790,
        enterprise: 1990
    };

    function updatePrices(isYearly) {
        const prices = isYearly ? yearlyPrices : monthlyPrices;
        document.querySelectorAll('.pricing-card').forEach(card => {
            const plan = card.querySelector('h3').textContent.toLowerCase();
            const amount = card.querySelector('.amount');
            const period = card.querySelector('.period');
            
            if (amount && period) {
                amount.textContent = `$${prices[plan]}`;
                period.textContent = isYearly ? '/year' : '/month';
            }
        });
    }

    billingToggle.addEventListener('change', (e) => {
        updatePrices(e.target.checked);
    });

    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
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
            if (!emailRegex.test(email.value)) {
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
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                contactForm.appendChild(successMessage);

                // Reset form
                contactForm.reset();

                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }

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
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    const nav = document.querySelector('.nav');
    if (nav) {
        nav.insertBefore(mobileMenuButton, nav.firstChild);
        
        mobileMenuButton.addEventListener('click', () => {
            nav.classList.toggle('mobile-menu-open');
            mobileMenuButton.innerHTML = nav.classList.contains('mobile-menu-open') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }

    // Simple hover effects
    document.querySelectorAll('.feature-card, .pricing-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('featured')) {
                card.style.transform = 'translateY(-5px)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('featured')) {
                card.style.transform = 'translateY(0)';
            }
        });
    });
}); 