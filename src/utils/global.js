/* 用于全局注册组件 */
import Vue from 'vue'
import HmHeader from '../components/HmHeader.vue'
import HmLogo from '../components/HmLogo.vue'
import HmNavtem from '../components/HmNavtem.vue'
import Hmpost from '../components/Hmpost.vue'
Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-navtem', HmNavtem)
Vue.component('hm-post', Hmpost)
