<template>
  <div class="doc-list">
    <!-- 搜索框 -->
    <header>
      <img src="~@/assets/logo.png">
      <div class="search">
        <i class="iconfont icon-sousuo" @click="apiForSearch"></i>
        <input type="text" placeholder="搜索医院或医生" v-model="search" @keyup.enter="apiForSearch">
      </div>
    </header>
    
    <!-- nav -->
    <nav>
      <router-link 
        v-for="(item, index) in category" 
        :key="index" 
        :id="item.id"
        :to="`/doctor/list/${item.id}`"
        @click.native="apiForExpert(item.id)"
        replace>
        {{ item.name }}
      </router-link>
    </nav>

    <!-- 医生列表 -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item v-for="(item, index) in category"  :key="index" :id="item.id" @click="apiForExpert(item.id)">
        <router-link v-for="(expert, i) in experts" :key="i" :to="`/doctor/detail/${expert.id}`">
          <div class="card">
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
        </router-link>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import { formatDateTime } from '@/plugins/formatDateTime.js'
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      search: '',
      selected: 0,
      category: [],
      experts: []
    }
  },
  methods: {
    // 搜索框
    async apiForSearch() {
      const res = await this.$http.post('patientElistSearch', {
        search: this.search,
        // category_id: this.selected
      });
      this.experts = res.param;
      if(res.param == []) {
        Toast({
          message: '没有您要找的专家哦!'
        })
      }
    },
    // 科室分类
    async apiForCategory() {
      const res = await this.$http.post('patientDocElistCategory', {});
      this.category = res.param;
      this.selected = Number(this.$route.params.id);
      this.apiForExpert(this.selected);
    },
    // 专家列表
    async apiForExpert(id) {
      const res = await this.$http.post('patientDocElistExpert', {
        category_id: id
      });
      this.experts = res.param;
    },
  },
  mounted() {
    this.apiForCategory();
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/reset.scss';
@import './list.scss';
</style>
