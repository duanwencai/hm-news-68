import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import(/* webpackChunkName: "user" */ '../views/user/Login')
const Register = () =>
  import(/* webpackChunkName: "user" */ '../views/user/Register')
const User = () =>
  import(/* webpackChunkName: "user" */ '../views/user/User.vue')
const Edit = () =>
  import(/* webpackChunkName: "user" */ '../views/user/Edit.vue')
const MyFollow = () =>
  import(/* webpackChunkName: "user" */ '../views/user/MyFollow.vue')
const Mycomment = () =>
  import(/* webpackChunkName: "user" */ '../views/user/Mycomment.vue')
const Mystar = () =>
  import(/* webpackChunkName: "user" */ '../views/user/Mystar.vue')
const Index = () =>
  import(/* webpackChunkName: "index" */ '../views/news/index.vue')
const Manage = () =>
  import(/* webpackChunkName: "news" */ '../views/news/Manage.vue')
const PostDetail = () =>
  import(/* webpackChunkName: "news" */ '../views/news/PostDetail.vue')
const Search = () =>
  import(/* webpackChunkName: "news" */ '../views/news/Search.vue')
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
  routes,
  mode: 'hash'
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
