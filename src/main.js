// 导入Vue
import Vue from 'vue'
// 导入App根组件
import App from './App.vue'
// 导入路由
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入全局样式表
import './assets/css/global.css'
import axios from 'axios'
import TreeTable from 'vue-table-with-tree-grid'

Vue.config.productionTip = false

Vue.use(ElementUI);

axios.interceptors.request.use(config => {
  console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须return config
  return config
})
axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/'
Vue.prototype.$axios = axios

Vue.component('tree-table',TreeTable)

// Vue实例
new Vue({
  // 把路由挂载到Vue实例上
  router,
  // 通过render函数把App根组件渲染到了路由上
  render: h => h(App)
}).$mount('#app')
