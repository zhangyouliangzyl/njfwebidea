<template>

  <div :class="homeFlowbgimg.gravity === 0 ? 'bgtopcenter navView' : homeFlowbgimg.gravity === 1 ? 'bgcentercenter navView' : 'bgbottomcenter navView' " :style="{backgroundImage: 'url(' + homeFlowbgimg.imageUrl + ')'}" > 
      <div class="home">
          <div class="home-top">
              <van-image width="0.32rem" height="0.32rem" fit="fill" round :src="userimage" />
              <div class="home-top-search">
                <text class='iconfont icon-guanbi'></text>
                <text style="margin-left: 0.03rem;font-size: 0.14rem;">搜索商品、店铺</text>
              </div>
              <text class='iconfont icon-qrcode home-top-tools'></text>
              <text class='iconfont icon-newshareicon home-top-toolsadd'></text>
          </div>
      </div>
      
      <div class="header-nav">      
          <div :class="index == curindex ? 'header-nav-item-sec' : 'header-nav-item'" v-for="(item,index) in typeArr" :key="index" @click="toshowthisview(item.index)">
            {{item.name}}
            <div class="header-nav-bottomLine" v-show="index == curindex"></div>
          </div>
      </div>
  </div>
  <!-- class="navView {{homeFlowbgimg.gravity === 0 ? 'bgtopcenter' : homeFlowbgimg.gravity === 1 ? 'bgcentercenter' : 'bgbottomcenter'}}" 
  style="background-image:url({{homeFlowbgimg.imageUrl}});" -->

<!-- style="height:calc(100vh - 300px);overflow:hidden;" -->
          <div class="refreshText">{{refreshText}}</div>
  <!-- BScroll 滚动条  style="height:calc(100vh - 0.6rem - 0.4rem - 0.8rem);"-->
    <div class="recommend_box" :style="{backgroundColor: (curindex == 0 ? '#fff' : '#f6f6f6')}" ref='wrapper' id="wrapper" >
       <div>
  <!-- 除首页以外的 icon 图标显示 -->
    <div class="other-icon" v-if="curindex != 0" :style="getotherdivsize">
      <div class="other-collectView" :style="getotherdivtwosize">
       <div class="other-titleLabel" v-for="(item,index) in typeArr[curindex].classifyListEightShowList" :key="index">
          <van-image width="0.45rem" height="0.45rem" fit="fill" :src="item.typeImg" />
          <text class="other-text">{{item.name}}</text>             
       </div>  
      </div>  

				<div class="titleLabel" v-if="typeArr[curindex].classifyListEightShowList.length > 9 && isshowmoreother == false" @click="toshowallicon">
				    <text class="titleLabel-text">全部展开</text>
						<text class="iconfont icon-xiangxia titleLabel-icon"></text>
				</div>

				<div class="titleLabel" v-if="isshowmoreother == true" @click="tohideallicon">				    
				    <text class="titleLabel-text">收起</text>
						<text class="iconfont icon-xiangshang titleLabel-icon"></text>
				</div>    
    </div>
  <!-- 除首页以外的 icon 图标显示 end -->

  <swiper :list="typeArr[curindex].lunboArr.content" style="margin-top: 0.15rem;"></swiper>

  <div class="home-service-tag" v-if="curindex == 0">
    <van-image width="3.25rem" height=".13rem" fit="fill" src="http://image2.njf2016.com/Shoppingcart/image/tsff.png" />
  </div>

  <!-- 首页显示的icon  -->
    <div class="shouye-icon" v-if="curindex == 0">
       <div class="shouye-iconitem" v-for="(item,index) in iconArr" :key="index">
          <van-image width="0.45rem" height="0.45rem" fit="fill" :src="item.img" />
          <text style="font-size:0.14rem;color:rgb(51,51,51);">{{item.name}}</text>             
       </div>
    </div>
  <!-- 首页显示的icon end -->

