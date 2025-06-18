document.addEventListener('DOMContentLoaded', function() {
    // Pricing Toggle
    const billingToggle = document.getElementById('billingToggle');
    const monthlyPrices = {
        basic: 29,
        pro: 49,
        enterprise: 99
    };
    const yearlyPrices = {
        basic: 279, // 29 * 12 * 0.8 (20% discount)
        pro: 470,   // 49 * 12 * 0.8
        enterprise: 950 // 99 * 12 * 0.8
    };

    function updatePrices(isYearly) {
        const prices = isYearly ? yearlyPrices : monthlyPrices;
        const period = isYearly ? '/year' : '/month';
        
        document.querySelectorAll('.plan-card').forEach(card => {
            const planType = card.classList.contains('featured') ? 'pro' : 
                           card.querySelector('h3').textContent.toLowerCase();
            const priceElement = card.querySelector('.amount');
            const periodElement = card.querySelector('.period');
            
            if (priceElement && periodElement) {
                priceElement.textContent = prices[planType];
                periodElement.textContent = period;
            }
        });
    }

    billingToggle.addEventListener('change', function() {
        updatePrices(this.checked);
    });

    // Plan Card Hover Effects
    document.querySelectorAll('.plan-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-10px)';
            }
        });

        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    // FAQ Accordion
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        if (question && answer) {
            question.style.cursor = 'pointer';
            answer.style.display = 'none';
            
            question.addEventListener('click', () => {
                const isOpen = answer.style.display === 'block';
                answer.style.display = isOpen ? 'none' : 'block';
                question.classList.toggle('active');
            });
        }
    });

    // Smooth Scroll for Learn More Links
    document.querySelectorAll('.learn-more').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Plan Selection
    document.querySelectorAll('.plan-card .btn').forEach(button => {
        button.addEventListener('click', function() {
            const plan = this.closest('.plan-card').querySelector('h3').textContent;
            const price = this.closest('.plan-card').querySelector('.amount').textContent;
            const period = this.closest('.plan-card').querySelector('.period').textContent;
            
            // Store selection in localStorage
            localStorage.setItem('selectedPlan', JSON.stringify({
                plan,
                price,
                period,
                isYearly: billingToggle.checked
            }));

            // Redirect to signup or show modal
            if (plan === 'Enterprise') {
                // Show contact form
                showContactForm();
            } else {
                // Redirect to signup
                window.location.href = 'signup.html';
            }
        });
    });

    // Contact Form Modal
    function showContactForm() {
        const modal = document.createElement('div');
        modal.className = 'contact-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Contact Sales</h2>
                <form id="contactForm">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" required>
                    </div>
                    <div class="form-group">
                        <label for="company">Company</label>
                        <input type="text" id="company" required>
                    </div>
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Send Message</button>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Handle form submission
        modal.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you would typically send the form data to your server
            alert('Thank you for your interest! We will contact you soon.');
            modal.remove();
        });
    }

    // Initialize prices
    updatePrices(billingToggle.checked);
}); 