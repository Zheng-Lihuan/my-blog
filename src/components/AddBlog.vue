<template>
  <div id="add-blog-wrap">
    <div v-if="!publish_status">
      <label>标题</label>
      <input class="title" type="text" name="" v-model="blog.title">

      <label for="content">博客内容</label>
      <textarea class="content" cols="30" rows="10" v-model="blog.content"></textarea>

      <div id="checkbox-wrap" >
        <label for="Vue">Vue.js</label>
        <input type="checkbox" name="Vue" v-model="blog.category" value="Vue">
        <label for="React">React</label>
        <input id="React" type="checkbox" name="React" v-model="blog.category" value="React">
        <label for="Node">Node</label>
        <input id="Node" type="checkbox" name="Node" v-model="blog.category" value="Node">
        <label for="Typescript">Typescript</label>
        <input id="Typescript" type="checkbox" name="Typescript" v-model="blog.category" value="Typescript">
      </div>

      <label for="author">作者</label>
      <select name="" id="" v-model="blog.author">
        <option v-for="item in authors" :key="item">{{item}}</option>
      </select>
      <button class="publish" @click="publishBlog">发布</button>
    </div>

    <!-- <div class="publish_status" v-if="publish_status">发布成功</div> -->
  </div>
</template>

<script>
  import axios from 'axios'
  import { getCurrentTime ,getTimestamp} from '../utils/common.js'
  export default {
    name: 'AddBlog',
    props: {
      msg: String
    },
    data() {
      return {
        blog: {
          title: '',
          content: '',
          time:'',
          category: [],
          author:'',
          id:'',
        },
        authors: ['zhaoyun', 'liuche', 'kangxi'],
        publish_status: false,
      }
    },
    created(){
      console.log('this.$route.params',this.$route.query);
      if(this.$route.query.from=='edit'){
        this.id=this.$route.query.id;
        this.getBlogInfo();
      }else {
        this.blog.author=this.authors[0];
      }
    },
    methods: {
      //发布博客
      publishBlog() {
        console.log('点击发布');
        this.blog.time=getCurrentTime();//获取当前时间
        console.log('getTimestamp()',getTimestamp());
        this.blog.id=getTimestamp();//生成id
        let status=this.checkFormParams();//检查提交的参数是否为空
        if(status){
          this.saveBlogInfo(this.blog);//保存博客
          // this.publish_status = true;
          window.alert('发布成功')
          this.$router.push({
            path:'/',
            query:{
              
            }
          })
        }else {
          window.alert('信息不全,发布失败')
        }
      },

      //检查提交的参数是否为空
      checkFormParams(){
        return Object.keys(this.blog).every(item=>{
          if((item!='category' && this.blog[item].length<0) || this.blog[item].length<=0){
            return false;
          }
          return true;
        })
      },

      //保存添加的博客内容
      saveBlogInfo(blog){
        let blog_info=localStorage.getItem('blog_info');
        blog_info=JSON.parse(blog_info);
        if(!blog_info){
          blog_info=[];
          blog_info.push(blog);
        }else {
          blog_info.push(blog);
        }
        blog_info=JSON.stringify(blog_info);
        localStorage.setItem('blog_info',blog_info);
      },

      //获取博客信息
      getBlogInfo(){
        let blog_info=localStorage.getItem('blog_info');
        blog_info=JSON.parse(blog_info);
        console.log('blog_info',blog_info);
        this.blog=blog_info.filter(item=>{
          return item.id==this.id;
        })[0]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #add-blog-wrap {
    max-width: 1280px;
    margin: 0 auto;
  }

  label {
    display: block;
  }

  input[type='text'], textarea , select{
    display: block;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    border-radius: 4px;
  }

  input[type='text'],select {
    height: 40px;
  }

  textarea {
    padding: 10px 20px;
  }

  .title {
    margin-bottom: 20px;
  }

  .content {
    margin-bottom: 20px;
  }

  #checkbox-wrap {
    margin-bottom: 20px;
  }

  #checkbox-wrap label{
    display: inline-block;
    margin-right: 5px;
  }

  #checkbox-wrap input{
    display: inline-block;
    margin-right: 10px;
  }

  .publish {
    width: 100px;
    height: 40px;
    background-color: red;
    color: #fff;
    font-size: 20px;
    border: 0 none;
    border-radius: 4px;
    margin-top: 20px;
    cursor: pointer;
  }
</style>