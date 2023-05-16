// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI, { Message } from 'element-ui'
import './permission'
import store from './store'

Vue.use(ElementUI,axios)

Vue.prototype.$message = Message
Vue.prototype.$store = store
Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
