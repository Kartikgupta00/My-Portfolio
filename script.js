document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Typing Effect in Hero Section
    const typingText = document.getElementById('typing-text');
    const phrase = "Full Stack Developer | Crafting Scalable Web Web Applications";
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < phrase.length) {
            typingText.innerHTML += phrase.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50); // Typing speed
        }
    }
    // Start typing after a short delay
    setTimeout(typeWriter, 500);


    // 2. Dark/Light Mode Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggleBtn.querySelector('i');

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        if (body.classList.contains('light-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });


    // 3. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isExpanded = navLinks.classList.contains('active');
        hamburger.innerHTML = isExpanded ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });


    // 4. Project Filtering System
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    // 5. Visitor Counter (Mock implementation using LocalStorage)
    const viewCountSpan = document.getElementById('view-count');
    let views = localStorage.getItem('portfolio_views');

    if (!views) {
        views = 1;
    } else {
        // Increment views only once per session (simple logic)
        if (!sessionStorage.getItem('session_viewed')) {
            views = parseInt(views) + 1;
        }
    }
    
    localStorage.setItem('portfolio_views', views);
    sessionStorage.setItem('session_viewed', 'true');
    viewCountSpan.innerText = views;

    // 6. Scroll Animations (Fade in on scroll for glass-effect cards)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial setup for animation elements
    document.querySelectorAll('.glass-effect').forEach(el => {
        // Exclude navbar from this specific scroll animation
        if(!el.classList.contains('navbar') && !el.classList.contains('image-frame') && !el.classList.contains('footer-content')) {
             el.style.opacity = 0;
             el.style.transform = 'translateY(30px)';
             el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
             observer.observe(el);
        }
    });
});