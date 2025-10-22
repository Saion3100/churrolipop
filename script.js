// ==========================================
// Initialize AOS (Animate On Scroll)
// ==========================================
AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100,
    delay: 100
});

// ==========================================
// Navigation - Scroll Effect
// ==========================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// Smooth Scrolling
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Don't prevent default for empty href or just "#"
        if (href === '#' || href === '') return;

        e.preventDefault();

        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// Countdown Timer
// ==========================================
function updateCountdown() {
    // Set your festival date here (Year, Month-1, Day, Hour, Minute)
    const festivalDate = new Date(2025, 9, 25, 10, 0, 0).getTime(); // November 1, 2025, 10:00

    const now = new Date().getTime();
    const distance = festivalDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update countdown display
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    const timerContainer = document.querySelector('.countdown-timer');

    if (daysElement) {
        animateValue(daysElement, parseInt(daysElement.textContent) || 0, days, 500);
    }
    if (hoursElement) {
        hoursElement.textContent = String(hours).padStart(2, '0');
    }
    if (minutesElement) {
        minutesElement.textContent = String(minutes).padStart(2, '0');
    }
    if (secondsElement) {
        secondsElement.textContent = String(seconds).padStart(2, '0');
    }

    // If countdown is over
    if (distance < 0) {
        document.querySelector('.countdown-title').textContent = '文化祭開催中！';
        if (timerContainer) {
            timerContainer.innerHTML = `
                <div class="festival-now">
                    <p>ようこそ！<br>楽しんでいってね！</p>
                </div>
            `;
        }
        return;
    }
}

// ===== カウントダウンを1秒ごとに更新 =====
document.addEventListener("DOMContentLoaded", () => {
    updateCountdown(); // ページ読み込み時に1回実行
    setInterval(updateCountdown, 1000); // 1秒ごとに更新
});


// Animate number changes
function animateValue(element, start, end, duration) {
    if (start === end) return;

    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = String(Math.floor(current)).padStart(2, '0');
    }, 16);
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// ==========================================
// Stats Counter Animation
// ==========================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Intersection Observer for stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                if (stat.textContent === '0') {
                    animateCounter(stat);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ==========================================
// Scroll to Top Button
// ==========================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// Parallax Effect for Hero Section
// ==========================================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    if (hero && window.innerWidth > 768) {
        // Parallax background
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }

        // Fade out hero content
        if (heroContent) {
            const opacity = 1 - (scrolled / 500);
            heroContent.style.opacity = Math.max(opacity, 0);
        }

        // Move floating churros
        const churros = document.querySelectorAll('.churro');
        churros.forEach((churro, index) => {
            const speed = 0.3 + (index * 0.1);
            churro.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    }
});

// ==========================================
// Menu Card Hover Effects
// ==========================================
const menuCards = document.querySelectorAll('.menu-card');

menuCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
});

// Menu button click effect
const menuBtns = document.querySelectorAll('.menu-btn');
// ボイス音声をそれぞれ用意
const voiceGroups = [
    ['voice1.mp3'],
    ['voice2.mp3'],
    ['voice3-1.mp3', 'voice3-2.mp3'],
    ['voice4.mp3'],
    ['voice5.mp3'],
    ['voice6-1.mp3', 'voice6-2.mp3'],
];

const voices = voiceGroups.map(group =>
    group.map(file => new Audio(`sounds/${file}`))
);


menuBtns.forEach((btn, index) => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();

        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '5px';
        ripple.style.height = '5px';
        ripple.style.background = 'white';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.animation = 'ripple 0.6s ease-out';

        const rect = this.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';

        this.style.position = 'relative';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);

        // ===== 音声を再生 =====
        const group = voices[index];
        if (group && group.length > 0) {
            // ランダムに選択
            const randomVoice = group[Math.floor(Math.random() * group.length)];

            // 再生前にリセット
            randomVoice.pause();
            randomVoice.currentTime = 0;
            randomVoice.play();
        }
        // Show notification
        //showNotification('カートに追加しました！');
    });
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
    
    .notification {
        position: fixed;
        top: 100px;
        right: 30px;
        background: linear-gradient(135deg, #10B981, #059669);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
        z-index: 10000;
        animation: slideInRight 0.5s ease, slideOutRight 0.5s ease 2.5s forwards;
        font-weight: 600;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ==========================================
// Contact Form Handling
// ==========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        // Simulate form submission
        console.log('Form submitted:', data);

        // Show success message
        showNotification('お問い合わせを送信しました！');

        // Reset form
        this.reset();

        // In a real application, you would send this data to a server
        // Example:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });
    });
}

// ==========================================
// Image Lazy Loading Enhancement
// ==========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ==========================================
// Dynamic Background Gradient
// ==========================================
let gradientAngle = 135;
let gradientDirection = 1;

