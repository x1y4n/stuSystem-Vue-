// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import $ from 'jquery'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI, { Message } from 'element-ui'
import "bootstrap-icons/font/bootstrap-icons.css";
import './permission'

import 'bootstrap/dist/css/bootstrap.css' //引用bootstrap的样式
import 'bootstrap/dist/js/bootstrap.min.js' //引用bootstrap的js

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
