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

    // Initial load for the Toolkit
    if (document.getElementById('team-select')) {
        loadRoster();
    }
});

// 2. SCROLL LOGIC FOR STICKY HEADER
window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
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
    
    if (!teamSelect || !rosterDisplay) return;

    const selectedTeamId = teamSelect.value;
    const teamData = nhlData.teams.find(t => t.id === selectedTeamId);

    if (!teamData || teamData.roster.length === 0) {
        rosterDisplay.innerHTML = '<p style="opacity:0.5; padding:20px;">Scouting report in progress for this franchise...</p>';
        capAmount.innerText = '$---';
        return;
    }

    capAmount.innerText = `$${teamData.capSpace.toLocaleString()}`;
    rosterDisplay.innerHTML = '';
    
    teamData.roster.forEach(player => {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.innerHTML = `
            <div>
                <strong>${player.name}</strong> (${player.pos})
                <div style="font-size: 0.8rem; opacity: 0.7;">Salary: $${player.salary.toLocaleString()}</div>
            </div>
            <div class="stat-value">${player.points} PTS</div>
        `;
        rosterDisplay.appendChild(card);
    });
}

// 4. GM TOOLKIT: SEARCH & TRADE LOGIC
function searchPlayers() {
    const query = document.getElementById('player-search').value.toLowerCase();
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer || query.length < 2) return;

    resultsContainer.innerHTML = '';

    const filtered = nhlData.globalPool.filter(player => 
        player.name.toLowerCase().includes(query) || 
        player.team.toLowerCase().includes(query)
    );

    filtered.forEach(player => {
        const resultCard = document.createElement('div');
        resultCard.className = 'player-card';
        resultCard.innerHTML = `
            <div>
                <strong>${player.name}</strong> [${player.team}]
                <div style="font-size: 0.8rem; opacity: 0.7;">$${player.salary.toLocaleString()} | ${player.points} PTS</div>
            </div>
            <button class="add-btn" onclick="prepareTrade('${player.name}')">+</button>
        `;
        resultsContainer.appendChild(resultCard);
    });
}

// Global variable to hold target
let selectedTradeTarget = null;

function prepareTrade(playerName) {
    selectedTradeTarget = nhlData.globalPool.find(p => p.name === playerName);
    const aiStatus = document.getElementById('ai-status');
    aiStatus.innerHTML = `
        <p><strong>Trade Target Identified:</strong> ${selectedTradeTarget.name}</p>
        <p style="font-size:0.8rem;">Click 'Analyze Scenario' to run AI simulation.</p>
    `;
}

// Execute the Math
const analyzeBtn = document.getElementById('execute-trade');
if (analyzeBtn) {
    analyzeBtn.addEventListener('click', () => {
        if (!selectedTradeTarget) {
            alert("Please search and select a trade target first!");
            return;
        }
        
        const teamSelect = document.getElementById('team-select');
        const teamData = nhlData.teams.find(t => t.id === teamSelect.value);
        
        const currentPoints = teamData.roster.reduce((sum, p) => sum + p.points, 0);
        const newTotalPoints = currentPoints + selectedTradeTarget.points;
        const remainingCap = teamData.capSpace - selectedTradeTarget.salary;
        
        const aiStatus = document.getElementById('ai-status');
        const color = remainingCap < 0 ? "#ff4d4d" : "#00d4ff";
        
        aiStatus.innerHTML = `
            <p><strong>AI VERDICT:</strong></p>
            <p>Projected Points: <span class="stat-value">${newTotalPoints}</span></p>
            <p>Remaining Cap: <span style="color:${color}; font-weight:bold;">$${remainingCap.toLocaleString()}</span></p>
            <p style="font-size:0.7rem; margin-top:5px;">${remainingCap < 0 ? "⚠️ WARNING: Trade exceeds budget." : "✅ Financials cleared."}</p>
        `;
    });
}

// Listen for Team Changes
const teamDropdown = document.getElementById('team-select');
if (teamDropdown) {
    teamDropdown.addEventListener('change', loadRoster);
}
