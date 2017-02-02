'use-strict';

class FileSystem {
  constructor() {
    const fs = require('fs');
    const path = require('path');
  }

  writeToFile () {

  }

  appendToFile() {

  }

  clearFile() {

  }

  checkFileExists(filePath) {
    if (fs.stat(path) !== null) {
      return true;
    } else {
      return false
    }
  }

  checkFolderExists() {

  }

  createFile() {

  }

  createFolder() {
    fs.mkdir(path, (err) => {
      if (err.code === 'EEXIST') {
        return false;
      } else {
        return true;
      }
    });
  }

  readFromFile() {

  }
}
