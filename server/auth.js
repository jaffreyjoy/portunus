const md5 = require("blueimp-md5");
const { getDb } = require('./database');
const misc = require('./misc');

async function checkIfExists(field, value) {
  let obj = {};
  obj[field] = value;
  const db = getDb();
  return new Promise(resolve => {
    db.collection('user').find(obj).toArray(function (err, res) {
      if (res.length > 0) {
        resolve(1);
      } else {
        resolve(0);
      }
    });
  })
}

module.exports = {
  checkDuplicate: async function(user) {
    for (let field of ['username', 'email']) {
      if (await checkIfExists(field, user[field])) {
        return field === 'username' ? 'username' : 'email';
      }
    }
    return 0;
  },

  register: async function (user) {
    const db = getDb();
    return new Promise(resolve => {
      user.password = md5(user.password);
      misc.getLast().then((last) => {
        user['index'] = last;
        db.collection('user').insertOne(user, function (err, res) {
          if (err) {
            console.error(err);
            resolve(0);
          } else {
            resolve(1);
          }
        });
      })
      .catch((e) => console.log(e));
    });
  },

  login: async function (user) {
    const db = getDb();
    user.password = md5(user.password);
    return new Promise(resolve => {
      db.collection('user').find(user).toArray(function (err, res) {
        if (err) {
          console.error(err);
          resolve(0);
        } else if (res.length > 0) {
          resolve(1);
        } else {
          resolve(2);
        }
      });
    });
  }
}