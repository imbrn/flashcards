const os = require('os');

/**
 * Finds the first network address from 'os.networkInterfaces()' which
 * matches the criteria.
 * criteria is a function which receives as parameter a network address object
 * as in
 * https://nodejs.org/dist/latest-v8.x/docs/api/os.html#os_os_networkinterfaces.
 */
function findNetworkAddress(criteria) {
  const ifaces = os.networkInterfaces();
  const ifacesKeys = Object.keys(ifaces);

  for (let i = 0; i < ifacesKeys.length; i++) {
    const netAddresses = ifaces[ifacesKeys[i]];
    
    const firstExternalNetworkAddress = netAddresses.filter(netAddress => {
      return criteria(netAddress);
    });

    if (firstExternalNetworkAddress.length > 0) {
      return firstExternalNetworkAddress[0];
    }
  }
}

/**
 * Finds the first external IPv4 network address.
 */
function findFirstExternalIPv4NetworkAddress() {
  return findNetworkAddress(netAddress => !netAddress.internal && netAddress.family === 'IPv4');
}

module.exports = {
  findNetworkAddress,
  findFirstExternalIPv4NetworkAddress,
};
