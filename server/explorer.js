const { getDb } = require('./database');

module.exports = {

  getUserFiles: function(user) {
    const db = getDb();
    return new Promise(resolve => {
      db.collection('file').find({owner:user})
        .toArray(function (err, res) {
          // console.log(`exp: res`)
          // console.log(res)
          resolve(res);
      });
    });
  }
}