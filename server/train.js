const fs = require('fs');
const { spawn } = require('child_process');

function createFolder(fileName, folder) {
  fs.mkdirSync(`./server/${folder}/${fileName}`);
  return;
}

function mergeData(fileName) {
  return new Promise((resolve) => {
    let runMergeData = spawn('python', ['merge_files_custom.py', 1, fileName]);
    runMergeData.stdout.on('data', function(data) {
      console.log(data);
    });
    runMergeData.stdout.on('close', function(close) {
      resolve();
    });
  });
}

module.exports = {
  epochSeparate(fileName) {
    createFolder(fileName, 'EpochSepData');
    return new Promise((resolve) => {
      let runEpochSeparate = spawn('python', ['run_matlab.py', 1, fileName]);
      runEpochSeparate.stdout.on('data', function(data) {
        console.log(data);
      });
      runEpochSeparate.stdout.on('close', function(close) {
        resolve();
      });
    });
  },

  featureExtract(fileName) {
    createFolder(fileName, 'FeatureVector');
    return new Promise((resolve) => {
      let runFeatureExtract = spawn('python', ['run_matlab.py', 2, fileName]);
      runFeatureExtract.stdout.on('data', function(data) {
        console.log(data);
      });
      runFeatureExtract.stdout.on('close', function(close) {
        resolve();
      });
    });
  },

  async bpnn(fileName) {
    mergeData(fileName);
    return new Promise((resolve) => {
      let runBpnn = spawn('python', ['run_matlab.py', 3, fileName]);
      runBpnn.stdout.on('data', function(data) {
        console.log(data);
      });
      runBpnn.stdout.on('close', function(close) {
        resolve();
      });
    });
  }
}