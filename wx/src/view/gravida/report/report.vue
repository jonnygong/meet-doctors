<template>
  <div class="pra-report">
    <div class="bg">
      <div class="report">
        <h1>成绩单</h1>
        <dl>
          <dd>
            <h3>孕前得分：</h3>
            <h3>{{ score.front_score }}</h3>
          </dd>
          <dd>
            <h3>孕中得分：</h3>
            <h3>{{ score.in_score }}</h3>
          </dd>
          <dd>
            <h3>产后得分：</h3>
            <h3>{{ score.after_score }}</h3>
          </dd>
          <dd>
            <h3>康复得分：</h3>
            <h3>{{ score.recovery_score }}</h3>
          </dd>
          <dd>
            <h3>总成绩：</h3>
            <h3>{{ score.score }}</h3>
          </dd>
        </dl>
        <img src="./../../../assets/rabbit.gif" class="rabbit">
        <img src="./../../../assets/great.png" class="great">
        <div class="info">
          <h4>{{ score.name }}</h4>
          <h4>{{ score.create_time }}</h4>
        </div>
      </div>
      <div class="btn">
        <button @click="toDetail">查看可领药膳</button>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDated } from '@/plugins/formatDateTime.js'
export default {
  data() {
    return {
      score: {
        name: '',
        front_score: '',
        in_score: '',
        after_score: '',
        recovery_score: '',
        score: '',
        create_time: ''
      }
    }
  },
  methods: {
    toDetail() {
      this.$router.push(`/medicine/detail/${this.score.goods_id}`)
    }
  },
  mounted() {
    this.score = JSON.parse(localStorage.getItem('score'));
    this.score.create_time = formatDated(this.score.create_time)
  }
}
</script>

<style lang="scss" scoped>
@import './../../../style/reset.scss';
@import 'report.scss';
</style>