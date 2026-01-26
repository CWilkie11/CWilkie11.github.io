const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

// 1. On page load, check if the user has a manually saved preference
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
    toggleButton.innerText = '☀️ Light Mode';
} else if (savedTheme === 'light') {
    body.classList.add('light-mode');
    body.classList.remove('dark-mode');
    toggleButton.innerText = '🌙 Dark Mode';
}

// 2. The Toggle Logic
toggleButton.addEventListener('click', () => {
    // Check if the page is currently dark (either by class or by system default)
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
