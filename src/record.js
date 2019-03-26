const io = require('socket.io-client');
const client = require('./client');
const recordPage = require('./pages/Record');
let socket = null;

function sendEegDataToServer(dataObj) {
  socket = io.connect('http://localhost:3000');
  socket.emit('eegData', dataObj, function (status) {
    console.log(status);
    if (status)
      recordPage.default.methods.postRegisterAction(status);
    else
      console.log('record', status);
  });
}

async function register(type, user, data) {
  const res = await client.default.register(user);
  console.log(user, res);
  if (res === 1) {
    client.default.setUserSession(user.name, user.username, user.email);
    sendEegDataToServer({ type, data });
  }
  return;
}

export default function (param, time) {
  socket = io.connect('http://localhost:8000');
  socket.emit('startRecord', time);
  socket.on('recorded', async function (status, data) {
    console.log('recorded', status);
    if (param.type === 'register') {
      await register(param.type, param.user, data);
    } else {
      sendEegDataToServer({ user:param.user ,type: param.type, data });
    }
  });
}