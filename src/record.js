const io = require('socket.io-client');
const client = require('./client');
const recordPage = require('./pages/Record');
let socket = null;

function sendEegDataToServer(data) {
  socket = io.connect('http://localhost:3000');
  socket.emit('eegData', data, function(status) {
    console.log(status);
    if (status)
      recordPage.default.methods.postRegisterAction(status);
    else 
      console.log('record', status);
  });
}

async function register(user, data) {
  const res = await client.default.register(user);
  console.log(user, res);
  if (res === 1) {
    client.default.setUserSession(user.name, user.username, user.email);
    sendEegDataToServer(data);
  }
  return;
}

export default function(user) {
  socket = io.connect('http://localhost:8000');
  socket.emit('startRecord');
  socket.on('recorded', async function(status, data) {
    console.log('recorded', status);
    await register(user, data);
  });
}