/**
 * HYPERDRIVE AI: WAR ROOM ENGINE
 * Finalized Logic for Inter-Franchise Asset Exchange
 */

// Global variables to hold the two assets being compared
let assetA = null;
let assetB = null;

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

    // BUSINESS PROFESSIONAL TWEAK: Replace "Franchise" text with official Team Name
    if (teamHeading) {
        teamHeading.innerText = teamData.name;
    }

    // Update Status Bubble with Franchise Name
    updateSystemStatus(`Franchise ${teamData.name} Loaded. Accessing Scouting Reports...`);

    // Update Cap and Clear old roster
    capAmount.innerText = `$${teamData.capSpace.toLocaleString()}`;
    rosterDisplay.innerHTML = '';
    
    // Check if roster has players
    if (teamData.roster.length === 0) {
        rosterDisplay.innerHTML = '<p style="opacity:0.5; padding:20px;">Scouting report in progress for this franchise...</p>';
        return;
    }

    // Inject the players from the database
    teamData.roster.forEach(player => {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.innerHTML = `
            <div>
                <strong>${player.name}</strong> (${player.pos})
                <div style="font-size: 0.75rem; opacity: 0.7;">Salary: $${player.salary.toLocaleString()}</div>
            </div>
            <button class="add-btn" onclick="selectAsset('${side}', '${player.name.replace(/'/g, "\\'")}')">+</button>
        `;
        rosterDisplay.appendChild(card);
    });
}

// 5. SELECTION LOGIC (Moves players to the Impact Verdict Comparison Column)
function selectAsset(side, playerName) {
    const selectId = side === 'A' ? 'team-a-select' : 'team-b-select';
    const teamId = document.getElementById(selectId).value;
    const team = nhlData.teams.find(t => t.id === teamId);
    const player = team.roster.find(p => p.name === playerName);

    if (side === 'A') {
        assetA = player;
        document.querySelector('#slot-a .slot-content').innerHTML = `
            <div style="color: #00d4ff; font-weight: bold;">${assetA.name}</div>
            <div style="font-size: 0.8rem;">${assetA.points} PTS | ${assetA.pos}</div>
        `;
    } else {
        assetB = player;
        document.querySelector('#slot-b .slot-content').innerHTML = `
            <div style="color: #00d4ff; font-weight: bold;">${assetB.name}</div>
            <div style="font-size: 0.8rem;">${assetB.points} PTS | ${assetB.pos}</div>
        `;
    }
    
    updateSystemStatus("Assets identified. Ready for War Room analysis.");
}

// 6. IMPACT VERDICT ENGINE (BI DATA ANALYSIS)
const analyzeBtn = document.getElementById('execute-trade');
if (analyzeBtn) {
    analyzeBtn.addEventListener('click', () => {
        if (!assetA || !assetB) {
            alert("Select assets from both franchises to simulate impact.");
            return;
        }

        // Calculation 1: Production Delta (Based on 'P' from XLSX)
        const pointDelta = assetB.points - assetA.points;
        
        // Calculation 2: Possession Impact (Based on 'FOW%' from XLSX)
        const fowDelta = (assetB.fow - assetA.fow).toFixed(1);
        
        // Calculation 3: Financial Risk
        const salaryDelta = assetB.salary - assetA.salary;

        const aiStatus = document.getElementById('ai-status');
        aiStatus.innerHTML = `
            <div class="ai-verdict-box" style="text-align:left;">
                <p style="font-family:'Orbitron'; color:#00d4ff; border-bottom:1px solid #334155;">STRATEGIC ANALYSIS</p>
                <ul style="list-style:none; padding:0; font-size:0.85rem; line-height:1.8;">
                    <li>🏒 <strong>Net Production:</strong> ${pointDelta > 0 ? '+' : ''}${pointDelta} Points</li>
                    <li>🔄 <strong>Possession Shift:</strong> ${fowDelta > 0 ? '+' : ''}${fowDelta}% FOW</li>
                    <li>💰 <strong>Cap Flux:</strong> $${salaryDelta.toLocaleString()}</li>
                </ul>
                <div style="background: rgba(0, 212, 255, 0.1); padding: 8px; border-radius: 4px; font-size: 0.75rem; margin-top: 10px;">
                    <strong>AI VERDICT:</strong> ${generateAIVerdict(pointDelta, fowDelta, salaryDelta)}
                </div>
            </div>
        `;
        updateSystemStatus("Data Correlation Complete. Verdict Rendered.");
    });
}

// AI Analysis Logic based on the stats
function generateAIVerdict(pts, fow, money) {
    if (pts > 10 && money <= 0) return "High-value acquisition. Elite production increase with zero cap inflation.";
    if (pts < 0 && money < -2000000) return "Strategic cap dump. Sacrificing production for long-term financial flexibility.";
    if (fow > 5) return "Positional upgrade. Significant improvement in puck possession and faceoff circle control.";
    if (pts > 0) return "Marginal production upgrade. Fits current roster scoring profile.";
    return "Lateral move detected. Minor impact on overall franchise trajectory.";
}
