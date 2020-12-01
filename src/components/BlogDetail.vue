<!-- showblog -->
<template>
  <div id="blog-detail">
    <div><h3>标题: {{blog.title}}</h3></div>
    <div><p>内容: {{blog.body}}</p></div>
    <div>类型: <span v-for="(item,index) in blog.category" :key="index"> {{item}} </span></div>
    <div>作者: {{blog.author}}</div>
    <div>时间: {{blog.time}}</div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name:'BlogDetail',
  data () {
    return {
      blog:{},
      id:this.$route.params.id,
    };
  },

  created(){
    // console.log('获取参数',this.$route.params);
    this.getList();
  },

  methods:{
    getList(){
      let blog_info=localStorage.getItem('blog_info');
      blog_info=JSON.parse(blog_info);
      console.log('blog_info',blog_info);
      this.blog=blog_info.filter(item=>{
        return item.id==this.id;
      })[0]
    }
  },
}

</script>
<style scoped>
  #blog-detail {
    width: 1280px;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>