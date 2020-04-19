import axios from 'axios'
import store from '../store/index'
import JsonBigInt from 'json-bigint'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0',
  // transformResponse是服务器接口返回来的第一手数据
  // 我们要对返回来第一手数据 进行转换，这样浏览器就不会在转换接收的较大数据时丢失精度
  transformResponse: [function (data) {
    try {
      return JsonBigInt.parse(data)
    } catch (error) {
      return error
    }
  }]
})

const instance2 = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0'
})

// 请求拦截器
instance.interceptors.request.use(function (config) {
  const myToken = store.state.userInfo.token
  if (myToken) {
    config.headers.Authorization = 'Bearer ' + store.state.userInfo.token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(function (response) {
  return response
}, async function (error) {
  // window.console.dir(error)
  var status = error.response.status
  // 如果token过期了，就会返回状态401，这个时候用户体验不好，所以我们拿到
  // 刷新token的refreshtoken，重新发送请求获取新的token，然后把旧的替代掉
  // 这个时候本地和Vuex里的数据都是新的数据，但是页面没更新还是没有数据
  // 我们就在最后返回一个请求，这样就会重新发送一个请求，然后会再次经历一次请求拦截
  // 这样就会把原本过期的token用新的token代替掉，这样返回来就是好的数据了
  if (status === 401) {
    var refreshtoken = store.state.userInfo.refresh_token
    // 这里不能再使用 instance的原因时因为instance中的请求拦截器
    // 会把我们发过去的参数refreshtoken被过期的token覆盖，从而导致返回错误的刷新refreshtoken
    var res = await instance2({
      url: '/authorizations',
      method: 'put',
      headers: {
        Authorization: `Bearer ${refreshtoken}`
      }
    })
    var newToken = res.data.data.token
    store.commit('setUserInfo', {
      token: newToken,
      refresh_token: refreshtoken
    })
    // window.console.log(error.config)
    return instance(error.config)
  }
  return Promise.reject(error)
})

export default instance
