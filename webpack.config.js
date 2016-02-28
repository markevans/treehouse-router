module.exports = {
  context: __dirname + "/src",
  entry: "./treehouse_router.browser.js",

  output: {
    filename: "treehouse_router.min.js",
    path: __dirname + "/dist",
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      }
    ]
  }
}
