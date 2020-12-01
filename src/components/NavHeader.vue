<!-- showblog -->
<template>
  <div id="nav-header">
    <ul>
      <li v-for="(item,index) in nav_list" :key="index">
        <router-link :to="item.path">{{item.text}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name:'BlogDetail',
  data () {
    return {
      nav_list:[
        {
          path:'/',
          text:'博客'
        },
        {
          path:'/add',
          text:'写博客'
        }
      ]
    };
  },

  created(){
    
  },

  methods:{
    
  },
}

</script>
<style scoped>
  #nav-header {
    width: 100%;
    height: 100px;
    background-color:crimson;
  }

  ul {
    height: 100%;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  li {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
  }

  a {
    display: block;
    font-size: 20px;
    color: #fff;
  }


</style>