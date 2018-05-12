import axios from 'axios';
class IndexModel {
  constructor(ctx) {
    this.ctx = ctx;
  }

  async get() {
    const options = {
      uri: 'http://localhost/liked/index.php',
    }
    const res = await axios.get(options.uri);
    return res;
  }
  
  async update() {
    const options = {
      uri: 'http://localhost/liked/add.php',
    }
    const res = await axios.get(options.uri);
    return res;
  }
}
export default IndexModel;