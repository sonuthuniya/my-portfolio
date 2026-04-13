// ===== Dark/Light Mode Toggle =====
const themeBtn = document.getElementById('themeBtn');
const html = document.documentElement;
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
                     (prefersDarkScheme.matches ? 'dark' : 'light');
html.setAttribute('data-theme', currentTheme);

if (themeBtn) {
    updateThemeBtn(currentTheme);

    themeBtn.addEventListener('click', () => {
        const theme = html.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeBtn(newTheme);
    });
}

function updateThemeBtn(theme) {
    if (!themeBtn) return;
    const icon = themeBtn.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        themeBtn.style.color = '#d4af37';
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        themeBtn.style.color = '#d4af37';
    }
}

// ===== Mobile Menu Toggle =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu li a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ===== Smooth Scroll & Active Nav Link =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#!') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-menu li a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
            const sectionId = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ===== Contact Form Handling =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name') || contactForm.children[0].value;
        const email = formData.get('email') || contactForm.children[1].value;
        const message = formData.get('message') || contactForm.children[2].value;
        
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        console.log('Form submitted:', { name, email, message });
        alert('Thank you for your message! I\'ll get back to you soon.');
        contactForm.reset();
    });
}

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-category, .stat').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===== Add fadeInUp animation =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-menu li a.active {
        color: #d4af37;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translateY(10px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translateY(-10px);
    }
`;
document.head.appendChild(style);

