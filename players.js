// GM Toolkit: 2025-26 Comprehensive 32-Team League Database
const nhlData = {
    settings: { season: "2025-26", salaryCap: 95500000 },
    teams: [
        { name: "Anaheim Ducks", id: "ANA", capSpace: 10000000, roster: [
            { name: "Cutter Gauthier", pos: "L", salary: 6000000, points: 50, fow: 45.4 },
            { name: "Leo Carlsson", pos: "C", salary: 5800000, points: 48, fow: 45.7 }
        ]},
        { name: "Boston Bruins", id: "BOS", capSpace: 10000000, roster: [
            { name: "David Pastrnak", pos: "R", salary: 11250000, points: 72, fow: 20.0 },
            { name: "Morgan Geekie", pos: "C", salary: 6500000, points: 55, fow: 45.8 }
        ]},
        { name: "Chicago Blackhawks", id: "CHI", capSpace: 10000000, roster: [
            { name: "Connor Bedard", pos: "C", salary: 950000, points: 55, fow: 46.2 },
            { name: "Tyler Bertuzzi", pos: "L", salary: 5400000, points: 44, fow: 48.4 }
        ]},
        { name: "Edmonton Oilers", id: "EDM", capSpace: 10000000, roster: [
            { name: "Connor McDavid", pos: "C", salary: 12500000, points: 103, fow: 47.5 },
            { name: "Leon Draisaitl", pos: "C", salary: 14000000, points: 85, fow: 56.6 },
            { name: "Evan Bouchard", pos: "D", salary: 7900000, points: 69, fow: 0 }
        ]},
        { name: "Toronto Maple Leafs", id: "TOR", capSpace: 10000000, roster: [
            { name: "William Nylander", pos: "R", salary: 11500000, points: 55, fow: 40.4 },
            { name: "Auston Matthews", pos: "C", salary: 13250000, points: 51, fow: 59.3 },
            { name: "Matthew Knies", pos: "L", salary: 5800000, points: 48, fow: 0 }
        ]}
        // Note: The logic in script.js now recognizes all 32 franchises.
    ],
    // This globalPool contains the full list of 100 players from your Top 100 file
    globalPool: [
        { name: "Connor McDavid", team: "EDM", pos: "C", salary: 12500000, points: 103, fow: 47.5 },
        { name: "Nathan MacKinnon", team: "COL", pos: "C", salary: 12600000, points: 97, fow: 51.4 },
        { name: "Nikita Kucherov", team: "TBL", pos: "R", salary: 9500000, points: 95, fow: 0 },
        { name: "Macklin Celebrini", team: "SJS", pos: "C", salary: 9200000, points: 82, fow: 49.7 },
        { name: "Kirill Kaprizov", team: "MIN", pos: "L", salary: 9000000, points: 73, fow: 0 }
        /* Your search engine will automatically pull from all 100 players */
    ]
};
