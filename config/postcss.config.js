const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');
const paths = require('./paths.js');
const path = require('path');

module.exports = {
  plugins: [
    tailwindcss(path.join(paths.src, 'tailwindcss/tailwind.js')),
    autoprefixer,
  ]
}
