<template>
  <div class="doc-list">
    <!-- 搜索框 -->
    <header>
      <div class="search">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" placeholder="搜索医院或医生">
      </div>
    </header>
    
    <mt-navbar v-model="selected">
      <mt-tab-item 
        v-for="(item, index) in category" 
        :key="index" 
        :id="index" 
        @click.native="apiForExpert(item.id)">
        {{ item.name }}
      </mt-tab-item>
    </mt-navbar>
    <!-- 医生列表 -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item v-for="(item, index) in category"  :key="index" :id="index">
        <div class="card" v-for="(expert, expIndex) in experts" :key="expIndex" @click="toDetail(expert.id)">
          <div class="card-info">
            <img src="./../../../assets/thumb.jpg">
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
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import { formatDateTime } from '@/plugins/formatDateTime.js'
export default {
  data() {
    return {
      selected: 0,
      category: [],
      experts: []
    }
  },
  methods: {
    // 跳转至详情页
    toDetail(id) {
      this.$router.push(`/doctor/detail/${id}`)
    },
    // 科室分类
    async apiForCategory() {
      const res = await this.$http.post('patientDocElistCategory', {});
      this.category = res.param;
    },
    // 专家列表
    async apiForExpert(id) {
      const res = await this.$http.post('patientDocElistExpert', {
        category_id: id
      });
      this.experts = res.param;
      // this.experts.forEach(i => {
      //   i.visit_time = formatDateTime(i.visit_time);
      // })
    },
  },
  mounted() {
    this.apiForCategory();
    this.apiForExpert(this.$route.params.id);
    // this.selected = this.$route.params.id;
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/reset.scss';
@import './list.scss';
</style>
