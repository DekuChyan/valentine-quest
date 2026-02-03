/**
 * Valentine's Quest - Main JavaScript
 * Handles smooth animations, interactivity and AJAX requests
 */

document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
    initButtonHandling();
    initSmoothScrolling();
    initFinale();
    initDragonEgg();
});

/**
 * Initialize entrance animations
 */
function initAnimations() {
    // Fade in content cards
    const cards = document.querySelectorAll('.content-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('show');
        }, 100 + (index * 100));
    });

    // Animate story images on scroll
    const images = document.querySelectorAll('.story-image img');
    if (images.length > 0) {
        observeElements(images, 'fade-in');
    }

    // Animate audio players
    const audioPlayers = document.querySelectorAll('.audio-player');
    if (audioPlayers.length > 0) {
        observeElements(audioPlayers, 'fade-in');
    }
}

/**
 * Observe elements and add class when they come into view
 */
function observeElements(elements, className) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(className);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => observer.observe(element));
}

/**
 * Smooth scrolling for any anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Handle audio player interactions
 */
document.querySelectorAll('.audio-element').forEach(audio => {
    audio.addEventListener('play', function() {
        const player = this.closest('.audio-player');
        if (player) {
            player.style.background = 'rgba(255, 107, 157, 0.2)';
            player.style.transition = 'background 0.3s ease';
        }
    });

    audio.addEventListener('pause', function() {
        const player = this.closest('.audio-player');
        if (player) {
            player.style.background = 'rgba(255, 196, 214, 0.2)';
        }
    });
});

/**
 * Add visual feedback for radio button selection
 */
document.querySelectorAll('.option input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', function() {
        document.querySelectorAll('.option').forEach(opt => {
            opt.style.background = 'rgba(255, 245, 247, 0.8)';
            opt.style.borderColor = 'transparent';
        });

        const option = this.closest('.option');
        if (option) {
            option.style.background = 'rgba(255, 196, 214, 0.5)';
            option.style.borderColor = 'var(--primary-color)';
        }
    });
});

/**
 * Handle button clicks and send JSON to Flask
 * MAIN LOGIC FIX HERE
 */
function initButtonHandling() {
    const buttons = document.querySelectorAll('.choice-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();

            // 1. Отримуємо дані
            const choice = this.dataset.choice;
            const currentStory = this.dataset.story;

            // 2. Блокуємо інтерфейс
            const originalText = this.innerHTML;
            this.innerHTML = 'Завантаження... ⏳';
            this.disabled = true;
            buttons.forEach(b => b.disabled = true);

            // 3. Формуємо дані
            const payload = {
                choice: choice,
                current_story: parseInt(currentStory)
            };

            // 4. Відправляємо на сервер
            fetch('/answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Server response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("Server response:", data); // Для дебагу в консолі

                if (data.next_url) {
                    // Анімація зникнення
                    const card = this.closest('.content-card');
                    if (card) {
                        card.style.transition = 'all 0.5s ease';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(-20px)';
                    }

                    // ПЕРЕХІД!
                    setTimeout(() => {
                        window.location.href = data.next_url;
                    }, 500);
                } else {
                    console.error("No next_url in response");
                    // Якщо сервер не повернув URL, повертаємо кнопки назад
                    this.innerHTML = originalText;
                    this.disabled = false;
                    buttons.forEach(b => b.disabled = false);
                    alert("Помилка: сервер не надав шлях далі.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                this.innerHTML = originalText;
                this.disabled = false;
                buttons.forEach(b => b.disabled = false);
                alert('Помилка з\'єднання. Спробуй ще раз.');
            });
        });
    });
}


/**
 * Логіка для фінального салюту
 */
