'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _register = require('babel-core/register');

var _register2 = _interopRequireDefault(_register);

var _babelPolyfill = require('babel-polyfill');

var _babelPolyfill2 = _interopRequireDefault(_babelPolyfill);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _koaSwig = require('koa-swig');

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaSimpleRouter = require('koa-simple-router');

var _koaSimpleRouter2 = _interopRequireDefault(_koaSimpleRouter);

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

var _initController = require('./controller/initController');

var _initController2 = _interopRequireDefault(_initController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();
//注册路由
_initController2.default.init(app, _koaSimpleRouter2.default);

// 定义swig渲染引擎
app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
  autoescape: true,
  root: _config2.default.viewDir,
  ext: 'html'
}));

// 定义静态文件路径
app.use((0, _koaStatic2.default)(_config2.default.staticDir));
app.listen(_config2.default.port);

exports.default = app;