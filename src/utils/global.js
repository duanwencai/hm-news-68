/* 用于全局注册组件 */
import Vue from 'vue'
import HmHeader from '../components/HmHeader.vue'
import HmLogo from '../components/HmLogo.vue'
import HmNavtem from '../components/HmNavtem.vue'
import Hmpost from '../components/Hmpost.vue'
import Hmcomment from '../components/Hmcomment.vue'
import Hmfloor from '../components/HmFloor.vue'
Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-navtem', HmNavtem)
Vue.component('hm-post', Hmpost)
Vue.component('hm-comment', Hmcomment)
Vue.component('hm-floor', Hmfloor)
