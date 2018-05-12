import Koa from 'koa';
import babel_co from 'babel-core/register';
import babel_po from 'babel-polyfill';
import co from 'co';
import render from 'koa-swig';
import server from 'koa-static';
import router from 'koa-simple-router';
import configObj from './config/config';
import initController from './controller/initController';

const app = new Koa();
//注册路由
initController.init(app, router);

// 定义swig渲染引擎
app.context.render = co.wrap(render({
  autoescape: true,
  root: configObj.viewDir,
  ext: 'html'
}));

// 定义静态文件路径
app.use(server(configObj.staticDir));
app.listen(configObj.port);

export default app;