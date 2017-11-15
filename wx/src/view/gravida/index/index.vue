<template>
  <div class="gra-index">
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item>
        <img src="./../../../assets/banner01.jpg">
      </mt-swipe-item>
    </mt-swipe>
    <!-- 孕期 -->
    <mt-navbar v-model="selected">
      <mt-tab-item 
        v-for="(item, index) in categorys" 
        :key="index" 
        :id="item.id" 
        @click.native="apiForList(item.id)">
        {{ item.name }}
      </mt-tab-item>
    </mt-navbar>
    <!-- 视频列表 -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item v-for="(item, index) in categorys" :key="index" :id="item.id">
        <ul>
          <li v-for="(li, lindex) in lists" :key="lindex">
            <router-link :to="{ path: '/gravida/detail/' + li.id}">
              <img :src="li.cover">
              <h4>{{ li.title }}</h4>
              <h4><i class="iconfont icon-shijian"></i> {{ li.long_time }}</h4>
            </router-link>
          </li>
        </ul>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: '',
      categorys: [],
      lists: []
    }
  },
  methods: {
    // 获取视频分类
    async apiForCategory() {
      const res = await this.$http.post('patientGraVideoCategory', {});
      this.categorys = res.param;
      this.selected = res.param[0].id;
      this.apiForList(this.selected);
    },
    // 获取视频列表
    async apiForList(id) {
      const res = await this.$http.post('patientGraVideoList', {
        category_id: id
      });
      this.lists = res.param;
    }
  },
  mounted() {
    this.apiForCategory();
  }
}
</script>

<style lang="scss" scoped>
@import './../../../style/reset.scss';
@import 'index.scss';
</style>
