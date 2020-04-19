<template>
  <div class="search">
    <van-search
      v-model="value"
      show-action
      background="rgb(50, 150, 250)"
      @search="onSearch"
      @cancel="onCancel"
      @input="think"
    />
    <van-cell-group v-if="thinkList.length !==0 && value !=='' ">
      <van-cell title="联想区域" />
      <van-cell
        icon="search"
        v-for="(item, index) in thinkList"
        :key="index"
        @click="onSearch(item.oldItem)"
      >
        <template #title>
          <div v-html="item.newItem"></div>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group v-if="historyData.length !== 0">
      <van-cell title="历史纪录">
        <template #default>
          <van-icon name="delete" @click="delAll" />
        </template>
      </van-cell>
      <van-cell
        icon="browsing-history-o"
        :title="item"
        v-for="(item, index) in historyData"
        :key="index"
        @click="onSearch(item)"
      >
        <template #default>
          <van-icon name="cross" @click.stop="delData(index)" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestApi, getHistioryApi } from '@/api/search'
import { setLocal, getLocal, removeLocal } from '@/utils/mylocal.js'
export default {
  data () {
    return {
      value: '',
      thinkList: [],
      historyData: getLocal('historyData') || [],
      timer: null
    }
  },
  methods: {
    // 回车或者点击触发,手机上按完成触发
    onSearch (val) {
      // window.console.log(val)
      this.historyData.unshift(val)
      this.historyData = [...new Set(this.historyData)]
      setLocal('historyData', this.historyData)
      this.$router.push('/searchResult?q=' + val)
    },
    // 取消触发
    onCancel () {
      this.value = ''
    },
    // 当input框中值发生改变触发
    think () {
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        if (this.value.trim() !== '') {
          const res = await getSuggestApi(this.value)
          // window.console.log(res)
          this.thinkList = res.data.data.options
          this.thinkList = this.thinkList.map(item => {
          // replace是包含的字符串中第一个参数给第二个参数替换
            return {
              newItem: item.replace(this.value, `<span style="color:red ">${this.value}</span>`),
              oldItem: item
            }
          })
        } else {
          this.thinkList = []
        }
      }, 500)
    },
    // 进入页面触发获取历史纪录
    async getHistiory () {
      const token = this.$store.state.userInfo.token
      if (token) {
        try {
          const res = await getHistioryApi()
          // window.console.log(res)
          this.historyData = res.data.data.keywords
        } catch (error) {
          window.console.log(error)
        }
      }
    },
    // 删除历史纪录触发
    delData (index) {
      this.historyData.splice(index, 1)
      setLocal('historyData', this.historyData)
    },
    // 删除所有历史纪录
    delAll () {
      this.$dialog.confirm({
        title: '警告',
        message: '你确定要删除所有内容'
      }).then(() => {
        removeLocal('historyData')
        this.historyData = []
      }).catch(() => {
        return false
      })
    }
  }
}
</script>

<style lang ="less">
.search {
  .van-search__action {
    color: #fff;
  }
  .van-search__action:active {
    background-color: teal;
  }
}
</style>
