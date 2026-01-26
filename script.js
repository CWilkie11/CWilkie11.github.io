// 1. THEME LOGIC
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    if (toggleButton) toggleButton.innerText = '☀️ Light Mode';
} else if (savedTheme === 'light') {
    body.classList.add('light-mode');
    if (toggleButton) toggleButton.innerText = '🌙 Dark Mode';
}

if (toggleButton) {
    toggleButton.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
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

// 2. STADIUM CAROUSEL LOGIC
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
    if (!carouselImg || !sportLabel) return;
    
    // Increment the index
    stadiumIndex = (stadiumIndex + 1) % stadiumImages.length;
    
    // 1. Fade out
    carouselImg.style.opacity = "0"; 
    
    setTimeout(() => {
        // 2. Change Source and Label while invisible
        carouselImg.src = stadiumImages[stadiumIndex].url;
        sportLabel.innerText = stadiumImages[stadiumIndex].label;
        
        // 3. Fade back in
        carouselImg.style.opacity = "1";
    }, 500); // This matches the 0.5s CSS transition
}

// Start the timer only if the carousel exists (Home Page)
if (carouselImg) {
    setInterval(rotateStadiums, 4000);
}
