<template>
  <div id="app">
    <NavHeader />
    <router-view/>

    <!-- 断网提示 -->
    <div v-if="!network && false">
      <h3>我没网了</h3>
      <button @click="onRefresh">刷新</button>
    </div>
  </div>
</template>
<script>
import NavHeader from './components/NavHeader.vue';
import {mapState} from 'vuex'

export default {
  name:'app',
  components:{
    NavHeader,
  },
  computed:{
    ...mapState(['network'])
  },
  methods:{
    //通过跳转一个空页面再返回的方式实现刷新当前页面的数据的目的
    onRefresh(){
      this.$router.replace('/refresh')
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

</style>
