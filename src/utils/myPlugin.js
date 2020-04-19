// 封装自己的插件

// 导包
import { getLocal } from './mylocal'
import router from '../router/index'
import { Toast } from 'vant'

// 封装一个登录插件
var myPlugin = {}
myPlugin.install = function (Vue) {
  Vue.prototype.$login = function () {
    var token = getLocal('userInfo')
    if (!token) {
      router.push('/checkLogin')
      Toast.fail('请先登录!')
      return false
    } else {
      return true
    }
  }
}
export default myPlugin
