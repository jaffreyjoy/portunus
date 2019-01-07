var io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

export default {
  register: async function (user) {
    return new Promise(resolve => {
      socket.emit('register', user, function (res) {
        resolve(res);
      });
    });
  },

  login: async function (user) {
    return new Promise(resolve => {
      socket.emit('login', user, function (res) {
        resolve(res);
      });
    });
  },

  setUserSession: function (name, username, email) {
    localStorage.name = name;
    localStorage.username = username;
    localStorage.email = email
  },

  getUserSession: async function(username) {
    return new Promise(resolve => {
      socket.emit('setSession', username, async (res) => {
        await this.setUserSession(res.name, res.username, res.email);
        resolve();
      });
    })
  }
}