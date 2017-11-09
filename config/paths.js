const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

module.exports = {
  root: appDirectory,
  public: resolveApp('public'),
  build: resolveApp('build'),
  config: resolveApp('config')
};
