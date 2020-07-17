module.exports = {
  entry: {
    game: './client/game'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/public'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  }
}
