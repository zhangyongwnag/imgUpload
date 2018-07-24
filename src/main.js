// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {api_post} from "./api/ajax";

Vue.config.productionTip = false
Vue.prototype.ajax = api_post //挂载
/* eslint-disable no-new */
Vue.use(router)
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
