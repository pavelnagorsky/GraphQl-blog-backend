const Fs = require('fs');
const path = require('path');

module.exports = filePath => {
  filePath = path.join(__dirname, '..', filePath);
  Fs.unlink(filePath, err => {
    if (err) {
      console.log(err)
    }
  })
}