import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import PostList from '../pages/PostList.vue'
import PostPublish from '../pages/PostPublish.vue'

Vue.use(VueRouter)

// 解决 NavigationDuplicated 异常
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', component: PostList, name: 'post-list' },
        { path: '/post-publish', component: PostPublish, name: 'post-publish' }
      ]
    },
    { path: '/login', component: Login, name: 'login' }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path !== '/login') {
    if (token) {
      next()
    } else {
      router.push('login')
    }
  } else {
    next()
  }
})

export default router
