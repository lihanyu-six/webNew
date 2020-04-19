<template>
  <van-popup
    :value="value"
    @input="v=>$emit('input',v)"
    position="bottom"
    :style="{ height: '70%' }"
  >
    <van-cell title="当前评论" />
    <comment :openShow="true" :item="commData" />
    <van-cell title="回复评论" />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <comment :openShow="true" :item="item" v-for="(item, index) in huifuData" :key="index" />
    </van-list>
    <foot :art_id="art_id" :commId="commData.com_id" @newComm="addComm" />
  </van-popup>
</template>

<script>
import comment from './comment'
import foot from './foot'
import bus from '../../../utils/myBus'
import { getCommhuifu } from '@/api/artDetails.js'
export default {
  props: ['value'],
  data () {
    return {
      commData: {},
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      huifuData: [],
      endId: 0,
      art_id: this.$route.query.artid
    }
  },
  components: {
    comment,
    foot
  },
  methods: {
    async onLoad () {
      var res = await getCommhuifu({
        source: this.commData.com_id.toString(),
        offset: this.offset,
        limit: this.limit
      })
      // window.console.log(res)
      this.offset = res.data.data.last_id
      this.endId = res.data.data.end_id
      this.huifuData = [...this.huifuData, ...res.data.data.results]
      this.loading = false
      if (this.endId === this.offset) {
        this.finished = true
      }
    },
    addComm (v) {
      this.huifuData.unshift(v)
      this.commData.reply_count++
    }
  },
  created () {
    bus.$on('getItem', item => {
      this.commData = item
      // window.console.log(this.commData)
      this.finished = false
      this.huifuData = []
    })
  }
}
</script>

<style>
</style>
