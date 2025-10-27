// ==================== VARIABLES GLOBALES ====================
let currentSection = 0;
const sections = document.querySelectorAll('.section');
const navDots = document.querySelectorAll('.nav-dot');
let isScrolling = false;

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initTimer();
    initChatAnimation();
    initMetricsChart();
});

// ==================== NAVEGACIÓN ====================
function initNavigation() {
    // Navegación con puntos laterales
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSection(index);
        });
    });

    // Scroll normal habilitado - navegación manual desactivada
    // El scroll ahora funciona de manera tradicional
    // Se mantienen los puntos de navegación lateral para cambio rápido
    
    // Detectar sección actual basada en scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = index;
                updateNavigation();
            }
        });
    }, { passive: true });

    // Navegación con teclado (más responsiva)
    let keyThrottle = false;
    document.addEventListener('keydown', (e) => {
        if (keyThrottle) return;
        
        if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
            keyThrottle = true;
            goToSection(currentSection + 1);
            setTimeout(() => { keyThrottle = false; }, 800);
        } else if (e.key === 'ArrowUp' && currentSection > 0) {
            keyThrottle = true;
            goToSection(currentSection - 1);
            setTimeout(() => { keyThrottle = false; }, 800);
        } else if (e.key === 'Home') {
            keyThrottle = true;
            goToSection(0);
            setTimeout(() => { keyThrottle = false; }, 800);
        } else if (e.key === 'End') {
            keyThrottle = true;
            goToSection(sections.length - 1);
            setTimeout(() => { keyThrottle = false; }, 800);
        }
    });

    // Navegación con touch (móvil)
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].clientY;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentSection < sections.length - 1) {
                // Swipe hacia arriba
                goToSection(currentSection + 1);
            } else if (diff < 0 && currentSection > 0) {
                // Swipe hacia abajo
                goToSection(currentSection - 1);
            }
        }
    }
}

function goToSection(index) {
    if (isScrolling || index < 0 || index >= sections.length) return;
    
    isScrolling = true;
    currentSection = index;

    // Scroll suave a la sección con mejor alineación
    sections[index].scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
    });

    // Actualizar navegación
    updateNavigation();

    // Activar animaciones de la sección con más tiempo
    setTimeout(() => {
        sections[index].classList.add('active');
        animateSection(index);
        isScrolling = false;
    }, 800);
}

function updateNavigation() {
    navDots.forEach((dot, index) => {
        if (index === currentSection) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// ==================== ANIMACIONES DE SCROLL ====================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Animar elementos dentro de la sección
                const cards = entry.target.querySelectorAll('.problem-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
        });
    }, observerOptions);

    // Hacer que todas las secciones sean visibles inmediatamente
    sections.forEach(section => {
        section.classList.add('active');
        observer.observe(section);
    });
}

function animateSection(index) {
    const section = sections[index];
    
    // Animaciones específicas por sección
    switch(index) {
        case 0: // Hero
            animateHero();
            break;
        case 1: // Problema
            animateProblema();
            break;
        case 2: // Solución
            animateSolucion();
            break;
        case 4: // Por qué ahora
            startTimer();
            break;
    }
}

// ==================== ANIMACIONES ESPECÍFICAS ====================
function animateHero() {
    const bubbles = document.querySelectorAll('.notification-bubble');
    bubbles.forEach((bubble, index) => {
        setTimeout(() => {
            bubble.style.opacity = '1';
            bubble.style.transform = 'translateY(0)';
        }, index * 300);
    });
}

function animateProblema() {
    const cards = document.querySelectorAll('.problem-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate-slide-up');
        }, index * 200);
    });
}

function animateSolucion() {
    const messages = document.querySelectorAll('.message');
    messages.forEach((message, index) => {
        setTimeout(() => {
            message.style.opacity = '1';
            message.style.transform = 'translateY(0)';
        }, index * 500);
    });
}

// ==================== TEMPORIZADOR ====================
let timerInterval;

