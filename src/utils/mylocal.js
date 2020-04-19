// 存入本地
export function setLocal (name, value) {
  window.localStorage.setItem(name, JSON.stringify(value))
}

// 获取本地数据
export function getLocal (name) {
  return JSON.parse(window.localStorage.getItem(name))
}

// 删除本地数据
export function removeLocal (name) {
  window.localStorage.removeItem(name)
}
