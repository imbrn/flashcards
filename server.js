const express = require("express");
const path = require("path");
const chalk = require("chalk");

// Webpack
const webpackConfig = require("./webpack.config.js");
const webpackCompiler = require("webpack")(webpackConfig);

// Express App
const app = express();
const PORT = process.env.PORT || 3000;

app.set("port", PORT);

app.use(
  require("webpack-dev-middleware")(webpackCompiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true,
    noInfo: true,
    logLevel: "silent"
  })
);
app.use(require("webpack-hot-middleware")(webpackCompiler));
app.use(express.static(path.join(__dirname, "public")));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(app.get("port"), () => {
  console.log(chalk.bold.blue("Open flashcards application"));
  console.log("---------------------------------");
  console.log(
    `Running at ${chalk.green.bold(`http://127.0.0.1:${app.get("port")}`)}`
  );
  console.log();
});
