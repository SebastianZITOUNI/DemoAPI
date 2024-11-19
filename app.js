const express = require('express');

// Création de l'application Express
const app = express();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Importer les routes
const mesRoutes = require('./routes/routes');
app.use('/api/', mesRoutes);

// Définir le port
const PORT = 3000;

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
