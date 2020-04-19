import instance from '../utils/myHttp'

// 获取文章详情页数据
export function getArticles (id) {
  return instance({
    url: '/articles/' + id
  })
}

// 关注用户
export function getAollowings (id) {
  return instance({
    url: '/user/followings',
    method: 'post',
    data: {
      target: id
    }
  })
}

// 取消关注
export function delAollowings (id) {
  return instance({
    url: '/user/followings/' + id,
    method: 'delete'
  })
}

// 获取评论或评论回复
export function getComm ({
  source: id,
  offset,
  limit
}) {
  return instance({
    url: '/comments',
    params: {
      type: 'a',
      source: id,
      offset,
      limit
    }
  })
}
export function getCommhuifu ({
  source: id,
  offset,
  limit
}) {
  return instance({
    url: '/comments',
    params: {
      type: 'c',
      source: id,
      offset,
      limit
    }
  })
}

// 添加评论或评论回复
export function addComm ({
  target: artid,
  content,
  art_id: artId
}) {
  return instance({
    url: '/comments',
    method: 'post',
    data: {
      target: artid,
      content,
      art_id: artId
    }
  })
}
