<template>
  <div class="about">
    <h1>农卷风网上商城</h1>
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import navBar from '@/components/NavBar'
export default {
  name: 'about',
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
