// Narwin Betting App Interactive Logic

document.addEventListener("DOMContentLoaded", () => {
    initClock();
    initOddsFluctuation();
    initMenuSelection();
    initChatButton();
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

    // Periodically change odds every 4 to 8 seconds
    setInterval(() => {
        // Pick a random odds button
        const randomIndex = Math.floor(Math.random() * oddsButtons.length);
        const button = oddsButtons[randomIndex];
        const valSpan = button.querySelector(".val");
        if (!valSpan) return;

        // Parse existing value
        let currentOdd = parseFloat(valSpan.textContent);
        if (isNaN(currentOdd)) return;

        // Determine increase or decrease
        const isUp = Math.random() > 0.5;
        const changePercent = (Math.random() * 0.05) + 0.01; // 1% to 6% change
        let newOdd = isUp ? (currentOdd + changePercent) : (currentOdd - changePercent);
        
        // Floor to two decimals
        newOdd = Math.max(1.01, parseFloat(newOdd.toFixed(2)));

        // Update UI value
        valSpan.textContent = newOdd.toFixed(2);

        // Remove any existing arrow indicator
        const existingArrow = button.querySelector(".odd-arrow");
        if (existingArrow) {
            existingArrow.remove();
        }

        // Add arrow indicator and flashing animation class
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

        // Clear highlight colors after 2.5 seconds
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
            // Remove active from all
            navItems.forEach(i => i.classList.remove("active"));
            
            // Add active to current
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
