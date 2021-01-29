 <!-- 跳转app按钮 组件-->

<template>
  <div class="goapp" v-html="wxopentagapp"> 
  </div>
</template>

<script>
import { reactive, onMounted, toRefs, ref, nextTick } from 'vue'
import axios from '../utils/axios'
import { Toast } from 'vant'

export default {

  setup() {

    let state = reactive({ 
        
    })

    // let testadd = (event) => {
    //     console.log("能知道我点击的是什么嘛？ = ",event.target.nodeName)
    //     console.log("第一个子元素 = ",event.currentTarget.firstElementChild)
        
    //     if(event.target.nodeName === "DIV"){
    //         Toast('点的是div');
    //     }else{
    //         Toast('其它');
    //     }
    // }

    let wxopentagapp = ref(null)

    let jumpappsuccess = (res)=>{
       console.log("跳APP成功 res = ",res);
    }

    let jumpapperror = (res)=>{
       console.log("跳APP失败 res = ",res.detail);
    }

    onMounted(() => {

    let requrl = window.location.href.split("#")[0]
    // console.log("requrl = ",requrl)
    let data = new URLSearchParams()
    data.append('url', requrl)
    let appextinfodata = ""   // 传给app的数据参数

    // console.log("data == ",data)
        axios.post(`/other/getSignature.do`, data).then(res => {
            // console.log("app post 请求res = ",res)
                wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: res.content.appId, // 必填，公众号的唯一标识
                timestamp: res.content.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.content.nonceStr, // 必填，生成签名的随机串
                signature: res.content.signature, // 必填，签名
                jsApiList: [
                    "onMenuShareTimeline",
                    "checkJsApi",
                    "scanQRCode"
                ], // 必填，需要使用的JS接口列表
                openTagList: ['wx-open-launch-weapp','wx-open-launch-app']
            })
                    // 通过ready接口处理成功验证
                    wx.ready( (res) => {
                        console.log("微信配置成功了！")
setTimeout(() => {

    wxopentagapp.value = `
          <wx-open-launch-app id='launch-btn-app' appid='wx9423e48da74a62da' extinfo=${appextinfodata}>   
            \<\script type='text/wxtag-template'>
                <div style='width:220px;background:#ff976a;text-align:center;padding:10px 0;color: #fff;border-radius:5px;'>打开农卷风APP</div>
            \<\/\script>
          </wx-open-launch-app>
        `

        

            // \<template>
            //     \<div style='width:220px;background:#ff976a;text-align:center;padding:10px 0;color: #fff;border-radius:5px;'>打开农卷风APP\</div>
            // \</template>

            // <\script type='text/wxtag-template'>
            //     <div style='width:220px;background:#ff976a;text-align:center;padding:10px 0;color: #fff;border-radius:5px;'>打开农卷风APP\</div>
            // </\script>
    // document.getElementById('launch-btn-app').addEventListener('launch', function (e) {
    //     console.log('打开App - success = ',res);
    //     })
    // document.getElementById('launch-btn-app').addEventListener('error', function (e) {
    //     console.log('打开App - fail', e.detail);
    //     })

        // console.log("===== ",document.getElementById('launch-btn-app'));
}, 300)
                     })

                    // 通过error接口处理失败验证
                    wx.error( (res) => {
                        console.log('微信配置失败 res = ', res);
                        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                    })
        })
    
    })

    return {
        ...toRefs(state),
        jumpappsuccess,
        jumpapperror,
        wxopentagapp,
    }
  }
}
</script>

<style>
.goapp{
    position: fixed;
    right: 0;
    top: 1.8rem;
    width: 50%;
    z-index: 1000;
    background-color: red;
    font-size: 0.12rem;
    border-bottom-left-radius: 50px;
    border-top-left-radius: 50px;
    color: #fff;
    text-align: center;
    padding: 0.1rem 0;
}

</style>