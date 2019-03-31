const fs = require('fs');
const { spawn } = require('child_process');
const { noOfEpochs } = require('../portunus.config.json');

function createFolder(noOfUsers, folder) {
  fs.mkdirSync(`./server/${folder}/${noOfUsers}`);
  return;
}

async function cleanData(noOfUsers) {
  return new Promise((resolve) => {
    let runCleanData = spawn('python', [__dirname + '/clean_data.py', noOfUsers, noOfEpochs], { stdio: 'inherit' });
    runCleanData.on('close', function (close) {
      console.log('close_clean');
      resolve();
    });
  });
}

module.exports = {
  async mergeData(noOfUsers) {
    return new Promise((resolve) => {
      let runMergeData = spawn('python', [__dirname + '/merge_files_custom.py', noOfUsers, noOfEpochs], { stdio: 'inherit' });
      runMergeData.on('close', function (close) {
        console.log('close_merge');
        resolve();
      });
    });
  },

  async epochSeparate(noOfUsers) {
    createFolder(noOfUsers, 'EpochSepData');
    await cleanData(noOfUsers);
    return new Promise((resolve) => {
      let runEpochSeparate = spawn('python', [__dirname + '/MatlabCodes/run_matlab.py', 1, noOfUsers, noOfEpochs], { stdio: 'inherit' });
      runEpochSeparate.on('close', function (close) {
        console.log('close_epochSep');
        resolve();
      });
    });
  },

  featureExtract(noOfUsers) {
    createFolder(noOfUsers, 'FeatureVector');
    return new Promise((resolve) => {
      let runFeatureExtract = spawn('python', [__dirname + '/MatlabCodes/run_matlab.py', 2, noOfUsers, noOfEpochs], { stdio: 'inherit' });
      runFeatureExtract.on('close', function (close) {
        console.log('close_feature');
        resolve();
      });
    });
  },

  async bpnn(noOfUsers) {
    createFolder(noOfUsers, 'TrainedParameters');
    return new Promise((resolve) => {
      let runBpnn = spawn('python', [__dirname + '/MatlabCodes/run_matlab.py', 3, noOfUsers, noOfEpochs], { stdio: 'inherit' });
      runBpnn.on('close', function (close) {
        console.log('close_bpnn');
        resolve();
      });
    });
  },

  async predict(index) {
    await cleanData('login');
    return new Promise((resolve) => {
      var loginStatus = null;
      let runPredict = spawn('python', [__dirname + '/MatlabCodes/run_matlab.py', 4, index]);
      runPredict.stdout.on('data', function (data) {
        console.log(data.toString());
        if (data.toString() == 'login-success\n') {
          console.log('in success');
          loginStatus = true;
        } else if (data.toString() == 'login-fail') {
          loginStatus = false;
        }
      });
      runPredict.stdout.on('close', function (close) {
        console.log('server', loginStatus);
        resolve(loginStatus);
      });
    });
  }
}