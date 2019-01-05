const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

module.exports = {
  checkDb: function (name) {
    return new Promise((resolve) => {
      MongoClient.connect(url, function (err, client) {
        if (err) throw err;
        const db = client.db('portunus_db');
        db.collection('User').find({
          name: name
        }).toArray(function (err, res) {
          resolve(res);
        })
      });
    });
  }
}