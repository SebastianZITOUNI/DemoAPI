const express = require('express');
const router = express.Router();

//Controller
const balanceController = require('../controllers/balanceControllers');
const mouvementController = require('../controllers/mouvementControllers');
const periodeController = require('../controllers/periodeControllers');
const planComptableController = require('../controllers/planComptableControllers');

router.get('/balance', balanceController.getBalance);




module.exports = router;
