var setFontSize = function(pwidth, prem) {
    var root = document.documentElement;
    var rem = root.clientWidth / pwidth * prem;
    // rem = (rem >= 30) ? 30 : rem;
    root.style.fontSize = rem + "px";

    /*pwidth 代表设计师给的设计稿的宽度，你的设计稿是多少，就写多少; ,prem 代表换算比例，这里写100是
      为了以后好算,比如，你测量的一个宽度是100px,就可以写为1rem,以及1px=0.01rem等等*/

    // console.log("rem == ", rem);
    // 1rem == 100px;  

};
setFontSize(375, 100);
window.onresize = function() { setFontSize(375, 100); };