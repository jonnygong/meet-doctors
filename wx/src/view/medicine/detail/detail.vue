<template>
  <div class="med-detail">
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item>
        <img src="./../../../assets/med01.jpg">
      </mt-swipe-item>
    </mt-swipe>
    <h2>正清欢 <span>免费<em>￥100</em></span></h2>
    <div class="info"></div>
    <div class="btn">
      <button @click="openPrompt">领 取</button>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default {
  methods: {
    openPrompt() {
      MessageBox({
        title: '个人信息填写',
        message: ' ',
        showInput: true,
        inputValue: '姓名',
        inputPlaceholder: '输入姓名'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../style/reset.scss';
@import 'detail.scss';
</style>
