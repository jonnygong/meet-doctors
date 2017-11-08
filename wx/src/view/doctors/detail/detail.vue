<template>
  <div class="doc-detail">
    <!-- 专家信息 -->
    <div class="card-info">
      <img src="./../../../assets/thumb.jpg">
      <div class="info">
        <h1>刘广忠</h1>
        <p>副主任医师</p>
        <p>浙江大学医学院附属第一医院&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;精神外科</p>
      </div>
    </div>
    <!-- 专家介绍、预约说明 -->
    <div class="introduce">
      <!-- 医生介绍 -->
      <div class="introduce-content">
        <div class="introduce-content-title">
          <i class="iconfont icon-yishengjieshao"></i>
          <h2>医生介绍</h2>
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
        <!-- 预约须知 -->
        <div class="introduce-know">
          <div class="introduce-know-title">
            <i class="iconfont icon-yuyuexuzhi"></i>
            <h2>预约须知</h2>
          </div>
          <p>预约须知、预约须知、预约须知、预约须知、预约须知、预约须知、预约须知、预约须知、预约须知、预约须知、预约须知、预约须知、预约须知、预约须知、</p>
        </div>
      </div>
    </div>
    <!-- 预约button -->
    <div class="btn">
      <router-link to="/doctor/info">预&nbsp;&nbsp;&nbsp;&nbsp;约</router-link>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
@import './../../../style/reset.scss';
@import 'detail.scss';
</style>
