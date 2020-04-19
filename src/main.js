import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import './filters/mytime'
import './style/index.css'
import myPlugin from './utils/myPlugin'

// 引入vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
Vue.use(myPlugin) // Vue.use相当于xxx.install(Vue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
