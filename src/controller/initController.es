import index from './indexController'

const controllerInit = {
  init(app, router) {
    app.use(router(_ => {
      _.get('/index/index', index.index());
      _.get('/index/update', index.update());
      _.get('/index/get', index.get());
    }))
  }
}
export default controllerInit;