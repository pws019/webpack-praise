import '../css/index.css';
import PraiseService from './service.es';
import xtag from 'xtag'

const count = 0;
const serviceInstance  = new PraiseService();
xtag.register('praise-button', {
  content: `<div id="app">
                    pwd
                  <div class="res">
                  当前点赞数量为: ${count}
                  </div>
                  <div class="btn">
                    <div class="finger" >
                    <div class="big-finger"></div>
                    <div class="finger-body">
                      <div class="finger-item"></div>
                      <div class="finger-item"></div>
                      <div class="finger-item"></div>
                      <div class="finger-item"></div>
                    </div>
                  </div>
                  </div>
                </div>`,
  lifecycle: {
    created: function created() {
      serviceInstance.get().then(count => this.updateCount(count));
    },
    inserted() {
      const that = this;
      $('.btn').click(function(){
        serviceInstance.update().then(count=> that.updateCount(count));
      });
    }
  },
  methods: {
    updateCount(count) {
      $('.res').html( `当前点赞数量为${count}`);
    }
  }
});