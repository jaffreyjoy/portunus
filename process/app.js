const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');

const path = './process/csv_writer.py';//example/read_mindwave_mobile.py';
const recorder = spawn('python', [path]);

io.on('connection', function (socket) {
  socket.on('startRecord', function() {
    let dataBuffers = [];
    onChildData(dataBuffers);
    onChildClose(dataBuffers);
  });
});

function onChildData(dataBuffers) {
  let started = false;
  recorder.stdout.on('data', (data) => {
    if (!started) {
      setTimer(10000);
      started = true;
    }
    dataBuffers.push(data.toString());
  });
}

function setTimer(time) {
  setTimeout(function() {
    recorder.kill('SIGINT');
  }, time);
}

function onChildClose(dataBuffers) {
  recorder.stdout.on('close', (code) => {
    let data = [];
    dataBuffers.forEach(buffer => {
      data.push(...buffer.split(os.EOL));
    });
    writeToCSV(data)
    console.log(`child process exited with code ${code}`);
  });
}

function writeToCSV(data) {
  fs.writeFileSync('data.csv', data.join('\n'), 'utf8', function (err) {
    if (err) {
      console.log('Some error occured - file either not saved or corrupted file saved.');
    } else{
      console.log('File saved!');
    }
  });
}

server.listen(process.env.PORT || 8000, function () {
  console.log('Express server for headset connection listening on ' + server.address().port);
});