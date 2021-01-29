
 <!-- 底部导航组件-->

<template>
  <div class="nav-bar van-hairline--top">
    <div class="nav-list">
      <router-link class="nav-list-item" tag="div" to="home" @click.native="haha">
        <van-image v-if="title == '首页'" width="0.25rem" height="0.25rem" fit="fill" lazy-load :src='require("../assets/img/icon-home-s.png")' /> 
        <van-image v-else width="0.25rem" height="0.25rem" fit="fill" lazy-load :src='require("../assets/img/icon-home.png")' />       
        <span>首页</span>
      </router-link>
      <router-link class="nav-list-item" tag="div" to="car">
        <van-image v-if="title == '购物车'" width="0.25rem" height="0.25rem" fit="fill" lazy-load :src='require("../assets/img/icon-car-s.png")' /> 
        <van-image v-else width="0.25rem" height="0.25rem" fit="fill" lazy-load :src='require("../assets/img/icon-car.png")' />
        <span>购物车</span>
      </router-link>
      <router-link class="nav-list-item" tag="div" to="message">
        <van-image v-if="title == '消息'" width="0.25rem" height="0.25rem" fit="fill" lazy-load :src='require("../assets/img/icon-chat-s.png")' /> 
        <van-image v-else width="0.25rem" height="0.25rem" fit="fill" lazy-load :src='require("../assets/img/icon-chat.png")' />
        <span>消息</span>
      </router-link>
      <router-link class="nav-list-item" tag="div" to="user">
        <van-image v-if="title == '我的'" width="0.25rem" height="0.25rem" fit="fill" lazy-load :src='require("../assets/img/icon-user-s.png")' /> 
        <van-image v-else width="0.25rem" height="0.25rem" fit="fill" lazy-load :src='require("../assets/img/icon-user.png")' />
        <span>我的</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
// import { getLocal } from '@/common/js/utils'
export default {
  setup() {
    const route = useRoute()
    const store = useStore()
    onMounted(() => {
    console.log("route == ",route.meta.title);
    title.value = route.meta.title
    })
    const count = computed(() => {
      return store.state.cartCount
    })

    const haha = () => {
      title.value = route.meta.title
    }

    const title = ref("")
    return {
      count,
      title,
      haha
    }
  }
}
</script>

<style scoped >

.nav-bar{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0.6rem;
    z-index: 1000;
    color: #666;
    background-color: #fff;
    display: flex;
    align-items: center;
    border-top: 1px solid #f6f6f6;
}

.nav-list {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 0;
}

.nav-list-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
    color: #666;
}

/* 当前路由被选中 样式 */
.router-link-active {  
    color: #63A722;
}

i {
text-align: center;
font-size: 22px;
}
span{
font-size: 12px;
}

</style>
