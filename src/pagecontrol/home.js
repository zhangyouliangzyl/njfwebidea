import axios from '../utils/axios'

export function getHomedata() {
    return axios.get("/homeFlow/homeProfile.do")
}


//获取轮播图广告位
export function getAdv(typeID) {
    return axios.get("/adv/getAdv.do?typeID=" + typeID)
}