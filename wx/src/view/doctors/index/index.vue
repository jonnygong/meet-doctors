<template>
  <div class="doc-index">
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(img, index) in banners" :key="index">
        <router-link :to="img.link">
          <img :src="img.cover">
        </router-link>
      </mt-swipe-item>
    </mt-swipe>
    <!-- 科室 -->
    <div class="keshi">
      <div class="keshi-title">
        <h2>科室</h2>
        <!-- <h3 @click="toList">查看更多 <i class="iconfont icon-youjiantou"></i></h3> -->
      </div>
      <ul>
        <li v-for="(item, index) in category" :key="index">
          <router-link :to="{ path: '/doctor/list/' + item.id }">
            <img :src="item.img">
          </router-link>
          <h2>{{ item.name }}</h2>
        </li>
      </ul>
    </div>
    <!-- 医生列表 -->
    <div class="card" v-for="(expert, i) in experts" :key="i" @click="toDetail(expert.id)">
      <div class="card-info">
        <img :src="expert.img">
        <div class="info">
          <h1>{{ expert.name }}</h1>
          <p>{{ expert.pos_name }}</p>
          <p>{{ expert.hospital_name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ expert.category_name }}</p>
        </div>
      </div>
      <!-- 擅长领域 -->
      <div class="advantage">
        <div class="tips">擅长领域 <i class="iconfont icon-shanchanglingyu"></i></div>
        <p>{{ expert.specialty }}</p>
      </div>
      <!-- 出诊时间 -->
      <div class="advantage">
        <div class="tips">出诊时间 <i class="iconfont icon-shanchanglingyu"></i></div>
        <p>{{ expert.visit_time }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDateTime } from '@/plugins/formatDateTime.js';
export default {
  data() {
    return {
      banners: [],
      // 科室分类
      category: [],
      experts: []
    }
  },
  methods: {
    // 广告接口
    async apiForAds() {
      const res = await this.$http.post('patientDocHomeAds', {});
      this.banners = res.param;
    },
    // 科室分类
    async apiForCategory() {
      const res = await this.$http.post('patientDocHomeCategory', {});
      this.category = res.param;
    },
    // 查看更多 ？？？？
    toList() {
      this.$router.push('/doctor/list');
    },
    // 推荐专家
    async apiForExpert() {
      const res = await this.$http.post('patientDocHomeExpert', {
        hospital_id: 1
      });
      this.experts = res.param;
      // this.experts.forEach(i => {
      //   i.visit_time = formatDateTime(i.visit_time);
      // })
    },
    toDetail(id) {
      this.$router.push('/doctor/detail/' + id)
    }
  },
  mounted() {
    this.apiForAds();
    this.apiForCategory();
    this.apiForExpert();
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/reset.scss';
@import 'index.scss';
</style>
