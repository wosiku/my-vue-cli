'use strict'
const os = require('os');

let USER_COMPUTER_IP = '""'
function getNetworkIp() {
  let needHost = ''; // 打开的host
  try {
    // 获得网络接口列表
    let network = os.networkInterfaces();
    for (let dev in network) {
      let iface = network[dev];
      for (let i = 0; i < iface.length; i++) {
        let alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          needHost = alias.address;
        }
      }
    }
  } catch (e) {
    needHost = 'localhost';
  }
  USER_COMPUTER_IP = `'${needHost}'`
}
getNetworkIp()
module.exports = {
  NODE_ENV: '"production"',
  USER_COMPUTER_IP
}
console.log('prod.env.js process.env.NODE_ENV')
