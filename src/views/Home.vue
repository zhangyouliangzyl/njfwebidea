<template>
  <div class="home" @click="tips">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    农卷风移动端h5，vue3.x
    （手机，电脑完全自适应）
  </div>

  <!-- <div class="home" @click="add"> -->
    <!-- {{ aa }} -->
    <!-- {{data.content.createtime}} -->
  <!-- </div> -->

    <!-- <div class="category-list">
      <div v-for="(item,index) in typeArr[0].lunboArr" v-bind:key="index">
        <img :src="item.advImg">
        <span>{{item.name}}</span>
      </div>
    </div> -->

    <div class="header-nav">
       <div class="header-nav-item" v-for="(item,index) in typeArr" :key="index" @click="changeadv(item.typeID)">
          {{item.name}}
       </div>
    </div>

<!-- <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
  <van-swipe-item v-for="(item,index) in typeArr[0].lunboArr.content" :key="index" @click="tips">
    <van-image width="3.45rem" height="1.5rem" radius="0.1rem" fit="fill" :src="item.advImg" />
  </van-swipe-item>
</van-swipe> -->

  <swiper :list="typeArr[0].lunboArr.content"></swiper>

  <div class="home-service-tag">
    <van-image width="3.25rem" height=".13rem" fit="fill" src="http://image2.njf2016.com/Shoppingcart/image/tsff.png" />
  </div>

  <!-- <van-button disabled type="primary">禁用状态</van-button>
  <van-button loading type="primary" loading-text="加载中..." />
  <van-image width="100" height="100" fit="contain" :src="require('../assets/logo.png')" /> -->

  <!-- 首页显示的icon  -->
    <div class="shouye-icon">
       <div class="shouye-iconitem" v-for="(item,index) in iconArr" :key="index">
          <van-image width="0.45rem" height="0.45rem" fit="fill" :src="item.img" />
          <text style="font-size:0.14rem;color:rgb(51,51,51);">{{item.name}}</text>             
       </div>
    </div>
  <!-- 首页显示的icon end -->

<!-- 首页消息新闻轮播 -->
  <div class="shoueye-message">
    <van-image width="0.5rem" height="0.4rem" fit="contain" src="http://image2.njf2016.com/homepage/images/%E4%B9%A1%E6%84%81%E5%A4%B4%E6%9D%A1.png" style="margin-left:0.16rem;"/>
    <van-swipe class="shoueye-message-swiper" :autoplay="4000" :vertical="true" :show-indicators="false">
      <van-swipe-item v-for="(item, index) in messagelist" :key="index" class="shoueye-message-swiper-item"> 
        {{item.title}}
      </van-swipe-item>
    </van-swipe>
  </div>
<!-- 首页消息新闻轮播 end-->  

  <!-- 首页代理商合伙人广告 -->
    <view class="shouye-topartner">
      <van-image width="3.45rem" height="0.64rem" fit="fill" src="http://image2.njf2016.com/hc_1.gif" v-if="isAgency"/>
      <van-image width="3.45rem" height="0.64rem" fit="fill" src="http://image2.njf2016.com/banner002.gif" v-else />    
    </view>
  <!-- 首页代理商合伙人广告 end-->

<!-- 上新推荐图标 -->
    <div class='shouye-title-bar'>
      <van-image width="0.21rem" height="0.14rem" fit="fill" src='http://image2.njf2016.com/Shoppingcart/image/bq_left.png' />
      <text>上新推荐</text>
      <van-image width="0.21rem" height="0.14rem" fit="fill" src='http://image2.njf2016.com/Shoppingcart/image/bq_right.png' />
    </div>
<!-- 上新推荐图标 end-->

