const path = require('path');

const pathFromRoot = (relativePath) => path.join(process.cwd(), relativePath);

module.exports = {
  root: pathFromRoot(''),
  config: pathFromRoot('config'),
  src: pathFromRoot('src'),
  public: pathFromRoot('public'),
  build: pathFromRoot('build')
};
