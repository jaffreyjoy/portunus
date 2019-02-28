const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);
const { spawn } = require('child_process');

io.on('connection', function (socket) {
  socket.on('startRecord', function() {
    const recorder = spawn('python', ['./process/csv_writer.py'], { stdio: 'inherit' });
    recorder.on('data', (data) => {
      console.log(data);
    });
    recorder.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  });
})

server.listen(process.env.PORT || 8000, function () {
  console.log('Express server for headset connection listening on ' + server.address().port);
});