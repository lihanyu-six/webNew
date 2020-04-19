<template>
  <div class="artDetail">
    <van-nav-bar fixed title="搜索结果" left-arrow @click-left="backHtml" />
    <h3 class="artCenter">{{artList.title}}</h3>
    <!-- 作者信息 -->
    <van-sticky :offset-top="46">
      <div class="user">
        <div class="userleft">
          <img :src="artList.aut_photo" class="imgBox" />
          <div class="infoBox">
            <span>{{artList.aut_name}}</span>
            <span>{{artList.pubdate | getRelativeTime}}</span>
          </div>
        </div>
        <div class="rightbtn">
          <van-button
            @click="addAut(artList.aut_id)"
            v-if="!artList.is_followed"
            type="info"
            size="small"
          >+ 关注</van-button>
          <van-button @click="delAut(artList.aut_id)" v-else type="info" size="small" plain>已关注</van-button>
        </div>
      </div>
    </van-sticky>
    <!-- 内容 -->
    <van-cell>
      <template #title>
        <div v-html="artList.content"></div>
        <div class="niceArtBtn">
          <van-button round type="default" icon="like-o">点赞</van-button>
          <van-button round type="default" icon="delete">不喜欢</van-button>
        </div>
      </template>
    </van-cell>
    <!-- 评论模块 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <comment
        :item="item"
        :openShow="false"
        @openPOp="v=>show=v"
        v-for="(item, index) in commList"
        :key="index"
      />
    </van-list>
    <!-- 底部模块 -->
    <foot @newComm="getnewComm" :commId="artid" :art_id="null" />
    <!-- 回复评论弹出框 -->
    <popComm v-model="show" />
  </div>
</template>

<script>
import comment from './components/comment'
import foot from './components/foot'
import popComm from './components/popComm'
import { getComm, getArticles, getAollowings, delAollowings } from '@/api/artDetails.js'
export default {
  data () {
    return {
      loading: false,
      finished: false,
      artid: 0,
      artList: [],
      limit: null,
      offset: null,
      commList: [],
      endtId: 0,
      show: false
    }
  },
  components: {
    comment,
    foot,
    popComm
  },
  methods: {
    // 点击返回箭头触发
    backHtml () {
      this.$router.back()
    },
    // 评论数据触底触发
    async onLoad () {
      var res = await getComm({
        source: this.artid,
        offset: this.offset,
        limit: this.limit
      })
      this.commList = [...this.commList, ...res.data.data.results]
      this.offset = res.data.data.last_id
      this.endtId = res.data.data.end_id
      // window.console.log(this.commList)
      this.loading = false
      if (this.offset === this.endtId) {
        this.finished = true
      }
    },
    // 发送评论触发，接收子组件传过来的新的评论数据并渲染
    getnewComm (newData) {
      // window.console.log(newData)
      this.commList.unshift(newData)
    },
    // 获取数据
    async getData () {
      var res = await getArticles(this.artid)
      // window.console.log(res)
      this.artList = res.data.data
    },
    // 关注作者
    addAut (aid) {
      this.artList.is_followed = true
      getAollowings(aid)
    },
    // 取关作者
    delAut (aid) {
      this.artList.is_followed = false
      delAollowings(aid)
    }
  },
  created () {
    this.artid = this.$route.query.artid
    this.getData()
  }
}
</script>

<style lang="less">
.artDetail {
  .van-icon-arrow-left::before {
    color: #fff;
  }
  .van-cell__title {
    width: 100%;
  }
  .artCenter {
    margin-top: 66px;
    text-align: center;
  }
  .user {
    background-color: beige;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .userleft {
      margin-left: 20px;
      display: flex;
      align-items: center;
      .infoBox {
        margin-left: 30px;
        display: flex;
        flex-direction: column;
        font-size: 14px;
        color: #666;
      }
    }
    .rightbtn {
      margin-right: 20px;
    }
  }
  .niceArtBtn {
    display: flex;
    justify-content: space-around;
  }
  .imgBox {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #f60;
  }
  .van-list__finished-text {
    margin-bottom: 46px;
  }
}
</style>
