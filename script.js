document.addEventListener('DOMContentLoaded', () => {
    // 1. THEME LOGIC
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // Apply saved preference on load
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        if (toggleButton) toggleButton.innerText = '☀️ Light Mode';
    }

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            
            // Save preference
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // Update button text
            toggleButton.innerText = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
        });
    }
});

// 2. SCROLL LOGIC FOR STICKY HEADER
window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    
    // If the user scrolls more than 50 pixels down, activate the "scrolled" dashboard state
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 3. GM TOOLKIT: DATA INJECTION ENGINE
function loadRoster() {
    const teamSelect = document.getElementById('team-select');
    const rosterDisplay = document.getElementById('roster-display');
    const capAmount = document.getElementById('cap-amount');
    
    if (!teamSelect || !rosterDisplay) return; // Only runs on toolkit page

    const selectedTeamId = teamSelect.value;
    const teamData = nhlData.teams.find(t => t.id === selectedTeamId);

    // Update Cap Display
    capAmount.innerText = `$${teamData.capSpace.toLocaleString()}`;

    // Clear and Fill Roster
    rosterDisplay.innerHTML = '';
    teamData.roster.forEach(player => {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.innerHTML = `
            <div>
                <strong>${player.name}</strong> (${player.pos})
                <div style="font-size: 0.8rem; opacity: 0.7;">Salary: $${player.salary.toLocaleString()}</div>
            </div>
            <div class="stat-value">${player.xG} xG</div>
        `;
        rosterDisplay.appendChild(card);
    });
}

// Listen for Team Changes
const teamDropdown = document.getElementById('team-select');
if (teamDropdown) {
    teamDropdown.addEventListener('change', loadRoster);
    // Initial Load
    window.addEventListener('load', loadRoster);
}
