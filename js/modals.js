class Modal {
    constructor() {
        this.modals = document.querySelectorAll('.modal');
        this.triggers = document.querySelectorAll('[data-modal]');
        this.closeButtons = document.querySelectorAll('.modal-close');
        this.overlay = document.querySelector('.modal-overlay');
        
        this.init();
    }
    
    init() {
        // Open modal
        this.triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = trigger.getAttribute('data-modal');
                this.openModal(modalId);
            });
        });
        
        // Close modal
        this.closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.closeModal();
            });
        });
        
        // Close on overlay click
        this.overlay.addEventListener('click', () => {
            this.closeModal();
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }
    
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        // Add active classes
        modal.classList.add('active');
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animate content
        const content = modal.querySelector('.modal-content');
        content.classList.add('animate-scale-in');
    }
    
    closeModal() {
        const activeModal = document.querySelector('.modal.active');
        if (!activeModal) return;
        
        // Remove active classes
        activeModal.classList.remove('active');
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset animation
        const content = activeModal.querySelector('.modal-content');
        content.classList.remove('animate-scale-in');
    }
}

// Initialize modals
document.addEventListener('DOMContentLoaded', () => {
    new Modal();
}); 