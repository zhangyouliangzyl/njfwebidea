import axios from '../utils/axios'

// 获取商品数据信息
export function getGoodsData(goodsID, str, options) {
    return axios.get(str + goodsID)
}