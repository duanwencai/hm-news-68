/* 设置全局的过滤器 */
import Vue from 'vue'
import moment from 'moment'
moment.locale('zh-CN')
Vue.filter('item', (input, str = 'YYYY-MM-DD') => {
  return moment(input).format(str)
})
Vue.filter('now', input => {
  return moment(input).fromNow()
})
