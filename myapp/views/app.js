const express = require('express');
const app = express();
const path = require('path');

// Middleware pour vérifier les heures de travail
const workingHoursMiddleware = (req, res, next) => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    // Vérifier si c'est du lundi au vendredi et entre 9h et 17h
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next();
    } else {
        res.send('L\'application web est disponible uniquement pendant les heures de travail (du lundi au vendredi, de 9h à 17h).');
    }
};

// Utiliser EJS comme moteur de templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir des fichiers statiques (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Utiliser le middleware pour toutes les routes
app.use(workingHoursMiddleware);

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});