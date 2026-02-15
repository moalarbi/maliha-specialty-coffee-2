document.addEventListener('DOMContentLoaded', () => {
    // Language Toggle Logic
    const langToggle = document.getElementById('langToggle');
    const langToggleFooter = document.getElementById('langToggleFooter');
    const html = document.documentElement;
    
    function toggleLanguage() {
        const currentLang = html.getAttribute('lang');
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        const newDir = newLang === 'ar' ? 'rtl' : 'ltr';
        
        html.setAttribute('lang', newLang);
        html.setAttribute('dir', newDir);
        
        // Update all elements with data-ar and data-en
        document.querySelectorAll('[data-ar]').forEach(el => {
            el.textContent = el.getAttribute(`data-${newLang}`);
        });
        
        // Update toggle buttons
        document.querySelectorAll('.lang-toggle span, .lang-toggle-footer span').forEach(span => {
            span.classList.toggle('hidden');
        });
    }
    
    if (langToggle) langToggle.addEventListener('click', toggleLanguage);
    if (langToggleFooter) langToggleFooter.addEventListener('click', toggleLanguage);

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Reviews Slider
    const reviews = document.querySelectorAll('.review-item');
    const dots = document.querySelectorAll('.dot');
    let currentReview = 0;
    
    function showReview(index) {
        reviews.forEach(r => r.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        reviews[index].classList.add('active');
        dots[index].classList.add('active');
        currentReview = index;
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showReview(index));
    });
    
    // Auto slide reviews
    setInterval(() => {
        let next = (currentReview + 1) % reviews.length;
        showReview(next);
    }, 5000);

    // Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
