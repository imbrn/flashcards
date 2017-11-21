React boilerplate with Webpack.
===

The simplest useful React ready boilerplate. This boilerplate allows you to develop React projects using ES6+ modules. It also supports CSS modules with PostCSS autoprefixer plugin.


## Features

* React;
* ES6+ modules;
* CSS modules;
* PostCSS ready;
* Autoprefixer PostCSS plugin;
* Webpack as module bundler;
* Easy customization of environment with Webpack configuration files;
* Npm and Yarn;
* Webpack Development Server:
* HOT Module Replacement;


## How to use


### Install

1. To use this boilerplate as starting point of your project, first you need to clone this:

 ```sh
 git clone https://github.com/bruno02221/es-boilerplate
 ```

2. After that, you can modify its `package.json` file to include your application details, like version, name, repository etc. You should also rename its `git remote origin` to point to your project git repository.

3. Then you're ready to start coding your application.


### Folder structure

The application default folder structure can be used by your when developing your application without having to change it.

The default folder structure contains the following architecture:

* **config/** - This folder contains all the configuration files used by Webpack, developlment server, PostCSS etc. You can edit those files to customize your application behavior.

* **public/** - This folder contains an HTML file (`index.html`) which is the template of your application's main page. You can edit this file to custom it, add links to fonts, icons etc. You can also use this folder to include other statics files you need.

* **src/** - This folder contains application specific files like Javascript and CSS files. You should implement your application using files inside this folder. The default application bundler will use these to bundle your application.


### Scripts

### Installing project dependencies:

    yarn install

or

    npm run install


### Starting development server:

    yarn start

or

    npm run start


### Building app for production:

    yarn build

or

    npm run install


## License

[MIT License](https://opensource.org/licenses/MIT)
