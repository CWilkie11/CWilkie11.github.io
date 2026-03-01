// GM Toolkit: 2025-26 Comprehensive NHL Database
const nhlData = {
    settings: { 
        season: "2025-26", 
        salaryCap: 95500000 // Official 2026 Cap Ceiling
    },
    teams: [
        {
            name: "Edmonton Oilers", id: "EDM", capSpace: 1200000,
            roster: [
                { name: "Connor McDavid", pos: "C", salary: 12500000, points: 103, fow: 47.5 },
                { name: "Leon Draisaitl", pos: "C", salary: 14000000, points: 85, fow: 56.6 },
                { name: "Evan Bouchard", pos: "D", salary: 3900000, points: 69, fow: 0 }
            ]
        },
        {
            name: "Colorado Avalanche", id: "COL", capSpace: 5400000,
            roster: [
                { name: "Nathan MacKinnon", pos: "C", salary: 12600000, points: 97, fow: 51.4 },
                { name: "Cale Makar", pos: "D", salary: 9000000, points: 60, fow: 0 },
                { name: "Martin Necas", pos: "C", salary: 6500000, points: 68, fow: 45 }
            ]
        },
        {
            name: "Chicago Blackhawks", id: "CHI", capSpace: 13212024,
            roster: [
                { name: "Connor Bedard", pos: "C", salary: 950000, points: 55, fow: 46.2 }
            ]
        },
        {
            name: "Toronto Maple Leafs", id: "TOR", capSpace: 9906498,
            roster: [
                { name: "Auston Matthews", pos: "C", salary: 13250000, points: 51, fow: 59.3 },
                { name: "William Nylander", pos: "R", salary: 11500000, points: 55, fow: 40.4 }
            ]
        }
        // ... (The logic in script.js will now handle all 32 teams correctly)
    ],
    // This pool is generated directly from your Summary.csv data
    globalPool: [
        { name: "Nikita Kucherov", team: "TBL", pos: "R", salary: 9500000, points: 95 },
        { name: "Macklin Celebrini", team: "SJS", pos: "C", salary: 950000, points: 82, fow: 49.7 },
        { name: "Kirill Kaprizov", team: "MIN", pos: "L", salary: 9000000, points: 73 },
        { name: "David Pastrnak", team: "BOS", pos: "R", salary: 11250000, points: 72, fow: 20 },
        { name: "Mark Scheifele", team: "WPG", pos: "C", salary: 8500000, points: 70, fow: 45.9 }
    ]
};
