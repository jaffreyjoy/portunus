const fs = require('fs');
const { spawn } = require('child_process');
const { noOfEpochs } = require('../portunus.config.json');

function createFolder(noOfUsers, folder) {
  fs.mkdirSync(`./server/${folder}/${noOfUsers}`);
  return;
}

function mergeData(noOfUsers) {
  return new Promise((resolve) => {
    console.log('in merge data');
    let runMergeData = spawn('python', [__dirname + '/merge_files_custom.py', noOfUsers, noOfEpochs], { stdio: 'inherit' });
    runMergeData.on('data', function (data) {
      console.log(data);
    });
    runMergeData.on('close', function (close) {
      console.log('close merge data');
      resolve();
    });
  });
}

function cleanData(noOfUsers) {
  return new Promise((resolve) => {
    let runCleanData = spawn('python', [__dirname + '/clean_data.py', noOfUsers, noOfEpochs], { stdio: 'inherit' });
    runCleanData.on('data', function (data) {
      console.log(data);
    });
    runCleanData.on('close', function (close) {
      console.log('close run data');
      resolve();
    });
  });
}

module.exports = {
  async epochSeparate(noOfUsers) {
    createFolder(noOfUsers, 'EpochSepData');
    await cleanData(noOfUsers);
    console.log('in epoch sep');
    return new Promise((resolve) => {
      console.log(__dirname);
      let runEpochSeparate = spawn('python', [__dirname + '/MatlabCodes/run_matlab.py', 1, noOfUsers, noOfEpochs], { stdio: 'inherit' });
      runEpochSeparate.on('data', function (data) {
        console.log(data);
      });
      runEpochSeparate.on('close', function (close) {
        console.log('close epoch sep', close);
        resolve();
      });
    });
  },

  featureExtract(noOfUsers) {
    createFolder(noOfUsers, 'FeatureVector');
    console.log('in feature vec');
    return new Promise((resolve) => {
      let runFeatureExtract = spawn('python', [__dirname + '/MatlabCodes/run_matlab.py', 2, noOfUsers, noOfEpochs], { stdio: 'inherit' });
      runFeatureExtract.on('data', function (data) {
        console.log(data);
      });
      runFeatureExtract.on('close', function (close) {
        resolve();
      });
    });
  },

  async bpnn(noOfUsers) {
    createFolder(noOfUsers, 'TrainedParameters');
    await mergeData(noOfUsers);
    return new Promise((resolve) => {
      let runBpnn = spawn('python', [__dirname + '/MatlabCodes/run_matlab.py', 3, noOfUsers, noOfEpochs], { stdio: 'inherit' });
      runBpnn.on('data', function (data) {
        console.log(data);
      });
      runBpnn.on('close', function (close) {
        resolve();
      });
    });
  },

  async predict(index) {
    await cleanData('login');
    return new Promise((resolve) => {
      let runPredict = spawn('python', [__dirname + '/MatlabCodes/run_matlab.py', 4, index], { stdio: 'inherit' });
      runPredict.on('data', function (data) {
        console.log(data);
      });
      runPredict.on('close', function (close) {
        resolve();
      });
    });
  }
}