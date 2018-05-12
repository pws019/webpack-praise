console.log('process.env.NODE_ENV',process.env.NODE_ENV);
const env = process.env.NODE_ENV;

const map = {
  DEV: './config/webpack.dev.js',
  PROD: './config/webpack.prod.js'
}
const path = map[env] ? map[env] : map['DEV'];

const config = require(path);

module.exports = config;