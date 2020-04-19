<template>
  <div>
    <van-nav-bar fixed title="首页" />
    <div class="scrollBox">
      <van-tabs class="barBox" v-model="active">
        <van-tab v-for="(item,index) in channelsData" :key="index" :title="item.name">
          <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh">
            <van-list
              v-model="item.loading"
              :finished="item.finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <van-cell
                v-for="(artitem,artindex) in item.artcleList"
                :key="artindex"
                @click="$router.push('/artDetails?artid=' + artitem.art_id)"
              >
                <template #title>
                  <h4>{{artitem.title}}</h4>
                  <van-grid :border="false" :column-num="3" v-if="artitem.cover.type !== 0">
                    <van-grid-item
                      v-for="(imgItem, imgIndex) in artitem.cover.images"
                      :key="imgIndex"
                    >
                      <van-image lazy-load :src="imgItem" />
                    </van-grid-item>
                  </van-grid>
                  <div class="smallBox">
                    <div>
                      <span>{{artitem.aut_name}}</span>
                      <span>{{artitem.comm_count}}条评论</span>
                      <span>{{artitem.pubdate | getRelativeTime}}前</span>
                    </div>
                    <van-icon name="close" @click="openMore(artitem)" />
                  </div>
                </template>
              </van-cell>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>

    <!-- 频道操作按钮 -->
    <div class="leftShowBtn" @click="popupShow">
      <van-icon name="wap-nav" />
    </div>
    <!-- :xxx.sync的原理也是实现双向绑定，只不过传的属性名不会那么死板 -->
    <Popup ref="popupBox" :activeq.sync="active" :channelList="channelsData" />
    <more ref="moreBox" :artid="artid" @delArtid="delArtid" :autid="autid" />
  </div>
</template>

<script>
import { channelsApi, articlesApi } from '../../api/index'
import { getLocal } from '../../utils/mylocal'
import Popup from './components/popup'
import more from './components/more'
import Vue from 'vue'
import { Lazyload } from 'vant'
Vue.use(Lazyload)

export default {
  data () {
    return {
      channelsData: [],
      active: 0,
      artid: 0,
      autid: 1
    }
  },
  components: {
    Popup,
    more
  },
  methods: {
    // 滚动条与底部距离小于 offset 时触发
    onLoad () {
      setTimeout(async () => {
        const currenChannels = this.channelsData[this.active]
        const id = currenChannels.id
        // window.console.log(id)
        const res = await articlesApi({
          channelid: id,
          timestamp: Date.now()
        })
        // window.console.log(res)
        currenChannels.artcleList = [...currenChannels.artcleList, ...res.data.data.results]
        currenChannels.loading = false
        if (res.data.data.results.length === 0) {
          currenChannels.finished = true
        }
        // currenChannels.finished = true
      }, 200)
    },
    // 下拉刷新触发
    onRefresh () {
      setTimeout(() => {
        const currenChannels = this.channelsData[this.active]
        currenChannels.artcleList = []
        currenChannels.loading = false
        currenChannels.finished = false
        currenChannels.isLoading = false
        this.onLoad()
        this.onLoad()
      }, 1000)
    },
    // 获取用户频道列表并渲染
    async getChannels () {
      const myToken = this.$store.state.userInfo.token
      try {
        if (myToken) {
        // 如果是登录状态
          const res = await channelsApi()
          // window.console.log(res)
          this.channelsData = res.data.data.channels
        // window.console.log(this.channelsData)
        } else {
        // 如果不是登录状态
          const localChannles = getLocal('myChannles')
          if (localChannles) {
          // 未登录时本地未保存列表信息
            this.channelsData = localChannles
          } else {
          // 未登录时本地保存或者修改过列表数据
            const resNoLogin = await channelsApi()
            // window.console.log(res)
            this.channelsData = resNoLogin.data.data.channels
          // window.console.log(this.channelsData)
          }
        }
        this.getartcleLlist()
        // window.console.log(this.channelsData)
      } catch {
        this.$toast('请求有误!')
      }
    },
    // 给每个数据列表中加属性
    getartcleLlist () {
      this.channelsData.forEach(item => {
        // item.artcleList = [`我是${item.name}的数据`]
        // item.loading = false // 默认加载状态为false
        // item.finished = false // 默认数据源没加载完毕
        // item.isLoading = false // 是否在下拉刷新状态
        this.$set(item, 'artcleList', [])
        this.$set(item, 'loading', false)
        this.$set(item, 'finished', false)
        this.$set(item, 'isLoading', false)
      })
    },
    // 控制子组件的显示和隐藏
    popupShow () {
      this.$refs.popupBox.show = true
    },
    // 控制更多子组件中
    openMore (artitem) {
      this.$refs.moreBox.show = true
      window.console.log(artitem)
      this.artid = artitem.art_id
      this.autid = artitem.aut_id
      // window.console.log(this.artid)
    },
    delArtid (artid) {
      // window.console.log(artid)
      this.channelsData[this.active].artcleList.forEach((item, index) => {
        if (item.art_id === artid) {
          this.channelsData[this.active].artcleList.splice(index, 1)
        }
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style lang="less">
.van-nav-bar {
  background-color: rgb(50, 150, 250) !important;
  .van-nav-bar__title {
    color: white;
  }
}
.scrollBox {
  position: fixed;
  top: 90px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: scroll;
  .barBox {
    // margin-top: 47px;
    margin-bottom: 50px;
    .van-tabs__wrap {
      position: fixed;
      top: 46px;
      left: 0;
      width: 90%;
      z-index: 99;
    }
    .smallBox {
      line-height: 30px;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      span {
        color: #999;
        font-size: 12px;
        margin-right: 20px;
      }
      .van-icon {
        line-height: 30px;
      }
    }
  }
}

.leftShowBtn {
  line-height: 44px;
  width: 42px;
  background-color: skyblue;
  top: 46px;
  right: 0px;
  z-index: 999;
  position: fixed;
  text-align: center;
}
</style>
