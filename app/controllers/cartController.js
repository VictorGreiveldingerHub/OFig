const cartController = {

  // méthode pour afficher le panier
  cartPage: (req, res) => {
    res.render('panier');
  }

};


module.exports = cartController;