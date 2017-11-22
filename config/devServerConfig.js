const network = require('./utils/network.js');
const openurl = require('openurl');
const paths = require('./paths.js');

function printServerAccessInformation(protocol, host, port) {
  console.log('===============================================\n');
  console.log('Accessing the application:\n');
  console.log('In local host:');
  console.log(`${protocol}://localhost:${port}\n`);
  console.log('In local network:');
  console.log(`${protocol}://${host}:${port}`);
  console.log('\n===============================================');
}

const protocol = process.env.PROTOCOL || 'http';
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

module.exports = {
  publicPath: '/',
  compress: true,
  hot: true,
  host: host,
  port: port,
  clientLogLevel: 'none',
  noInfo: true,
  https: protocol === 'https',
  historyApiFallback: true,
  after: () => {
    const externalIp = network.findFirstExternalIPv4NetworkAddress();
    printServerAccessInformation(protocol, externalIp.address, port);
    openurl.open(`${protocol}://localhost:${port}`);
  }
};
