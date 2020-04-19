import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

// 过滤成相对时间
export function getRelativeTime (time) {
  // .locale('zh-cn')// 在这个实例上使用简体中文
  return dayjs().locale('zh-cn').from(dayjs(time), true)
}

// 过滤成年月日标准时间
export function getTime (time) {
  // .locale('zh-cn')// 在这个实例上使用简体中文
  return dayjs(time).format('YYYY-MM-DD')
}
