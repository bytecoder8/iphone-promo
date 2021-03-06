module.exports = {
  mode: "development",
  target: "es5",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [ /node_modules/, /closest\.js/ ],
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  output: {
    filename: 'index.js'
  }
}
