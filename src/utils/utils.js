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
        imageUrl = imageUrl.replace("https://app.njf2016.com:8888", "http://image2.njf2016.com") + "!sm" + scale;
        imageUrl = imageUrl + notWater;
    } else if (imageUrl.indexOf("https://app.njf2016.com") != -1) { //如果有
        imageUrl = imageUrl.replace("https://app.njf2016.com", "http://image2.njf2016.com") + "!sm" + scale;
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