// Global variables to hold the two assets being compared
let assetA = null;
let assetB = null;

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

    // Initialize Status
    updateSystemStatus("System Initializing... Awaiting Franchise Data.");
});

// 2. STICKY HEADER LOGIC
window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 3. SYSTEM STATUS BUBBLE LOGIC
function updateSystemStatus(message) {
    const statusText = document.getElementById('system-status');
    if (statusText) {
        statusText.innerText = message;
    }
}

// 4. WAR ROOM: DUAL ROSTER ENGINE
function loadRoster(side) {
    // Identify IDs based on the side (A or B)
    const selectId = side === 'A' ? 'team-a-select' : 'team-b-select';
    const displayId = side === 'A' ? 'roster-a' : 'roster-b';
    const capId = side === 'A' ? 'cap-a' : 'cap-b';
    const nameHeadingId = side === 'A' ? 'team-a-name' : 'team-b-name';

    const teamSelect = document.getElementById(selectId);
    const rosterDisplay = document.getElementById(displayId);
    const capAmount = document.getElementById(capId);
    const teamHeading = document.getElementById(nameHeadingId);
    
    if (!teamSelect || !rosterDisplay) return;

    const selectedTeamId = teamSelect.value;
    const teamData = nhlData.teams.find(t => t.id === selectedTeamId);

    if (!teamData) return;

    // PROFESSIONAL TWEAK: Replace "Franchise" text with the official team name
    if (teamHeading) {
        teamHeading.innerText = teamData.name;
    }

    // Update Status Bubble
    updateSystemStatus(`Franchise ${teamData.name} Loaded. Accessing Scouting Reports...`);

    // Update Cap and Clear old roster
    capAmount.innerText = `$${teamData.capSpace.toLocaleString()}`;
    rosterDisplay.innerHTML = '';
    
    // Inject the players from the database
    teamData.roster.forEach(player => {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.innerHTML = `
            <div>
                <strong>${player.name}</strong> (${player.pos})
                <div style="font-size: 0.75rem; opacity: 0.7;">$${player.salary.toLocaleString()}</div>
            </div>
            <button class="add-btn" onclick="selectAsset('${side}', '${player.name.replace(/'/g, "\\'")}')">+</button>
        `;
        rosterDisplay.appendChild(card);
    });
}

// 5. SELECTION LOGIC (Moves players to the Impact Verdict Column)
function selectAsset(side, playerName) {
    const selectId = side === 'A' ? 'team-a-select' : 'team-b-select';
    const teamId = document.getElementById(selectId).value;
    const team = nhlData.teams.find(t => t.id === teamId);
    const player = team.roster.find(p => p.name === playerName);

    if (side === 'A') {
        assetA = player;
        document.querySelector('#slot-a .slot-content').innerHTML = `
            <div style="color: #00d4ff; font-weight: bold;">${assetA.name}</div>
            <div style="font-size: 0.8rem;">${assetA.points} PTS</div>
        `;
    } else {
        assetB = player;
        document.querySelector('#slot-b .slot-content').innerHTML = `
            <div style="color: #00d4ff; font-weight: bold;">${assetB.name}</div>
            <div style="font-size: 0.8rem;">${assetB.points} PTS</div>
        `;
    }
    
    updateSystemStatus("Assets identified. Ready for War Room analysis.");
}

// 6. IMPACT VERDICT ENGINE
const analyzeBtn = document.getElementById('execute-trade');
if (analyzeBtn) {
    analyzeBtn.addEventListener('click', () => {
        if (!assetA || !assetB) {
            alert("Select assets from both franchises to simulate impact.");
            return;
        }

        const pointDelta = assetB.points - assetA.points;
        const salaryDelta = assetB.salary - assetA.salary;

        const aiStatus = document.getElementById('ai-status');
        aiStatus.innerHTML = `
            <div class="ai-verdict-box" style="text-align:left;">
                <p><strong>IMPACT VERDICT:</strong></p>
                <ul style="list-style:none; padding:0; font-size:0.85rem; line-height:1.6;">
                    <li>📊 <strong>Production Delta:</strong> ${pointDelta > 0 ? '+' : ''}${pointDelta} PTS</li>
                    <li>💰 <strong>Salary Delta:</strong> $${salaryDelta.toLocaleString()}</li>
                </ul>
                <div style="border-top:1px solid #334155; margin-top:10px; padding-top:10px; font-size:0.75rem;">
                    <strong>AI NOTES:</strong> ${pointDelta > 0 ? "Strategic upgrade in production." : "Depth sacrifice for long-term cap relief."}
                </div>
            </div>
        `;
        updateSystemStatus("Simulation Complete. Verdict Rendered.");
    });
}

// 7. RESET ROOM
const resetBtn = document.getElementById('reset-trade');
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        location.reload(); 
    });
}
