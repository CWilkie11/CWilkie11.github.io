/**
 * HYPERDRIVE AI: WAR ROOM ENGINE
 * Phase 2: Front Office Negotiation Logic
 * Feature Set: NHL Home/Away, GM Decision Sensor, xGA Analytics
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

    // Initial Status for the Away GM Hub
    updateAwayStatus("AWAITING PROPOSAL...", "#00ff00", "(Select assets to initiate negotiations)");
});

// 2. STICKY HEADER
window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    if (header) {
        window.scrollY > 50 ? header.classList.add('scrolled') : header.classList.remove('scrolled');
    }
});

// 3. NEGOTIATION FEED LOGIC (Away GM Response Hub)
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

// 4. ROSTER ENGINE (Home vs Away)
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

    // Update Heading to Official Team Name
    if (teamHeading) teamHeading.innerText = teamData.name;

    // Update Cap and Clear old roster
    capAmount.innerText = `$${teamData.capSpace.toLocaleString()}`;
    rosterDisplay.innerHTML = '';
    
    // Inject Players with PPG and xGA
    teamData.roster.forEach(player => {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.innerHTML = `
            <div>
                <strong>${player.name}</strong> (${player.pos})
                <div style="font-size: 0.7rem; opacity: 0.8;">
                    PPG: ${player.ppg} | xGA: ${player.xga} | $${(player.salary / 1000000).toFixed(1)}M
                </div>
            </div>
            <button class="add-btn" onclick="selectAsset('${side}', '${player.name.replace(/'/g, "\\'")}')">+</button>
        `;
        rosterDisplay.appendChild(card);
    });

    updateAwayStatus("FRANCHISE DATA LOADED", "#00d4ff", `Analyzing ${teamData.name} roster depth...`);
}

// 5. ASSET SELECTION (Home vs Away Slots)
function selectAsset(side, playerName) {
    const selectId = side === 'A' ? 'team-a-select' : 'team-b-select';
    const teamId = document.getElementById(selectId).value;
    const team = nhlData.teams.find(t => t.id === teamId);
    const player = team.roster.find(p => p.name === playerName);

    if (side === 'A') {
        assetHome = player;
        document.querySelector('#slot-a .slot-content').innerHTML = `
            <div style="color: #3b82f6; font-weight: bold;">${assetHome.name}</div>
            <div style="font-size: 0.75rem;">OFFERED ASSET (xGA: ${assetHome.xga})</div>
        `;
    } else {
        assetAway = player;
        document.querySelector('#slot-b .slot-content').innerHTML = `
            <div style="color: #ef4444; font-weight: bold;">${assetAway.name}</div>
            <div style="font-size: 0.75rem;">TARGET RETURN (xGA: ${assetAway.xga})</div>
        `;
    }
    
    updateAwayStatus("ASSETS STAGED", "#f59e0b", "Away GM is reviewing the proposed value swap.");
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
        const xgaGap = assetHome.xga - assetAway.xga; // Positive means Home is worse defensively
        const salaryGap = assetHome.salary - assetAway.salary;

        // --- THE LOGIC ENGINE ---

        // 1. DENIED: Defensive Liability (xGA too high)
        if (xgaGap > 0.4) {
            updateAwayStatus("PROPOSAL DENIED: DEFENSIVE RISK", "#ef4444", 
                `Away GM: "We can't take this. ${assetHome.name} has a significantly higher xGA (${assetHome.xga}) than our current asset. We won't sacrifice our defensive structure."`);
        }
        // 2. DENIED: Scoring Gap (PPG too low)
        else if (ppgGap > 0.3) {
            updateAwayStatus("PROPOSAL DENIED: VALUE GAP", "#ef4444", 
                `Away GM: "The production doesn't match. We lose ${ppgGap.toFixed(2)} points per game in this deal. You need to offer a more impactful skater."`);
        }
        // 3. DENIED: Financials (Cap Hit)
        else if (salaryGap > 2000000) {
            updateAwayStatus("TRADE DENIED: CAP REJECTION", "#ef4444", 
                `Away GM: "We can't absorb ${assetHome.name}'s contract. Unless you retain significant salary, this deal is dead."`);
        }
        // 4. COUNTER-OFFER: The "Maybe" Zone
        else if (ppgGap > 0.1 || xgaGap > 0.1) {
            updateAwayStatus("COUNTER-OFFER INCOMING", "#f59e0b", 
                "Away GM: 'The analytics are close. We'll accept if you throw in a 2026 2nd-round pick to bridge the value gap.'");
        }
        // 5. ACCEPTED
        else {
            updateAwayStatus("PROPOSAL ACCEPTED", "#22c55e", 
                `Away GM: "The metrics check out. ${assetHome.name} fits our defensive profile and the cap flux is manageable. Send the paperwork."`);
        }

        // Update the Comparison Stats Box
        const aiStatus = document.getElementById('ai-status');
        if (aiStatus) {
            aiStatus.innerHTML = `
                <div style="font-size:0.8rem; text-align:left; border-top:1px solid #334155; padding-top:10px;">
                    <strong>📊 TRADE DELTA:</strong><br>
                    Net PPG: ${ppgGap > 0 ? '+' : ''}${ppgGap.toFixed(2)}<br>
                    xGA Shift: ${xgaGap > 0 ? '+' : ''}${xgaGap.toFixed(2)}<br>
                    Cap Flux: $${(salaryGap / 1000000).toFixed(1)}M
                </div>
            `;
        }
    });
}
