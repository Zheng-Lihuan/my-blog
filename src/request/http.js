import axios from 'axios';
import qs from 'qs';
import router from '../router';
import Vue from 'vue';
// import { Toast } from 'vant';

//提示函数，禁止点击蒙层，显示一秒后关闭
const tip=(msg)=>{
  // Toast({
  //   message:msg,
  //   duration:1000,
  //   forbidClick:true,
  // })
}

//响应错误情况处理
const errorHandle=(status,msg)=>{
  switch(status){
    //401：未登录，跳转登录页
    case 410:
      toLogin();
      break;

    //403:token过期，请求token，并跳转登录页
    case 403:
      tip('登录过期，跳转登录页')
      localStorage.removeItem('token');
      store.commit('loginSuccess',null);
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;

    //404：请求不存在
    case 404:
      tip('请求的资源不存在');
      break;

    default:
      console.log(msg);
  }
}

//跳转登录页，携带当前页面的路由，以期在登录页面完成登录后返回当前页面
const toLogin=()=>{
  router.replace({
    paht:'/login',
    query:{
      redirect:router.currentRouter.fullPath,
    }
  });
}

console.log('axios1111111');
// console.log('process.env.VUE_APP_API_URL',process.env.VUE_APP_BASE_API);
//创建axios实例
const _axios=axios.create({
  baseURL:process.env.VUE_APP_BASE_API,
  timeout:60*1000,
  withCredentials:false,
})

//拦截请求数据
_axios.interceptors.request.use(
  config=>{
    // console.log('config',config);
    // const token = store.state.token;   
    // if(token){
    //   config.header['Authorization']=token;
    // }

    //设置请求数据类型和请求头
    if(config.method=='post'){
      //可根据不同类型的请求配置 config.url
      config.header['Content-Type']='application/x-www-form-urlencoded';
      config.data=qs.stringify(config.data);
    }else if(config.method=='get'){
      console.log('有关get的操作');
    }
    return config
  },
  err=>{
    return Promise.reject(err)
  }
)

// 拦截响应数据
_axios.interceptors.response.use(
  //请求成功
  response=>{
    if(response.status=200){
     return Promise.resolve(response.data)
    }else {
      return Promise.reject(response);
    }
  },
  //请求失败
  err=>{
    const {response}=err;
    if(response){
      //请求已发出，不在2xx范围
      errorHandle(response.status,response.data.message)
      return Promise.reject(response)
    }else {
      //处理断网情况
      //eg：请求超时或者断网时，更新state的network状态
      //network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      //关于断网组件中的刷新重新获取数据，会在断网组件中说明
      // console.log('window.navigator.online',window.navigator.onLine);
      if(!window.navigator.onLine){
        console.log('展示断网组件');
        // store.commit('changeNetwork',false)
      }else {
        return Promise.reject(err)
      }
    }
  }
)

Plugin.install=function(Vue,options){
  Vue.axios=_axios;
  window.axios=_axios;
  Object.defineProperties(Vue.prototype,{
    axios:{
      get(){
        return _axios;
      }
    },
    $axios:{
      get(){
        return _axios;
      }
    }
  })
}

Vue.use(Plugin)
export default _axios
