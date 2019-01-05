var io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

export default async function register(user) {
    return new Promise(resolve => {
        socket.emit('register', user, function(res) {
            resolve(res);
        });
    });
}