function initTimer() {
    // Iniciar cuando la sección sea visible
    const timerSection = document.getElementById('por-que-ahora');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startTimer();
            } else {
                stopTimer();
            }
        });
    });
    
    observer.observe(timerSection);
}

function startTimer() {
    stopTimer(); // Limpiar timer anterior
    
    const timerElement = document.querySelector('.timer');
    let seconds = 60;
    
    timerInterval = setInterval(() => {
        seconds--;
        
        if (seconds < 0) {
            seconds = 60;
        }
        
        const formattedTime = `00:${seconds.toString().padStart(2, '0')}`;
        timerElement.textContent = formattedTime;
        
        // Cambiar color cuando queda poco tiempo
        if (seconds <= 10) {
            timerElement.style.color = '#FF4757';
            timerElement.style.animation = 'pulse 0.5s infinite';
        } else {
            timerElement.style.color = '#FF4757';
            timerElement.style.animation = 'none';
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
}

// ==================== ANIMACIÓN DE CHAT ====================
function initChatAnimation() {
    const chatSection = document.getElementById('solucion');
    const messages = document.querySelectorAll('.message');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ocultar todos los mensajes primero
                messages.forEach(msg => {
                    msg.style.opacity = '0';
                    msg.style.transform = 'translateY(20px)';
                });
                
                // Mostrarlos secuencialmente
                messages.forEach((message, index) => {
                    setTimeout(() => {
                        message.style.transition = 'all 0.5s ease';
                        message.style.opacity = '1';
                        message.style.transform = 'translateY(0)';
                    }, index * 800);
                });
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(chatSection);
}

// ==================== GRÁFICO DE MÉTRICAS ====================
function initMetricsChart() {
    // Verificar si estamos en la sección de métricas
    const metricsSection = document.getElementById('metricas');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                drawChart();
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(metricsSection);
}

function drawChart() {
    const chartContainer = document.querySelector('.chart-container');
    
    // Crear un gráfico simple con SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 800 250');
    
    // Datos del gráfico (simulados)
    const data = [
        { month: 'Ene', value: 45 },
        { month: 'Feb', value: 65 },
        { month: 'Mar', value: 80 },
        { month: 'Abr', value: 95 },
        { month: 'May', value: 120 },
        { month: 'Jun', value: 145 }
    ];
    
    const maxValue = Math.max(...data.map(d => d.value));
    const barWidth = 100;
    const spacing = 30;
    const chartHeight = 200;
    
    // Dibujar barras
    data.forEach((item, index) => {
        const x = index * (barWidth + spacing) + 50;
        const barHeight = (item.value / maxValue) * chartHeight;
        const y = chartHeight - barHeight + 30;
        
        // Barra
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', barWidth);
        rect.setAttribute('height', barHeight);
        rect.setAttribute('fill', 'url(#gradient)');
        rect.setAttribute('rx', '5');
        
        // Animación
        rect.style.opacity = '0';
        setTimeout(() => {
            rect.style.transition = 'opacity 0.5s ease';
            rect.style.opacity = '1';
        }, index * 100);
        
        svg.appendChild(rect);
        
        // Etiqueta del mes
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x + barWidth / 2);
        text.setAttribute('y', chartHeight + 50);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#ffffff');
        text.setAttribute('font-size', '14');
        text.textContent = item.month;
        svg.appendChild(text);
        
        // Valor
        const valueText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        valueText.setAttribute('x', x + barWidth / 2);
        valueText.setAttribute('y', y - 10);
        valueText.setAttribute('text-anchor', 'middle');
        valueText.setAttribute('fill', '#00D9A3');
        valueText.setAttribute('font-size', '16');
        valueText.setAttribute('font-weight', 'bold');
        valueText.textContent = item.value;
        svg.appendChild(valueText);
    });
    
    // Definir gradiente
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'gradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '0%');
    gradient.setAttribute('y2', '100%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#0066FF');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#00D9A3');
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);
    
    // Limpiar y agregar el gráfico
    chartContainer.innerHTML = '';
    chartContainer.appendChild(svg);
}

// ==================== ANIMACIÓN DE CONTADORES ====================
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ==================== EFECTOS DE PARALLAX ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax para el hero
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ==================== BOTÓN CTA ====================
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        alert('¡Gracias por tu interés! Pronto nos pondremos en contacto contigo.');
    });
}

