<template>
  <div>
    <van-nav-bar title="登录" class="titleBox" />
    <van-cell-group>
      <van-field v-model="obj.phone" placeholder="请输入手机号" :error-message="msg.phone">
        <template #left-icon>
          <i class="iconfont icon-phone"></i>
        </template>
      </van-field>
      <van-field
        v-model="obj.code"
        left-icon="music-o"
        placeholder="请输入验证码"
        :error-message="msg.code"
      >
        <template #left-icon>
          <i class="iconfont icon-4101suo" style="display: block; margin-top: 4px;"></i>
        </template>
        <template #button>
          <van-button size="small" round type="primary" class="yzBtn">获取验证码</van-button>
        </template>
      </van-field>
    </van-cell-group>
    <div class="loginBtn">
      <van-button type="primary" :loading="isLoading" size="large" @click="login">登录</van-button>
    </div>
  </div>
</template>

<script>
import { loginApi } from '@/api/login.js'
export default {
  data () {
    return {
      obj: {
        phone: '18611111111',
        code: '246810'
      },
      msg: {
        phone: '',
        code: ''
      },
      isLoading: false
    }
  },
  methods: {
    // 完成登录逻辑
    async login () {
      // async用来修饰异步代码所在的函数,await用来修饰异步代码
      this.isLoading = true
      if (this.checkData()) {
        try {
          const res = await loginApi({
            mobile: this.obj.phone,
            code: this.obj.code
          })
          // window.console.log(res)
          if (res.status === 201) {
            this.$store.commit('setUserInfo', res.data.data)
            if (this.$route.path === '/checkLogin') {
              this.$router.back()
            } else {
              this.$router.push('/index')
            }
          }
        } catch {
          this.$toast.fail('登陆失败!')
        }
      } else {
        window.console.log('验证失败!')
      }
      this.isLoading = false
    },
    // 登录时验证手机号和验证码的规则逻辑
    checkData () {
      var checkArr = []
      if (/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(this.obj.phone)) {
        this.msg.phone = ''
        checkArr.push(true)
      } else {
        this.msg.phone = '您输入的手机号不合法!'
        checkArr.push(false)
      }
      if (this.obj.code.length !== 6) {
        this.msg.code = '您输入的验证码不合法!'
        checkArr.push(false)
      } else {
        this.msg.code = ''
        checkArr.push(true)
      }
      if (!checkArr.includes(false)) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="less">
.van-nav-bar.titleBox {
  background-color: rgb(50, 150, 250);
  .van-nav-bar__title {
    color: white;
  }
}
input.van-field__control {
  padding-left: 15px;
}
.yzBtn.van-button--primary {
  background-color: rgb(237, 237, 237);
  border: 0;
  color: #888;
}
.loginBtn {
  padding: 20px;
  .van-button--primary {
    background-color: rgb(50, 150, 250);
    border-radius: 8px;
  }
}
</style>
