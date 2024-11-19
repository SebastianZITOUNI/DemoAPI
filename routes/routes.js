const express = require('express');
const router = express.Router();

//Controller
const balanceController = require('../controllers/balanceControllers');
const mouvementController = require('../controllers/mouvementControllers');
const periodeController = require('../controllers/periodeControllers');
const planComptableController = require('../controllers/planComptableControllers');

router.get('/balance', balanceController.getBalance);

router.get('/plan-comptable', planComptableController.getPlanComptable);

// Route pour récupérer les informations d'un compte spécifique
router.get('/plan-comptable/:accountNumber', planComptableController.getAccountDetails);

router.get('/mouvement', mouvementController.getMouvement);

// Exemple de route
router.get('/', (req, res) => {
    res.json({ message: 'Route test accessible !' });
});


module.exports = router;
