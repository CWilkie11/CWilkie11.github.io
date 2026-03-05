/**
 * HYPERDRIVE AI: WAR ROOM ENGINE
 * Phase 2: Front Office Negotiation Logic
 * Updated Feature Set: P/GP, Plus/Minus (+/-) Sensor, Cap Flux Tracking
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
    
    // Inject Players with P/GP and +/- (Replacing xGA)
    teamData.roster.forEach(player => {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.innerHTML = `
            <div>
                <strong>${player.name}</strong> (${player.pos})
                <div style="font-size: 0.7rem; opacity: 0.8;">
                    P/GP: ${player.ppg} | +/-: ${player.plusMinus > 0 ? '+' : ''}${player.plusMinus} | $${(player.salary / 1000000).toFixed(1)}M
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
            <div style="font-size: 0.75rem;">OFFERED ASSET (P/GP: ${assetHome.ppg})</div>
        `;
    } else {
        assetAway = player;
        document.querySelector('#slot-b .slot-content').innerHTML = `
            <div style="color: #ef4444; font-weight: bold;">${assetAway.name}</div>
            <div style="font-size: 0.75rem;">TARGET RETURN (P/GP: ${assetAway.ppg})</div>
        `;
    }
    
    updateAwayStatus("ASSETS STAGED", "#f59e0b", "Away GM is running two-way impact simulations.");
}

// 6. THE AWAY GM DECISION ENGINE (The "Trade Deadline Engine")
const analyzeBtn = document.getElementById('execute-trade');
if (analyzeBtn) {
    analyzeBtn.addEventListener('click', () => {
        if (!assetHome || !assetAway) {
            alert("Select assets from both NHL HOME and NHL AWAY to simulate.");
            return;
        }

        const ppgGap = assetAway.ppg - assetHome.ppg;
        const plusMinusGap = assetAway.plusMinus - assetHome.plusMinus;
        const salaryGap = assetHome.salary - assetAway.salary;

        // --- THE UPDATED LOGIC ENGINE ---

        // 1. DENIED: Defensive Liability (Plus/Minus too low)
        if (plusMinusGap > 15) {
            updateAwayStatus("PROPOSAL DENIED: TWO-WAY RISK", "#ef4444", 
                `Away GM: "We can't justify the defensive drop-off. ${assetHome.name} is a ${assetHome.plusMinus} compared to our asset's ${assetAway.plusMinus}. Our structure would collapse."`);
        }
        // 2. DENIED: Scoring Efficiency (P/GP too low)
        else if (ppgGap > 0.25) {
            updateAwayStatus("PROPOSAL DENIED: EFFICIENCY GAP", "#ef4444", 
                `Away GM: "The production rate isn't there. We lose ${ppgGap.toFixed(2)} points per game in this deal. We need more offensive ROI."`);
        }
        // 3. DENIED: Financials (Cap Flux/Hit)
        else if (salaryGap > 2500000) {
            updateAwayStatus("TRADE DENIED: CAP REJECTION", "#ef4444", 
                `Away GM: "This creates an unmanageable Cap Flux of $${(salaryGap / 1000000).toFixed(1)}M. We don't have the space to absorb this hit."`);
        }
        // 4. COUNTER-OFFER: The "Maybe" Zone
        else if (ppgGap > 0.1 || plusMinusGap > 5) {
            updateAwayStatus("COUNTER-OFFER INCOMING", "#f59e0b", 
                "Away GM: 'The analytics are interesting but slightly lopsided. We'll accept if you retain 25% of the salary to balance the financial risk.'");
        }
        // 5. ACCEPTED
        else {
            updateAwayStatus("PROPOSAL ACCEPTED", "#22c55e", 
                `Away GM: "The efficiency metrics align. ${assetHome.name} maintains our two-way standard and the cap flux is within our 3-year model limits."`);
        }

        // Update the Comparison Stats Box
        const aiStatus = document.getElementById('ai-status');
        if (aiStatus) {
            aiStatus.innerHTML = `
                <div style="font-size:0.8rem; text-align:left; border-top:1px solid #334155; padding-top:10px;">
                    <strong>📊 TRADE DELTA:</strong><br>
                    Net P/GP: ${ppgGap > 0 ? '+' : ''}${ppgGap.toFixed(2)}<br>
                    +/- Variance: ${plusMinusGap > 0 ? '+' : ''}${plusMinusGap}<br>
                    Cap Flux: $${(salaryGap / 1000000).toFixed(1)}M
                </div>
            `;
        }
    });
}

// 6. RESET ENGINE (Clear All Terms)
const resetBtn = document.getElementById('reset-trade');
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        // Clear variables
        assetHome = null;
        assetAway = null;

        // Reset the trade slots in the UI
        document.querySelector('#slot-a .slot-content').innerHTML = "-- Empty --";
        document.querySelector('#slot-b .slot-content').innerHTML = "-- Empty --";

        // Reset the GM Negotiation Hub (Top Bubble)
        updateAwayStatus("AWAITING PROPOSAL...", "#00ff00", "(Select assets to initiate negotiations)");

        // Reset the internal analytics box
        const aiStatus = document.getElementById('ai-status');
        if (aiStatus) {
            aiStatus.innerHTML = `
                <p style="font-size: 0.7rem; color: #94a3b8; text-transform: uppercase;">Home GM Approval Probability:</p>
                <div id="gm-verdict-display" style="font-size: 1.2rem; font-weight: 900; color: #00d4ff;">AWAITING PROPOSAL...</div>
            `;
        }
        
        console.log("War Room Engine: Terms Cleared. System Reset.");
    });
}
