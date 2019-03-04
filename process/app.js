const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');

const path = './process/csv_writer.py';//example/read_mindwave_mobile.py';
let recorder = null;
let timer = null;
let started = false;

io.on('connection', function (socket) {
  socket.on('startRecord', function(last) {
    recorder = spawn('python', [path]);
    let dataBuffers = [];
    onChildData(dataBuffers);
    onChildClose(dataBuffers, last).then(() => {
      socket.emit('recorded', true);
    })
    .catch(() => {
      socket.emit('recorded', false);
    });
  });
});

function onChildData(dataBuffers) {
  recorder.stdout.on('data', (data) => {
    if (!started) {
      setTimer(10000);
      started = true;
    }
    dataBuffers.push(data.toString());
  });
}

function setTimer(time) {
  timer = setTimeout(function() {
    recorder.kill('SIGINT');
  }, time);
}

function onChildClose(dataBuffers, last) {
  return new Promise((resolve, reject) => {
    recorder.stdout.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      let data = [];
      dataBuffers.forEach(buffer => {
        data.push(...buffer.split(os.EOL));
      });
      writeToCSV(data, last).then(() => { 
        resolve(); 
      })
      .catch(() => {
        reject();
      })
    });
  });
}

function writeToCSV(data, last) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`./userdata/${last}.csv`, data.join('\n'), function (err) {
      clearTimeout(timer);
      started = false;
      if (err) {
        console.log('Some error occured - file either not saved or corrupted file saved.');
        reject();
      } else {
        console.log('File saved!');
        resolve();
      }
    });
  });
}

server.listen(process.env.PORT || 8000, function () {
  console.log('Express server for headset connection listening on ' + server.address().port);
});