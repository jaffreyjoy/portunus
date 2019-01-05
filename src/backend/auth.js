const  { getDb } = require('./database');

async function checkIfExists(field, value) {
    let obj = {};
    obj[field] = value;
    const db = getDb();
    return new Promise(resolve => {
        db.collection('user').find(obj).toArray(function(err, res) {
            if (res.length > 0) {
                resolve(1);
            } else {
                resolve(0);
            }
        });
    })
}

async function checkDuplicate(user) {
    for (let field of ['username', 'email']) {
        if (await checkIfExists(field, user[field])) {
            return field === 'username'? 'username': 'email';
        }
    }
    return 0;
}

module.exports = {
    register: async function(user) {
        const db = getDb();
        return new Promise(resolve => {
            checkDuplicate(user).then(res => {
                if (res) resolve(res === 'username'? 2: 3)
                else {
                    db.collection('user').insertOne(user, function(err, res) {
                        if (err) {
                            console.error(err);
                            resolve(0);
                        } else {
                            resolve(1);
                        }
                    });
                }
            });
        });
    }
}