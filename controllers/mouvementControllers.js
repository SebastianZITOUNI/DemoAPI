const fs = require('fs');
const path = require('path');
const movementsPath = path.join(__dirname, '../data/mouvements.json');

// Lire les mouvements depuis le fichier
const getMovementsFromFile = () => {
    const data = fs.readFileSync(movementsPath, 'utf8');
    try {
        const movements = JSON.parse(data);
        if (!Array.isArray(movements)) {
            throw new Error('Data in movements.json is not an array');
        }
        return movements;
    } catch (err) {
        console.error('Error parsing movements.json:', err.message);
        return []; // Retourner un tableau vide en cas d'erreur
    }
};

// Contrôleur pour obtenir les mouvements
exports.getMouvement = (req, res) => {
    try {
        const { account, startDate, endDate } = req.query; // Récupérer les filtres éventuels depuis la requête
        const movements = getMovementsFromFile();

        if (movements.length === 0) {
            return res.status(404).json({
                error: "Aucun mouvement trouvé."
            });
        }

        // Convertir les dates en objets Date pour comparaison
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        // Appliquer les filtres
        const filteredMovements = movements.filter(movement => {
            const transactionDate = new Date(movement.transactionDate);

            // Vérifier si le mouvement respecte les critères
            return (
                (!account || movement.account === account) &&
                (!start || transactionDate >= start) &&
                (!end || transactionDate <= end)
            );
        });

        if (filteredMovements.length === 0) {
            return res.status(404).json({
                error: "Aucun mouvement trouvé pour les critères spécifiés."
            });
        }

        res.status(200).json(filteredMovements);
    } catch (err) {
        console.error("Erreur lors de la récupération des mouvements :", err.message);
        res.status(500).json({
            error: "Une erreur est survenue lors de la récupération des mouvements."
        });
    }
};
