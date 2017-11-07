<template>
  <div class="pra-question">
    <div class="que">
      <!-- 问题 -->
      <h1>问题一</h1>
      <p>
        为了不影响到下一代的健康成长，孕前的三个月内女性需要避免接受X光线的透射或核素的扫描，因为如果被X线照射会射杀体内的生殖细胞，影响受孕。
      </p>
      <!-- 答案 -->
      <ul>
        <li v-for="(item, index) in 4" :key="index" @click="chooseAns(index)">
          <em>
            <img src="./../../../assets/que-correct.png" v-show="correct == index">
          </em>
          <b>正确</b>
        </li>
      </ul>
      <div class="btn">
        <button>上一题</button>
        <button v-text="submit" @click="handleSubmit"></button>
      </div>
      <img src="./../../../assets/que-bottom.png">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      correct: -1,
      submit: '提交'
    }
  },
  methods: {
    chooseAns(index) {
      this.correct = index;
    },
    handleSubmit() {
      if(this.submit === '提交') {
        this.$router.push('/gravida/report');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../style/reset.scss';
@import 'question.scss';
</style>