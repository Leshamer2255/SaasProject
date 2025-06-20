// Tab functionality for all themes
document.addEventListener('DOMContentLoaded', () => {
    // Feature tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Preview tabs for dashboard
    const previewButtons = document.querySelectorAll('.preview-btn');
    const previewImages = document.querySelectorAll('.preview-image');

    previewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetPreview = button.getAttribute('data-preview') || button.getAttribute('data-view');
            
            // Remove active class from all buttons and images
            previewButtons.forEach(btn => btn.classList.remove('active'));
            previewImages.forEach(img => img.classList.remove('active'));
            
            // Add active class to clicked button and corresponding image
            button.classList.add('active');
            const targetImage = document.getElementById(targetPreview);
            if (targetImage) {
                targetImage.classList.add('active');
            }
        });
    });

    // Demo controls
    const controlButtons = document.querySelectorAll('.control-btn');
    
    controlButtons.forEach(button => {
        button.addEventListener('click', () => {
            const parentContainer = button.closest('.demo-controls');
            if (parentContainer) {
                // Remove active class from all buttons in this container
                parentContainer.querySelectorAll('.control-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                // Add active class to clicked button
                button.classList.add('active');
            }
        });
    });
}); 