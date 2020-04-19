import instance from '../utils/myHttp'

// 获取用户信息
export function getUserInfo () {
  return instance({
    url: '/user'
  })
}

// 获取用户个人资料
export function getProfile () {
  return instance({
    url: '/user/profile'
  })
}

// 编辑用户个人资料
export function updateUser ({
  name,
  gender,
  birthday,
  intro
}) {
  return instance({
    url: '/user/profile',
    method: 'patch',
    data: {
      name,
      gender,
      birthday,
      intro
    }
  })
}

// 编辑用户头像
export function uploadPhone (photo) {
  var fd = new FormData()
  fd.append('photo', photo)
  return instance({
    url: '/user/photo',
    method: 'patch',
    data: fd
  })
}
