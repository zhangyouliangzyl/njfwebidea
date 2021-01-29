import axios from 'axios'
import { Toast } from 'vant'
import router from '../router'

axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? '/api' : '/njf'
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
    // axios.defaults.headers['token'] = localStorage.getItem('token') || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use(res => {
    // if (typeof res.data !== 'object') {
    //     Toast.fail('服务端异常！')
    //     return Promise.reject(res)
    // }

    // console.log("process.env.NODE_ENV == ", process.env.NODE_ENV);
    return res.data
})

export default axios