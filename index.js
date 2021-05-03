// Toujours commencer par importer les variables d'environnement !
require('dotenv').config();

const express = require('express');

// Pour gérer les sessions
const session = require('express-session');

// on importe le router
const router = require('./app/router');

// un peu de config
const PORT = process.env.PORT || 5000;


const app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: (1000*60*60) // Pour la durée plus tard 1h
  }
}))

// Utilisation d'EJS réglages moteur de rendu
app.set('view engine', 'ejs');
app.set('views', 'app/views');

// servir les fichiers statiques qui sont dans "integration"
app.use(express.static('integration'));

// routage !
app.use(router);


// on lance le serveur
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});