<!-- 首页消息新闻轮播 -->
  <div class="shoueye-message" v-if="curindex == 0">
    <van-image width="0.5rem" height="0.4rem" fit="contain" src="http://image2.njf2016.com/homepage/images/%E4%B9%A1%E6%84%81%E5%A4%B4%E6%9D%A1.png" style="margin-left:0.16rem;"/>
    <van-swipe class="shoueye-message-swiper" :autoplay="4000" :vertical="true" :show-indicators="false">
      <van-swipe-item v-for="(item, index) in messagelist" :key="index" class="shoueye-message-swiper-item"> 
        {{item.title}}
      </van-swipe-item>
    </van-swipe>
  </div>
<!-- 首页消息新闻轮播 end-->  

  <!-- 首页代理商合伙人广告 -->
    <view class="shouye-topartner" v-if="curindex == 0">
      <van-image width="3.45rem" height="0.64rem" fit="fill" src="http://image2.njf2016.com/hc_1.gif" v-if="isAgency"/>
      <van-image width="3.45rem" height="0.64rem" fit="fill" src="http://image2.njf2016.com/banner002.gif" v-else />    
    </view>
  <!-- 首页代理商合伙人广告 end-->

<!-- 上新推荐图标 -->
    <div class='shouye-title-bar' v-if="curindex == 0">
      <van-image width="0.21rem" height="0.14rem" fit="fill" src='http://image2.njf2016.com/Shoppingcart/image/bq_left.png' />
      <text style="padding: 0 0.1rem;">上新推荐</text>
      <van-image width="0.21rem" height="0.14rem" fit="fill" src='http://image2.njf2016.com/Shoppingcart/image/bq_right.png' />
    </div>
<!-- 上新推荐图标 end-->

<!-- 更多热卖 -->
    <div class='shouye-title-bar' v-if="curindex != 0">
      <van-image width="1rem" height="0.12rem" fit="fill" src='http://image2.njf2016.com/remail.png' />
      <text style="padding: 0 0.1rem;color: #f95143;">更多热卖</text>
      <van-image width="1rem" height="0.12rem" fit="fill" src='http://image2.njf2016.com/remair.png' />
      	<div class="remai-more">				    
				    <text>更多</text>
						<text class="iconfont icon-cuxiangyou"></text>
				</div>
    </div>
<!-- 更多热卖 end-->

<!-- 商品显示 -->
    <div class="shouye-content" >
      <div class="shouye-content-left">
        <!-- <template v-for="(item,index) in typeArr[0].content" :key="index">   state.typeArr[key].leftArray   -->
        <template v-for="(item,index) in typeArr[curindex].leftArray" :key="index">
        <div class="shouye-content-item" @click="tips('commodityDetailsKeyID',item.commodityDetailsKeyID)">

            <!-- 商品图片 (主图，已售罄图，视频播放图)-->
            <div class="shouye-relative">
              <van-image width="1.72rem" height="1.72rem" fit="fill" lazy-load :src='item.goodsImg' /> 
              <van-image width="0.75rem" height="0.75rem" fit="fill" lazy-load src='https://www.njf2016.com/wx/img/sell_out.png' class="goodssoldOut" v-if="item.stockSum == 0"/>
              <van-image width="0.5rem" height="0.5rem" fit="fill" lazy-load :src='require("../assets/video.png")' class="goodsvideo" v-if="item.stockSum !== 0 && item.goodsVideoURL"/>
            </div>
            
            <!-- 商品名称 -->
            <div class="shouye-content-item-goodsname">{{item.goodsName}}</div>
            <!-- 商品价格，销量 -->
            <div class="shouye-content-item-price"><text class="shouye-content-item-price-jg">￥{{item.minPrice}}</text> <text class="shouye-content-item-price-xl" v-if="item.salesVolume != 0">销量{{item.salesVolume ? item.salesVolume : 0}}</text></div>
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

      <div class="shouye-content-right">
        <!-- <template v-for="(item,index) in typeArr[0].content" :key="index"> -->
        <template v-for="(item,index) in typeArr[curindex].rightArray" :key="index">
        <div class="shouye-content-item" @click="tips('commodityDetailsKeyID',item.commodityDetailsKeyID)">

            <!-- 商品图片 (主图，已售罄图，视频播放图)-->
            <div class="shouye-relative">
              <van-image width="1.72rem" height="1.72rem" fit="fill" lazy-load :src='item.goodsImg' />  
              <van-image width="0.75rem" height="0.75rem" fit="fill" lazy-load src='https://www.njf2016.com/wx/img/sell_out.png' class="goodssoldOut" v-if="item.stockSum == 0"/>
              <van-image width="0.5rem" height="0.5rem" fit="fill" lazy-load :src='require("../assets/video.png")' class="goodsvideo" v-if="item.stockSum !== 0 && item.goodsVideoURL"/>
            </div>
            <!-- 商品名称 -->
            <div class="shouye-content-item-goodsname">{{item.goodsName}}</div>
            <!-- 商品价格，销量 -->
            <div class="shouye-content-item-price"><text class="shouye-content-item-price-jg">￥{{item.minPrice}}</text> <text class="shouye-content-item-price-xl" v-if="item.salesVolume != 0">销量{{item.salesVolume ? item.salesVolume : 0}}</text></div>
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
    </div>
