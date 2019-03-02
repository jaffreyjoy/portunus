const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');

io.on('connection', function (socket) {
  socket.on('startRecord', function() {
    const path = './process/example/read_mindwave_mobile.py';
    const recorder = spawn('python', [path]);
    let started = false;
    let dataBuffers = [];
    recorder.stdout.on('data', (data) => {
      if (!started) {
        started = true;
        setTimeout(function() {
          recorder.kill('SIGINT');
        }, 5000);
      }
      dataBuffers.push(data.toString());
    });
    recorder.stdout.on('close', (code) => {
      console.log(dataBuffers);
      let finalArray = [];
      dataBuffers.forEach(buffer => {
        finalArray.push(...buffer.split(os.EOL));
      });
      fs.writeFileSync('data.csv', finalArray.join('\n'), 'utf8', function (err) {
        if (err) {
          console.log('Some error occured - file either not saved or corrupted file saved.');
        } else{
          console.log('It\'s saved!');
        }
      });
      console.log(`child process exited with code ${code}`);
    });
  });
})

server.listen(process.env.PORT || 8000, function () {
  console.log('Express server for headset connection listening on ' + server.address().port);
});