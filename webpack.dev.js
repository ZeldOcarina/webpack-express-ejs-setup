import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import chokidar from "chokidar";
import webpack from "webpack";
import common from "./webpack.common.js";
import { merge } from "webpack-merge";
import LiveReloadPlugin from "webpack-livereload-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import debounce from "lodash.debounce";

export default merge(common, {
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  devtool: "source-map",
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: "./src/template.html",
    // }),
    new webpack.HotModuleReplacementPlugin({
      // Options...
    }),
    //new LiveReloadPlugin({ ignore: /\.(js|scss)$/ }),
  ],
  devServer: {
    contentBase: "./src/",
    before(app, server) {
      chokidar.watch("./views").on(
        "all",
        debounce(function () {
          console.log("THIS IS HAPPENING!!!!!!");
          server.sockWrite(server.sockets, "content-changed");
        })
      );
    },
    writeToDisk: false,
    watchContentBase: true,
    watchOptions: {
      //ignored: [/*"**.js",*/ "**/node_modules"],
    },
    inline: true,
    hot: true,
    injectHot: (compilerConfig) => console.log(compilerConfig.name),
    liveReload: false,
    hotOnly: false,
    open: true,
    overlay: true,
    port: 8080,
    host: "localhost",
    clientLogLevel: "debug",
    proxy: {
      context: () => true,
      target: "http://localhost:3000",
    },
    publicPath: "/public",
    serveIndex: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", //3. Inject styles into DOM
          "css-loader", //2. Turns css into commonjs
          "sass-loader", //1. Turns sass into css
        ],
      },
    ],
  },
});