<!-- 商品显示 -->
    <div class="shouye-content">
      <template v-for="(item,index) in typeArr[0].content" :key="index">
       <div class="shouye-content-item" @click="tips">
           <!-- 商品图片 -->
           <van-image width="1.72rem" height="1.72rem" fit="fill" lazy-load :src='item.goodsImg' />
           <!-- 商品名称 -->
           <div class="shouye-content-item-goodsname">{{item.goodsName}}</div>
           <!-- 商品价格，销量 -->
           <div class="shouye-content-item-price"><text class="shouye-content-item-price-jg">￥{{item.minPrice}}</text> <text class="shouye-content-item-price-xl">销量{{item.salesVolume ? item.salesVolume : 0}}</text></div>
           <!-- 销售类型 -->
           <div class="shouye-content-item-type">
           <!-- 销售类型 -->
                   <!-- <van-image width="1.72rem" height="1.72rem" fit="fill" lazy-load src="http://image2.njf2016.com/ziyingaa.png" /> -->
                  <img src="http://image2.njf2016.com/ziyingaa.png" class="saletypetext ziyingstyle" v-if="item.shopType == 'ziYing'"> 
                  <text v-if="item.shopType == 'yaoYue'" class="saletypetext yaoyuestyle">要约</text>
                  <text v-if="item.isContainsWholesale" class='hanpifa'>含批发</text>

                  <text v-if='item.isXianshou' class="xianshouText saletypetext">现售</text>
                  <text v-if='item.isYushou' class="yushouText saletypetext">预售</text>
                  <text v-if='item.isTuangou' class="tuangouText saletypetext">团购</text> 
          <!-- 销售类型 end-->
           </div>
       </div>
      </template>
    </div>
<!-- 商品显示 end-->

    <div class="recommend_box" ref='wrapper' id="wrapper">
        <ul class="my_list">
            <li v-for="item in arr">第{{item}}条数据</li>
                    <div class="pullup-tips">
          <!-- <div v-if="!isPullUpLoad" class="before-trigger">
            <span class="pullup-txt">Pull up and load more</span>
          </div> -->
          <div v-if="isPullUpLoad" style="height:0.2rem;font-size:0.1rem;text-align:center;">
            Loading...
          </div>
        </div>
        </ul>

    </div>

</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { reactive, onMounted, toRefs, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Toast } from 'vant'
import axios from '../utils/axios'
import { getHomedata, getAdv } from "@/pagecontrol/home"
import { imageProgressRule2 } from "@/utils/utils"
import swiper from '@/components/Swiper'
import BScroll from '@better-scroll/core'
// import Plugin from 'somewhere'
// import InfinityScroll from '@better-scroll/infinity'
import Pullup from '@better-scroll/pull-up'
import PullDown from '@better-scroll/pull-down'
import ScrollBar from '@better-scroll/scroll-bar'


// BScroll.use(InfinityScroll)
// BScroll.use(Plugin)
BScroll.use(Pullup)
BScroll.use(PullDown)
BScroll.use(ScrollBar)


