const dataMapper = require("../dataMapper");

const cartController = {

  // méthode pour afficher le panier
  cartPage: (req, res) => {

    // premier test anti bug : si pas de panier , on affiche un panier vide
    if (!req.session.cart) {
      return res.render('panier', {
        goodFigurines: [],
        tva: 0,
        totalHT: 0,
        totalTTC: 9.99,
      });
    };

    // On veut récup les infos du panier (en session - donc req.session.cart)
    // et on veut les passer à la view
    // probleme: dans le panier tout ce qu'on a c'est des ID
    // il faut donc qu'on recupere les infos des figurines, dans la BDD via dataMapper
    dataMapper.getAllFigurines((err, data) => {
      if (err) {
        console.trace(err);
        res.status(500).send(err);
      } else {
        const allFigurines = data.rows;
        // J'ai d'un coté la liste de toutes les figurines
        // et de l'autre , un objet avec des id et des quantités
        // on va se faire une boucle pour fusionner ces infos
        let goodFigurines = []; // on se prévois une variable pour y mettre les bons résultats

        // Parcourir les figurines
        for (let figurine of allFigurines) {
          // pour chacune on test si son id est dans le panier
          if (req.session.cart[figurine.id]) {
            // on "attache" la quantité à l'objet figurine
            figurine.quantity = req.session.cart[figurine.id];

            // on ajoute la figurine a la liste des bons resultats
            goodFigurines.push(figurine);
          }
        }

        // Une fois la boucle fini, on peut envoyer la liste des bons résultats a la view
        // mais avant on va calculer les tarifs auxiliaire
        const tableauSousTotaux = goodFigurines.map(fig => fig.price * fig.quantity);
        let totalHT = 0;
        tableauSousTotaux.forEach(x => totalHT += x);


        // Version 2 avec reduce
        // const newTotalHT = goodFigurines.map(fig => fig.quantity * fig.price).reduce((a, b) => a + b);

        const tva = (totalHT*20) / 100;
        const totalTTC = totalHT + tva + 9.99;
        res.render('panier', {
          goodFigurines,
          totalHT,
          tva,
          totalTTC,
        });

      }
    })
  },

  // méthode pour ajouter une figurine dans le panier
  addCart: (req, res) => {

    // ajouter un objet "cart" dans la session
    // mais UNIQUEMENT si il est pas deja la
    if ( !req.session.cart) {
      req.session.cart = {};
    }

    // on recupe la valeur de l'id
    const figurineId = req.params.id;

    // Ajout d'un exemplaire dans mon panier
    if (req.session.cart[figurineId]) {
      // Si l'id est deja présent dans le panier => j'incremente
      req.session.cart[figurineId] ++;
    } else {
      // Si il n'y a pas d'id correspondant == > j'en ajoute 1
      req.session.cart[figurineId] = 1;
    };
    console.log(req.session);

    res.redirect('/cart');
  },

  // Méthode pour enlever un objet du panier
  removeFigurine: (req, res) => {

    // premier test : si il n'y a pas de panier, y'a rien a faire
    if ( !req.session.cart) {
      return res.redirect('/cart');
    };

    // on recupe la valeur de l'id
    const figurineId = req.params.id;

    // Deuxieme test : l'objet est dans le panier ?
    if (req.session.cart[figurineId]) {
      // Si oui on décremente
      req.session.cart[figurineId] --;

      // Une fois décrementé, il faut vérifier si on a pas "0"quantité de l'objet 
      // ou pire une quantite negative
      if( req.session.cart[figurineId] <= 0){
        // Si c'est le cas on supprime l'article
        delete req.session.cart[figurineId];
      }
    }

    res.redirect('/cart');
  },

};


module.exports = cartController;