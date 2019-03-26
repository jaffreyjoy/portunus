const fileIconsMap = require('../public/assets/fileIconMap.json')

export default {
  getFileExtension: function(filename) {
    // let extension = "other";
    let extensionStartIndex = filename.length -
      Array.from(filename).reverse().join('').indexOf('.');
    let validExtention = !(extensionStartIndex == 0 ||
      extensionStartIndex == filename.length)
    if(validExtention)
      return filename.substring(extensionStartIndex, filename.length).toLowerCase();
    else
      return "other";
  },
  setIconClass: function(file) {
    if (!file.type || !fileIconsMap[file.type])
      return Object.assign(file, fileIconsMap.other);
    else {
      return Object.assign(file, fileIconsMap[file.type]);
    }
  }
}