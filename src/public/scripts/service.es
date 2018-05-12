import axios from 'axios';

class PraiseService {
  get() {
    return axios.get('/index/get').then((res)=>{
      const count = res.data.data;
      return count;
    })
  }
  update() {
    return axios.get('/index/update').then((response)=>{
      const count = response.data.data;
      return count;
    })
  }
}

export default PraiseService;