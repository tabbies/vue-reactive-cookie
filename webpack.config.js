module.exports = {
  entry: './src/vue-reactive-cookie.js',

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
