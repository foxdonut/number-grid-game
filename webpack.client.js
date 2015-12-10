var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: [
    /*"webpack-dev-server/client?http://localhost:3013",
    "webpack/hot/only-dev-server",*/
    "./client/main.js"
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: [/*"react-hot-loader",*/ "babel-loader"],
        include: __dirname + "/client"
      }
    ],
  },

  /*
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  */

  output: {
    filename: "bundle.js",
    path: __dirname + "/public",
  },
};