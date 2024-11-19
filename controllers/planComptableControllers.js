const fs = require('fs');
const path = require('path');
const planComptablePath = path.join(__dirname, '../data/planComptable.json');

// Lire les balances depuis le fichier
const getBalancesFromFile = () => {
    const data = fs.readFileSync(planComptablePath, 'utf8');
    try {
        const planComptable = JSON.parse(data);
        if (!Array.isArray(planComptable)) {
            throw new Error('Data in plancomptable.json is not an array');
        }
        return planComptable;
    } catch (err) {
        console.error('Error parsing planComptable.json:', err.message);
        return []; // Retourner un tableau vide en cas d'erreur
    }
};

// Contrôleur pour obtenir le plan comptable
exports.getPlanComptable = (req, res) => {
    try {
        const planComptable = getBalancesFromFile();

        if (planComptable.length === 0) {
            return res.status(404).json({
                error: "Aucun compte trouvé dans le plan comptable."
            });
        }

        res.status(200).json(planComptable);
    } catch (err) {
        console.error("Erreur lors de la récupération du plan comptable :", err.message);
        res.status(500).json({
            error: "Une erreur est survenue lors de la récupération du plan comptable."
        });
    }
};

exports.getAccountDetails = (req, res) => {
    try {
        const { accountNumber } = req.params; // Extraire le numéro de compte depuis les paramètres de l'URL
        const planComptable = getBalancesFromFile();

        // Chercher le compte correspondant
        const account = planComptable.find(acc => acc.account === accountNumber);

        if (!account) {
            return res.status(404).json({
                error: `Le compte avec le numéro ${accountNumber} est introuvable.`
            });
        }

        // Retourner les détails du compte
        res.status(200).json(account);
    } catch (err) {
        console.error("Erreur lors de la récupération des détails du compte :", err.message);
        res.status(500).json({
            error: "Une erreur est survenue lors de la récupération des détails du compte."
        });
    }
};