const express = require('express');
const SocketIOFileUpload = require("socketio-file-upload");
const fs = require('fs');
const { spawn } = require('child_process');
const app = express().use(SocketIOFileUpload.router);
const server = require('http').Server(app);
const io = require('socket.io').listen(server);
const { connectDb } = require('./database');
const auth = require('./auth');
const getUserDetails = require('./session');
const file = require('./file');
const exp = require('./explorer');
const misc = require('./misc');
const train = require('./train');
const mail = require('./mail');

function format(value) {
  return ("0" + value).slice(-2);
}

function getDateTime() {
  const dateTime = new Date();
  const date = format(dateTime.getDate()) + '-' + format(dateTime.getMonth() + 1) + '-' + dateTime.getFullYear();
  const time = format(dateTime.getHours()) + ':' + format(dateTime.getMinutes()) + ':' + format(dateTime.getMilliseconds());
  return {
    date,
    time
  }
}

function getEmailData(user) {
  let link = "http://localhost:8080/#/login";
  let data = {}
  data.subject = "Notification of successful account activation";
  data.html = `
          <h4>Dear ${user.name}, </h4>
          <p>Your account has been succesfully activated.</p>
          <p>Click on this <a href="${link}">link</a> to login to your activated account.</p>
          <br>
          <h4>Regards,</h4>
          <h4>The Portunus Team</h4>
        `;
  return ([user.email, data]);
}

io.on('connection', function (socket) {
  const uploader = new SocketIOFileUpload();
  uploader.listen(socket);

  uploader.on("start", function (event) {
    uploader.dir = `./server/Uploads/${event.file.meta.owner}`;
  });

  uploader.on("progress", event => {
    perc = Math.round(event.file.bytesLoaded / event.file.size * 100);
    socket.emit('progress', perc);
  });

  uploader.on("saved", async function (event) {
    const dateTime = getDateTime();
    event.file.date = dateTime.date;
    event.file.time = dateTime.time;
    await file.saveDetails(event.file);
    await socket.emit("updateFiles");
  });

  uploader.on("error", function (event) {
    console.log("Error from uploader", event);
  });

  socket.on('checkExists', async function (user, respond) {
    auth.checkDuplicate(user).then(res => {
      if (res) {
        respond(res === 'username' ? 2 : 3);
      }
      respond(1);
    });
  });

  socket.on('register', async function (user, respond) {
    const res = await auth.register(user);
    if (res === 1) {
      fs.mkdirSync(`./server/Uploads/${user.username}`);
    }
    respond(res);
  });

  socket.on('login', async function (user, respond) {
    const res = await auth.login(user);
    respond(res);
  });

  socket.on('setSession', async function (username, respond) {
    const res = await getUserDetails(username);
    respond(res);
  });

  socket.on('getUserFiles', async function (username, respond) {
    const res = await exp.getUserFiles(username);
    respond(res);
  });

  socket.on('eegData', async function (dataObj, respond) {
    misc.writeToCSV(dataObj)
      .then(async (noOfUsers) => {
        if (noOfUsers === 0) {
          misc.getIndex(dataObj.user.username).then(async (index) => {
            await train.predict(index);
          });
        } else {
          await train.cleanData(noOfUsers);
          socket.emit('regProgress');
          await train.epochSeparate(noOfUsers);
          socket.emit('regProgress');
          await train.featureExtract(noOfUsers);
          socket.emit('regProgress');
          await train.mergeData(noOfUsers);
          socket.emit('regProgress');
          await train.bpnn(noOfUsers);
          socket.emit('regProgress');
          mail.sendEmail(...getEmailData(dataObj.user))
            .then(res => console.log(res))
            .catch(err => console.log(err));
          respond(true);
        }
      })
      .catch(() => respond(false));
  });
});

app.get('/download/:username/:file', (req, res) => {
  var username = req.params.username;
  var file = req.params.file;
  res.download(`./server/Uploads/${username}/${file}`, file);
});

connectDb(function () {
  server.listen(process.env.PORT || 3000, function () {
    console.log('Express server listening on ' + server.address().port);
  });
})
