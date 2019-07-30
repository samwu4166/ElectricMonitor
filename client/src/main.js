import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueCookies from 'vue-cookies';
import VueRouter from 'vue-router';

Vue.use(BootstrapVue);
Vue.use(VueCookies);
Vue.use(VueRouter);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!store.getters.loggedIn){
      next({
        path: '/login'
      })
    }
    else {
      next()
    }
  }
  else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if(store.getters.loggedIn){
      next({
        path: '/home'
      })
    }
    else {
      next()
    }
  }
  else {
    next()
  }
})

new Vue({
  router,
  store,/*
  watch: {
    "$route": 'checkLogin'
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      if (!this.$cookies.get('access_token')) {
        this.$router.push('/login');
      }
      else if(this.$router.currentRoute.fullPath == '/login' || this.$router.currentRoute.fullPath == '/'){
        this.$router.push('/home');
      }
    }
  },*/
  render: h => h(App)
}).$mount('#app')
