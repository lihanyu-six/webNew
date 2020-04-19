<template>
  <div class="user">
    <van-nav-bar
      title="个人信息"
      right-text="保存"
      left-arrow
      @click-left="$router.back()"
      @click-right="onClickRight"
    ></van-nav-bar>
    <van-cell-group border>
      <van-cell title="头像" is-link @click="$refs.upload.show = true">
        <template #default>
          <img class="imgBox" :src="userInfo.photo" alt />
        </template>
      </van-cell>
      <van-cell title="昵称" is-link @click="show1=true">
        <template #default>
          <span>{{userInfo.name}}</span>
        </template>
      </van-cell>
      <van-cell title="介绍" is-link>
        <template #default>
          <span>{{userInfo.intro}}</span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group style="margin-top:20px">
      <van-cell title="性别" is-link @click="show2=true">
        <template #default>
          <span>{{userInfo.gender===0? '男':'女'}}</span>
        </template>
      </van-cell>
      <van-cell title="生日" is-link @click="show3=true">
        <template #default>
          <span>{{userInfo.birthday | getTime}}</span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-popup v-model="show1" position="bottom" :style="{ height: '7%' }">
      <van-field required v-model="userInfo.name" />
    </van-popup>
    <van-popup v-model="show2" position="bottom" :style="{ height: '20%' }">
      <van-picker item-height="25" :columns="columns" @change="onChange" />
    </van-popup>
    <van-popup v-model="show3" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="wancheng"
        @cancel="show3=false"
      />
    </van-popup>
    <upload ref="upload" @upPhoto="v=>userInfo.photo=v" />
  </div>
</template>

<script>
import { getUserInfo, getProfile, updateUser } from '../../api/user'
import { getTime } from '../../utils/mytime'
import upload from './components/upload'
export default {
  data () {
    return {
      userInfo: {
        photo: '',
        name: '',
        intro: '',
        gender: 0,
        birthday: ''
      },
      show1: false,
      show2: false,
      show3: false,
      columns: ['男', '女'],
      minDate: new Date(1990, 10, 1),
      maxDate: new Date(2020, 10, 1),
      currentDate: new Date(1999, 10, 1)
    }
  },
  components: {
    upload
  },
  methods: {
    onClickRight () {
      try {
        updateUser(this.userInfo)
        this.$toast.success('修改成功')
      } catch {
        this.$toast.fail('修改失败')
      }
    },
    async getInfo () {
      var res1 = await getUserInfo()
      var res2 = await getProfile()
      this.userInfo.photo = res1.data.data.photo
      this.userInfo.name = res1.data.data.name
      this.userInfo.intro = res1.data.data.intro
      this.userInfo.gender = res2.data.data.gender
      this.userInfo.birthday = res2.data.data.birthday
    },
    onChange (picker, value, index) {
      this.userInfo.gender = index
    },
    wancheng (value) {
      this.userInfo.birthday = getTime(value)
      this.show3 = false
    }
  },
  created () {
    this.getInfo()
  }
}
</script>

<style lang="less">
.user {
  background-color: #fafff0;
  .van-nav-bar__text {
    color: #fff;
  }
  .van-icon-arrow-left::before {
    color: #fff;
  }
  .imgBox {
    height: 20px;
    width: 20px;
    border-radius: 50%;
  }
}
</style>
