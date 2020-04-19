<template>
  <div class="xiaoZhi">
    <!-- 头部导航栏 -->
    <van-nav-bar fixed title="小智同学" left-arrow @click-left="$router.back()" />
    <!-- 中间内容 -->
    <div class="content" ref="content">
      <div
        :class="{left:item.isUser===false ,right:item.isUser}"
        v-for="(item, index) in chatArr"
        :key="index"
      >
        <img src="../../assets/logo.png" alt />
        <div>{{item.content}}</div>
      </div>
    </div>
    <!-- 发送框 -->
    <van-search v-model="value" left-icon show-action @search="onSend" class="sendBox">
      <template #action>
        <span @click="onSend">发送</span>
      </template>
    </van-search>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  data () {
    return {
      value: '',
      chatArr: [
        { content: '我是机器人', isUser: false },
        { content: '我是用户', isUser: true }
      ],
      socket: null
    }
  },
  methods: {
    onSend () {
      if (this.value.trim() !== '') {
        this.chatArr.push({
          content: this.value,
          isUser: true
        })
        this.socket.emit('message', {
          msg: this.value,
          timestamp: Date.now()
        })
        this.value = ''
      } else {
        this.$toast.fail('请输入内容')
      }
      this.$nextTick(() => {
        this.$refs.content.scrollTop = this.$refs.content.scrollHeight
      })
    }
  },
  created () {
    var token = this.$store.state.userInfo.token
    this.socket = io('http://ttapi.research.itcast.cn?token=' + token)
    this.socket.on('message', data => {
      this.chatArr.push({
        content: data.msg,
        isUser: false
      })
      this.$nextTick(() => {
        this.$refs.content.scrollTop = this.$refs.content.scrollHeight
      })
    })
  }
}
</script>

<style lang="less">
.xiaoZhi {
  .van-icon-arrow-left::before {
    color: #fff;
  }
  .sendBox {
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
  }
  .content {
    overflow: auto;
    position: fixed;
    top: 46px;
    bottom: 54px;
    width: 100%;
    left: 0;
    background-color: #ccc;
    .left {
      width: 100%;
      float: left;
      margin-left: 10px;
      padding: 20px 10px;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        float: left;
      }
      div {
        float: left;
        background-color: blueviolet;
        padding: 5px 10px;
        border-radius: 5px;
        margin-left: 10px;
        max-width: 40%;
      }
    }
    .right {
      width: 100%;
      float: right;
      margin-right: 10px;
      padding: 20px 10px;
      img {
        float: right;
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      div {
        float: right;
        height: 20px;
        background-color: #f60;
        padding: 5px 10px;
        border-radius: 5px;
        margin-right: 10px;
      }
    }
  }
}
</style>
