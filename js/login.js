// Login functionality
document.addEventListener('DOMContentLoaded', function() {
    const tagLoginForm = document.getElementById('tagLoginForm');
    const guestBtn = document.getElementById('guestBtn');
    const brawlTagInput = document.getElementById('brawlTag');
    const inputGroup = brawlTagInput.closest('.input-group');

    // Format tag input (uppercase, alphanumeric only)
    brawlTagInput.addEventListener('input', function(e) {
        let value = e.target.value.toUpperCase();
        value = value.replace(/[^A-Z0-9]/g, ''); // Only alphanumeric
        e.target.value = value;
        
        // Remove error state when typing
        if (inputGroup.classList.contains('error')) {
            inputGroup.classList.remove('error');
        }
    });

    // Handle tag login
    tagLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const tag = brawlTagInput.value.trim();
        
        // Validate tag (should be 6-10 characters, alphanumeric)
        if (tag.length < 6) {
            showError('Player tag must be at least 6 characters');
            return;
        }

        if (!/^[A-Z0-9]+$/.test(tag)) {
            showError('Player tag can only contain letters and numbers');
            return;
        }

        // Show loading state
        const submitBtn = tagLoginForm.querySelector('.btn-primary');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Simulate API call (you can replace this with actual Brawl Stars API call)
        setTimeout(() => {
            // Store tag in session
            sessionStorage.setItem('brawlTag', tag);
            sessionStorage.setItem('loginType', 'tag');
            
            // Redirect to home
            window.location.href = 'home.html';
        }, 1500);
    });

    // Handle guest login
    guestBtn.addEventListener('click', function() {
        // Show loading state
        guestBtn.classList.add('loading');
        guestBtn.disabled = true;

        // Store guest status
        setTimeout(() => {
            sessionStorage.setItem('loginType', 'guest');
            sessionStorage.removeItem('brawlTag');
            
            // Redirect to home
            window.location.href = 'home.html';
        }, 800);
    });

    // Error handling
    function showError(message) {
        inputGroup.classList.add('error');
        
        // Create or update error message
        let errorMsg = inputGroup.querySelector('.error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('p');
            errorMsg.className = 'error-message';
            inputGroup.appendChild(errorMsg);
        }
        errorMsg.textContent = message;
        
        // Shake animation
        brawlTagInput.style.animation = 'none';
        setTimeout(() => {
            brawlTagInput.style.animation = '';
        }, 10);
    }

    // Check if already logged in
    const existingLogin = sessionStorage.getItem('loginType');
    if (existingLogin) {
        // Optional: Auto-redirect if already logged in
        // window.location.href = 'home.html';
    }

    // Add enter key support for guest button
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Optional: Could close modal or trigger guest login
        }
    });
});