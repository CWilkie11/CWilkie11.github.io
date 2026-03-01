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
    const searchInput = document.getElementById('player-search');
    const resultsContainer = document.getElementById('search-results');
    
    if (!searchInput || !resultsContainer) return;

    const query = searchInput.value.toLowerCase().trim();
    resultsContainer.innerHTML = '';

    // Only search if the user has typed at least 2 characters
    if (query.length < 2) return;

    // Search the globalPool by name OR team abbreviation
    const filtered = nhlData.globalPool.filter(player => 
        player.name.toLowerCase().includes(query) || 
        player.team.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
        resultsContainer.innerHTML = '<p style="padding:10px; opacity:0.5;">No players found.</p>';
        return;
    }

    filtered.forEach(player => {
        const resultCard = document.createElement('div');
        resultCard.className = 'player-card';
        resultCard.innerHTML = `
            <div>
                <strong>${player.name}</strong> [${player.team}]
                <div style="font-size: 0.8rem; opacity: 0.7;">$${player.salary.toLocaleString()} | ${player.points} PTS</div>
            </div>
            <button class="add-btn" onclick="prepareTrade('${player.name.replace(/'/g, "\\'")}')">+</button>
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

// GM TOOLKIT: AI STRATEGIC VERDICT ENGINE
const analyzeBtn = document.getElementById('execute-trade');
if (analyzeBtn) {
    analyzeBtn.addEventListener('click', () => {
        if (!selectedTradeTarget) {
            alert("Select a trade target from the scouting report first.");
            return;
        }

        const teamSelect = document.getElementById('team-select');
        const teamData = nhlData.teams.find(t => t.id === teamSelect.value);
        
        // BI CALCULATION 1: Roster Efficiency (Points per $1M)
        const efficiency = (selectedTradeTarget.points / (selectedTradeTarget.salary / 1000000)).toFixed(2);
        
        // BI CALCULATION 2: Cap Intake (% of total ceiling)
        const capHitPercent = ((selectedTradeTarget.salary / nhlData.settings.salaryCap) * 100).toFixed(1);
        
        // BI CALCULATION 3: Win Probability (AI Projected Impact)
        const wpImpact = (selectedTradeTarget.points * 0.12).toFixed(1);
        
        const remainingCap = teamData.capSpace - selectedTradeTarget.salary;
        const color = remainingCap < 0 ? "#ff4d4d" : "#00d4ff";

        const aiStatus = document.getElementById('ai-status');
        aiStatus.innerHTML = `
            <div class="ai-verdict-box" style="text-align:left;">
                <p><strong>AI STRATEGIC VERDICT:</strong></p>
                <ul style="list-style:none; padding:0; font-size:0.9rem; line-height:1.6;">
                    <li>🎯 <strong>Efficiency:</strong> ${efficiency} PTS/$1M</li>
                    <li>💰 <strong>Cap Intake:</strong> ${capHitPercent}%</li>
                    <li>📈 <strong>Win Prob:</strong> +${wpImpact}%</li>
                    <li>💸 <strong>Remaining Cap:</strong> <span style="color:${color}; font-weight:bold;">$${remainingCap.toLocaleString()}</span></li>
                </ul>
                <div style="border-top:1px solid var(--border); margin-top:10px; padding-top:10px; font-size:0.8rem;">
                    ${remainingCap < 0 ? "⚠️ <strong>WARNING:</strong> Trade exceeds current financial budget." : "✅ <strong>OPTIMAL:</strong> Financial profile fits roster structure."}
                </div>
            </div>
        `;
    });
}

// Listen for Team Changes
const teamDropdown = document.getElementById('team-select');
if (teamDropdown) {
    teamDropdown.addEventListener('change', loadRoster);
}
