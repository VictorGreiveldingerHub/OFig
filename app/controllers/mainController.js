// Ici on voudra récup toutes les figurines dispo, donc require dataMapper
const dataMapper = require('../dataMapper');

const mainController = {

  // méthode pour la page d'accueil
  homePage: (req, res) => {
     // Signature du callback
     dataMapper.getAllFigurines((err, data) => {
      // On gère l'erreur eventuelle
      if (err) {
        console.trace(err);
        res.status(500).send(err);
      } else {
        res.render('accueil', {
          figurines: data.rows,
        });
      }
    });
  },

  // méthode pour la page article
  articlePage: (req, res) => {
    res.render('article');
  }

};


module.exports = mainController;