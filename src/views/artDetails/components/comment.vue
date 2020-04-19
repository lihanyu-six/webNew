<template>
  <van-cell>
    <template #title>
      <div class="commBox">
        <img :src="item.aut_photo" class="imgBox" />
        <div class="rightComm">
          <div class="topComm">
            <h5>{{item.aut_name}}</h5>
            <van-icon name="good-job-o" />
          </div>
          <p>{{item.content}}</p>
          <div class="bottomComm">
            <span>{{item.pubdate | getRelativeTime}}</span>
            <span class="huifu" v-if="!openShow" @click="openPOp">{{item.reply_count}} 回复</span>
          </div>
        </div>
      </div>
    </template>
  </van-cell>
</template>

<script>
import bus from '../../../utils/myBus'
export default {
  props: ['item', 'openShow'],
  methods: {
    openPOp () {
      this.$emit('openPOp', true)
      bus.$emit('getItem', this.item)
    }
  }
}
</script>

<style lang="less">
.commBox {
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  .rightComm {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .topComm {
      display: flex;
      justify-content: space-between;
      align-items: center;
      h5 {
        margin: 5px 15px;
      }
    }
    .bottomComm {
      font-size: 12px;
      color: #666;
      .huifu {
        display: inline-block;
        margin-left: 20px;
        height: 100%;
        padding: 0 10px;
        background-color: #fff999;
        border-radius: 12px;
      }
    }
  }
}
</style>
