'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
  viewDir: _path2.default.join(__dirname, '..', 'views/'),
  staticDir: _path2.default.join(__dirname, '..', 'public/'),
  port: 3000
};

exports.default = config;