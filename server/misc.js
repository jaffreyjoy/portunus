const  { getDb } = require('./database');
const fs = require('fs');

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
          resolve(1);
        } else {
          resolve(res[0].index+1);
        }
      });
    });
  },

  writeToCSV(data) {
    return new Promise((resolve, reject) => {
      this.getLast().then((last) => {
        console.log('in write');
        fs.writeFile(`./server/UserEEGData/${last-1}.csv`, data.join('\n'), function (err) {
          console.log(err);
          if (err) {
            console.log('Some error occured - file either not saved or corrupted file saved.');
            reject();
          } else {
            console.log('File saved!');
            resolve();
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
    });
  }
}