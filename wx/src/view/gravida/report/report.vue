<template>
  <div class="pra-report">
    <div class="bg">
      <div class="report">
        <h1>成绩单</h1>
        <dl>
          <dd v-for="i in 5">
            <h3>孕前得分：</h3>
            <h3>70</h3>
          </dd>
        </dl>
        <img src="./../../../assets/great.png">
        <div class="info">
          <h4>张久久</h4>
          <h4>2017.11.02</h4>
        </div>
      </div>
      <div class="btn">
        <button @click="toDetail">查看可领药膳</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toDetail() {
      this.$router.push('/medicine/detail')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../style/reset.scss';
@import 'report.scss';
</style>