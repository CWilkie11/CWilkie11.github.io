/**
 * HYPERDRIVE AI: WAR ROOM ENGINE
 * Phase 2: Front Office Negotiation Logic
 * Updated Feature Set: P/GP, Plus/Minus (+/-) Sensor, Cap Flux Tracking, Goalie Protocol
 */

let assetHome = null;
let assetAway = null;

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

    // 2. INITIALIZE RESET BUTTON (Integrated into DOM load)
    const resetBtn = document.getElementById('reset-trade');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            clearWarRoom();
        });
    }

    updateAwayStatus("AWAITING PROPOSAL...", "#00ff00", "(Select assets to initiate negotiations)");
});

// 3. NEGOTIATION FEED LOGIC
function updateAwayStatus(status, color, reasoning) {
    const statusText = document.getElementById('system-status');
    const reasonText = document.getElementById('gm-reasoning');
    
    if (statusText) {
        statusText.innerText = status;
        statusText.style.color = color;
    }
    if (reasonText) {
        reasonText.innerText = reasoning;
    }
}

// 4. ROSTER ENGINE
function loadRoster(side) {
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
    if (teamHeading) teamHeading.innerText = teamData.name;

    capAmount.innerText = `$${teamData.capSpace.toLocaleString()}`;
    rosterDisplay.innerHTML = '';
    
    teamData.roster.forEach(player => {
        const card = document.createElement('div');
        card.className = 'player-card';
        
        // DYNAMIC STATS: Skaters (P/GP, +/-) vs Goalies (SV%, GAA)
        let statsHTML = player.pos === 'G' 
            ? `SV%: ${player.sv} | GAA: ${player.gaa}` 
            : `P/GP: ${player.ppg} | +/-: ${player.plusMinus > 0 ? '+' : ''}${player.plusMinus}`;

        card.innerHTML = `
            <div>
                <strong>${player.name}</strong> (${player.pos})
                <div style="font-size: 0.7rem; opacity: 0.8;">
                    ${statsHTML} | $${(player.salary / 1000000).toFixed(1)}M
                </div>
            </div>
            <button class="add-btn" onclick="selectAsset('${side}', '${player.name.replace(/'/g, "\\'")}')">+</button>
        `;
        rosterDisplay.appendChild(card);
    });

    updateAwayStatus("FRANCHISE DATA LOADED", "#00d4ff", `Analyzing ${teamData.name} roster efficiency...`);
}

// 5. ASSET SELECTION
function selectAsset(side, playerName) {
    const selectId = side === 'A' ? 'team-a-select' : 'team-b-select';
    const teamId = document.getElementById(selectId).value;
    const team = nhlData.teams.find(t => t.id === teamId);
    const player = team.roster.find(p => p.name === playerName);

    if (side === 'A') {
        assetHome = player;
        document.querySelector('#slot-a .slot-content').innerHTML = `
            <div style="color: #3b82f6; font-weight: bold;">${assetHome.name}</div>
            <div style="font-size: 0.75rem;">OFFERED ASSET</div>
        `;
    } else {
        assetAway = player;
        document.querySelector('#slot-b .slot-content').innerHTML = `
            <div style="color: #ef4444; font-weight: bold;">${assetAway.name}</div>
            <div style="font-size: 0.75rem;">TARGET RETURN</div>
        `;
    }
    
    updateAwayStatus("ASSETS STAGED", "#f59e0b", "Away GM is running two-way impact simulations.");
}

// 6. THE AWAY GM DECISION ENGINE
const analyzeBtn = document.getElementById('execute-trade');
if (analyzeBtn) {
    analyzeBtn.addEventListener('click', () => {
        if (!assetHome || !assetAway) {
            alert("Select assets from both NHL HOME and NHL AWAY to simulate.");
            return;
        }

        const ppgGap = assetAway.ppg - assetHome.ppg;
        const pmGap = assetAway.plusMinus - assetHome.plusMinus;
        const salaryGap = assetHome.salary - assetAway.salary;

        // DENIAL 1: Two-Way Risk
        if (pmGap > 15) {
            updateAwayStatus("PROPOSAL DENIED: TWO-WAY RISK", "#ef4444", `Away GM: "The defensive drop-off is too high. ${assetHome.name}'s efficiency metrics don't justify the roster spot."`);
        } 
        // DENIAL 2: Efficiency Gap
        else if (ppgGap > 0.25) {
            updateAwayStatus("PROPOSAL DENIED: EFFICIENCY GAP", "#ef4444", `Away GM: "We lose ${ppgGap.toFixed(2)} points per game. This is an offensive downgrade we can't accept."`);
        } 
        // DENIAL 3: Cap Flux
        else if (salaryGap > 2500000) {
            updateAwayStatus("TRADE DENIED: CAP REJECTION", "#ef4444", `Away GM: "Financial non-starter. Taking on that much salary kills our flexibility."`);
        } 
        // ACCEPTED
        else {
            updateAwayStatus("PROPOSAL ACCEPTED", "#22c55e", `Away GM: "The analytics align. ${assetHome.name} maintains our performance ceiling."`);
        }

        const aiStatus = document.getElementById('ai-status');
        if (aiStatus) {
            aiStatus.innerHTML = `
                <div style="font-size:0.8rem; text-align:left; border-top:1px solid #334155; padding-top:10px;">
                    <strong>📊 TRADE DELTA:</strong><br>
                    Net P/GP: ${ppgGap > 0 ? '+' : ''}${ppgGap.toFixed(2)}<br>
                    +/- Impact: ${pmGap > 0 ? '+' : ''}${pmGap}<br>
                    Cap Flux: $${(salaryGap / 1000000).toFixed(1)}M
                </div>
            `;
        }
    });
}

// 7. GLOBAL RESET FUNCTION
function clearWarRoom() {
    assetHome = null;
    assetAway = null;
    document.querySelector('#slot-a .slot-content').innerHTML = "-- Empty --";
    document.querySelector('#slot-b .slot-content').innerHTML = "-- Empty --";
    updateAwayStatus("AWAITING PROPOSAL...", "#00ff00", "(Select assets to initiate negotiations)");
    const aiStatus = document.getElementById('ai-status');
    if (aiStatus) {
        aiStatus.innerHTML = `
            <p style="font-size: 0.7rem; color: #94a3b8; text-transform: uppercase;">Home GM Approval Probability:</p>
            <div id="gm-verdict-display" style="font-size: 1.2rem; font-weight: 900; color: #00d4ff;">AWAITING PROPOSAL...</div>
        `;
    }
    console.log("War Room Engine: Terms Cleared.");
}
