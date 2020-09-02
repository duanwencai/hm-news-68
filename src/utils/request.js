/* 处理axios发送请求 */
import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import { Toast } from 'vant'
// axios挂载到vue的原型
Vue.prototype.$axios = axios
const URL = 'http://127.0.0.1:3000'
axios.defaults.baseURL = URL
Vue.prototype.$base = URL
Vue.prototype.$url = function(url) {
  if (url.startsWith('http')) {
    return url
  } else {
    return URL + url
  }
}
axios.interceptors.request.use(function(config) {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

axios.interceptors.response.use(function(response) {
  const { statusCode, message } = response.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    localStorage.removeItem('token')
    localStorage.removeItem('userid')
    Toast.fall('登录信息失效')
    router.push('/login')
  }
  return response
})
