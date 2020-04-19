import instance from '../utils/myHttp'

// 登录接口
export function loginApi ({
  mobile,
  code
}) {
  return instance({
    url: '/authorizations',
    method: 'post',
    data: {
      mobile,
      code
    }
  })
}
