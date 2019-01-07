const  { getDb } = require('./database');

module.exports = function getUserDetails(username) {
  const db = getDb();
  return new Promise(resolve => {
    db.collection('user').find({ username: username }).toArray(function (err, res) {
      if (err) {
        console.error(err);
        resolve(err);
      } else {
        resolve(res[0]);
      }
    });
  });
}