import prodConfig from './config.prod';
import devConfig from './config.dev';

const config = process.env.NODE_ENV === 'production' ?
  prodConfig : devConfig;

export default config;
