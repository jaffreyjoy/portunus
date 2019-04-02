const io = require('socket.io-client');
const SocketIOFileUpload = require('socketio-file-upload');
const socket = io.connect('http://localhost:3000');
const modalExport = require('./components/UploadModal');
const dashExport = require('./components/Dashboard');
const _ = require('./misc').default;

socket.on('progress', function (progress) {
  modalExport.default.methods.updateProgress(progress);
});

socket.on('updateFiles', function () {
  dashExport.default.methods.setFiles();
});

export default {
  checkExists: async function (user) {
    return new Promise(resolve => {
      socket.emit('checkExists', user, function (res) {
        resolve(res);
      });
    });
  },

  register: async function (user) {
    return new Promise(resolve => {
      socket.emit('register', user, function (res) {
        resolve(res);
      });
    });
  },

  getUserIndex: async function (username) {
    return new Promise(resolve => {
      socket.emit('getUserIndex', username, function (res) {
        resolve(res);
      });
    });
  },

  setUserSession: function (name, username, email) {
    localStorage.name = name;
    localStorage.username = username;
    localStorage.email = email
  },

  getAndSetUserSession: async function (username) {
    return new Promise(resolve => {
      socket.emit('setSession', username, async (res) => {
        this.setUserSession(res.name, res.username, res.email);
        resolve();
      });
    })
  },

  getUserFiles: async function (username) {
    return new Promise((resolve) => {
      socket.emit('getUserFiles', username, async (res) => {
        res.map(el => _.setIconClass(el));
        console.log(res)
        resolve(res);
      });
    })
  },

  getUploader: async function () {
    return new SocketIOFileUpload(socket)
  }
}