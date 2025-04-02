const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const path = require("path");
require("dotenv").config();

module.exports = {
  entry: "./src/index",
  mode: "development", // Ou "production" quando for gerar o build
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3000,
  },
  output: {
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "root",
      remotes: {
        'app_profile': `app_profile@${process.env.APP_PROFILE_URL}/remoteEntry.js`,
        'app_preference': `app_preference@${process.env.APP_PREFERENCE_URL}/remoteEntry.js`,
      },
      shared: {
        react: { singleton: true, requiredVersion: "^19.1.0" },
        "react-dom": { singleton: true, requiredVersion: "^19.1.0" },
      },
    }),
    new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
