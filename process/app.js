const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);
const { spawn } = require('child_process');
const fs = require('fs');

io.on('connection', function (socket) {
  socket.on('startRecord', function() {
    const path = './process/csv_writer.py';//example/read_mindwave_mobile.py';
    const recorder = spawn('python', [path], { stdio: 'inherit' });
    setTimeout(function() {
      recorder.kill('SIGINT');
    }, 30000);
    recorder.on('data', (data) => {
      fs.writeFile('data.csv', data);
    });
    recorder.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  });
})

server.listen(process.env.PORT || 8000, function () {
  console.log('Express server for headset connection listening on ' + server.address().port);
});