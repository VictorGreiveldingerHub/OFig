const client = require('./database');

const dataMapper = {

    // Cherche toutes les figurines dans la table figurine
    getAllFigurines: (callback) => {
        // Requete pour récup les figurines
        const query = `SELECT * FROM "figurine"`;

        // Je lance la requete mais le callback je ne le définis pas dans dataMapper
        client.query(query, callback);
    },

    // Cherche une seule figurine dans la table figurine
    getOneFigurine: (figId, callback) => {

        // Pour éviter les injections SQL je passe directement la valeur dans un tableau
        const query = `SELECT * FROM "figurine" WHERE "id"=$1`;
        const values = [figId];
        client.query(query, values, callback);
    },

    // Recherche les reviews d'un article
    getReview: (reviewId, callback) => {
        // Requete pour accèder aux reviews d'un article
        const query = `SELECT * FROM "review" WHERE "figurine_id"= $1`;

        // On passe la valeur dans value
        const value = [reviewId];
        // On envoie les resultats pour la figurine demandé
        client.query(query, value, callback);
    }
};

module.exports = dataMapper;