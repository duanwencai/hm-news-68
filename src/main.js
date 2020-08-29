import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/base.less'
import './styles/iconfont.css'
// 第三种方式;
import Vant from 'vant'
import 'vant/lib/index.css'
// 第一种方式
// import { Button } from 'vant'
// Vue.use(Button)
// 屏幕适配
import 'amfe-flexible'
import HmHeader from './components/HmHeader.vue'
import HmLogo from './components/HmLogo.vue'
import axios from 'axios'
import HmNavtem from './components/HmNavtem.vue'
import moment from 'moment'
// axios挂载到vue的原型
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:3000'
Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-navtem', HmNavtem)
Vue.use(Vant)
// 关闭控制台警告信息
Vue.config.productionTip = false
Vue.filter('item', input => {
  return moment(input).format('YYYY-MM-DD')
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
