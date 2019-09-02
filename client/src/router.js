import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Logout from './views/Logout.vue'
import About from './views/About.vue'
import Register from './views/Register.vue'
import BackendManagement from './views/BackendManagement.vue'
import History from './views/History.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: '/backendManagement',
      name: 'backendManagement',
      component: BackendManagement,
      meta: {
        requiresPermission: true
      }
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (home.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/history/:tagname',
      name: 'history',
      component: History
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/',
      name: 'root',
      component: Login,
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: '*',
      name: 'not_found',
      component: About
    },
    {
      path: '/dev',
      name: 'dev',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
    }
  ],
  mode: 'history'

})
