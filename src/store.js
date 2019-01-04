var io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

export function checkDbConn() {
    socket.emit('checkDb', 'Anto', function(res) {
        console.log(res);
    });
}