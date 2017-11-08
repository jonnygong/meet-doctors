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
    <!-- 1.填写领取信息  2.引导学习视频 -->
    <div class="btn">
      <button @click="openField">领 取</button>
    </div>

    <!-- 表单弹窗 -->
    <div class="mask" v-show="show" @click="closeField"></div>
    <div class="msgbox" v-show="field">
      <i class="iconfont icon-guanbi" @click="closeField"></i>
      <h1>个人信息填写</h1>
      <div class="msgbox-content">
        <div class="msgbox-input" v-for="(item, index) in 4" :key="index">
          <div class="msgbox-field">
            <span>姓名</span>
            <input type="text" placeholder="请输入姓名">
          </div>
        </div>
      </div>
      <div class="btn">
        <button @click="openAlert">确 认</button>
      </div>
    </div>

  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default {
  data() {
    return {
      show: false,
      field: false
    }
  },
  methods: {
    // 打开表单弹窗
    openField() {
      this.show = true;
      this.field = true;
    },
    // 关闭表单弹窗
    closeField() {
      this.show = false;
      this.field = false;
    },
    // 成功提交个人信息
    openAlert() {
      this.show = false;
      this.field = false;
      MessageBox({
        message: '提交成功!',
        title: '提示',
        confirmButtonText: '返回首页'
      }).then(() => {
        this.$router.push('/doctor')
      })
    },
    // 引导学习视频
    openConfirm() {
      this.show = false;
      MessageBox.confirm('请先学习视频教程，再领取药膳', '提示').then(() => {
        this.$router.push('/gravida/detail');
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../style/reset.scss';
@import 'detail.scss';
</style>
