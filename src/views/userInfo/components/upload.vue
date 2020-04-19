<template>
  <van-popup :close-on-click-overlay="false" v-model="show" style="width:90%" class="upload">
    <div class="center" @click="openFile">
      从相册中选择
      <input @change="imgChange" type="file" style="display:none" ref="myfile" />
    </div>
    <div class="center">拍照</div>
    <div class="center" @click="show=false">取消</div>
  </van-popup>
</template>

<script>
import Vue from 'vue'
import { ImagePreview } from 'vant'
import { uploadPhone } from '../../../api/user'
Vue.use(ImagePreview)
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    openFile () {
      this.$refs.myfile.click()
    },
    imgChange () {
      var file = this.$refs.myfile.files[0]
      // 创建一个读取file文件的方法实例
      var reader = new FileReader()
      // 用方法进行读取转换成base64位的地址编码
      reader.readAsDataURL(file)
      // 一旦转换完成触发，接收转换完成地址并渲染出来
      reader.addEventListener('load', () => {
        var path = reader.result
        ImagePreview({
          images: [path],
          onClose: this.closeView
        })
      })
    },
    closeView () {
      this.$dialog.confirm({
        title: '提示',
        message: '是否设置为头像?'
      })
        .then(async () => {
          var phone = this.$refs.myfile.files[0]
          var res = await uploadPhone(phone)
          this.$emit('upPhoto', res.data.data.photo)
          this.$toast.success('修改头像成功')
          this.show = false
        })
        .catch(() => {
          // on cancel
          this.$toast.file('修改失败')
        })
    }
  }
}
</script>

<style lang="less">
.upload {
  padding: 0 30px;
  box-sizing: border-box;
  .center {
    width: 100%;
    height: 40px;
    text-align: center;
    font-size: 14px;
    line-height: 40px;
    &:nth-child(2) {
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
