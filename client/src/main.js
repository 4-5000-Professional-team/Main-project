import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/iconfont.css' //引入icon-font图标
import './assets/css/reset.css' //引入resetCss样式
axios.defaults.withCredentials = true;
Vue.prototype.axios = axios
Vue.use(elementUi)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
