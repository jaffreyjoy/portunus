const io = require('socket.io-client');
const socket = io.connect('http://localhost:8000');

export default function() {
  socket.emit('startRecord');
}