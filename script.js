document.addEventListener('DOMContentLoaded', () => {
    // 1. THEME LOGIC
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        if (toggleButton) toggleButton.innerText = '☀️ Light Mode';
    }

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            toggleButton.innerText = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
        });
    }

    // 2. STADIUM CAROUSEL - Direct High-Res Links
    const stadiumImages = [
        { url: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1000&q=80", label: "Soccer" },
        { url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=80", label: "Football" },
        { url: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=1000&q=80", label: "Basketball" },
        { url: "https://images.unsplash.com/photo-1517177646040-c89d747ca9a3?auto=format&fit=crop&w=1000&q=80", label: "Hockey" },
        { url: "https://images.unsplash.com/photo-1508344928928-7165b67de128?auto=format&fit=crop&w=1000&q=80", label: "Baseball" }
    ];

    let index = 0;
    const carouselImg = document.getElementById('carousel-img');
    const sportLabel = document.getElementById('sport-label');

    function updateCarousel() {
        if (!carouselImg || !sportLabel) return;

        // Move to next sport
        index = (index + 1) % stadiumImages.length;

        // Force a clean fade
        carouselImg.style.opacity = "0";

        setTimeout(() => {
            // Update both at the exact same time while invisible
            carouselImg.src = stadiumImages[index].url;
            sportLabel.innerText = stadiumImages[index].label;
            
            // Bring it back
            carouselImg.style.opacity = "1";
        }, 500);
    }

    if (carouselImg) {
        // Run every 4 seconds
        setInterval(updateCarousel, 4000);
    }
});