export default {
  name: 'Home',
  components: {
    swiper
  },

setup() {
    const router = useRouter()
    const store = useStore()
    const state = reactive({
    typeArr: [{
        name: "首页",
        keyid: 0,
        content: [],
        typeID: 0,
        page: 1,
        hasPage: 0,
        prompt: 0,
        lunboArr: [],
        saleType: 0,
        sort: "createtime",
        order: "desc",
        pptoTopHidden: true
      },
      {
        name: "种植业",
        keyid: 1,
        content: [],
        typeID: 2,
        page: 1,
        hasPage: 0,
        prompt: 0,
        lunboArr: [],
        classifyList: [],
        classifyListEightShowList: [],
        showList: 0,
        saleType: 0,
        sort: "",
        order: "desc",
        pptoTopHidden: true
      },
      {
        name: "副业",
        keyid: 3,
        content: [],
        typeID: 7,
        page: 1,
        hasPage: 0,
        prompt: 0,
        lunboArr: [],
        classifyList: [],
        classifyListEightShowList: [],
        showList: 0,
        saleType: 0,
        sort: "",
        order: "desc",
        pptoTopHidden: true
      },
      {
        name: "畜牧业",
        keyid: 2,
        content: [],
        typeID: 1,
        page: 1,
        hasPage: 0,
        prompt: 0,
        lunboArr: [],
        classifyList: [],
        classifyListEightShowList: [],
        showList: 0,
        saleType: 0,
        sort: "",
        order: "desc",
        pptoTopHidden: true
      },
      {
        name: "渔业",
        keyid: 4,
        content: [],
        typeID: 9,
        page: 1,
        hasPage: 0,
        prompt: 0,
        lunboArr: [],
        classifyList: [],
        classifyListEightShowList: [],
        showList: 0,
        saleType: 0,
        sort: "",
        order: "desc",
        pptoTopHidden: true
      },
      {
        name: "林业",
        keyid: 5,
        content: [],
        typeID: 8,
        page: 1,
        hasPage: 0,
        prompt: 0,
        lunboArr: [],
        classifyList: [],
        classifyListEightShowList: [],
        showList: 0,
        saleType: 0,
        sort: "",
        order: "desc",
        pptoTopHidden: true
      },
      {
        name: "农资",
        keyid: 6,
        content: [],
        typeID: 6,
        page: 1,
        hasPage: 0,
        prompt: 0,
        lunboArr: [],
        classifyList: [],
        classifyListEightShowList: [],
        showList: 0,
        saleType: 0,
        sort: "",
        order: "desc",
        pptoTopHidden: true
      }
    ],
    // 首页的八个图标
    iconArr: [{
        "name": "乡愁",
        "keyid": 0,
        // "img": 'http://image2.njf2016.com/乡愁.png'
        "img": 'http://image2.njf2016.com/homepage/images/xc_001%403x200.png'
      },
      {
        "name": "短视频",
        "keyid": 1,
        // "img": 'http://image2.njf2016.com/短视频.png'
        "img": 'http://image2.njf2016.com/homepage/images/dsp_002%403x200.png'
      },
      {
        "name": "直播",
        "keyid": 2,
        // "img": 'http://image2.njf2016.com/直播动效2.gif'
        "img": 'http://image2.njf2016.com/homepage/images/zbsy.gif'
      },
      {
        "name": "农批",
        "keyid": 3,
        // "img": 'http://image2.njf2016.com/农批.png'
        "img": 'http://image2.njf2016.com/homepage/images/np_005%403x200.png'
      },
      {
        "name": "扶贫特价",
        "keyid": 4,
        // "img": 'http://image2.njf2016.com/扶贫特价.png'
        "img": 'http://image2.njf2016.com/homepage/images/fptj_006%403x200.png'
      },
      {
        "name": "现售",
        "keyid": 5,
        // "img": 'http://image2.njf2016.com/现售.png'
        "img": 'http://image2.njf2016.com/homepage/images/xs_006%403x200.png'
      },
      {
        "name": "团购",
        "keyid": 6,
        // "img": 'http://image2.njf2016.com/拼团.png'
        "img": 'http://image2.njf2016.com/homepage/images/pt_007%403x200.png'
      },
      {
        "name": "预售",
        "keyid": 7,
        // "img": 'http://image2.njf2016.com/预售.png'
        "img": 'http://image2.njf2016.com/homepage/images/ys_008%403x200.png'
      },
      {
        "name": "合伙人",
        "keyid": 8,
        // "img": 'http://image2.njf2016.com/合伙人.png'
        "img": 'http://image2.njf2016.com/homepage/images/hhr_009%403x200.png'
      }
    ],
    // 首页消息轮播数组
    messagelist:[],
      haha:"",
      data:{},
      arr:["1","2","3","4","5","6","7","8","9","10","1","2","3","4","5","6","7","8","9","10"],     
    })

    const isAgency = ref(true)
    const isPullUpLoad = ref(false)
    const wrapper = ref(null)
    const curindex = ref(0)   // getdata() 获取哪个分类， 0=>首页 

    const changeadv = async (typeid) => {
      Toast.loading({
        message: '加载中...',
        forbidClick: true   // 禁止背景点击
      })
       state.typeArr[0].lunboArr = await getAdv(typeid)   // await 后面如果跟一个promise对象。await会等待这个promise的状态由pending转为fulfilled或者rejected。在此期间它会阻塞，延迟执行await语句后面的语句。

       Toast.clear()
       console.log("换了吗 == ",state.typeArr)
    }

    const createInfinityScroll = () => {
        scroll = new BScroll("#wrapper", {
          pullDownRefresh: true, //下拉刷新
          pullUpLoad: true,  // 上拉刷新
          scrollY: true,     // 滚动条方向
          scrollbar: true    // 是否显示滚动条         
        })
        scroll.on('scroll', () => {   // 滑动
          // console.log('is scrolling')
        })
        scroll.on('scrollEnd', () => {  // 滑动结束
          // console.log('scrollEnd')
        })

        scroll.on('pullingUp', pullingUpHandler)  // 上拉刷新 , pullingUpHandler 不需要写成 pullingUpHandler()
      
    }

    const pullingUpHandler = async () => {
        isPullUpLoad.value = true
        
        await hyss()

        scroll.finishPullUp()
        // scroll.refresh()
        isPullUpLoad.value = false

        // await requestData()

        // this.bscroll.finishPullUp()
        // this.bscroll.refresh()
        // this.isPullUpLoad = false

        console.log("没反应吗？");
      }

      const hyss = async () => {

        let uu = await getAdv(2)
        console.log("uu = ",uu);
        // setTimeout(() => {
        //   console.log("3秒")
        // }, 5000);
      }

//  首页消息轮播图数据获取
  const getmessagetitle = async () => {

      axios.get("/xc/xcHeadline.do").then(res => {
        console.log("消息 res = ",res);
        state.messagelist = res.content
      });
  }

// 首页商品数据获取
   const getdata = async () =>{  
    let model = state.typeArr[curindex.value];
      await axios.get(`/goodsHome/findGoodsInfoListByType.do?typeID=${model.typeID}&merchantID=0&activityTag=0&sort=${model.sort}&subTypeIds=&order=${model.order}&saleType=${model.saleType}&page=${model.page}&tag=1&pageSize=16`).then(res => {
        // console.log("商品 res = ",res);
        let newdata = res.content;
        newdata.forEach(itemIII => {

          // 处理销售类型
            itemIII.isXianshou = false;
            itemIII.isYushou = false;
            itemIII.isTuangou = false;
            itemIII.isHuodong = false;
            
            if (itemIII.selectTypeList.indexOf('4') > -1) { //活动    
              itemIII.isHuodong = true;
            }
            if (itemIII.selectTypeList.indexOf('1') > -1) { //现售
              itemIII.isXianshou = true;
            }
            if (itemIII.selectTypeList.indexOf('2') > -1) { //预售
              itemIII.isYushou = true;
            }
            if (itemIII.selectTypeList.indexOf('3') > -1) { //团购
              itemIII.isTuangou = true;
            }
          // 处理销售类型 end

          // 处理图片转链接七牛
            itemIII.goodsImg = imageProgressRule2(itemIII.goodsImg);
          // 处理图片转链接七牛end

          // 处理价格保留两位数
            itemIII.minPrice = parseFloat(itemIII.minPrice).toFixed(2);
          // 处理价格保留两位数 end
        });
        state.typeArr[curindex.value].content = res.content;
      });
      console.log("商品333 res = ",state.typeArr[curindex.value]);
   }
   //  url: `${getApp().urltotal()}goodsHome/findGoodsInfoListByType.do?typeID=${model.typeID}&merchantID=0&activityTag=0&sort=${sort}&subTypeIds=&order=${order}&saleType=${saleType}&page=${page}&tag=1&pageSize=16`,
   //  https://app.njf2016.com/njf/goodsHome/findGoodsInfoListByType.do?typeID=0&merchantID=0&activityTag=0&sort=createtime&subTypeIds=&order=desc&saleType=0&page=1&tag=1&pageSize=16
    onMounted( async () => {

      getmessagetitle();

      getdata();

    nextTick(() => {
      createInfinityScroll()
      console.log(wrapper);
    })
// console.dir(wrapper);

    // setTimeout(() => {
    //   createInfinityScroll()
    // }, 200);

      Toast.loading({
        message: '加载中...',
        forbidClick: true   // 禁止背景点击
      })

      // getAdv
      // state.data = await getHomedata()
    //   getHomedata().then(res => {
    //     console.log("新的res = ", res);
    // }); 

      // state.data = await getAdv(0)
      state.typeArr[0].lunboArr = await getAdv(0)
      // if(state.data){
      //    state.typeArr
      // }
      console.log("哈哈哈 = ",state.typeArr[0].lunboArr);

      // console.log("ss == ",state.typeArr);
      
      Toast.clear()

      // axios.get("/homeFlow/homeProfile.do").then(res => {
      //   console.log("res = ",res);
      // });

    })

    const tips = () => {
      Toast('敬请期待');
      // console.log("99999999");
    }

    let aa = ref(0)    // ref() => aa.value。  如果是reactive，则 state.aa
    const add = () => {
      // Toast('加1');
      // aa.value++
      aa.value = store.state.test
    }

    return {
      ...toRefs(state),
      tips,
      aa,
      add,
      changeadv,
      wrapper,
      pullingUpHandler,
      hyss,
      isPullUpLoad,
      curindex,
      isAgency
    }
  },
}
</script>

