document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 3500);
    });

    // 2. Language Switcher
    const langToggle = document.getElementById('lang-toggle');
    const langFr = langToggle.querySelector('.lang-fr');
    const langAr = langToggle.querySelector('.lang-ar');
    const body = document.body;

    langToggle.addEventListener('click', () => {
        const isAr = langAr.classList.toggle('active');
        langFr.classList.toggle('active');

        if (isAr) {
            body.setAttribute('dir', 'rtl');
            body.classList.add('rtl');
            switchLanguage('ar');
        } else {
            body.setAttribute('dir', 'ltr');
            body.classList.remove('rtl');
            switchLanguage('fr');
        }
    });

    function switchLanguage(lang) {
        const elements = document.querySelectorAll('[data-fr]');
        elements.forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });
    }

    // 3. Zoom Modal
    const modal = document.getElementById('zoom-modal');
    const modalImg = document.getElementById('zoomed-img');
    const closeBtn = document.querySelector('.close-modal');
    const zoomTriggers = document.querySelectorAll('.zoom-trigger');

    zoomTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const card = trigger.closest('.product-card');
            const imgSrc = card.querySelector('img').src;
            modalImg.src = imgSrc.replace('w=600', 'w=1200'); // Higher resolution
            modal.style.display = 'flex';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // 4. Scroll Reveal
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-card, .category-card, .about-container, .section-title').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    // 5. Cart Mockup
    let cartCount = 0;
    const cartBadge = document.querySelector('.cart-count');
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            cartCount++;
            cartBadge.textContent = cartCount;
            btn.textContent = body.classList.contains('rtl') ? 'تمت الإضافة' : 'Ajouté !';
            btn.style.background = '#d4af37';
            setTimeout(() => {
                btn.textContent = body.classList.contains('rtl') ? 'أضف إلى السلة' : 'Ajouter au Panier';
                btn.style.background = '#004d33';
            }, 2000);
        });
    });
});

// Add CSS for reveals
const style = document.createElement('style');
style.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    .reveal-active {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
