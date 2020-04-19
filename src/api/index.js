import instance from '../utils/myHttp'

// 获取用户频道列表
export function channelsApi () {
  return instance({
    url: '/user/channels',
    method: 'get'
  })
}

// 频道新闻推荐_V1.1
export function articlesApi ({
  channelid,
  timestamp
}) {
  return instance({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    params: {
      channel_id: channelid,
      timestamp,
      with_top: 0
    }
  })
}

// 全部频道列表
export function getChannelsAll () {
  return instance({
    url: 'channels'
  })
}

// 批量修改用户频道列表（重置式）
export function editChannelsApi (channels) {
  return instance({
    url: '/user/channels',
    method: 'put',
    data: {
      channels
    }
  })
}

// 对文章不喜欢
export function disLikeArt (id) {
  return instance({
    url: 'article/dislikes',
    method: 'post',
    data: {
      target: id
    }
  })
}

// 举报文章接口
export function reportPost ({
  target,
  type
}) {
  return instance({
    url: 'article/reports',
    method: 'post',
    data: {
      target,
      type,
      remark: ''
    }
  })
}

// 拉黑作者
export function delAutorApi (target) {
  instance({
    url: 'user/blacklists',
    method: 'post',
    data: {
      target
    }
  })
}
