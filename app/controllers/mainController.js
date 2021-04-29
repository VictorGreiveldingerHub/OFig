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
    // Ici je veux récup l'id de la figurine
    const figId = req.params.id;

    dataMapper.getOneFigurine(figId, (err, data) => {
      // On gère l'erreur eventuelle
      if (err) {
        console.trace(err);
        res.status(500).send(err);
      } else {
        const figurine = data.rows[0];
        res.render('article', {
          figurine
        });
      };
    });
  },

};


module.exports = mainController;