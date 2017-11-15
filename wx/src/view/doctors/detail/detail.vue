<template>
  <div class="doc-detail">
    <!-- 专家信息 -->
    <div class="card-info">
      <img :src="info.img">
      <div class="info">
        <h1>{{ info.name }}</h1>
        <p>{{ info.pos_name }}</p>
        <p>{{ info.hospital_name }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ info.category_name }}</p>
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
          <p>{{ info.specialty }}</p>
        </div>
        <!-- 出诊时间 -->
        <div class="advantage">
          <div class="tips">意向预约时间 <i class="iconfont icon-shanchanglingyu"></i></div>
          <p>{{ info.visit_time }}</p>
        </div>
        <!-- 预约须知 -->
        <div class="introduce-know">
          <div class="introduce-know-title">
            <i class="iconfont icon-yuyuexuzhi"></i>
            <h2>预约须知</h2>
          </div>
          <p>
            Dear：<br>您所预约遇见名医是行业学术专家，为了您能第一时间遇见名医，我们会根椐名医专家时间来调整本次遇见时间。预祝健康快乐！
          </p>
        </div>
      </div>
    </div>
    <!-- 预约button -->
    <div class="btn">
      <router-link :to="`/doctor/info/${id}`">预 约</router-link>
    </div>
    
  </div>
</template>

<script>
import { formatDateTime } from '@/plugins/formatDateTime.js';
export default {
  data() {
    return {
      info: {},
      id: this.$route.params.id
    }
  },
  methods: {
    // 获取专家信息
    async apiForInfo() {
      const res = await this.$http.post('patientDocElistDetails', {
        expert_id: this.id
      });
      // console.log(res.param);
      this.info = res.param;
      this.info.visit_time = formatDateTime(res.param.visit_time);
    }
  },
  mounted() {
    this.apiForInfo();
  }
}
</script>

<style lang="scss" scoped>
@import './../../../style/reset.scss';
@import 'detail.scss';
</style>
