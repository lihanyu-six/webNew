<template>
  <div class="more">
    <van-popup v-model="show" class="popBox">
      <van-cell-group v-if="isLjcontent">
        <van-cell icon="failure" title="不感兴趣" @click="noLike" />
        <van-cell icon="info-o" title="反馈垃圾内容" is-link @click="isLjcontent = false" />
        <van-cell icon="delete" title="拉黑作者" @click="delAutor" />
      </van-cell-group>
      <van-cell-group v-else>
        <van-cell @click="isLjcontent = true" icon="arrow-left" />
        <van-cell
          v-for="(item,index) in reportData"
          :key="index"
          :title="item.type"
          @click="reportType(item.id)"
        />
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
import { disLikeArt, reportPost, delAutorApi } from '@/api/index'
export default {
  props: ['artid', 'autid'],
  data () {
    return {
      show: false,
      isLjcontent: true,
      reportData: [
        { id: 0, type: '其他问题' },
        { id: 1, type: '标题夸张' },
        { id: 2, type: '低俗色情' },
        { id: 3, type: '错别字多' },
        { id: 4, type: '旧闻重复' },
        { id: 5, type: '广告软文' },
        { id: 6, type: '内容不实' },
        { id: 7, type: '涉嫌违法犯罪' },
        { id: 8, type: '侵权' }
      ]
    }
  },
  methods: {
    // 点击不感兴趣触发
    async noLike () {
      const token = this.$store.state.userInfo.token
      if (!token) {
        this.$emit('delArtid', this.artid)
        this.show = false
      } else {
        this.$emit('delArtid', this.artid)
        await disLikeArt(this.artid)
        // window.console.log(res)
        this.show = false
      }
    },
    // 点击反馈垃圾内容触发
    async reportType (typeid) {
      // window.console.log(typeid)
      const token = this.$store.state.userInfo.token
      if (token) {
        try {
          await reportPost({
            target: this.artid,
            type: typeid
          })
          this.$toast.success('举报成功!')
        } catch {
          this.$toast.fail('举报失败')
        }
      } else {
        this.$toast('请先登录!')
      }
      this.show = false
      this.isLjcontent = true
    },
    // 拉黑作者
    async delAutor () {
      const token = this.$store.state.userInfo.token
      if (token) {
        try {
        // window.console.log(this.autid)
          await delAutorApi(this.autid)
          this.$toast.success('已拉黑!')
        } catch {
          this.$toast.fail('拉黑失败')
        }
      } else {
        this.$toast.fail('请先登录!')
      }
      this.show = false
      this.isLjcontent = true
    }
  }
}
</script>

<style lang ="less">
.more {
  .popBox {
    width: 80%;
    border-radius: 5px;
  }
}
</style>