function initFinale() {
    const yesBtn = document.querySelector('.btn-yes');
    const finalReveal = document.querySelector('.final-reveal');
    const answerButtons = document.querySelector('.answer-buttons');

    // Знаходимо наші медіа-файли
    const finalVideo = document.getElementById('final-video');
    const finalAudio = document.getElementById('final-audio');

    if (yesBtn) {
        yesBtn.addEventListener('click', function(e) {
            // 1. Показуємо прихований текст
            if (finalReveal) {
                finalReveal.classList.add('show');
                setTimeout(() => {
                    finalReveal.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            }

            // 2. Ховаємо кнопку
            if (answerButtons) {
                answerButtons.style.display = 'none';
            }

            // 3. ЗАПУСКАЄМО ВІДЕО (якщо воно є в HTML)
            if (finalVideo) {
                finalVideo.style.display = 'block'; // Робимо видимим
                finalVideo.play().catch(error => {
                    console.log("Автозапуск відео заблоковано браузером:", error);
                });
            }

            // 4. ЗАПУСКАЄМО АУДІО (якщо воно є в HTML)
            // Примітка: краще використовувати АБО відео, АБО аудіо, щоб звук не накладався
            if (finalAudio) {
                finalAudio.style.display = 'block'; // Робимо видимим
                finalAudio.play().catch(error => {
                    console.log("Автозапуск аудіо заблоковано браузером:", error);
                });
            }

            // 5. ЗАПУСКАЄМО САЛЮТ! 🎆
            createHeartExplosion();
            setTimeout(createHeartExplosion, 500);
            setTimeout(createHeartExplosion, 1000);
        });
    }
}

/**
 * Easter Egg: Chasing Dragon
 */
function initDragonEgg() {
    const dragon = document.getElementById('dragon-container');
    const msg = document.getElementById('dragon-msg');

    // Якщо дракона немає на сторінці (наприклад, це Story 1), виходимо
    if (!dragon) return;

    // Показуємо дракона
    dragon.style.display = 'block';

    let mouseX = 0;
    let mouseY = 0;
    let dragonX = 0;
    let dragonY = 0;

    // Швидкість реакції (0.05 - повільно/ліниво, 0.2 - дуже швидко)
    const speed = 0.08;

    // Відстежуємо мишку
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Анімація польоту
    function animate() {
        // Вираховуємо дистанцію
        const distX = mouseX - dragonX;
        const distY = mouseY - dragonY;

        // Рухаємо дракона до мишки (плавно)
        dragonX += distX * speed;
        dragonY += distY * speed;

        // Повертаємо дракона в бік руху (дзеркально)
        if (distX > 0) {
            dragon.style.transform = 'scaleX(-1)'; // Дивиться вправо
            if (msg) msg.style.transform = 'scaleX(-1)'; // Текст щоб не дзеркалило
        } else {
            dragon.style.transform = 'scaleX(1)'; // Дивиться вліво
            if (msg) msg.style.transform = 'scaleX(1)';
        }

        // Застосовуємо координати (центруємо дракона по курсору)
        dragon.style.left = (dragonX - 50) + 'px'; // -50 це половина ширини дракона
        dragon.style.top = (dragonY - 50) + 'px';

        // Якщо дракон дуже близько до курсора - показуємо повідомлення
        const distance = Math.sqrt(distX * distX + distY * distY);
        if (distance < 30) {
            if (msg) msg.style.opacity = '1';
        } else {
            if (msg) msg.style.opacity = '0';
        }

        requestAnimationFrame(animate);
    }

    animate();
}

/**
 * Creates a heart explosion effect
 * Used in the finale sequence
 */
function createHeartExplosion() {
    // Створюємо 50 сердечок
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.classList.add('explosion-heart');
        heart.innerHTML = '💖'; // Можна міняти на ❤️, 💕, 💘

        // Розміщуємо їх по центру екрана
        heart.style.left = '50%';
        heart.style.top = '50%';

        // Генеруємо випадковий напрямок для CSS змінної --i
        // Math.random() дає число від 0 до 1.
        // Наш CSS використає це, щоб розкидати їх в різні боки.
        heart.style.setProperty('--i', Math.random());

        // Додаємо випадковий розмір
        const size = 1 + Math.random() * 2; // Від 1rem до 3rem
        heart.style.fontSize = `${size}rem`;

        document.body.appendChild(heart);

        // Видаляємо сердечко після анімації (3 секунди), щоб не забивати пам'ять
        setTimeout(() => {
            heart.remove();
        }, 3000);
    }
}
console.log('💝 Valentine Quest initialized! Made with love ❤️');