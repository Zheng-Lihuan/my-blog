import Vue from 'vue'
import VueRouter from 'vue-router'
import ShowBlogs from '../components/ShowBlogs.vue'
import BlogDetail from '../components/BlogDetail.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'ShowBlogs',
    component: ShowBlogs
  },
  {
    path: '/add',
    name: 'AddBlog',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/AddBlog.vue')
  },
  // {
  //   path:'/blogDetail/:id',
  //   name:'BlogDetail',
  //   component:()=>import('../components/BlogDetail')
  // }
   {
    path:'/blogDetail/:id',
    name:'BlogDetail',
    component:BlogDetail,
  }

  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// const router=new VueRouter({
//   mode:'history',
//   base:process.env.BASE_URL,
//   routes,
// })

export default router