<!-- 商品显示 end-->

      <div class="loading" v-if="BScrollloadingmore">
          <text class="iconfont icon-jiazaizhong1"></text>         
          <text style="margin-left:3px;">正在加载</text> 
      </div>

      <div class="loading" v-else>       
          <text>没有更多数据了！</text> 
      </div>

       </div>
    </div> 


   <nav-bar></nav-bar>
   <goapp v-if="tofromapp">
   </goapp>

 <!-- <van-button disabled type="primary">禁用状态</van-button>
  <van-button loading type="primary" loading-text="加载中..." />
  <van-image width="100" height="100" fit="contain" :src="require('../assets/logo.png')" /> -->

</template>

<script>

//     与 2.x 版本生命周期相对应的组合式 API
//     beforeCreate -> 使用 setup()
//     created -> 使用 setup()
//     beforeMount -> onBeforeMount
//     mounted -> onMounted
//     beforeUpdate -> onBeforeUpdate
//     updated -> onUpdated
//     beforeDestroy -> onBeforeUnmount
//     destroyed -> onUnmounted
//     errorCaptured -> onErrorCaptured

import { reactive, onMounted, onBeforeUnmount, onUnmounted, toRefs, ref, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Toast } from 'vant'
import axios from '../utils/axios'
import { getHomedata, getAdv } from "@/pagecontrol/home"
import { imageProgressRule2, checkbetafromapp } from "@/utils/utils"
import swiper from '@/components/Swiper'
import navBar from '@/components/NavBar'
// import BScroll from '@better-scroll/core'
// import Plugin from 'somewhere'
// import InfinityScroll from '@better-scroll/infinity'
import Pullup from '@better-scroll/pull-up'
import PullDown from '@better-scroll/pull-down'
import ScrollBar from '@better-scroll/scroll-bar'

import goapp from '@/components/tojumpapp'

// BScroll.use(InfinityScroll)
// BScroll.use(Plugin)

// BScroll.use(Pullup)
// BScroll.use(PullDown)
// BScroll.use(ScrollBar)

