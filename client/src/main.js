import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueCookies from 'vue-cookies'

Vue.use(BootstrapVue);
Vue.use(VueCookies);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  watch: {
    "$route": 'checkLogin'
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      if (!this.$cookies.get('session')) {
        this.$router.push('/login');
      }
    }
  },
  render: h => h(App)
}).$mount('#app')
