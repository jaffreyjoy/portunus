module.exports = {
  saveDetails: function(fileDetail) {
    const file = {
      name: fileDetail.name,
      owner: fileDetail.meta.owner,
      size: fileDetail.size,
      date: fileDetail.date,
      time: fileDetail.time
    }
    const db = getDb();
    return new Promise(resolve => {
      db.collection('file').insertOne(file, function (err, res) {
        if (err) {
          console.error(err);
          resolve(0);
        } else {
          resolve(1);
        }
      });
    });
  }
}