const  { getDb } = require('./database');

module.exports = {
  getLast() {
    const db = getDb();
    return new Promise((resolve, reject) => {
      db.collection('user').find().sort({ index: -1 }).limit(1).toArray(function(err, res) {
        console.log(res);
        if (err) {
          reject(err);
        }
        if (res.length == 0) {
          resolve(-1);
        } else {
          resolve(res[0].index);
        }
      });
    });
  }
}