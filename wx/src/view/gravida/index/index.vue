<template>
  <div class="gra-index">
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(banner, i) in banners" :key="i">
        <router-link :to="banner.link">
          <img :src="banner.cover">
        </router-link>
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
      <mt-tab-container-item 
        v-for="(item, index) in categorys" 
        :key="index" 
        :id="item.id"
        v-infinite-scroll="loadMore" 
        infinite-scroll-disabled="loading" 
        infinite-scroll-distance="50">
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

    <p v-show="loading" class="page-infinite-loading">
      <mt-spinner type="fading-circle"></mt-spinner>
      加载中...
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banners: [],
      selected: '',
      categorys: [],
      lists: [],
      // 上拉加载数据
      loading: false,
      allLoaded: false,
      page: 1,
      id: ''
    }
  },
  methods: {
    async apiForAds() {
      const res = await this.$http.post('patientGraVideoAds', {});
      this.banners = res.param;
    },
    // 获取视频分类
    async apiForCategory() {
      const res = await this.$http.post('patientGraVideoCategory', {});
      this.categorys = res.param;
      this.selected = res.param[0].id;
      this.apiForList(this.selected);
    },
    // 获取视频列表
    async apiForList(id) {
      this.id = id;
      const res = await this.$http.post('patientGraVideoList', {
        category_id: id,
        page: 1
      });
      this.lists = res.param;
      this.loading = false;
      this.allLoaded = false;
      this.page = 1;
    },
    // 上拉加载数据
    loadMore() {
      console.log(this.allLoaded);
      if(this.allLoaded) {
        this.loading = false;
      }else {
        this.loading = true;
        setTimeout(async () => {
          this.page++;
          const res = await this.$http.post('patientGraVideoList', {
            category_id: this.id,
            page: this.page
          });
          console.log(res.param.length);
          if(res.param.length === 0) {
            this.allLoaded = true;
          }else {
            this.lists = this.lists.concat(res.param);
          }
          this.loading = false;
        }, 1500)
      }
    }
  },
  mounted() {
    this.apiForAds();
    this.apiForCategory();
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/reset.scss';
@import 'index.scss';
</style>
