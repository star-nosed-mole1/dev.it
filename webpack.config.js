const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  mode: process.env.NODE_ENV,
  entry: ["./src/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    static: {
      directory: "./dist",
    },
    compress: true,
    port: 8080,
    // proxy: {
    //   // '*': 'http://[::1]:3000',
    //   // "**": "http://localhost:3000",
    //   "/post": {
    //     target: "http://localhost:3000",
    //   },
    //   // "/user": "http://localhost:3000",
    //   // "/post": "http://localhost:3000",
    //   // "/comment": "http://localhost:3000",
    // },
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: "file-loader",
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: "url-loader",
            options: {
              mimetype: "image/png",
            },
          },
        ],
      },
    ],
  },
};

module.exports = config;
