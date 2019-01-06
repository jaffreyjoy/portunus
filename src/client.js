var io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

export default {
    register: async function(user) {
        return new Promise(resolve => {
            socket.emit('register', user, function(res) {
                resolve(res);
            });
        });
    },
    
    login: async function(user) {
        return new Promise(resolve => {
            socket.emit('login', user, function(res) {
                resolve(res);
            });
        });
    },
}