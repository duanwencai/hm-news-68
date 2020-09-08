import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/user/Login'
import Register from '../views/user/Register'
import User from '../views/user/User.vue'
import Edit from '../views/user/Edit.vue'
import MyFollow from '../views/user/MyFollow.vue'
import Mycomment from '../views/user/Mycomment.vue'
import Mystar from '../views/user/Mystar.vue'
import Index from '../views/news/index.vue'
import Manage from '../views/news/Manage.vue'
import PostDetail from '../views/news/PostDetail.vue'
import Search from '../views/news/Search.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' },
  { path: '/edit', component: Edit, nane: 'edit' },
  { path: '/myfollow', component: MyFollow, nane: 'myfollow' },
  { path: '/mycomment', component: Mycomment, nane: 'mycomment' },
  { path: '/mystar', component: Mystar, nane: 'mystar' },
  { path: '/', component: Index, nane: 'index' },
  { path: '/manage', component: Manage, nane: 'manage' },
  { path: '/postdetail/:id', component: PostDetail, nane: 'postdetail' },
  { path: '/search/', component: Search, nane: 'search' }
]
const router = new VueRouter({
  routes
})
router.beforeEach(function(to, from, next) {
  const token = localStorage.getItem('token')
  const authUrls = ['/user', '/edit', '/myfollow', '/mycomment', '/mystar']
  if (!authUrls.includes(to.path) || token) {
    next()
  } else {
    router.push('/login').catch(err => err)
  }
})
export default router
