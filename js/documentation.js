document.addEventListener('DOMContentLoaded', function() {
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

    // Active section highlighting
    const sections = document.querySelectorAll('.doc-section');
    const navLinks = document.querySelectorAll('.doc-nav a');

    function updateActiveSection() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 100)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection();

    // Code block copy functionality
    document.querySelectorAll('.code-block').forEach(block => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        
        block.style.position = 'relative';
        block.appendChild(copyButton);

        copyButton.addEventListener('click', () => {
            const code = block.querySelector('code').textContent;
            navigator.clipboard.writeText(code).then(() => {
                copyButton.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            });
        });
    });

    // Mobile navigation toggle
    const mobileNavToggle = document.createElement('button');
    mobileNavToggle.className = 'mobile-nav-toggle';
    mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const docSidebar = document.querySelector('.doc-sidebar');
    docSidebar.parentNode.insertBefore(mobileNavToggle, docSidebar);

    mobileNavToggle.addEventListener('click', () => {
        docSidebar.classList.toggle('active');
        mobileNavToggle.classList.toggle('active');
    });

    // Close mobile navigation when clicking outside
    document.addEventListener('click', (e) => {
        if (!docSidebar.contains(e.target) && !mobileNavToggle.contains(e.target)) {
            docSidebar.classList.remove('active');
            mobileNavToggle.classList.remove('active');
        }
    });

    // Theme preview hover effects
    document.querySelectorAll('.theme-card, .layout-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const preview = card.querySelector('.theme-preview, .layout-preview');
            if (preview) {
                preview.style.transform = 'scale(1.05)';
            }
        });

        card.addEventListener('mouseleave', () => {
            const preview = card.querySelector('.theme-preview, .layout-preview');
            if (preview) {
                preview.style.transform = 'scale(1)';
            }
        });
    });

    // FAQ accordion
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
}); 