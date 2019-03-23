const fs = require('fs');
const { spawn } = require('child_process');

function createFolder(fileName, folder) {
  fs.mkdirSync(`./server/${folder}/${fileName}`);
  return;
}

function mergeData(fileName) {
  return new Promise((resolve) => {
    console.log('in merge data');
    let runMergeData = spawn('python', [__dirname+'/merge_files_custom.py', fileName], {stdio: 'inherit'});
    runMergeData.on('data', function(data) {
      console.log(data);
    });
    runMergeData.on('close', function(close) {
      console.log('close merge data');
      resolve();
    });
  });
}

module.exports = {
  epochSeparate(fileName) {
    createFolder(fileName, 'EpochSepData');
    console.log('in epoch sep');
    return new Promise((resolve) => {
      console.log(__dirname);
      let runEpochSeparate = spawn('python', [__dirname+'/MatlabCodes/run_matlab.py', 1, fileName], {stdio: 'inherit'});
      runEpochSeparate.on('data', function(data) {
        console.log(data);
      });
      runEpochSeparate.on('close', function(close) {
        console.log('close epoch sep', close);
        resolve();
      });
    });
  },

  featureExtract(fileName) {
    createFolder(fileName, 'FeatureVector');
    console.log('in feature vec');
    return new Promise((resolve) => {
      let runFeatureExtract = spawn('python', [__dirname+'/MatlabCodes/run_matlab.py', 2, fileName], {stdio: 'inherit'});
      runFeatureExtract.on('data', function(data) {
        console.log(data);
      });
      runFeatureExtract.on('close', function(close) {
        resolve();
      });
    });
  },

  async bpnn(fileName) {
    await mergeData(fileName);
    return new Promise((resolve) => {
      let runBpnn = spawn('python', [__dirname+'/MatlabCodes/run_matlab.py', 3, fileName], {stdio: 'inherit'});
      runBpnn.on('data', function(data) {
        console.log(data);
      });
      runBpnn.on('close', function(close) {
        resolve();
      });
    });
  },

  predict() {
    return new Promise((resolve) => {
      let runPredict = spawn('python', [__dirname+'/MatlabCodes/run_matlab.py', 4], {stdio: 'inherit'});
      runPredict.on('data', function(data) {
        console.log(data);
      });
      runPredict.on('close', function(close) {
        resolve();
      });
    });
  }
}