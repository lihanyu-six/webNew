<template>
  <div class="me">
    <!-- 用户信息 -->
    <div class="topBox">
      <div class="usertop">
        <img :src="userInfo.photo" @click="$router.push('/userInfo')" alt />
        <span>{{userInfo.name}}</span>
      </div>
      <div class="infoBar">
        <div>
          <h5>{{userInfo.art_count}}</h5>
          <span>动态</span>
        </div>
        <div>
          <h5>{{userInfo.follow_count}}</h5>
          <span>关注</span>
        </div>
        <div>
          <h5>{{userInfo.fans_count}}</h5>
          <span>粉丝</span>
        </div>
      </div>
      <div class="toadyRead">今日阅读0分钟</div>
    </div>
    <!-- 收藏模块 -->
    <van-grid :column-num="3" class="iconBox">
      <van-grid-item icon="star-o" text="收藏" />
      <van-grid-item icon="underway-o" text="历史" />
      <van-grid-item icon="records" text="作品" />
    </van-grid>
    <!-- 消息模块 -->
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="用户反馈" is-link />
      <van-cell @click="$router.push('/xiaoZhi')" title="小智同学" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { getUserInfo } from '../../api/user.js'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async getUser () {
      var res = await getUserInfo()
      // window.console.log(res)
      this.userInfo = res.data.data
      // window.console.log(this.userInfo)
    }
  },
  created () {
    this.getUser()
  }
}
</script>

<style lang="less">
.me {
  .topBox {
    height: 180px;
    width: 100%;
    background-color: rgb(50, 150, 250);
    .usertop {
      img {
        width: 50px;
        height: 50px;
        margin-top: 30px;
        margin-left: 50px;
        border-radius: 50%;
      }
      span {
        color: #fff;
        display: inline-block;
        vertical-align: top;
        margin-top: 40px;
        margin-left: 30px;
      }
    }
    .infoBar {
      color: #fff;
      display: flex;
      justify-content: space-around;
      h5 {
        margin: 10px;
      }
    }
    .toadyRead {
      position: fixed;
      top: 50px;
      right: 0;
      width: 55px;
      height: 35px;
      opacity: 0.5;
      background-color: black;
      border-radius: 12px 0 0 12px;
      font-size: 12px;
      color: #fff;
      text-align: center;
    }
  }
  .iconBox {
    .van-icon-records::before {
      color: blue;
    }
    .van-icon-underway-o::before {
      color: gold;
    }
    .van-icon-star-o::before {
      color: red;
    }
  }
}
</style>
