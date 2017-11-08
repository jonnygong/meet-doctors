<template>
  <div class="doc-index">
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item>
        <router-link to="/medicine/list">
          <img src="./../../../assets/banner01.jpg">
        </router-link>
      </mt-swipe-item>
    </mt-swipe>
    <!-- 科室 -->
    <div class="keshi">
      <div class="keshi-title">
        <h2>科室</h2>
        <h3 @click="toList">查看更多 <i class="iconfont icon-youjiantou"></i></h3>
      </div>
      <ul>
        <li v-for="(item, index) in type" :key="index">
          <router-link :to="{ path: '/doctor/list' }">
            <i :class="`iconfont icon-${item.icon}`"></i>
          </router-link>
          <h2>{{ item.name }}</h2>
        </li>
      </ul>
    </div>
    <!-- 医生列表 -->
    <div class="card" @click="toDetail">
      <div class="card-info">
        <img src="./../../../assets/thumb.jpg">
        <div class="info">
          <h1>刘广忠</h1>
          <p>副主任医师</p>
          <p>浙江大学医学院附属第一医院&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;精神外科</p>
        </div>
      </div>
      <!-- 擅长领域 -->
      <div class="advantage">
        <div class="tips">擅长领域 <i class="iconfont icon-shanchanglingyu"></i></div>
        <p>抢救工作、抢救工作、抢救工作、抢救工作、抢救工作、抢救工作</p>
      </div>
      <!-- 出诊时间 -->
      <div class="advantage">
        <div class="tips">出诊时间 <i class="iconfont icon-shanchanglingyu"></i></div>
        <p>周二上午</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: [
        { icon: 'neifenmi', name: '生殖内分泌' },
        { icon: 'huli', name: '护理' },
        { icon: 'erke', name: '儿科' },
        { icon: 'fuchanke', name: '妇产科' }
      ]
    }
  },
  methods: {
    toDetail() {
      this.$router.push('/doctor/detail')
    },
    toList() {
      this.$router.push('/doctor/list')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../style/reset.scss';
@import 'index.scss';
</style>
