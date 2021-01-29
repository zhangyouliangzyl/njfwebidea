// 转七牛链接
export function getAdv(typeID) {
    return axios.get("/adv/getAdv.do?typeID=" + typeID)
}

//大图 无水印
export function goodsDetailtransformImage(imageUrl) {
    return imageProgressMethod(imageUrl, '600', 'nw');
}

//大图 有水印
export function imageProgressRule1(imageUrl) {
    return imageProgressMethod(imageUrl, '', '');
}

//中图
export function imageProgressRule2(imageUrl) {
    return imageProgressMethod(imageUrl, 300, 'nw');
}

//小图
export function imageProgressRule3(imageUrl) {
    return imageProgressMethod(imageUrl, 100, 'nw');
}

const imageProgressMethod = function(imageUrl, scale, notWater) {
    if (!imageUrl) return "";
    var state = 0;
    if (scale == 200) {
        state = 1;
    }
    scale = '600'; //这几个意思  -   为什么不让压缩了
    //修改为全部用600  因为一个4M的图片  都变成了 82kb   头像 也没关系的了

    if (imageUrl.indexOf("https://app.njf2016.com:8888") != -1) { //如果有
        imageUrl = imageUrl.replace("https://app.njf2016.com:8888", "https://image2.njf2016.com") + "!sm" + scale;
        imageUrl = imageUrl + notWater;
    } else if (imageUrl.indexOf("https://app.njf2016.com") != -1) { //如果有
        imageUrl = imageUrl.replace("https://app.njf2016.com", "https://image2.njf2016.com") + "!sm" + scale;
        imageUrl = imageUrl + notWater;
    } else if (imageUrl.indexOf("http://image2.njf2016.com") != -1 && imageUrl.indexOf("!sm") == -1) { //如果有
        imageUrl = imageUrl + "!sm" + scale;
        imageUrl = imageUrl + notWater;
    } else { //其他种类图片  直接return
        return imageUrl;
    }

    if (state == 1) {
        return imageUrl + '?imageView2/1/w/200/format/jpg';
    }
    return imageUrl + '?imageView2/0/format/jpg';
}

// 判断ios系统版本号
let checkiosPlatform = () => {
    let ua = window.navigator.userAgent.toLowerCase(); // 浏览器标识
    let ispdiosbeta = false; // false => 低于， true => 高于

    let csver = ua.match(/cpu iphone os (.*?) like mac os/);

    if (!csver) {
        console.log("不是Ios系统");
    } else {

        let iosbeta = csver[1].replace(/_/g, ".");
        let iosbetaArr = iosbeta.split(".");
        console.log("iosbetaArr == ", iosbetaArr);

        let ioslimitbeta = ["10", "3"]; // ios 10.3

        if (iosbetaArr.length > ioslimitbeta.length) {
            for (let i = 0; i < ioslimitbeta.length; i++) {
                if (parseInt(iosbetaArr[i]) > parseInt(ioslimitbeta[i])) { // 一一比对过去，只要比 limit 大，那就行
                    ispdiosbeta = true;
                    console.log("恭喜，你的ios版本满足 10.3 及以上");
                    return ispdiosbeta;
                }
            }

            // 如果for循环结束了，是相同的，但是 iosbetaArr.length > ioslimitbeta.length ，也是高于
            ispdiosbeta = true;
            return ispdiosbeta;

        } else { // 如果长度小于等于，则比较iosbetaArr.length
            for (let i = 0; i < iosbetaArr.length; i++) {
                if (parseInt(iosbetaArr[i]) > parseInt(ioslimitbeta[i])) { // 一一比对过去，只要比 limit 大，那就行
                    ispdiosbeta = true;
                    console.log("恭喜，你的ios版本满足 10.3 及以上");
                    return ispdiosbeta;
                }
            }
        }

        if (ispdiosbeta) {
            console.log("恭喜，你的ios版本满足 10.3 及以上");

        } else {
            console.log("不好意思，你的ios版本低于 10.3");
        }

    }

    return ispdiosbeta;

}

