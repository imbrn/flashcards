const express = require("express");
const path = require("path");
const chalk = require("chalk");

// Webpack
const webpackConfig = require("./webpack.config.js");
const webpackCompiler = require("webpack")(webpackConfig);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, "dist")));
app.use(
  require("webpack-dev-middleware")(webpackCompiler, {
    quiet: true,
    noInfo: true,
    logLevel: "silent"
  })
);
app.use(require("webpack-hot-middleware")(webpackCompiler));

app.listen(PORT, () => {
  console.log(chalk.bold.blue("Open flashcards application"));
  console.log("---------------------------------")
  console.log(`Running at ${chalk.green.bold(`http://127.0.0.1:${PORT}`)}`);
  console.log();
});
