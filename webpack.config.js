module.exports = {
  entry: './index.js',

  output: {
    path: require('path').resolve(__dirname, 'dist'),
    filename: 'vue-reactive-cookie.js',
  },

  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
    ],
  },
};
