<template>
  <div class="about">
    <h1>农卷风网上商城</h1>
    <div class="about">购物车</div>
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import navBar from '@/components/NavBar'
export default {
  name: 'car',
  components: {
    navBar
  },
}
</script>


<style scoped>
.about{
  font-size: 0.2rem;
}
</style>