// ==================== ANIMACIÓN DE NÚMEROS EN MÉTRICAS ====================
function initMetricsAnimation() {
    const metricsSection = document.getElementById('metricas');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animar los números
                const metricValues = document.querySelectorAll('.metric-value');
                metricValues.forEach((value, index) => {
                    setTimeout(() => {
                        const text = value.textContent;
                        const number = parseInt(text.replace(/\D/g, ''));
                        
                        if (!isNaN(number)) {
                            let current = 0;
                            const increment = number / 50;
                            const timer = setInterval(() => {
                                current += increment;
                                if (current >= number) {
                                    value.textContent = text;
                                    clearInterval(timer);
                                } else {
                                    value.textContent = Math.floor(current) + text.replace(/\d/g, '');
                                }
                            }, 30);
                        }
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(metricsSection);
}

// Iniciar animación de métricas
initMetricsAnimation();

// ==================== ANIMACIÓN DE MAPA ====================
function initMapAnimation() {
    const mapPoints = document.querySelectorAll('.map-point');
    
    mapPoints.forEach((point, index) => {
        point.style.opacity = '0';
        setTimeout(() => {
            point.style.transition = 'opacity 0.5s ease';
            point.style.opacity = '1';
        }, index * 200);
    });
}

// Observar la sección de mercado
const marketSection = document.getElementById('mercado');
const marketObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            initMapAnimation();
        }
    });
}, { threshold: 0.5 });

marketObserver.observe(marketSection);

// ==================== RESPONSIVE ====================
function checkMobile() {
    return window.innerWidth <= 768;
}

// Ajustar comportamiento en móviles
if (checkMobile()) {
    // Desactivar scroll automático en móviles para mejor experiencia
    document.querySelectorAll('.section').forEach(section => {
        section.style.minHeight = 'auto';
    });
}

// ==================== PRELOADER (OPCIONAL) ====================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Hacer todas las secciones visibles desde el inicio
    sections.forEach(section => {
        section.classList.add('active');
    });
    
    // Actualizar navegación inicial
    updateNavigation();
});

// ==================== SMOOTH SCROLL PARA NAVEGACIÓN ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ==================== EASTER EGG: ATTKIA LOGO CLICK ====================
const logos = document.querySelectorAll('.logo, .logo-large');
logos.forEach(logo => {
    let clickCount = 0;
    logo.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 5) {
            // Efecto especial después de 5 clicks
            document.body.style.transition = 'filter 0.5s';
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 1000);
            clickCount = 0;
        }
    });
});

// ==================== DEMO INTERACTIVO ====================
const demoModal = document.getElementById('demoModal');
const openDemoBtn = document.getElementById('openDemo');
const closeDemoBtn = document.getElementById('closeDemo');
const demoInput = document.getElementById('demoInput');
const demoSendBtn = document.getElementById('demoSend');
const demoChatMessages = document.getElementById('demoChatMessages');
const suggestionBtns = document.querySelectorAll('.suggestion-btn');

