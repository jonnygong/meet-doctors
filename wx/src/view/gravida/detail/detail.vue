<template>
  <div class="gra-detail">
    <video src=""></video>
    <h2>妇幼保健知识讲座</h2>
    <div class="content"></div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default {
  mounted() {
    this.handleMsgBox();
  },
  methods: {
    handleMsgBox() {
      MessageBox.confirm('前往答题，可免费领取药膳一份').then(action => {
        this.$router.push('/gravida/question');
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../style/reset.scss';
@import 'detail.scss';
</style>
