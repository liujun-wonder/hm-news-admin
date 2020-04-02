import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/base.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import Schema from 'async-validator'
Schema.warning = function() {}

Vue.config.productionTip = false

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$axios = axios

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

import moment from 'moment'
Vue.filter('date', function(input) {
  return moment(input).format('YYYY-MM-DD')
})

// ---------------------富文本编辑器的配置-----------------------
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
Vue.use(VueQuillEditor)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
