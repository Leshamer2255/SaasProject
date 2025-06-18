document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    const articles = document.querySelectorAll('.article-card, .featured-article');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        
        articles.forEach(article => {
            const title = article.querySelector('h2, h3').textContent.toLowerCase();
            const content = article.querySelector('p').textContent.toLowerCase();
            const category = article.querySelector('.article-category').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || content.includes(searchTerm) || category.includes(searchTerm)) {
                article.style.display = 'block';
            } else {
                article.style.display = 'none';
            }
        });
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Category filtering
    const categoryLinks = document.querySelectorAll('.category-list a');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.textContent.split('(')[0].trim().toLowerCase();
            
            articles.forEach(article => {
                const articleCategory = article.querySelector('.article-category').textContent.toLowerCase();
                if (category === 'all' || articleCategory === category) {
                    article.style.display = 'block';
                } else {
                    article.style.display = 'none';
                }
            });

            // Update active state
            categoryLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Here you would typically send this to your backend
        console.log('Newsletter subscription:', email);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for subscribing!';
        this.appendChild(successMessage);
        
        // Clear input
        this.querySelector('input[type="email"]').value = '';
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    });

    // Article hover effects
    articles.forEach(article => {
        article.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        article.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Pagination
    const paginationLinks = document.querySelectorAll('.pagination a');
    
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            paginationLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Here you would typically load the new page content
            // For demo purposes, we'll just scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // Lazy loading images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }

    // Share buttons functionality
    const shareButtons = document.querySelectorAll('.share-button');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const url = window.location.href;
            const title = document.querySelector('h1').textContent;
            
            if (navigator.share) {
                navigator.share({
                    title: title,
                    url: url
                }).catch(console.error);
            } else {
                // Fallback for browsers that don't support Web Share API
                const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
                window.open(shareUrl, '_blank');
            }
        });
    });

    // Reading time estimation
    function estimateReadingTime() {
        const articles = document.querySelectorAll('.article-content');
        
        articles.forEach(article => {
            const text = article.textContent;
            const wordCount = text.trim().split(/\s+/).length;
            const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute
            
            const readingTimeElement = document.createElement('div');
            readingTimeElement.className = 'reading-time';
            readingTimeElement.innerHTML = `<i class="fas fa-clock"></i> ${readingTime} min read`;
            
            article.querySelector('.article-meta').appendChild(readingTimeElement);
        });
    }

    estimateReadingTime();

    // Comments functionality
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.querySelector('.comments-list');
    const replyButtons = document.querySelectorAll('.reply-btn');
    const likeButtons = document.querySelectorAll('.like-btn');

    // Handle comment submission
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const comment = this.querySelector('textarea').value;
        
        // Create new comment element
        const newComment = document.createElement('div');
        newComment.className = 'comment';
        newComment.innerHTML = `
            <div class="comment-avatar">
                <img src="https://placehold.co/60x60/2196F3/FFFFFF/png?text=${name.charAt(0)}" alt="${name}">
            </div>
            <div class="comment-content">
                <div class="comment-header">
                    <h4>${name}</h4>
                    <span class="comment-date">Just now</span>
                </div>
                <p>${comment}</p>
                <div class="comment-actions">
                    <button class="reply-btn"><i class="fas fa-reply"></i> Reply</button>
                    <button class="like-btn"><i class="fas fa-thumbs-up"></i> Like (0)</button>
                </div>
            </div>
        `;
        
        // Add new comment to the list
        commentsList.insertBefore(newComment, commentsList.firstChild);
        
        // Update comment count
        const commentCount = document.querySelector('.comments-section h2');
        const currentCount = parseInt(commentCount.textContent.match(/\d+/)[0]);
        commentCount.textContent = `Comments (${currentCount + 1})`;
        
        // Clear form
        this.reset();
        
        // Add event listeners to new buttons
        addCommentEventListeners(newComment);
    });

    // Handle reply functionality
    function handleReply(button) {
        const comment = button.closest('.comment');
        const replyForm = document.createElement('div');
        replyForm.className = 'comment reply-form';
        replyForm.innerHTML = `
            <div class="comment-avatar">
                <img src="https://placehold.co/60x60/2196F3/FFFFFF/png?text=U" alt="User">
            </div>
            <div class="comment-content">
                <form class="reply-form-content">
                    <div class="form-group">
                        <input type="text" placeholder="Your Name" required>
                    </div>
                    <div class="form-group">
                        <input type="email" placeholder="Your Email" required>
                    </div>
                    <div class="form-group">
                        <textarea placeholder="Your Reply" rows="3" required></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary">Post Reply</button>
                        <button type="button" class="btn btn-secondary cancel-reply">Cancel</button>
                    </div>
                </form>
            </div>
        `;
        
        // Insert reply form after the comment
        comment.after(replyForm);
        
        // Handle reply submission
        const form = replyForm.querySelector('form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const reply = this.querySelector('textarea').value;
            
            // Create new reply comment
            const newReply = document.createElement('div');
            newReply.className = 'comment';
            newReply.innerHTML = `
                <div class="comment-avatar">
                    <img src="https://placehold.co/60x60/2196F3/FFFFFF/png?text=${name.charAt(0)}" alt="${name}">
                </div>
                <div class="comment-content">
                    <div class="comment-header">
                        <h4>${name}</h4>
                        <span class="comment-date">Just now</span>
                    </div>
                    <p>${reply}</p>
                    <div class="comment-actions">
                        <button class="reply-btn"><i class="fas fa-reply"></i> Reply</button>
                        <button class="like-btn"><i class="fas fa-thumbs-up"></i> Like (0)</button>
                    </div>
                </div>
            `;
            
            // Insert reply and remove form
            replyForm.after(newReply);
            replyForm.remove();
            
            // Add event listeners to new buttons
            addCommentEventListeners(newReply);
        });
        
        // Handle cancel
        replyForm.querySelector('.cancel-reply').addEventListener('click', function() {
            replyForm.remove();
        });
    }

    // Handle like functionality
    function handleLike(button) {
        const likeCount = button.textContent.match(/\d+/)[0];
        const newCount = parseInt(likeCount) + 1;
        button.innerHTML = `<i class="fas fa-thumbs-up"></i> Like (${newCount})`;
        button.classList.add('active');
    }

    // Add event listeners to comment buttons
    function addCommentEventListeners(comment) {
        const replyBtn = comment.querySelector('.reply-btn');
        const likeBtn = comment.querySelector('.like-btn');
        
        replyBtn.addEventListener('click', function() {
            handleReply(this);
        });
        
        likeBtn.addEventListener('click', function() {
            handleLike(this);
        });
    }

    // Add event listeners to existing comments
    document.querySelectorAll('.comment').forEach(comment => {
        addCommentEventListeners(comment);
    });
}); 