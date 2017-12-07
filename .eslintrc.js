module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "prettier",
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "prettier",
  ],
  "globals": {
    "GITHUB": true,
    "FIREBASE_CONFIG": true,
  },
  "rules": {
    "prettier/prettier": "error",
  }
};
