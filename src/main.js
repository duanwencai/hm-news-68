import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/base.less'
import './styles/iconfont.css'
// 第三种方式;
import 'vant/lib/index.css'
// 第一种方式
// import { Button } from 'vant'
// Vue.use(Button)
// 屏幕适配
import 'amfe-flexible'
import './utils/global'
import './utils/request'
import './utils/filters'
import './utils/vant'
// 关闭控制台警告信息
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
