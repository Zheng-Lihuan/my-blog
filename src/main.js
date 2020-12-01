import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// Vue.directive('orangeColor',{
//   bind:function(el,binding,vnode){
//     // console.log('自定义指令111',binding,vnode);
//     // console.log('触发bind');
//     el.style.color='#'+Math.random().toString(16).slice(2,8);
//   },
//   insert:function(){
//     console.log('触发inserted');
//   },
//   update:function(){
//     console.log('触发update');
//   },
//   componentUpdated:function(){
//     console.log('触发组件更新');
//   },
//   unbind:function(){
//     console.log('触发解绑');
//   }

// })


Vue.directive('theme',{
  bind(el,binding,vnode){
    // console.log('自定义指令222',binding,vnode)
    if(binding.value=='wide'){
      el.style.maxWidth='1280px';
    }else if(binding.value=='narrow'){
      el.style.maxWidth='560px';
    }

    if(binding.arg== 'custom'){
      el.style.background='#6677cc';
      el.style.padding='20px';
    }
  }
})


// Vue.filter('to-uppercase',function(value){
//   return value.toUpperCase();
// })

// Vue.filter('slice-word',function(value){
//   return value.slice(0,100);
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