// Respuestas del chatbot
const botResponses = {
    'hola': [
        '¡Hola! 👋 Bienvenido a nuestra tienda. ¿En qué puedo ayudarte hoy?',
        '¿Te gustaría ver nuestro menú o hacer un pedido?'
    ],
    'pedido': [
        '¡Perfecto! Te muestro nuestro menú:',
        '🍕 Pizza Familiar - S/35',
        '🍔 Hamburguesa Clásica - S/18',
        '🌮 Tacos x3 - S/22',
        '🥤 Bebidas - S/5',
        '',
        '¿Qué te gustaría ordenar?'
    ],
    'pizza': [
        'Excelente elección 😊',
        '',
        '¿Pizza Familiar - S/35?',
        '',
        '¿Confirmas tu pedido?'
    ],
    'si': [
        '¡Genial! Pedido registrado ✅',
        '',
        'Pizza Familiar - S/35',
        '',
        '¿Cuál es tu dirección de entrega?'
    ],
    'gracias': [
        '¡Un placer ayudarte! 🙏',
        '',
        'Tu pedido está siendo procesado y llegará en 30-40 minutos.',
        '',
        '¿Necesitas algo más?'
    ],
    'default': [
        'Entiendo. ¿Puedo ayudarte con algo específico?',
        '',
        'Puedes decir:',
        '• "Quiero hacer un pedido"',
        '• "Mostrar menú"',
        '• "Gracias"'
    ]
};

// Abrir modal
openDemoBtn.addEventListener('click', () => {
    demoModal.classList.add('show');
    demoInput.focus();
});

// Cerrar modal
closeDemoBtn.addEventListener('click', closeModal);
demoModal.addEventListener('click', (e) => {
    if (e.target === demoModal) {
        closeModal();
    }
});

function closeModal() {
    demoModal.classList.remove('show');
}

// Cerrar con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && demoModal.classList.contains('show')) {
        closeModal();
    }
});

// Enviar mensaje
function sendMessage() {
    const message = demoInput.value.trim();
    if (!message) return;

    // Agregar mensaje del usuario
    addMessage(message, 'user');
    demoInput.value = '';

    // Simular "typing"
    setTimeout(() => {
        const response = getBotResponse(message);
        response.forEach((line, index) => {
            setTimeout(() => {
                addMessage(line, 'bot');
            }, index * 600);
        });
    }, 800);
}

demoSendBtn.addEventListener('click', sendMessage);
demoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Botones de sugerencias
suggestionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const msg = btn.getAttribute('data-msg');
        demoInput.value = msg;
        sendMessage();
    });
});

// Agregar mensaje al chat
function addMessage(text, type) {
    if (!text) return; // No agregar mensajes vacíos

    const messageDiv = document.createElement('div');
    messageDiv.className = `demo-message demo-${type}`;

    if (type === 'bot') {
        messageDiv.innerHTML = `
            <div class="demo-avatar">🤖</div>
            <div class="demo-bubble">
                <p>${text}</p>
                <span class="demo-time">${getCurrentTime()}</span>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="demo-bubble">
                <p>${text}</p>
                <span class="demo-time">${getCurrentTime()}</span>
            </div>
        `;
    }

    demoChatMessages.appendChild(messageDiv);
    demoChatMessages.scrollTop = demoChatMessages.scrollHeight;
}

// Obtener respuesta del bot
function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('hola') || lowerMessage.includes('hi') || lowerMessage.includes('buenas')) {
        return botResponses.hola;
    } else if (lowerMessage.includes('pedido') || lowerMessage.includes('comprar') || lowerMessage.includes('orden')) {
        return botResponses.pedido;
    } else if (lowerMessage.includes('pizza')) {
        return botResponses.pizza;
    } else if (lowerMessage.includes('si') || lowerMessage.includes('sí') || lowerMessage.includes('confirmo') || lowerMessage.includes('ok')) {
        return botResponses.si;
    } else if (lowerMessage.includes('gracias') || lowerMessage.includes('thank')) {
        return botResponses.gracias;
    } else {
        return botResponses.default;
    }
}

// Obtener hora actual
function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

console.log('%c🤖 ATTKIA AI COMMERCE', 'font-size: 24px; font-weight: bold; color: #0066FF;');
console.log('%c💡 Trabaja menos, vende más.', 'font-size: 16px; color: #00D9A3;');
console.log('%c🚀 Web creada con amor por el equipo ATTKIA', 'font-size: 12px; color: #666;');