// 判断安卓系统版本号
let checkandroidPlatform = () => {
    let ua = window.navigator.userAgent.toLowerCase();
    let ispdandroidbeta = false; // false => 低于， true => 高于
    let pdandroidbetatest = /android/i;
    if (pdandroidbetatest.test(window.navigator.userAgent)) {
        var test = /android\s([\w.]+)/; //IE
        var match = test.exec(ua);
        var version = match[1].split(".")[0];
        console.log("安卓 版本 version == ", version);
        if (version < 5) {
            console.log('您的Android系统版本低于5.0!');
            ispdandroidbeta = false;
        } else {
            ispdandroidbeta = true;
            console.log('您的Android系统版本满足 5.0!');
        }

    }

    return ispdandroidbeta;

}

// 判断微信版本 7.0.12 及以上
let checkweixinbeta = () => {
    let wechatInfo = window.navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);
    let ispdweixinbeta = false; // false => 低于， true => 高于

    if (!wechatInfo) {
        console.log("不是微信浏览器");
    } else {
        let wxbeta = wechatInfo[1];
        let betaArr = wxbeta.split(".");
        // console.log("betaArr == ",betaArr);

        let limitbeta = ["7", "0", "12"];


        if (betaArr.length > limitbeta.length) {
            for (let i = 0; i < limitbeta.length; i++) {
                if (parseInt(betaArr[i]) > parseInt(limitbeta[i])) { // 一一比对，只要大于就行
                    ispdweixinbeta = true;
                    console.log("恭喜，你的微信版本满足 7.0.12 及以上");
                    return ispdweixinbeta;
                }
            }

            // 如果for循环结束了，是相同的，但是 betaArr.length > limitbeta.length ，也是高于
            ispdweixinbeta = true;
            return ispdweixinbeta;

        } else { // 如果长度小于，则比较少的
            for (let i = 0; i < betaArr.length; i++) {
                if (parseInt(betaArr[i]) > parseInt(limitbeta[i])) { // 一一比对，只要大于就行
                    ispdweixinbeta = true;
                    console.log("恭喜，你的微信版本满足 7.0.12 及以上");
                    return ispdweixinbeta;
                }
            }
        }

        if (ispdweixinbeta) {
            console.log("恭喜，你的微信版本满足 7.0.12 及以上");
        } else {
            console.log("不好意思，你的微信版本低于 7.0.12");

        }

        return ispdweixinbeta;

    }
}

// 检验跳app按钮是否能显示，微信环境，手机版本等
export function checkbetafromapp() {
    let custompd = true
    let ua = window.navigator.userAgent.toLowerCase() // 浏览器标识
    console.log("utils ua = ", ua)
    if (ua.match(/MicroMessenger/i) == "micromessenger") { // 先判断微信内置浏览器，是的话才再去判断 手机版本，微信版本等
        console.log("是微信内置浏览器")
            // 如果是苹果手机
        if (navigator.userAgent.indexOf('iPad') != -1 || navigator.userAgent.indexOf('iPhone') != -1) {
            console.log('微信内置浏览器  是苹果系统')

            let newcheckweixinbeta = checkweixinbeta();
            console.log("微信版本号判断啊 == ", newcheckweixinbeta);

            let newcheckiosPlatform = checkiosPlatform();
            console.log("ios版本号判断啊 == ", newcheckiosPlatform);

            if (newcheckweixinbeta == true && newcheckiosPlatform == true) {
                console.log("条件都满足，可以显示此按钮");
                custompd = true
            } else {
                console.log("条件不满足，不显示此按钮");
                custompd = false
            }

        } else if (navigator.userAgent.indexOf('Android') != -1) {
            console.log('微信内置浏览器 是安卓系统')
            let newcheckweixinbeta = checkweixinbeta();
            console.log("微信版本号判断啊 == ", newcheckweixinbeta);

            let newcheckandroidPlatform = checkandroidPlatform();
            console.log("android版本号判断啊 == ", newcheckandroidPlatform);

            if (newcheckweixinbeta == true && newcheckandroidPlatform == true) {
                console.log("条件都满足，可以显示此按钮");
                custompd = true
            } else {
                console.log("条件不满足，不显示此按钮");
                custompd = false
            }
        }
    } else {
        console.log("其它浏览器,直接 false")
        custompd = false
            // if (navigator.userAgent.indexOf('iPad') != -1 || navigator.userAgent.indexOf('iPhone') != -1) {
            //     console.log('其它浏览器  是苹果系统')
            // } else if (navigator.userAgent.indexOf('Android') != -1) {
            //     console.log('其它浏览器 是安卓系统')
            // }
    }

    return custompd;
}