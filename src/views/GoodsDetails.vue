<template>
  <div class="about">
    <h1>农卷风网上商城</h1>
    <div class="about">商品详情</div>
  </div>
</template>

<script>

import { reactive, onMounted, toRefs, ref, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Toast } from 'vant'
import axios from '../utils/axios'
import { getGoodsData } from "@/pagecontrol/GoodsDetails"
import { imageProgressRule2, checkbetafromapp } from "@/utils/utils"

export default {
  name: 'GoodsDetails',
  components: {
    
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    
    let state = reactive({

    })

    onMounted( async () => {
    //   let str = "combinedSales/getNewGoodsDetailsV1.do?commodityDetailsKeyID="
    //   let aaa = getGoodsData(3423,str,"")
      const aaa = route.query
      console.log("带来的参数 == ",aaa)


    //   Toast.loading({
    //     message: '加载中...',
    //     forbidClick: true   // 禁止背景点击
    //   })

    //   Toast.clear()


    })


      return {
      ...toRefs(state),
    }
  }
}
</script>


<style scoped>
.about{
  font-size: 0.2rem;
}
</style>
