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
    
    // Carousel logic removed to match the new Bento Grid layout.
});
