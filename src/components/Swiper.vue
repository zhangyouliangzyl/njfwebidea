<!--
  轮播图组件，通过 props 传入数组
-->

<template>
  <van-swipe class="my-swiper" :autoplay="4000" indicator-color="#1baeae">
    <van-swipe-item v-for="(item, index) in list" :key="index">
      <!-- <img :src="item.advImg" alt="" @click="goTo(item.url)"> -->
      <van-image width="3.45rem" height="1.5rem" radius="0.1rem" fit="cover" :src="item.advImg" @click="goTo(item.url)">
        <template v-slot:error>加载失败</template>
      </van-image>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
  import { Toast } from 'vant'

export default {
  props: {
    list: Array
  },
  methods: {
    goTo(url) {
      // window.open(url)
      Toast('敬请期待');
    }
  }
}
</script>

<style scoped>

.my-swiper{
  width: 3.75rem;
  height: 1.5rem;
}
/* .my-swiper img {
      width: 90%;
      height: 100%;
      border-radius: 0.1rem;
    } */
  
</style>
