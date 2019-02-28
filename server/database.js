const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
let db = null;

function connectDb(done) {
    MongoClient.connect(url, function (err, client) {
        if (err) throw err;
        const clientDb = client.db('portunus_db');
        db = clientDb;
        done();
    });
}

getDb = () => db;

module.exports = {
    connectDb,
    getDb
}