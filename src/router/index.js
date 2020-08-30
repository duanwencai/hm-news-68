import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Register from '../views/Register'
import User from '../views/User.vue'
import Edit from '../views/Edit.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' },
  { path: '/edit', component: Edit, nane: 'edit' }
]
const router = new VueRouter({
  routes
})
router.beforeEach(function(to, from, next) {
  const token = localStorage.getItem('token')
  const authUrls = ['/user', '/edit']
  if (!authUrls.includes(to.path) || token) {
    next()
  } else {
    router.push('/login').catch(err => err)
  }
})
export default router
