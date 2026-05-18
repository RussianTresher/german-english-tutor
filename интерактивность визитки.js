document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 0. БУРГЕР-МЕНЮ (мобильные)
    // ==========================================
    const burger = document.getElementById('burger');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');
    const mobileNavLinks = document.querySelectorAll('.nav-menu .nav-links a');

    const closeMenu = () => {
        burger.classList.remove('active');
        navMenu.classList.remove('open');
        navOverlay.classList.remove('open');
        document.body.classList.remove('menu-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Открыть меню');
    };

    const openMenu = () => {
        burger.classList.add('active');
        navMenu.classList.add('open');
        navOverlay.classList.add('open');
        document.body.classList.add('menu-open');
        burger.setAttribute('aria-expanded', 'true');
        burger.setAttribute('aria-label', 'Закрыть меню');
    };

    if (burger && navMenu && navOverlay) {
        burger.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        navOverlay.addEventListener('click', closeMenu);

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) closeMenu();
        });
    }

    // ==========================================
    // 1. АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ (Scroll Animation)
    // ==========================================
    // Добавим класс для анимации элементам (карточкам и тексту)
    // Карточки преимуществ — появление с задержкой (stagger)
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        const delay = card.dataset.delay || 0;
        card.style.setProperty('--delay', delay);
    });

    if (featureCards.length && 'IntersectionObserver' in window) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });

        featureCards.forEach(card => cardObserver.observe(card));
    } else {
        featureCards.forEach(card => card.classList.add('is-visible'));
    }

    // Остальные блоки — анимация при скролле
    const animatedElements = document.querySelectorAll('.testimonial-card, .about-text, .about-img');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
    });

    const checkVisibility = () => {
        const triggerBottom = window.innerHeight / 5 * 4;

        animatedElements.forEach(el => {
            const boxTop = el.getBoundingClientRect().top;
            if (boxTop < triggerBottom) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', checkVisibility);
    checkVisibility();


    // ==========================================
    // 2. ИНТЕРАКТИВНАЯ ОТПРАВКА ФОРМЫ (AJAX-like)
    // ==========================================
    const form = document.querySelector('.contact-form form');
    const submitBtn = document.getElementById('submitBtn');

    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            if (submitBtn.disabled) return;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            const rect = submitBtn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            submitBtn.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
        });
    }

    if (form && submitBtn) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();

            if (name.length < 2) {
                alert('Пожалуйста, введите корректное имя.');
                submitBtn.classList.add('shake');
                setTimeout(() => submitBtn.classList.remove('shake'), 500);
                return;
            }

            submitBtn.classList.add('is-loading');
            submitBtn.disabled = true;

            setTimeout(() => {
                const formContainer = document.querySelector('.contact-form');
                formContainer.innerHTML = `
                    <div class="form-success">
                        <span class="form-success__icon">✅</span>
                        <h3>Спасибо, ${name}!</h3>
                        <p>Заявка успешно принята. Я свяжусь с вами в Telegram или по телефону в ближайшее время.</p>
                    </div>
                `;
            }, 1500);
        });
    }

    // ==========================================
    // 3. ПОДСВЕТКА АКТИВНОГО ПУНКТА МЕНЮ ПРИ СКРОЛЛЕ
    // ==========================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Если прокрутили больше, чем до середины секции
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });

});