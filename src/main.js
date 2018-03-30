// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

const instance = axios.create({
  timeout: '5000',
  // baseURL : 'http://127.0.0.1:8088',
  //proxy: { host: "", port: ,}// 用于设置跨域请求代理
  // `method`是发出请求时使用的请求方法
  //method: 'get', // 默认
	
})

Vue.prototype.$http = instance


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
