document.addEventListener('DOMContentLoaded', function() {
    // Modal Elements
    const styleSwitcherBtn = document.getElementById('styleSwitcherBtn');
    const styleSwitcherModal = document.getElementById('styleSwitcherModal');
    const closeStyleSwitcher = document.getElementById('closeStyleSwitcher');
    const body = document.body;

    // Open Modal
    styleSwitcherBtn.addEventListener('click', () => {
        styleSwitcherModal.classList.add('active');
        body.style.overflow = 'hidden';
    });

    // Close Modal
    function closeModal() {
        styleSwitcherModal.classList.remove('active');
        body.style.overflow = '';
    }

    closeStyleSwitcher.addEventListener('click', closeModal);
    styleSwitcherModal.addEventListener('click', (e) => {
        if (e.target === styleSwitcherModal) {
            closeModal();
        }
    });

    // Theme Switcher
    const themeButtons = document.querySelectorAll('.theme-button');

    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.getAttribute('data-theme');
            body.className = ''; // Clear existing classes
            body.classList.add(`theme-${theme}`);
            
            // Update active state
            themeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Save preference
            localStorage.setItem('selectedTheme', theme);
        });
    });

    // Layout Switcher
    const layoutButtons = document.querySelectorAll('.layout-option');
    
    layoutButtons.forEach(button => {
        button.addEventListener('click', () => {
            const layout = button.getAttribute('data-layout');
            body.classList.remove('layout-compact', 'layout-wide', 'layout-minimal');
            body.classList.add(`layout-${layout}`);
            
            // Update active state
            layoutButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Save preference
            localStorage.setItem('selectedLayout', layout);
        });
    });

    // Load saved preferences
    const savedTheme = localStorage.getItem('selectedTheme');
    const savedLayout = localStorage.getItem('selectedLayout');

    if (savedTheme) {
        const themeButton = document.querySelector(`[data-theme="${savedTheme}"]`);
        if (themeButton) {
            themeButton.click();
        }
    }

    if (savedLayout) {
        const layoutButton = document.querySelector(`[data-layout="${savedLayout}"]`);
        if (layoutButton) {
            layoutButton.click();
        }
    }

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && styleSwitcherModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Demo Preview
    const demoButtons = document.querySelectorAll('[data-demo]');
    
    demoButtons.forEach(button => {
        button.addEventListener('click', () => {
            const demoType = button.getAttribute('data-demo');
            const demoSection = document.querySelector(`.demo-${demoType}`);
            
            if (demoSection) {
                demoSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}); 