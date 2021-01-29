import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Image as VanImage, Lazyload, ActionBar, ActionBarIcon, ActionBarButton, Divider, Popup, Overlay, Loading, Dialog, ContactCard, Form, AddressEdit, AddressList, Field, CellGroup, Cell, SwipeCell, Icon, Stepper, Card, Checkbox, CheckboxGroup, Button, Swipe, SwipeItem, PullRefresh, List, Tab, Tabs, SubmitBar, Toast } from 'vant'
import "../public/rem_control" // 引入全局控制根 html 的font-size 文件
import 'vant/lib/index.css' // 全局引入样式
import '../src/assets/css/iconfont.css'
import qs from 'qs'

// import axios from 'axios'
// import Vue from 'vue';
// import VueAxios from 'vue-axios'

const app = createApp(App) // 创建实例
app.use(VanImage).use(Lazyload).use(ActionBarButton).use(ActionBarIcon).use(ActionBar).use(Divider).use(Popup).use(Overlay).use(Loading).use(Dialog).use(Toast).use(ContactCard).use(Form).use(AddressEdit).use(AddressList).use(Field).use(CellGroup).use(Cell).use(SwipeCell).use(Icon).use(Stepper).use(Card).use(Button).use(Swipe).use(SwipeItem).use(PullRefresh).use(List).use(Tab).use(Tabs).use(SubmitBar).use(Checkbox).use(CheckboxGroup)
app.use(router)
app.use(store)
app.use(qs)
app.config.ignoredElements = ['wx-open-launch-weapp', 'wx-open-launch-app', 'script']
    // app.config.silent = true;

app.mount('#app')