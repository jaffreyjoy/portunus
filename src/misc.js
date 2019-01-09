var fileIconsMap = require('../public/assets/fileIconMap.json')

export default {
  getFileExtension: function(filename) {
    // let extension = "other";
    let extensionStartIndex = filename.length -
      Array.from(filename).reverse().join('').indexOf('.');
    let validExtention = !(extensionStartIndex == 0 ||
      extensionStartIndex == filename.length)
    if(validExtention)
      return filename.substring(extensionStartIndex, filename.length);
    else
      return "other";
  }
}