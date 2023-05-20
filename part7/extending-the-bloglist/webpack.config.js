const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const config = (env, argv) => {
  console.log(env, argv);

  const production_mode = argv.mode === "production";

  const options = {
    extensions: ["js", "jsx"],
    exclude: ["/node_modules/"],
    emitError: production_mode,
    emitWarning: production_mode,
    failOnError: production_mode,
    failOnWarning: production_mode,
  };

  const backend_url = production_mode
    ? "https://blogs2023.fly.dev"
    : "http://localhost:3005";

  return {
    entry: "./src/index.jsx",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "main.js",
      publicPath: "/",
    },
    devServer: {
      static: path.resolve(__dirname, "build"),
      compress: true,
      port: 3000,
      historyApiFallback: true,
    },
    devtool: "source-map",
    plugins: [
      new HtmlWebpackPlugin({ template: "./public/index.html" }),
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url),
      }),
      new ESLintPlugin(options),
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
