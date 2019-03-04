const express = require('express');
const SocketIOFileUpload = require("socketio-file-upload");
const fs = require('fs');
const app = express().use(SocketIOFileUpload.router);
const server = require('http').Server(app);
const io = require('socket.io').listen(server);
const { connectDb } = require('./database');
const auth = require('./auth');
const getUserDetails = require('./session');
const file = require('./file');
const exp = require('./explorer');
const misc = require('./misc');

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
    console.log(`server : `)
    console.log(res)
    respond(res);
  });

  socket.on('getLast', async function(respond) {
    const last = await misc.getLast();
    respond(last);
  });
});

app.get('/download/:username/:file', (req, res) => {
  var username = req.params.username;
  var file = req.params.file;
  console.log(username, file);
  res.download(`./server/Uploads/${username}/${file}`, file);
});

connectDb(function () {
  server.listen(process.env.PORT || 3000, function () {
    console.log('Express server listening on ' + server.address().port);
  });
})
