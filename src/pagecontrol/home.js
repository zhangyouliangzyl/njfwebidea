import axios from '../utils/axios'

export function getHomedata() {
    return axios.get("/homeFlow/homeProfile.do")
}


//获取轮播图广告位
export function getAdv(typeID) {
    return axios.get("/adv/getAdv.do?typeID=" + typeID)
}


// var getAdv = function (typeID, okFn, pages) {
//     wx.request({
//       url: url + 'adv/getAdv.do?typeID=' + typeID,
//       method: 'GET',
//       dataType: 'json',
//       responseType: 'text',
//       success: function (res) {
//         if (res.data.result == "success") {
//           okFn(res.data.content);
//         } else {
//           hint(res.data.error)
//         }
//       },
//       fail: function (res) {
//         njfConsole(res);
//       }
//     })
//   }