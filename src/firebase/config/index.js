import dev from './config.dev';
import prod from './config.prod';

const config = process.NODE_ENV === 'production' ?
  prod : dev;

export default config;
