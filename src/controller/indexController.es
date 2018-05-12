import IndexModel from '../models/indexModel'; 

const indexController = {
  index() {
    return async(ctx, next) => {
      console.log('exec index');
      ctx.body = await ctx.render('index.html', {
        title: '大拇指点赞'
      })
    }
  },
  get() {
    return async(ctx, next) => {
      const model = new IndexModel();
      const res = await model.get();
      ctx.body = res.data;
    }
  },
  update() {
    return async(ctx, next) => {
      const model = new IndexModel();
      const res = await model.update();
      ctx.body = res.data;
    }
  }
}

export default indexController;