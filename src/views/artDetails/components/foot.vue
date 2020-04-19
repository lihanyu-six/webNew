<template>
  <van-search v-model="value" show-action @search="onSearch" class="foot">
    <template #action>
      <span @click="onSearch">发送</span>
    </template>
  </van-search>
</template>

<script>
import { addComm } from '@/api/artDetails.js'
export default {
  props: ['art_id', 'commId'],
  data () {
    return {
      value: '',
      newData: {}
    }
  },
  methods: {
    async onSearch () {
      var res = await addComm({
        target: this.commId,
        content: this.value,
        art_id: this.art_id
      })
      // window.console.log(res)
      this.newData = res.data.data.new_obj
      // window.console.log(this.newData)
      this.$emit('newComm', this.newData)
      this.value = ''
    }
  }
}
</script>

<style lang="less">
.foot {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
