const io = require('socket.io-client');
const socket = io.connect('http://localhost:8000');
const client = require('./client');
const recordPage = require('./pages/Record');
const mapper = require('../process/eegmapper');

async function register(user, last) {
  user['index'] = last;
  const res = await client.default.register(user);
  console.log(user, res);
  if (res === 1) {
    client.default.setUserSession(user.name, user.username, user.email);
  }
  recordPage.default.methods.postRegisterAction(res);
  return;
}

export default function(user) {
  mapper.getLast().then((last) => {
    last = last == -1 ? 1 : last+1;
    socket.emit('startRecord', last);
    socket.on('recorded', async function(status) {
      console.log('recorded', status);
      await register(user, last);
    });
  });
}