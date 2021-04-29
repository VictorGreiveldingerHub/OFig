const mainController = {

  // méthode pour la page d'accueil
  homePage: (req, res) => {
    res.render('accueil');
  },

  // méthode pour la page article
  articlePage: (req, res) => {
    res.render('article');
  }

};


module.exports = mainController;