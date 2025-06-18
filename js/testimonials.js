document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.testimonials-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.control-btn.prev');
    const nextBtn = document.querySelector('.control-btn.next');
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth;
    
    // Update carousel position
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Next testimonial
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    }
    
    // Previous testimonial
    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextTestimonial);
    prevBtn.addEventListener('click', prevTestimonial);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Auto-advance carousel
    let autoAdvance = setInterval(nextTestimonial, 5000);
    
    // Pause auto-advance on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(autoAdvance);
    });
    
    track.addEventListener('mouseleave', () => {
        autoAdvance = setInterval(nextTestimonial, 5000);
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const newCardWidth = cards[0].offsetWidth;
        if (newCardWidth !== cardWidth) {
            track.style.transform = `translateX(-${currentIndex * newCardWidth}px)`;
        }
    });
}); 