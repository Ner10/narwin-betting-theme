// Narwin Betting App Interactive Logic

document.addEventListener("DOMContentLoaded", () => {
    initClock();
    initOddsFluctuation();
    initMenuSelection();
    initChatButton();
    initJackpotCounters();
    initModals();
});

/**
 * 1. Live Clock in Header (updates every second)
 */
function initClock() {
    const clockElement = document.getElementById("live-clock");
    if (!clockElement) return;

    function updateClock() {
        const now = new Date();
        const hrs = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        const secs = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hrs}:${mins}:${secs}`;
    }

    updateClock();
    setInterval(updateClock, 1000);
}

/**
 * 2. Simulated Dynamic Odds Fluctuation (adds premium live feeling)
 */
function initOddsFluctuation() {
    const oddsButtons = document.querySelectorAll(".odd-btn");
    if (oddsButtons.length === 0) return;

    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * oddsButtons.length);
        const button = oddsButtons[randomIndex];
        const valSpan = button.querySelector(".val");
        if (!valSpan) return;

        let currentOdd = parseFloat(valSpan.textContent);
        if (isNaN(currentOdd)) return;

        const isUp = Math.random() > 0.5;
        const changePercent = (Math.random() * 0.05) + 0.01;
        let newOdd = isUp ? (currentOdd + changePercent) : (currentOdd - changePercent);
        newOdd = Math.max(1.01, parseFloat(newOdd.toFixed(2)));
        valSpan.textContent = newOdd.toFixed(2);

        const existingArrow = button.querySelector(".odd-arrow");
        if (existingArrow) existingArrow.remove();

        const arrowSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        arrowSvg.setAttribute("class", `odd-arrow ${isUp ? "up" : "down"}`);
        arrowSvg.setAttribute("viewBox", "0 0 24 24");
        arrowSvg.setAttribute("width", "10");
        arrowSvg.setAttribute("height", "10");
        
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("fill", "currentColor");
        if (isUp) {
            path.setAttribute("d", "M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z");
            button.style.borderColor = "#4caf50";
            button.style.backgroundColor = "rgba(76, 175, 80, 0.15)";
        } else {
            path.setAttribute("d", "M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z");
            button.style.borderColor = "#f44336";
            button.style.backgroundColor = "rgba(244, 67, 54, 0.15)";
        }
        
        arrowSvg.appendChild(path);
        button.appendChild(arrowSvg);

        setTimeout(() => {
            button.style.borderColor = "";
            button.style.backgroundColor = "";
            arrowSvg.remove();
        }, 2500);
    }, 4500);
}

/**
 * 3. Menu Item Active State Selection
 */
function initMenuSelection() {
    const navItems = document.querySelectorAll(".nav-menu-list .nav-item");
    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            navItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
        });
    });
}

/**
 * 4. Canlı Chat Floating Button Action
 */
function initChatButton() {
    const chatBtn = document.getElementById("contact-sales-btn");
    if (!chatBtn) return;
    chatBtn.addEventListener("click", () => {
        alert("Narwin Müşteri Temsilcisine bağlanıyorsunuz... Lütfen bekleyin.");
    });
}

/**
 * 5. Jackpot Animated Counters
 *    - Initial count-up animation with easeOutExpo
 *    - Continuous live micro-increments simulating real-time jackpot growth
 */
function initJackpotCounters() {
    const jackpotAmounts = document.querySelectorAll(".jackpot-amount");
    if (jackpotAmounts.length === 0) return;

    // Format number: Turkish style (dot thousands, comma decimals)
    function formatAmount(num) {
        const parts = num.toFixed(2).split(".");
        const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return intPart + "," + parts[1] + " ₺";
    }

    // Easing function
    function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    jackpotAmounts.forEach((el) => {
        const targetInt = parseInt(el.dataset.target, 10);
        const decimals = parseInt(el.dataset.decimals || "0", 10);
        const targetValue = targetInt + decimals / 100;

        const duration = 2500;
        const startTime = performance.now();

        function animateCountUp(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutExpo(progress);
            const currentValue = easedProgress * targetValue;

            el.textContent = formatAmount(currentValue);

            if (progress < 1) {
                requestAnimationFrame(animateCountUp);
            } else {
                startLiveIncrement(el, targetValue);
            }
        }

        requestAnimationFrame(animateCountUp);
    });

    function startLiveIncrement(el, currentValue) {
        let value = currentValue;
        const interval = 150 + Math.floor(Math.random() * 200);

        setInterval(() => {
            const increment = Math.random() * 2.49 + 0.01;
            value += increment;
            el.textContent = formatAmount(value);
        }, interval);
    }
}

/**
 * 6. Auth Modals (Login / Register)
 */
function initModals() {
    const loginOverlay = document.getElementById('login-modal-overlay');
    const registerOverlay = document.getElementById('register-modal-overlay');
    const openLoginBtn = document.getElementById('open-login-modal');
    const openRegisterBtn = document.getElementById('open-register-modal');
    const closeLoginBtn = document.getElementById('close-login-modal');
    const closeRegisterBtn = document.getElementById('close-register-modal');
    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');

    function openModal(overlay) {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Open buttons
    openLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(loginOverlay);
    });

    openRegisterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(registerOverlay);
    });

    // Close buttons
    closeLoginBtn.addEventListener('click', () => closeModal(loginOverlay));
    closeRegisterBtn.addEventListener('click', () => closeModal(registerOverlay));

    // Switch between modals
    switchToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(loginOverlay);
        setTimeout(() => openModal(registerOverlay), 200);
    });

    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(registerOverlay);
        setTimeout(() => openModal(loginOverlay), 200);
    });

    // Click overlay to close
    [loginOverlay, registerOverlay].forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal(overlay);
        });
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal(loginOverlay);
            closeModal(registerOverlay);
        }
    });

    // Form submissions
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('.modal-submit-btn');
        btn.textContent = 'Giriş yapılıyor...';
        setTimeout(() => {
            btn.textContent = 'GİRİŞ YAP';
            closeModal(loginOverlay);
        }, 1500);
    });

    document.getElementById('register-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('.modal-submit-btn');
        btn.textContent = 'Kayıt oluşturuluyor...';
        setTimeout(() => {
            btn.textContent = 'KAYIT OL';
            closeModal(registerOverlay);
        }, 1500);
    });
}
