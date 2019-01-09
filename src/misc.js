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
  setIconClass: function(obj) {
    if (!obj.type || !fileIconsMap[obj.type])
      return Object.assign(obj, fileIconsMap.other);
    else {
      return Object.assign(obj, fileIconsMap[obj.type]);
    }
  }
}