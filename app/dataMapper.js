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
    getOneFigurine: (id, callback) => {

        // Pour éviter les injections SQL je passe directement la valeur dans un tableau
        const query = `SELECT * FROM "figurine" WHERE "id"=$1`;
        const values = [id];
        client.query(query, values, callback);
    }
};

module.exports = dataMapper;