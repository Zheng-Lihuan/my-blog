// import base from './base.js';
import axios from './http.js'
import qs from 'qs';

const api_module_1={
  //get请求
  get(url){
    return axios.get(url).then(res=>{
      console.log('返回数据',res);
      return res.msg;
    });
  },

  get2(){
    // console.log('返回base',base);
    return axios.get(`api/v2/haha`).then(res=>{
      console.log('返回数据',res);
      return res.msg;
    });
  },

  //post请求 对象传参
  post1(url,data){
    return axios.post(`${base.sq}${url}`,data).then(res=>res.data);
  },

  //post请求 字符串传参
  post2(url,data){
    return axios.post(`${base.sq}${url}`,qs.stringify(data)).then(res=>res.data);
  }

}

export default api_module_1
