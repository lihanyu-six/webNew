import instance from '../utils/myHttp'

// 获取联想建议（自动补全）
export function getSuggestApi (value) {
  return instance({
    url: '/suggestion?q=' + value
  })
}

// 获取用户搜索历史
export function getHistioryApi () {
  return instance({
    url: '/search/histories'
  })
}

// 获取搜索结果
export function getSearchApi ({
  page,
  per_page: perPage,
  q
}) {
  return instance({
    url: '/search',
    params: {
      page: page,
      per_page: perPage,
      q: q
    }
  })
}
