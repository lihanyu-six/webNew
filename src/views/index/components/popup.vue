<template>
  <div class="popUp">
    <van-popup v-model="show" position="bottom" :style="{ height: '90%' }">
      <van-cell title="我的频道">
        <template #default>
          <van-button
            v-if="isEdit === false"
            round
            plain
            type="danger"
            size="mini"
            @click="editBtn"
          >编辑</van-button>
          <van-button v-if="isEdit === true" round plain type="danger" size="mini" @click="isOk">完成</van-button>
        </template>
      </van-cell>
      <van-grid :border="false" gutter="15px">
        <van-grid-item
          @click="changeIndex(index)"
          v-for="(item, index) in channelList"
          :key="index"
          class="gridBox"
        >
          <template #text>
            <p :class="{ active: index === activeq}">{{item.name}}</p>
            <van-icon name="clear" class="clearIcon" v-if="isEdit" @click.stop="delData(index)" />
          </template>
        </van-grid-item>
      </van-grid>
      <van-cell title="频道推荐"></van-cell>
      <van-grid :border="false" gutter="15px">
        <van-grid-item
          @click="addDataToMe(item)"
          :text="item.name"
          v-for="(item, index) in filterMyData"
          :key="index"
        />
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
import { getChannelsAll, editChannelsApi } from '@/api/index'
import { getLocal, setLocal } from '@/utils/mylocal.js'
export default {
  props: ['channelList', 'activeq'],
  data () {
    return {
      show: false,
      isEdit: false,
      ChannelsAllData: []
    }
  },
  methods: {
    editBtn () {
      this.isEdit = true
    },
    isOk () {
      this.isEdit = false
    },
    async getAll () {
      const res = await getChannelsAll()
      // window.console.log(res)
      this.ChannelsAllData = res.data.data.channels
      // window.console.log(this.ChannelsAllData)
    },
    // 添加频道到我的频道中并保存
    addDataToMe (item) {
      this.$set(item, 'artcleList', [])
      this.$set(item, 'loading', false)
      this.$set(item, 'finished', false)
      this.$set(item, 'isLoading', false)
      this.channelList.push(item)
      const token = getLocal('userInfo')
      if (!token) {
        // 如果未登录就将修改的我的频道保存到本地
        setLocal('myChannles', this.channelList)
      } else {
        // 如果是登录状态就将修改的我的频道保存到服务器
        const channels = this.channelList.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        try {
          editChannelsApi(channels)
        } catch {
          this.$toast('修改失败!')
        }
        // window.console.log(channels)
      }
    },
    delData (index) {
      // window.console.log(index)
      this.channelList.splice(index, 1)
      var token = getLocal('userInfo')
      if (!token) {
        // 如果未登录，就再本地中删除数据
        setLocal('myChannles', this.channelList)
      } else {
        // 如果是登录状态就将修改的我的频道保存到服务器
        const channels = this.channelList.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        try {
          editChannelsApi(channels)
        } catch {
          this.$toast('修改失败!')
        }
        // window.console.log(channels)
      }
    },
    changeIndex (index) {
      this.$emit('update:activeq', index)
    }
  },
  created () {
    this.getAll()
  },
  computed: {
    // 推荐频道应该删除我的频道中有的频道再进行渲染
    // 当第一次用到计算属性的值时，会执行此方法，然后将返回值进行缓存
    // 当计算属性中的依赖项发生改变时，会重新运行此方法，然后将值进行缓存
    filterMyData () {
      const ids = this.channelList.map(item => {
        return item.id
      })
      return this.ChannelsAllData.filter(item => {
        return !ids.includes(item.id)
      })
    }
  }
}
</script>

<style lang = "less">
.popUp {
  .van-grid-item__content--center.van-grid-item__content--center {
    background-color: #f4f5f6;
    width: 70px;
    height: 40px;
    p {
      color: #646566;
      font-size: 12px;
    }
  }
  .gridBox {
    position: relative;
    .clearIcon {
      position: absolute;
      top: -5px;
      right: 25px;
    }
  }
  .active {
    color: red !important;
  }
}
</style>
