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
