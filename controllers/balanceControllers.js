const fs = require('fs');
const path = require('path');
const balancesPath = path.join(__dirname, '../data/balances.json');

// Lire les balances depuis le fichier
const getBalancesFromFile = () => {
    const data = fs.readFileSync(balancesPath, 'utf8');
    try {
        const balances = JSON.parse(data);
        if (!Array.isArray(balances)) {
            throw new Error('Data in balances.json is not an array');
        }
        return balances;
    } catch (err) {
        console.error('Error parsing balances.json:', err.message);
        return []; // Retourner un tableau vide en cas d'erreur
    }
};

exports.getBalance = (req, res) => {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
        return res.status(400).json({ 
            "code" : "400",
            "error": 'Start date and end date are required.' 
        });
    }

    const balances = getBalancesFromFile();
    console.log('Balances loaded:', balances); // Debug log

    // Vérifie que balances est un tableau
    if (!Array.isArray(balances)) {
        return res.status(500).json({ error: 'Invalid data format in balances.json' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end) || start > end) {
        return res.status(400).json({ error: 'Invalid date range provided.' });
    }

    const filteredBalances = balances.filter(balance => {
        const balanceStart = new Date(balance.balanceDateStart);
        const balanceEnd = new Date(balance.balanceDateEnd);

        return balanceStart <= end && balanceEnd >= start;
    });

res.status(200).json(filteredBalances);
};