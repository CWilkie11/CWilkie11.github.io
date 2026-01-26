const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

// 1. THE BRAIN: Checks memory and applies the theme
// This runs on EVERY page (Home and Articles)
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
    if (toggleButton) {
        toggleButton.innerText = '☀️ Light Mode';
    }
} else if (savedTheme === 'light') {
    body.classList.add('light-mode');
    body.classList.remove('dark-mode');
    if (toggleButton) {
        toggleButton.innerText = '🌙 Dark Mode';
    }
}

// 2. THE SWITCH: Only works if the button exists (Home Page)
if (toggleButton) {
    toggleButton.addEventListener('click', () => {
        // Determine if we are currently dark
        const isDark = body.classList.contains('dark-mode') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches && !body.classList.contains('light-mode'));

        if (isDark) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
            toggleButton.innerText = '🌙 Dark Mode';
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            toggleButton.innerText = '☀️ Light Mode';
        }
    });
}
// --- Stadium Carousel Logic ---
const stadiumImages = [
    { url: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=800&q=80", label: "Football" },
    { url: "https://images.unsplash.com/photo-1505666287802-931dc8394b5f?auto=format&fit=crop&w=800&q=80", label: "Basketball" },
    { url: "https://images.unsplash.com/photo-1517177646040-c89d747ca9a3?auto=format&fit=crop&w=800&q=80", label: "Hockey" },
    { url: "https://images.unsplash.com/photo-1508344928928-7165b67de128?auto=format&fit=crop&w=800&q=80", label: "Baseball" },
    { url: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80", label: "Soccer" }
];

let stadiumIndex = 0;
const carouselImg = document.getElementById('carousel-img');
const sportLabel = document.getElementById('sport-label');

function rotateStadiums() {
    if (!carouselImg) return; // Safety check for article pages
    
    stadiumIndex = (stadiumIndex + 1) % stadiumImages.length;
    
    // Smooth transition: Fade slightly out
    carouselImg.style.opacity = 0.9;
    
    setTimeout(() => {
        carouselImg.src = stadiumImages[stadiumIndex].url;
        sportLabel.innerText = stadiumImages[stadiumIndex].label;
        carouselImg.style.opacity = 1; // Fade back in
    }, 400);
}

// Rotate every 4 seconds
if (carouselImg) {
    setInterval(rotateStadiums, 4000);
}