<style scoped>
   .home{
     width: 100%;
     height: 1rem;
     background-color: aquamarine;
     display: flex;
     align-items: center;
     justify-content: center;
     font-size: 0.15rem;
   }

  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }

  .header-nav{
    background-color: antiquewhite;
    height: 0.8rem;
    line-height: 0.8rem;
    width: 3.75rem;
    margin: 0 auto;
    white-space: nowrap;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .header-nav-item{
    color: #333333;
    font-size: 0.14rem;
  }


  .shouye-icon{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    margin-bottom: 20rpx;
    background-color: white;
  }
  .shouye-iconitem{
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.1rem 0;
  }

  .shouye-topartner{
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0.1rem 0;
  }

  .header-nav-item-sec {
    color: #4FA200;
    font-size: 0.16rem;
  }

   .home-service-tag{
   display: flex;
   align-items: center;
   justify-content: center;
   margin-top: 0.05rem;
 }

 .recommend_box {
    width:100%;
    height: 300px;
    /* border:2px solid red; */
    background-color: aquamarine;
    overflow: hidden;
  }
 
  .my_list {
    width:90%;
    margin:0 5%;
    border:2px solid black;
    min-height:500px;
    list-style:none;
  }
  .my_list li{
    height:100px;
    line-height:100px;
    width:100%;
    font-size: 10px;
    border-bottom:1px solid #f60;
  }

  .shoueye-message{
    display: flex;
    align-items: center;
  }

  .shoueye-message-swiper{
    width: 2.9rem;
    height: 0.25rem;  
    line-height: 0.25rem;
    padding-left: 0.1rem;  
  }

  .shoueye-message-swiper-item{  
    font-size: 0.13rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
  }

  .shouye-title-bar{
    width: 100%;
    height: 0.16rem;
    margin: 0.1rem 0;
    overflow: hidden;
    color: #7DD50A;
    font-size: 0.15rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .shouye-content{
    display: flex;
    flex-wrap: wrap;
  }

  .shouye-content-item{
    width: 45.5%;
    overflow: hidden;
    margin-left: 3%;
    display: flex;
    flex-direction: column;
  }

  .shouye-content-item-goodsname{
    padding: 0.05rem;
    text-align: left;
    font-size: 0.13rem;
    color: rgb(51,51,51);
  }

  .shouye-content-item-price{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .shouye-content-item-price-xl{
    font-size: 0.1rem;
    color: rgb(153, 153, 153);
  }

  .shouye-content-item-price-jg{
    font-family: 'Rubik-Regular';
    color: red;
    font-size: 0.15rem;
  }

  .shouye-content-item-type{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 0.05rem 0;
}

  .yaoyuestyle{
  font-size: 0.1rem;
  color: rgb(255,255,255);
  padding: 0 0.02rem;
  border-radius: 0.04rem;
  margin-left: 0.05rem;
  background:linear-gradient(90deg,rgba(63,176,1,1) 0%,rgba(140,213,29,1) 100%);
}

.ziyingstyle{
  border-radius: 0.04rem;
  margin-left: 0.05rem;
  width: 0.28rem;
  height: 0.14rem;
}

.saletypetext{
  font-size: 0.11rem;
  width: 0.28rem;
  height: 0.14rem;
  line-height: 0.14rem;
  text-align: center;
}

.hanpifa{
  color: #226927;
  font-size: 0.1rem;
  border-radius: 0.05rem;
  border: 1px solid;
  padding: 0.01rem 0.02px;
  margin-left: 0.05rem; 
  width: 0.33rem;   
  height: 0.12rem;
  line-height: 0.12rem;
  text-align: center;
}

.huodongText{
  color: #F44336;
  border: 1px solid #F44336;
  border-radius: 0.14rem;
  margin-left: 0.05rem;
}
 
.xianshouText{
  color: #2196F3;
  border: 1px solid #2196F3;
  border-radius: 0.14rem;
  margin-left: 0.05rem;
}
 
.yushouText{
  color: #795548;
  border: 1px solid #795548;
  border-radius: 0.14rem;
  margin-left: 0.05rem;
}
 
.tuangouText{
  color: #4CAF50;
  border: 1px solid #4CAF50;
  border-radius: 0.14rem;
  margin-left: 0.05rem;
}


</style>
