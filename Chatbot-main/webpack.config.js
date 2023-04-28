const path = require('path');

module.exports = {
  entry: './public/scripts/index.js',
  output: {
    path: path.resolve(__dirname, 'public/scripts'),
    filename: 'bundle.js',
  },
  mode: development,
};
