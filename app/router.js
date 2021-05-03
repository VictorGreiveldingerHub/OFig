const express = require('express');

// on importe nos controllers
const mainController = require('./controllers/mainController');
const cartController = require('./controllers/cartController');


const router = express.Router();

// page d'accueil
router.get('/', mainController.homePage);

// page article
router.get('/article/:id', mainController.articlePage);

// gestion du panier
router.get('/cart/add/:id', cartController.addCart);

// page delete un article (decremente)
router.get('/cart/delete/:id', cartController.removeFigurine);

// page panier
router.get('/cart', cartController.cartPage);


// on exporte le router 
module.exports = router; 