import Vue from 'vue'
import { getRelativeTime, getTime } from '@/utils/mytime'

Vue.filter('getRelativeTime', function (time) {
  return getRelativeTime(time)
})

Vue.filter('getTime', function (time) {
  return getTime(time)
})
