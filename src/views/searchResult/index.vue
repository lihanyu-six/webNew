<template>
  <div class="searchResult">
    <van-nav-bar title="搜索结果" left-arrow @click-left="backHtml" />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item, index) in searchData" :key="index" @click="goArtDetails(item)">
        <template #title>
          <h4>{{item.title}}</h4>
          <van-grid :border="false" :column-num="3" class="imgBox" v-if="item.cover.type!==0">
            <van-grid-item v-for="(imgItem, imgIndex) in item.cover.images" :key="imgIndex">
              <van-image lazy-load :src="imgItem" />
            </van-grid-item>
          </van-grid>
          <div class="smallBox">
            <div>
              <span>{{item.aut_name}}</span>
              <span>{{item.comm_count}}条评论</span>
              <span>{{item.pubdate | getRelativeTime}}前</span>
            </div>
          </div>
          <van-grid :column-num="3" class="likeCom">
            <van-grid-item icon="comment-o" :text="item.comm_count.toString()" />
            <van-grid-item icon="like-o" text="点赞" @click="zan" />
            <van-grid-item icon="certificate" text="分享" />
          </van-grid>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import Vue from 'vue'
import { Lazyload } from 'vant'
import { getSearchApi } from '@/api/search'
Vue.use(Lazyload)
export default {
  data () {
    return {
      loading: false,
      finished: false,
      key: '',
      page: 1,
      perPage: 10,
      searchData: []
    }
  },
  methods: {
    // 点击返回到上一个页面
    backHtml () {
      this.$router.back()
    },
    // 进入页面触发一次，上拉滚轮与底部少于300触发
    async onLoad () {
      const res = await getSearchApi({
        page: this.page,
        per_page: this.perPage,
        q: this.key
      })
      // window.console.log(this.searchData)
      this.searchData = [...this.searchData, ...res.data.data.results]
      this.loading = false
      this.page++
      if (res.data.data.results.length === 0) {
        this.finished = true
      }
    },
    // 点赞触发
    zan () {
      if (this.$login()) {
        window.console.log('点赞')
      }
    },
    // 点击跳转到文章详情页
    goArtDetails (item) {
      this.$router.push('/artDetails?artid=' + item.art_id)
    }
  },
  created () {
    this.key = this.$route.query.q
  }
}
</script>

<style lang ="less">
.searchResult {
  .van-icon-arrow-left::before {
    color: #fff;
  }
  .smallBox {
    line-height: 30px;
    margin-top: 10px;
    span {
      color: #999;
      font-size: 12px;
      margin-right: 20px;
    }
  }
  .likeCom {
    .van-grid-item__content {
      flex-direction: row;
    }
    .van-grid-item__text {
      margin-top: 2px;
      margin-left: 6px;
    }
    .van-grid-item__icon {
      font-size: 18px;
    }
  }
}
</style>
