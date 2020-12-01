<template>
  <div id="refresh">
    刷新页
  </div>
</template>

<script>

export default {
  name: 'refresh',
  beforRouteEnter(to,from,next){
    next(vm=>{
      vm.$router.replace(from.fullPath)
    })
  }
}
</script>
