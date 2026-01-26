document.addEventListener('DOMContentLoaded', () => {
    // 1. THEME LOGIC
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
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

    // 2. STADIUM CAROUSEL LOGIC
    const stadiumImages = [
        { url: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800", label: "Football" },
        { url: "https://images.unsplash.com/photo-1505666287802-931dc8394b5f?w=800", label: "Basketball" },
        { url: "https://images.unsplash.com/photo-1517177646040-c89d747ca9a3?w=800", label: "Hockey" },
        { url: "https://images.unsplash.com/photo-1469122312224-c5846569efe1?w=800", label: "Baseball" },
        { url: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800", label: "Soccer" }
    ];

    let stadiumIndex = 0;
    const carouselImg = document.getElementById('carousel-img');
    const sportLabel = document.getElementById('sport-label');

    function rotateStadiums() {
        if (!carouselImg || !sportLabel) return;
        
        stadiumIndex = (stadiumIndex + 1) % stadiumImages.length;
        
        carouselImg.style.opacity = "0"; 
        
        setTimeout(() => {
            carouselImg.src = stadiumImages[stadiumIndex].url;
            sportLabel.innerText = stadiumImages[stadiumIndex].label;
            carouselImg.style.opacity = "1";
        }, 500);
    }

    if (carouselImg) {
        // Reduced to 3 seconds so you can verify the fix faster
        setInterval(rotateStadiums, 3000);
    }
});
