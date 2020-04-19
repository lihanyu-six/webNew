import Vue from 'vue'
import Vuex from 'vuex'
import { setLocal, getLocal } from '../utils/mylocal'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: getLocal('userInfo') || {}
  },
  mutations: {
    setUserInfo (state, payload) {
      state.userInfo = payload
      setLocal('userInfo', payload)
    }
  }
})
