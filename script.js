const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

// This part checks if the user visited before and liked Dark Mode
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    toggleButton.innerText = '☀️ Light Mode';
}

// This part "listens" for when the user clicks the button
toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        toggleButton.innerText = '☀️ Light Mode';
    } else {
        localStorage.setItem('theme', 'light');
        toggleButton.innerText = '🌙 Dark Mode';
    }
});
