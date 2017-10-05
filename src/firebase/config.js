import applicationConfig from '../config';
import devConfig from './config.dev';
import prodConfig from './config.prod';

const exportConfig = applicationConfig.env === 'prod' || applicationConfig.env === 'production' ?
  prodConfig :
  devConfig;

export default exportConfig;
