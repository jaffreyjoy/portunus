const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);
const { spawn } = require('child_process');
const os = require('os');

const path = './process/example/read_mindwave_mobile.py';
let recorder = null;
let timer = null;

io.on('connection', function (socket) {
  socket.on('startRecord', function () {
    recorder = spawn('python2', [path]);
    setTimer(30000);
    let dataBuffers = [];
    onChildData(dataBuffers);
    onChildClose(dataBuffers).then((data) => {
      socket.emit('recorded', true, data);
    })
      .catch(() => {
        socket.emit('recorded', false);
      });
  });
});

function onChildData(dataBuffers) {
  recorder.stdout.on('data', (data) => {
    dataBuffers.push(data.toString());
  });
}

function setTimer(time) {
  timer = setTimeout(function () {
    recorder.kill('SIGINT');
  }, time);
}

function onChildClose(dataBuffers) {
  return new Promise((resolve, reject) => {
    recorder.stdout.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      let data = [];
      dataBuffers.forEach(buffer => {
        data.push(...buffer.split(os.EOL));
      });
      clearTimeout(timer);
      resolve(data);
    });
  });
}

server.listen(process.env.PORT || 8000, function () {
  console.log('Express server for headset connection listening on ' + server.address().port);
});