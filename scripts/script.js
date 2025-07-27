// --- Navegación y Scroll Suave ---
// Scroll suave al inicio desde el footer "Inicio"
function scrollToTop(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
const goToHomeFooter = document.getElementById('goToHomeFooter');
if (goToHomeFooter) goToHomeFooter.addEventListener('click', scrollToTop);
// Scroll suave a la sección "Sobre The-Line" desde el header
const sobreNavLink = document.querySelector('.nav-link[href="#methodology-section"]');
if (sobreNavLink) {
    sobreNavLink.addEventListener('click', function(e) {
        e.preventDefault();
        const methodologySection = document.getElementById('methodology-section');
        if (methodologySection) {
            methodologySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}
// Scroll suave a la sección de planes desde header y footer
['#goToPlans', '#goToPlansFooter'].forEach(id => {
    const el = document.querySelector(id);
    if (el) {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            const plansSection = document.querySelector('.plans-section');
            if (plansSection) plansSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
});
// Scroll suave a la sección de formulario desde botones principales
function scrollToCta(e) {
    const text = this.textContent.trim().toLowerCase();
    if (text.includes('consultor') || text.includes('quiero empezar')) {
        const ctaSection = document.getElementById('cta-section');
        if (ctaSection) {
            ctaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            e.preventDefault();
        }
    }
}
document.querySelectorAll('button.btn-primary').forEach(btn => {
    btn.addEventListener('click', scrollToCta);
});

// --- Modales ---
// Modal de éxito al enviar formulario
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        document.getElementById('modalSuccess').classList.add('active');
    });
}
function closeModal() {
    document.getElementById('modalSuccess').classList.remove('active');
}
// Modal para los botones Empezar de los planes
function closeEmpezarModal() {
    document.getElementById('modalEmpezar').classList.remove('active');
    const ctaSection = document.getElementById('cta-section');
    if (ctaSection) ctaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
document.querySelectorAll('.plan-card .btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('modalEmpezar').classList.add('active');
    });
});

// --- Chat Flotante ---
// Abrir chat
function openChatBubble() {
    const chatBubble = document.getElementById('chatBubble');
    const chatInput = document.getElementById('chatInput');
    if (chatBubble) {
        chatBubble.classList.add('active');
        setTimeout(() => { if (chatInput) chatInput.focus(); }, 200);
    }
}
document.querySelectorAll('button.btn-secondary').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        openChatBubble();
    });
});
// Cerrar chat
function closeChatBubble() {
    const chatBubble = document.getElementById('chatBubble');
    if (chatBubble) {
        chatBubble.classList.remove('active');
        setTimeout(() => {
            const chatBody = document.getElementById('chatBody');
            if (chatBody) chatBody.innerHTML = '<div class="chat-message bot">¡Hola! ¿En qué podemos ayudarte hoy?</div>';
            const chatInput = document.getElementById('chatInput');
            if (chatInput) chatInput.value = '';
        }, 300);
    }
}
// Enviar mensaje en chat
const chatForm = document.getElementById('chatForm');
if (chatForm) {
    chatForm.addEventListener('submit', function(e) { e.preventDefault(); });
}
function handleChatSend() {
    const input = document.getElementById('chatInput');
    const chatBody = document.getElementById('chatBody');
    const msg = input.value.trim();
    if (msg && chatBody) {
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-message user';
        userMsg.textContent = msg;
        chatBody.appendChild(userMsg);
        input.value = '';
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'chat-message bot';
            botMsg.textContent = '¡Gracias por tu mensaje! Pronto nos pondremos en comunicación contigo.';
            chatBody.appendChild(botMsg);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 1000);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}
const chatSendBtn = document.getElementById('chatSend');
if (chatSendBtn) chatSendBtn.addEventListener('click', handleChatSend);
const chatInput = document.getElementById('chatInput');
if (chatInput) {
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleChatSend();
        }
    });
}

// --- Efectos visuales y animaciones ---
// IntersectionObserver para cambiar color de logo y botones nav en sección de planes
const plansSection = document.querySelector('.plans-section');
const navLogoIcon = document.querySelector('.logo-icon');
const navLogoText = document.querySelector('.logo-text');
const navBtns = document.querySelectorAll('.nav-links .btn');
if (plansSection && navLogoIcon && navLogoText && navBtns.length) {
    const navColorClass = 'nav-morado';
    const observerNav = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLogoIcon.classList.add(navColorClass);
                navLogoText.classList.add(navColorClass);
                navBtns.forEach(btn => btn.classList.add(navColorClass));
            } else {
                navLogoIcon.classList.remove(navColorClass);
                navLogoText.classList.remove(navColorClass);
                navBtns.forEach(btn => btn.classList.remove(navColorClass));
            }
        });
    }, { threshold: 0.5 });
    observerNav.observe(plansSection);
}
// Inicializar AOS
AOS.init({ duration: 800, easing: 'ease-in-out', once: true, offset: 100 });
// Scroll efecto header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    header.style.background = '#ffffff80';
    header.style.backdropFilter = 'blur(10px)';
});
// Hover en service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});
// Ripple en botones
const allBtns = document.querySelectorAll('.btn');
allBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        setTimeout(() => { ripple.remove(); }, 600);
    });
});
// Parallax en hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImages = document.querySelector('.hero-images');
    if (heroImages) heroImages.style.transform = `translateY(${scrolled * 0.1}px)`;
});
// Mobile menu toggle
const createMobileMenu = () => {
    const nav = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-btn')) {
            const menuBtn = document.createElement('button');
            menuBtn.className = 'mobile-menu-btn';
            menuBtn.innerHTML = '☰';
            menuBtn.style.cssText = `display: block; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #4285f4;`;
            menuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('mobile-open');
            });
            nav.insertBefore(menuBtn, navLinks);
        }
    }
};
window.addEventListener('resize', createMobileMenu);
createMobileMenu();
// Counter animaciones en case studies
const observerOptions = { threshold: 0.5, rootMargin: '0px 0px -100px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const metric = entry.target.querySelector('.case-metric');
            if (metric && !metric.classList.contains('animated')) {
                metric.classList.add('animated');
                animateCounter(metric);
            }
        }
    });
}, observerOptions);
document.querySelectorAll('.case-study-card').forEach(card => {
    observer.observe(card);
});
function animateCounter(element) {
    const text = element.textContent;
    const numbers = text.match(/\d+/g);
    if (numbers) {
        const finalNumber = parseInt(numbers[0]);
        let currentNumber = 0;
        const increment = finalNumber / 50;
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                currentNumber = finalNumber;
                clearInterval(timer);
            }
            element.textContent = text.replace(/\d+/, Math.floor(currentNumber));
        }, 30);
    }
}