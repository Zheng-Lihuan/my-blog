<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <addBlog msg="Welcome to Your Vue.js App"/> -->
    <!-- <showBlog /> -->
  </div>
</template>

<script>

import api from '../request/api';

export default {
  name: 'Home',
  components: {
    // addBlog,
    // showBlog
  },
  created(){
    console.log(api);
  }
}
</script>