export default {
  name: 'Home',
  components: {
    swiper,
    navBar,
    goapp
  },

setup(){
    const route = useRoute()
    const router = useRouter()
    let state = reactive({
    typeArr: [{
        name: "首页",
        index: 0,
        content: [],
        leftArray: [],
        rightArray: [],
        typeID: 0,
        page: 1,
        hasPage: 0,
        prompt: 0,
        lunboArr: [],
        classifyList: [],
        classifyListEightShowList: [],
        saleType: 0,
        sort: "createtime",
        order: "desc",
        pptoTopHidden: true
      },
      {
        name: "种植业",
        index: 1,
        content: [],
        leftArray: [],
        rightArray: [],
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
        index: 2,
        content: [],
        leftArray: [],
        rightArray: [],
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
        index: 3,
        content: [],
        leftArray: [],
        rightArray: [],
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
        index: 4,
        content: [],
        leftArray: [],
        rightArray: [],
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
        index: 5,
        content: [],
        leftArray: [],
        rightArray: [],
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
        index: 6,
        content: [],
        leftArray: [],
        rightArray: [],
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
    getotherdivsize:{},
    getotherdivtwosize:{},    
    homeFlowbgimg:{},
    })

    let isAgency = ref(true)
    let isPullUpLoad = ref(false)
    let wrapper = ref(null)
    let curindex = ref(0)   // getdata() 获取哪个分类， 0=>首页 
    let BScrollloadingmore = ref(true)
    let isshowmoreother = ref(false)
    let userimage = ref("https://www.njf2016.com/wx/img/defalut1.png")
    let tofromapp = ref(false)
    let isscrolling = ref(false)  // false => 没有在上拉加载， true => 正在上拉加载  (防抖，避免多次下拉刷新及反弹)
    let refreshText = ref("下拉刷新")

    let toshowallicon = async() => {
      // console.log(state.typeArr[curindex.value])
      isshowmoreother.value = true
      state.getotherdivsize = {
            "max-height":(state.typeArr[curindex.value].classifyListEightShowList.length > 9 && isshowmoreother.value == false) ? '2.08rem' : '8rem',
            "transition": 'max-height 0.2s'
          }
    
      state.getotherdivtwosize = {
            "max-height":(state.typeArr[curindex.value].classifyListEightShowList.length > 9 && isshowmoreother.value == false) ? '1.58rem' : '7rem',
            "transition": 'max-height 0.2s'
          }
          
    }

    let tohideallicon = () => {
      isshowmoreother.value = false
      state.getotherdivsize = {
            "max-height":(state.typeArr[curindex.value].classifyListEightShowList.length > 9 && isshowmoreother.value == false) ? '2.08rem' : '8rem',
            "transition": 'max-height 0.2s'
          }
    
      state.getotherdivtwosize = {
            "max-height":(state.typeArr[curindex.value].classifyListEightShowList.length > 9 && isshowmoreother.value == false) ? '1.58rem' : '7rem',
            "transition": 'max-height 0.2s'
          }      
      
    }

    let changeadv = async (typeid) => {
      Toast.loading({
        message: '加载中...',
        forbidClick: true   // 禁止背景点击
      })
       state.typeArr[0].lunboArr = await getAdv(typeid)   // await 后面如果跟一个promise对象。await会等待这个promise的状态由pending转为fulfilled或者rejected。在此期间它会阻塞，延迟执行await语句后面的语句。

       Toast.clear()
      //  console.log("换了吗 == ",state.typeArr)
    }

// 点击首页/种植业/副业... 切换内容事件
    let toshowthisview = async (index) => {
      Toast.loading({
        message: '加载中...',
        forbidClick: true   // 禁止背景点击
      })
      curindex.value = index
      state.typeArr[index].lunboArr = await getAdv(state.typeArr[index].typeID)   // await 后面如果跟一个promise对象。await会等待这个promise的状态由pending转为fulfilled或者rejected。在此期间它会阻塞，延迟执行await语句后面的语句。 
      await getdata(index)
      Toast.clear()
      // console.log("curindex == ",curindex.value)
    }

    let createInfinityScroll = () => {
        scroll = new BScroll("#wrapper", {
          pullDownRefresh: true, //下拉刷新
          pullUpLoad: true,  // 上拉刷新
          scrollY: true,     // 滚动条方向
          scrollbar: false,    // 是否显示滚动条    
          click: true,     //   bette-scroll 插件要开启click = true, 否则 @click 无效
          useTransition: false, // 是否使用 CSS3 transition 动画。如果设置为 false，则使用 requestAnimationFrame 做动画。
        })
        scroll.on('scroll', () => {   // 滑动
          // console.log('is scrolling')
        })
        scroll.on('scrollEnd', () => {  // 滑动结束
          // console.log('scrollEnd')
        })

        scroll.on('pullingUp', pullingUpHandler)  // 上拉刷新 , pullingUpHandler 不需要写成 pullingUpHandler()
      
    }

    let pullingUpHandler = async () => {
        
        // console.log("isPullUpLoad.value == ",isPullUpLoad.value);

        if(isPullUpLoad.value == false){

          scroll.refresh()
          isPullUpLoad.value = true   // 等刷新函数执行完再将其改为 false

          await hyss() 
                 
        }else{
          return
        }
      }

      let hyss = async () => {
        state.typeArr[curindex.value].page += 1
        await getdata(curindex.value)

          isPullUpLoad.value = false
          scroll.finishPullUp()     // 结束上次下拉，才能执行下次 下拉动作
          scroll.refresh()
      }

//  首页消息轮播图数据获取
  let getmessagetitle = async () => {

      axios.get("/xc/xcHeadline.do").then(res => {
        // console.log("消息 res = ",res);
        state.messagelist = res.content
      });
  }

  //  获取首页顶部背景图片
  let gethomeFlowbgimg = async() => {

      axios.get("/homeFlow/homeProfile.do").then(res => {
        // console.log("顶部背景图 = ",res);
        state.homeFlowbgimg = res.content
      });
  }

// 首页商品数据获取 
   let getdata = async (key) =>{
     console.log("进来getdata了");
     console.log("页数= ",state.typeArr[key].page)
     if(isscrolling.value){   // 如果上一次
          console.log("防抖功能开启，禁止反弹呵呵");
          return false
     }
     isscrolling.value = true

    let model = state.typeArr[key];
      await axios.get(`/goodsHome/findGoodsInfoListByType.do?typeID=${model.typeID}&merchantID=0&activityTag=0&sort=${model.sort}&subTypeIds=&order=${model.order}&saleType=${model.saleType}&page=${model.page}&tag=1&pageSize=16`)
      .then(res => {
        // console.log("商品 res = ",res.content.length);
        if(res.content.length < 16){  // 小于16，说明数据已经加载完了
            BScrollloadingmore.value = false
        }else{
            BScrollloadingmore.value = true
            state.typeArr[key].page += 1             
        }

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


              let leftArrayls = [];    // 为了实现瀑布流啊，直接flex的话div全部一样长
              let rightArrayls = [];
    
              for (let i = 0; i < newdata.length; i++) {
                let modellinshi = newdata[i];
                if (i % 2 == 0) { //偶数项
                //   leftLength += model.moduleName.length;
                 leftArrayls.push(modellinshi);
                } else { //奇数项
                //   rightLength += model.moduleName.length;
                  rightArrayls.push(modellinshi);
                }
              }

            if (model.page == 1) {
              state.typeArr[key].leftArray = leftArrayls;
              state.typeArr[key].rightArray = rightArrayls;
                // state.leftArray = leftArrayls;
                // state.rightArray = rightArrayls;
              } else {
                let temArray = leftArrayls;
                if (state.typeArr[key].leftArray.length > state.typeArr[key].rightArray.length) {   // 如果左边长了，则把  leftArray = rightArray，因为 leftArray 的 length >= rightArray 的length
                    leftArrayls = rightArrayls;
                    rightArrayls = temArray;
                }                

                state.typeArr[key].leftArray = state.typeArr[key].leftArray.concat(leftArrayls);
                state.typeArr[key].rightArray = state.typeArr[key].rightArray.concat(rightArrayls);
                // state.leftArray = state.leftArray.concat(leftArrayls);
                // state.rightArray = state.rightArray.concat(rightArrayls);
              }

              // console.log("state.leftArray = ",state.leftArray)
              // console.log("state.rightArray = ",state.rightArray)


        // state.typeArr[curindex.value].content = res.content;
      })

      await axios.get(`/merchant/getGoodsTypeByParent.do?parent=${model.typeID}`).then(res => {          
          state.typeArr[key].classifyListEightShowList = res.content
          state.getotherdivsize = {
            "max-height":(state.typeArr[key].classifyListEightShowList.length > 9 && isshowmoreother.value == false) ? '2.08rem' : '8rem',
            "transition": 'max-height 0.2s'
          }
    
          state.getotherdivtwosize = {
            "max-height":(state.typeArr[key].classifyListEightShowList.length > 9 && isshowmoreother.value == false) ? '1.58rem' : '7rem',
            "transition": 'max-height 0.2s'
          }
        })

        isscrolling.value = false     // 最后赋值false,恢复哦  
        console.log("isscrolling.value === ",isscrolling.value);

        // console.log(state.typeArr);
   }

  // vue3 中, 并没有提供 onBeforeCreated onCreated 的钩子, 直接在 setup() 下执行就可以
   getdata(curindex.value)


   //  url: `${getApp().urltotal()}goodsHome/findGoodsInfoListByType.do?typeID=${model.typeID}&merchantID=0&activityTag=0&sort=${sort}&subTypeIds=&order=${order}&saleType=${saleType}&page=${page}&tag=1&pageSize=16`,
   //  https://app.njf2016.com/njf/goodsHome/findGoodsInfoListByType.do?typeID=0&merchantID=0&activityTag=0&sort=createtime&subTypeIds=&order=desc&saleType=0&page=1&tag=1&pageSize=16
    
    // 上拉加载 页面滚动函数
   let pagescroll = async () => {
    // 滚动条距离顶部的距离
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
    // console.log("滚动条距离顶部的距离 == ",scrollTop);

    // 窗口可视区域高度
    let windowHeight = window.innerHeight;
    // console.log("窗口可视区域高度 == ",windowHeight);
    // document.documentElement.clientHeight || document.body.clientHeight  
    // 首先这两个都是获取可视区域的高度，那他们有什么区别呢
    // 1.window.innerHeight属于BOM（浏览器对象模型），而document.documentElement.clientHeight则属于文档对象模型
    // 2.window.innerHeight获取的高度包含横向滚动条，而document.documentElement.clientHeight不包含横向滚动条

    // 滚动区域高度
    let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    // console.log("滚动区域高度 == ",scrollHeight);
    
    if (scrollTop + windowHeight >= scrollHeight) {
          console.log("到底了，上拉加载 == ",scrollTop + windowHeight,scrollHeight);
        //上拉加载更多
         getdata(curindex.value)
        //  state.typeArr[curindex.value].page += 1

        //  console.log("页数= ",state.typeArr[curindex.value].page)
    }
}

  // 下拉刷新函数
  let refreshloading = async () => {
       let _element = document.getElementById('wrapper')
      // _refreshText = document.querySelector('.refreshText')
      let _startPos = 0
      let _transitionHeight = 0

    _element.addEventListener('touchstart', function(e) {
        // console.log('初始位置：', e.touches[0].pageY)
        _startPos = e.touches[0].pageY
        // _element.style.position = 'relative';
        // _element.style.transition = 'transform 0s';
    }, false)

    _element.addEventListener('touchmove', function(e) {
        // console.log('当前位置：', e.touches[0].pageY)
        _transitionHeight = e.touches[0].pageY - _startPos

        console.log("差值 == ",_transitionHeight)

        if (_transitionHeight > 0 && _transitionHeight < 60) {
            // _refreshText.innerText = '下拉刷新'
            refreshText.value = '下拉刷新'
            // _element.style.transform = 'translateY('+_transitionHeight+'px)'

            if (_transitionHeight > 45) {
              // _refreshText.innerText = '释放更新';
              refreshText.value = '释放更新'
            }
        }                
    }, false)

    _element.addEventListener('touchend', function(e) {
        // _element.style.transition = 'transform 0.5s ease 1s'
        // _element.style.transform = 'translateY(0px)'
        // _refreshText.innerText = '更新中...'
        refreshText.value = '更新中...'

        // todo...

    }, false)
  }
  
    onMounted( async () => {
// console.log("route == ",route);

     refreshloading()
     window.addEventListener("scroll", pagescroll)

      setTimeout(() => {
            tofromapp.value = checkbetafromapp()
            // let aaa = checkbetafromapp()
            // console.log("2秒后的值 == ",aaa)
      }, 500);

        // state.typeArr[curindex.value].page += 1
        // getdata(curindex.value)

      gethomeFlowbgimg()

      getmessagetitle()

      // await getdata(curindex.value)
      // state.typeArr[curindex.value].page += 1

      // await getdata(curindex.value)
      // state.typeArr[curindex.value].page += 1

      // await getdata(curindex.value)
      // state.typeArr[curindex.value].page += 1
      // getdata(curindex.value)

    nextTick(() => {
      // createInfinityScroll()
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
      // console.log("哈哈哈 = ",state.typeArr[0].lunboArr);

      // console.log("ss == ",state.typeArr);
      
      Toast.clear()

      // axios.get("/homeFlow/homeProfile.do").then(res => {
      //   console.log("res = ",res);
      // });

    })

    let tips = (type,key) => {
      // Toast('敬请期待');
      console.log("类型 = ",type);
      console.log("商品id = ",key);

      // if(type == "commodityDetailsKeyID"){
         router.push({
           path:'/GoodsDetails',
           query: {
             type:type,
             key:key
             }
         })
      // }
    }

    let aa = ref(0)    // ref() => aa.value。  如果是reactive，则 state.aa
    let add = () => {
      // Toast('加1');
      // aa.value++
      aa.value = store.state.test
    }

    // vue3 中，原 beforeDestroy 生命周期选项被重命名为 beforeUnmount
    onBeforeUnmount(() => {
        console.log("销毁前")
        window.removeEventListener('scroll', pagescroll)
    })

    // vue3 中，原 destroyed 生命周期选项被重命名为 unmounted
    onUnmounted(() => {
         console.log("页面销毁")
    })

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
      isAgency,
      BScrollloadingmore,
      toshowthisview,
      isshowmoreother,
      toshowallicon,
      tohideallicon,
      userimage,
      tofromapp,
      refreshText,
    }
  },
}
</script>

<style scoped>
   .home{
     width: 100%;
     height: 0.8rem;
     /* background-color: aquamarine; */
     display: flex;
     align-items: center;
     justify-content: center;
     font-size: 0.15rem;
   }

   .home-top{
    display: flex;
    align-items: center;
    height: 0.32rem;
    width: 100%;
    color: rgb(153,153,153);
    justify-content: space-between;
    padding: 0 0.1rem;
   }

  .home-top-search{
    background-color: #fff;
    display: flex;
    align-items: center;
    width: 2.3rem;
    height: 100%;
    border-radius: 50px;
    opacity: .68;
   }

  .home-top-tools{
    font-size: 0.22rem;
    color: #000;
  }

  .home-top-toolsadd{
    font-size: 0.24rem;
    color: #000;
  }

  .icon-guanbi{
    margin-left: 0.1rem;
    font-size: 0.18rem;
  }

  .navView {
    /* z-index: 1000000; */
    background-repeat: no-repeat;
    background-size: cover;
    position: sticky;
    top: 0;
    z-index: 99;
    background-color: #fff;
  }

  .bgtopcenter{
    background-position: top center;
  }
  .bgcentercenter{
    background-position: center center;
  }

  .bgbottomcenter{
    background-position: bottom center;
  }

  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }

  .header-nav{
    /* background-color: antiquewhite; */
    height: 0.4rem;
    line-height: 0.4rem;
    width: 100%;
    margin: 0 auto;
    white-space: nowrap;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .header-nav-item{
    color: #333333;
    font-size: 0.14rem;
    position: relative;
    display: flex;
    justify-content: center;
  }

  .header-nav-item-sec {
    color: #4FA200;
    font-size: 0.16rem;
    position: relative;
    display: flex;
    justify-content: center;
  }

  .header-nav-bottomLine{
    height: 0.03rem;
    width: 0.2rem;
    background-color: #4FA200;
    position: absolute;
    /* margin: 0 auto; */
    margin-top: -0.03rem;
    transition: all 0.3s;
    bottom: 0.05rem;
    left: 50%;
    margin-left: -0.1rem;
  }

  .other-icon{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 3.45rem;
    background-color: #fff;
    border-radius: 0.1rem;
    margin: 0 auto;
    overflow: hidden;
    margin-top: 0.15rem;
    padding-bottom: 0.1rem;
    margin-bottom: 0.15rem;
  }

  .other-collectView {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 3.45rem;
    background-color: #fff;
    border-radius: 0.1rem;
    margin: 0 auto;
    overflow: hidden;
    margin-top: 0.05rem;
}

  .other-titleLabel {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 0.69rem;
    height: auto;
    padding-top: 0.1rem;
  }

  .other-text {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 0.6rem;
    font-size: 0.12rem;
    color: rgb(18,18,18);
    margin-top: 0.05rem;
    text-align: center;
}

.titleLabel {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.1rem 0 0 0;
}

.titleLabel-text{
  font-size: 0.12rem;
  color: #666;
  padding: 0 1px;
}

.titleLabel-icon{
  color: #666;
  font-size: 0.12rem;
}

  .shouye-icon{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    margin-bottom: 0.1rem;
    margin-top: 0.1rem;
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

   .home-service-tag{
   display: flex;
   align-items: center;
   justify-content: center;
   margin-top: 0.05rem;
 }

 .recommend_box {
    width:100%;
    /* overflow: hidden; */
    padding-bottom: 0.6rem;
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
    position: relative;
  }

  .shouye-content{
    display: flex;
    background-color: #f8f8f8;
  }

  .shouye-content-left, .shouye-content-right{
    width: 45.5%;
    margin-left: 3%;
  }

  .shouye-content-item{
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 0.07rem;
    background-color: #FFF;
    overflow: hidden;
    padding-bottom: 0.1rem;
    margin-top: 0.1rem;
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
    padding: 0 0.05rem;
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

.shouye-relative{
  position: relative;
}

.goodsvideo{
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0.5rem;
  height: 0.5rem;
  margin: -0.25rem 0 0 -0.25rem;
  border-radius: 50%;
}

.goodssoldOut{
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0.75rem;
  height: 0.75rem;
  margin: -0.375rem 0 0 -0.375rem;
  border-radius: 50%;
}

.loading{
  height: 0.5rem;
  font-size: 0.15rem;
  text-align: center;
  background-color: #f8f8f8;
  pointer-events: auto;
  color: #888;
  line-height: 0.5rem;
}

.remai-more{
  position: absolute;
  /* top: 0.28rem; */
  right: 0.05rem;
  font-size: 0.11rem;
  color: #333;  
  display: flex;
  align-items: center;
  justify-content: center;
}

.refreshText{
    font-size: 0.2rem;
    position: sticky;
    top: 1.2rem;
    background: #fff;
    z-index: 99;
}

</style>
