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

    // Add hover effect to feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Add hover effect to pricing cards
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('featured')) {
                card.style.transform = 'translateY(-10px)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('featured')) {
                card.style.transform = 'translateY(0)';
            }
        });
    });

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
            document.getElementById(tabId).classList.add('active');
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
            const view = button.getAttribute('data-view');
            document.querySelector(`.preview-image[data-view="${view}"]`).classList.add('active');
        });
    });

    // Pricing Calculator
    const userInput = document.getElementById('users');
    const storageInput = document.getElementById('storage');
    const userValue = userInput.nextElementSibling;
    const storageValue = storageInput.nextElementSibling;
    const resultAmount = document.querySelector('.result-card .amount');

    function updatePrice() {
        const users = parseInt(userInput.value);
        const storage = parseInt(storageInput.value);
        
        // Base price calculation
        let basePrice = 29; // Basic plan price
        let userPrice = users * 10; // $10 per user
        let storagePrice = Math.floor(storage / 100) * 5; // $5 per 100GB
        
        let totalPrice = basePrice + userPrice + storagePrice;
        
        // Apply yearly discount if yearly billing is selected
        if (document.getElementById('billing-toggle').checked) {
            totalPrice = Math.floor(totalPrice * 0.8); // 20% discount
        }
        
        resultAmount.textContent = `$${totalPrice}`;
    }

    userInput.addEventListener('input', () => {
        userValue.textContent = userInput.value;
        updatePrice();
    });

    storageInput.addEventListener('input', () => {
        storageValue.textContent = storageInput.value;
        updatePrice();
    });

    document.getElementById('billing-toggle').addEventListener('change', updatePrice);

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');

            // Toggle answer visibility
            answer.style.maxHeight = answer.style.maxHeight ? null : answer.scrollHeight + 'px';
            
            // Toggle icon rotation
            icon.style.transform = icon.style.transform === 'rotate(180deg)' ? 'rotate(0)' : 'rotate(180deg)';
        });
    });

    // FAQ Search
    const faqSearch = document.querySelector('.faq-search input');
    const faqItems = document.querySelectorAll('.faq-item');

    faqSearch.addEventListener('input', () => {
        const searchTerm = faqSearch.value.toLowerCase();

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();

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
}); 