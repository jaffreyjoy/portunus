const fs = require('fs');
const { spawn } = require('child_process');
const { noOfEpochs } = require('../portunus.config.json');

function createFolder(noOfUsers, folder) {
  fs.mkdirSync(`./server/${folder}/${noOfUsers}`);
  return;
}

module.exports = {
  async mergeData(noOfUsers) {
    return new Promise((resolve) => {
      let runMergeData = spawn('python', [__dirname + '/merge_files_custom.py', noOfUsers, noOfEpochs], { stdio: 'inherit' });
      // runMergeData.on('data', function (data) {
      //   console.log(data);
      // });
      runMergeData.on('close', function (close) {
        console.log('close_merge');
        resolve();
      });
    });
  },

  async cleanData(noOfUsers) {
    return new Promise((resolve) => {
      let runCleanData = spawn('python', [__dirname + '/clean_data.py', noOfUsers, noOfEpochs], { stdio: 'inherit' });
      // runCleanData.on('data', function (data) {
      //   console.log(data);
      // });
      runCleanData.on('close', function (close) {
        console.log('close_clean');
        resolve();
      });
    });
  },

  async epochSeparate(noOfUsers) {
    createFolder(noOfUsers, 'EpochSepData');
    return new Promise((resolve) => {
      let runEpochSeparate = spawn('python', [__dirname + '/MatlabCodes/run_matlab.py', 1, noOfUsers, noOfEpochs]);
      // runEpochSeparate.stdout.on('data', function (data) {
      //   console.log('epochSep', data.toString());
      // });
      runEpochSeparate.stdout.on('close', function (close) {
        console.log('close_epochSep');
        resolve();
      });
    });
  },

  featureExtract(noOfUsers) {
    createFolder(noOfUsers, 'FeatureVector');
    return new Promise((resolve) => {
      let runFeatureExtract = spawn('python', [__dirname + '/MatlabCodes/run_matlab.py', 2, noOfUsers, noOfEpochs]);
      // runFeatureExtract.stdout.on('data', function (data) {
      //   console.log('featureExtract', data.toString());
      // });
      runFeatureExtract.stdout.on('close', function (close) {
        console.log('close_feature');
        resolve();
      });
    });
  },

  async bpnn(noOfUsers) {
    createFolder(noOfUsers, 'TrainedParameters');
    return new Promise((resolve) => {
      let runBpnn = spawn('python', [__dirname + '/MatlabCodes/run_matlab.py', 3, noOfUsers, noOfEpochs]);
      // runBpnn.on('data', function (data) {
      //   console.log('bpnn', data.toString());
      // });
      runBpnn.stdout.on('close', function (close) {
        console.log('close_bpnn');
        resolve();
      });
    });
  },

  async predict(index) {
    await this.cleanData('login');
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