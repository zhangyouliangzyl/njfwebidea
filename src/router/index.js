import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import home from '../views/Home.vue'
import message from '../views/message.vue'
import car from '../views/car.vue'
import user from '../views/user.vue'
import about from '../views/about.vue'
import GoodsDetails from '../views/GoodsDetails.vue'

const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: home,
        meta: {
            title: "首页"
        }
    },
    {
        path: '/message',
        name: 'message',
        component: message,
        meta: {
            title: "消息"
        }
    },
    {
        path: '/car',
        name: 'car',
        component: car,
        meta: {
            title: "购物车"
        }
    },
    {
        path: '/user',
        name: 'user',
        component: user,
        meta: {
            title: "我的"
        }
    },
    {
        path: '/GoodsDetails',
        name: 'GoodsDetails',
        component: GoodsDetails,
        meta: {
            title: "商品详情"
        }
    },
    {
        path: '/about',
        name: 'about',
        component: about,
        meta: {
            title: "关于"
        }
    }
]

const router = createRouter({
    // history: createWebHistory(process.env.BASE_URL),  // html5 history 模式
    history: createWebHashHistory(), // hash模式
    routes
})

export default router