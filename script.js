// Анимация появления элементов при скролле
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    cards.forEach(card => {
        observer.observe(card);
    });
    
    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Обновляем URL без перезагрузки
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });
    
    // Динамическое обновление активного пункта меню при скролле
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Случайное мерцание элементов
    function randomFlicker() {
        const elements = document.querySelectorAll('.card, .nav-link, h1, h2');
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        
        randomElement.style.opacity = '0.7';
        randomElement.style.textShadow = '0 0 10px red';
        
        setTimeout(() => {
            randomElement.style.opacity = '';
            randomElement.style.textShadow = '';
        }, 100);
    }
    
    // Запуск мерцания каждые 3-10 секунд
    setInterval(randomFlicker, Math.random() * 7000 + 3000);
    
    // Эффект печатания текста для заголовка
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const originalText = tagline.textContent;
        tagline.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                tagline.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Запускаем через секунду после загрузки
        setTimeout(typeWriter, 1000);
    }
    
    // Добавляем эффект наведения на кнопки
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
