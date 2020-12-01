<!-- showblog -->
<template>
  <div id="show-blog" v-theme:custom="'wide'">
    <input type="text" class="search" v-model="search">
    <div>{{msg}}</div>
    <div>{{msg2}}</div>
    <div class="list-wrap">
      <div class="list-item" v-for="(item,index) in filteredBlogs" :key="index">
        <router-link :to="'/blogDetail/'+item.id"><div class="title" v-orangeColor>标题：{{item.title | toUpperCaseWord}}</div></router-link>
        <p class="brief">简介: {{item.content}}</p>
        <div>
          <span>类型: </span> 
          <span v-for="(item2,index2) in item.category" :key="index2"> {{item2}} </span>
        </div>
        <div>作者: {{item.author}}</div>
        <div>时间: {{item.time}}</div>
        <div class="btn-wrap">
          <button @click="del(item)">del</button>
          <button @click="edit(item)">edit</button>
        </div>
      </div>
    </div>

    <!-- <div id="content" style="width:100%;height:1000px;background:pink;overflow:auto;">
      <div style="width:100%;height:2000px;background:green;">1111111111111</div>
      <div style="width:100%;height:2000px;background:yellow;">22222222222</div>
    </div> -->
    <!-- <button @click="toTop">top</button> -->
  </div>
</template>

<script>
import axios from 'axios';
import api from '../request/api';
export default {
  name:'ShowBlogs',
  data () {
    return {
      blogs:[],
      search:'',
      msg:null,
      msg2:null
    };
  },

  created(){
    api.api_module_1.get('/api/abc').then(res=>{
      console.log('res',res);
      this.msg=res;
    });

    api.api_module_1.get('/api/v1').then(res=>{
      console.log('res',res);
      this.msg2=res;
    });
    // this.getList();
  },

  computed:{
    filteredBlogs(){
      return this.blogs.filter(ele=>{
        return ele.title.match(this.search);
      })
    }
  },

  filters:{
    toUpperCaseWord(value){
      return value.toUpperCase()
    },

  },

  methods:{

    toTop(){
      console.log('111');
      //  document.body.scrollTop=document.documentElement.scrollTop=0
      //  document.documentElement.scrollTop=0
      // document.getElementById('content').scrollTop=0;
      // console.log('a',a);
    },


    //获取列表
    getList(){
      console.log('获取博客列表');
      let blog_info=localStorage.getItem('blog_info');
      blog_info=JSON.parse(blog_info);
      console.log('没有数据',blog_info);
      if(!blog_info || (blog_info && blog_info.length<=0)){
        this.returnAddPage();
      }else {
        this.blogs=blog_info;
      }
    },

    //删除博客
    del(item){
      let blog_info=localStorage.getItem('blog_info');
      blog_info=JSON.parse(blog_info);
      let del_index=null;
      blog_info.find((ele,index)=>{
        if(ele.id==item.id){
          del_index=index;
          return;
        }
      })

      let status=window.alert('删除成功');

      blog_info.splice(del_index,1);
      this.blogs=blog_info;
      blog_info=JSON.stringify(blog_info);
      localStorage.setItem('blog_info',blog_info);
      if(this.blogs.length<=0){
        this.returnAddPage();
      }
    },

    //编辑
    edit(item){
      console.log('点击编辑',item);
      this.$router.push({
        path:'/add',
        query:{
          id:item.id,
          from:'edit',
        }
      })
    },

    //跳转添加博客页面
    returnAddPage(){
      this.$router.push({
        path:'/add',
        query:'',
      })
    }
  },

  directives:{
    'orangeColor':{
      bind(el,binding,vnode){
        el.style.color='#'+Math.random().toString(16).slice(2,8);
      }
    }
  }

}

</script>
<style scoped>
  #show-blog {
    max-width: 1280px;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .list-item {
    background-color: #ccc;
    padding: 10px 20px;
    margin-bottom: 20px;
    cursor: pointer;
  }

  .title {
    font-size: 20px;
    color: #2e3135;
  }

  .content {
    font-size: 16px;
    color: #909090;
  }

  .search {
    width: 100%;
    height: 60px;
    font-size: 20px;
    color: #333;
    padding: 0;
    border: 0 none;
    margin-bottom: 20px;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .btn-wrap button{
    width: 100px;
    height: 40px;
    border: 0 none;
    border-radius: 4px;
    background-color: green;
    color: #fff;
    margin-right: 20px;
    margin-top: 10px;
  }
</style>