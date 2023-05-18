const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const config = (env, argv) => {
  console.log(env, argv);

  const backend_url =
    argv.mode === "production"
      ? "https://notes2023.fly.dev/api/notes"
      : "http://localhost:3001/notes";

  return {
    entry: "./src/index.jsx",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "main.js",
    },
    devServer: {
      static: path.resolve(__dirname, "build"),
      compress: true,
      port: 3000,
    },
    devtool: "source-map",
    plugins: [
      new HtmlWebpackPlugin({ template: "./public/index.html" }),
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(jsx|js)$/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    resolve: {
      extensions: ["", ".js", ".jsx"],
    },
  };
};

module.exports = config;
