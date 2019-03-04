const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

module.exports = {
  getLast() {
    return new Promise((resolve, reject) => {
      socket.emit('getLast', function(lastId) {
        resolve(lastId);
      });
    })
  }
}