function animateHeroGradient() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    gradientAngle += 0.2 * gradientDirection;

    if (gradientAngle >= 180 || gradientAngle <= 90) {
        gradientDirection *= -1;
    }

    hero.style.background = `linear-gradient(${gradientAngle}deg, #FFF8F0 0%, #FFE4CC 100%)`;

    requestAnimationFrame(animateHeroGradient);
}

// Start gradient animation
animateHeroGradient();

// ==========================================
// Mouse Follow Effect for Hero
// ==========================================
const hero = document.querySelector('.hero');

if (hero && window.innerWidth > 768) {
    hero.addEventListener('mousemove', (e) => {
        const churros = document.querySelectorAll('.churro');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        churros.forEach((churro, index) => {
            const speed = 20 + (index * 10);
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;

            churro.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// ==========================================
// Scroll Progress Indicator
// ==========================================
function createScrollProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #c5a8d3ff, #934ab4ff);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

createScrollProgressIndicator();

// ==========================================
// Keyboard Navigation Enhancement
// ==========================================
document.addEventListener('keydown', (e) => {
    // Press 'Home' to scroll to top
    if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Press 'End' to scroll to bottom
    if (e.key === 'End') {
        e.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
});

// ==========================================
// Performance: Debounce Function
// ==========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    // Additional scroll handling can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ==========================================
// Easter Egg: Konami Code
// ==========================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiPattern.length);

    if (konamiCode.join('') === konamiPattern.join('')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Create confetti effect
    const colors = ['#D4A574', '#E67E22', '#F39C12', '#FFD700'];

    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -10px;
                left: ${Math.random() * 100}%;
                border-radius: 50%;
                pointer-events: none;
                z-index: 10002;
                animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
            `;
            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
    }

    // Add confetti animation
    if (!document.getElementById('confetti-style')) {
        const confettiStyle = document.createElement('style');
        confettiStyle.id = 'confetti-style';
        confettiStyle.textContent = `
            @keyframes confettiFall {
                to {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(confettiStyle);
    }

    showNotification('🎉 隠しコマンド発見！チュロスが50%オフ！（冗談です😄）');
}

// ==========================================
// Print Styles
// ==========================================
window.addEventListener('beforeprint', () => {
    // Expand all sections before printing
    document.querySelectorAll('.menu-card').forEach(card => {
        card.style.pageBreakInside = 'avoid';
    });
});

// ==========================================
// Console Message
// ==========================================
console.log('%c文化祭チュロス模擬店へようこそ！', 'font-size: 24px; font-weight: bold; color: #D4A574;');
console.log('%c開発者の方へ：このサイトは文化祭のために愛情を込めて作られました 🍪', 'font-size: 14px; color: #E67E22;');
console.log('%cKonami Codeを試してみてください！ ↑↑↓↓←→←→BA', 'font-size: 12px; color: #F39C12;');

// ==========================================
// Service Worker Registration (Optional)
// ==========================================
if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker
    // window.addEventListener('load', () => {
    //     navigator.serviceWorker.register('/sw.js')
    //         .then(registration => console.log('SW registered:', registration))
    //         .catch(error => console.log('SW registration failed:', error));
    // });
}

// ==========================================
// Initialize Everything on Load
// ==========================================
window.addEventListener('load', () => {
    // Remove loading class if exists
    document.body.classList.remove('loading');

    // Refresh AOS
    AOS.refresh();

    // Log performance metrics
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`ページ読み込み時間: ${pageLoadTime}ms`);
    }
});

// ==========================================
// Handle Visibility Change
// ==========================================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        console.log('タブが非表示になりました');
    } else {
        // Resume animations
        console.log('タブが表示されました');
        AOS.refresh();
    }
});

// ==========================================
//   Special Ticket Section
// ========================================== 
const ticket = document.querySelector('.ticket-inner');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + window.innerHeight;
    const pageHeight = document.body.offsetHeight;

    if (scrollY >= pageHeight - 100) {
        ticket.classList.add('show');
    }
});


// ==========================================
//   Sparkle Loading Animation
// ========================================== 
window.addEventListener('load', () => {
    const loader = document.getElementById('loading-screen');
    const starsContainer = document.querySelector('.stars-container');

    // 星を20個ほどランダムに生成
    const colors = ['#ffb3f6', '#ffe483', '#b2f0ff', '#ffc8dd']; // ピンク・黄・水色・薄紫
    for (let i = 0; i < 25; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.textContent = '★';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.fontSize = `${Math.random() * 30 + 15}px`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.color = colors[Math.floor(Math.random() * colors.length)];
        starsContainer.appendChild(star);
    }

    // 一定時間後にローディングを非表示
    setTimeout(() => {
        loader.style.display = 'none';
    }, 4000);
});

// 簡易スライダー（自動切替）
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.story-image').forEach(container => {
        const photos = container.querySelectorAll('.story-photo');
        if (photos.length === 0) return;
        let index = 0;
        setInterval(() => {
            photos[index].classList.remove('active');
            index = (index + 1) % photos.length;
            photos[index].classList.add('active');
        }, 5000);
    });
});
