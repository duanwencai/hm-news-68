/* 设置全局的过滤器 */
import Vue from 'vue'
import moment from 'moment'
Vue.filter('item', input => {
  return moment(input).format('YYYY-MM-DD')
})
