class ThemeSwitcher {
    constructor() {
        this.themeButtons = document.querySelectorAll('.theme-button');
        this.currentTheme = localStorage.getItem('theme') || 'default';
        
        this.init();
    }
    
    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add click handlers
        this.themeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const theme = button.getAttribute('data-theme');
                this.setTheme(theme);
            });
        });
    }
    
    setTheme(theme) {
        // Remove active class from all buttons
        this.themeButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        // Add active class to current theme button
        const activeButton = document.querySelector(`.theme-button[data-theme="${theme}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
        
        // Set theme class on body
        document.body.className = theme;
        
        // Save to localStorage
        localStorage.setItem('theme', theme);
        
        // Update CSS variables
        this.updateCSSVariables(theme);
    }
    
    updateCSSVariables(theme) {
        const root = document.documentElement;
        
        switch(theme) {
            case 'green':
                root.style.setProperty('--primary-color', '#4CAF50');
                root.style.setProperty('--primary-dark', '#388E3C');
                root.style.setProperty('--primary-light', '#81C784');
                break;
            case 'purple':
                root.style.setProperty('--primary-color', '#9C27B0');
                root.style.setProperty('--primary-dark', '#7B1FA2');
                root.style.setProperty('--primary-light', '#BA68C8');
                break;
            case 'dark':
                root.style.setProperty('--bg-color', '#121212');
                root.style.setProperty('--bg-light', '#1E1E1E');
                root.style.setProperty('--text-color', '#FFFFFF');
                root.style.setProperty('--text-light', '#B0B0B0');
                root.style.setProperty('--border-color', '#2C2C2C');
                break;
            case 'minimal':
                root.style.setProperty('--primary-color', '#757575');
                root.style.setProperty('--primary-dark', '#616161');
                root.style.setProperty('--primary-light', '#9E9E9E');
                root.style.setProperty('--bg-color', '#FFFFFF');
                root.style.setProperty('--bg-light', '#F5F5F5');
                root.style.setProperty('--text-color', '#212121');
                root.style.setProperty('--text-light', '#757575');
                root.style.setProperty('--border-color', '#E0E0E0');
                break;
            default:
                root.style.setProperty('--primary-color', '#2196F3');
                root.style.setProperty('--primary-dark', '#1976D2');
                root.style.setProperty('--primary-light', '#64B5F6');
                root.style.setProperty('--bg-color', '#FFFFFF');
                root.style.setProperty('--bg-light', '#F5F5F5');
                root.style.setProperty('--text-color', '#212121');
                root.style.setProperty('--text-light', '#757575');
                root.style.setProperty('--border-color', '#E0E0E0');
        }
    }
}

// Initialize theme switcher
document.addEventListener('DOMContentLoaded', () => {
    new ThemeSwitcher();
}); 