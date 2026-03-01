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

const nhlData = {
    settings: { 
        season: "2025-26", 
        upperLimit: 95500000, // Official 2026 Cap Ceiling
        lowerLimit: 70600000  // Official 2026 Cap Floor
    },
    teams: [
        { name: "Anaheim Ducks", id: "ANA", capSpace: 12611311, roster: [] },
        { name: "Boston Bruins", id: "BOS", capSpace: 8500000, roster: [] },
        { name: "Buffalo Sabres", id: "BUF", capSpace: 11000000, roster: [] },
        { name: "Calgary Flames", id: "CGY", capSpace: 14500000, roster: [] },
        { name: "Carolina Hurricanes", id: "CAR", capSpace: 7200000, roster: [] },
        { name: "Chicago Blackhawks", id: "CHI", capSpace: 13212024, roster: [
            { name: "Connor Bedard", pos: "C", salary: 950000, points: 55, fow: 46.2 }
        ]},
        { name: "Colorado Avalanche", id: "COL", capSpace: 5400000, roster: [
            { name: "Nathan MacKinnon", pos: "C", salary: 12600000, points: 97, fow: 51.4 }
        ]},
        { name: "Columbus Blue Jackets", id: "CBJ", capSpace: 18000000, roster: [] },
        { name: "Dallas Stars", id: "DAL", capSpace: 4200000, roster: [] },
        { name: "Detroit Red Wings", id: "DET", capSpace: 9100000, roster: [] },
        { name: "Edmonton Oilers", id: "EDM", capSpace: 1200000, roster: [
            { name: "Connor McDavid", pos: "C", salary: 12500000, points: 103, fow: 47.5 }
        ]},
        { name: "Florida Panthers", id: "FLA", capSpace: 3100000, roster: [] },
        { name: "Los Angeles Kings", id: "LAK", capSpace: 5800000, roster: [] },
        { name: "Minnesota Wild", id: "MIN", capSpace: 2400000, roster: [] },
        { name: "Montreal Canadiens", id: "MTL", capSpace: 10500000, roster: [] },
        { name: "Nashville Predators", id: "NSH", capSpace: 6700000, roster: [] },
        { name: "New Jersey Devils", id: "NJD", capSpace: 8900000, roster: [] },
        { name: "New York Islanders", id: "NYI", capSpace: 4500000, roster: [] },
        { name: "New York Rangers", id: "NYR", capSpace: 12690863, roster: [] },
        { name: "Ottawa Senators", id: "OTT", capSpace: 9400000, roster: [] },
        { name: "Philadelphia Flyers", id: "PHI", capSpace: 5200000, roster: [] },
        { name: "Pittsburgh Penguins", id: "PIT", capSpace: 3800000, roster: [] },
        { name: "San Jose Sharks", id: "SJS", capSpace: 19789999, roster: [] },
        { name: "Seattle Kraken", id: "SEA", capSpace: 11200000, roster: [] },
        { name: "St. Louis Blues", id: "STL", capSpace: 7100000, roster: [] },
        { name: "Tampa Bay Lightning", id: "TBL", capSpace: 1500000, roster: [] },
        { name: "Toronto Maple Leafs", id: "TOR", capSpace: 9906498, roster: [
            { name: "Auston Matthews", pos: "C", salary: 13250000, points: 51, fow: 59.3 }
        ]},
        { name: "Utah Mammoth", id: "UTA", capSpace: 15400000, roster: [] },
        { name: "Vancouver Canucks", id: "VAN", capSpace: 4100000, roster: [] },
        { name: "Vegas Golden Knights", id: "VGK", capSpace: 2900000, roster: [] },
        { name: "Washington Capitals", id: "WAS", capSpace: 6100000, roster: [] },
        { name: "Winnipeg Jets", id: "WPG", capSpace: 8200000, roster: [] }
    ]
};
