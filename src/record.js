const io = require('socket.io-client');
const socket = io.connect('http://localhost:8000');
const client = require('./client');
const recordPage = require('./pages/Record');

async function register(user) {
  console.log(client);
  const res = await client.default.register(user);
  if (res === 1) {
    client.default.setUserSession(user.name, user.username, user.email);
  }
  recordPage.default.methods.postRegisterAction(res);
}

export default function(user) {
  socket.emit('startRecord');
  socket.on('recorded', function(status) {
    console.log('recorded', status);
    register(user);
  });
}