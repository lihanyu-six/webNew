import search from '../views/search/index.vue'
import video from '../views/video/index.vue'
import me from '../views/me/index.vue'
import index from '../views/index/index.vue'

export default [
  {
    path: '/index',
    component: index
  },
  {
    path: '/search',
    component: search
  },
  {
    path: '/video',
    component: video
  },
  {
    path: '/me',
    component: me
  }
]
