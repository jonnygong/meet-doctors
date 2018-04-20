<template>
  <div class="doc-list">
    <!-- 搜索框 -->
    <!--<header>-->
      <!--<img src="~@/assets/logo.png">-->
      <!--<div class="search">-->
        <!--<i class="iconfont icon-sousuo" @click="apiForSearch"></i>-->
        <!--<input type="text" placeholder="搜索医院或医生" v-model="search" @keyup.enter="apiForSearch">-->
      <!--</div>-->
    <!--</header>-->

    <!-- nav -->
    <nav style="margin: 0">
      <router-link
        v-for="(item, index) in category"
        :key="index"
        :id="item.id"
        :to="`/article/${item.id}`"
        @click.native="apiForArticle(item.id)"
        replace>
        {{ item.name }}
      </router-link>
    </nav>

    <!-- 医生列表 -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item
        v-for="(item, index) in category"
        :key="index"
        :id="item.id"
        @click="apiForArticle(item.id)"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="50">
        <router-link v-for="(article, i) in articles" :key="i" :to="`/article/detail/${article.id}`">
          <div class="card">
            <div class="card-info">
              <img :src="article.cover">
              <div class="info">
                <h1>{{ article.title }}</h1>
                <br>
                <p>{{ article.time }}</p>
                <!-- <p><b>{{ article.time}}</b>{{ article.time }}</p> -->
              </div>
            </div>
          </div>
        </router-link>
      </mt-tab-container-item>
    </mt-tab-container>
    <p v-show="loading" class="page-infinite-loading">
      <mt-spinner type="fading-circle"></mt-spinner>
      加载中...
    </p>
  </div>
</template>

<script>
import { formatDateTime } from '@/plugins/formatDateTime.js'
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      search: '',
      keywork: '',
      selected: 0,
      category: [],
      articles: [],
      // 上拉加载数据
      loading: false,
      allLoaded: false,
      page: 1
    }
  },
  methods: {
    // 搜索框
    async apiForSearch() {
      const res = await this.$http.post('patientElistSearch', {
        search: this.search
      });
      this.articles = res.param;
      if(res.param == []) {
        Toast({
          message: '没有您要找的专家哦!'
        })
      }
    },
    // 文章分类列表
    async apiForCategory() {
      const res = await this.$http.post('articleCategory', {});
      this.category = res.param.list;
      this.category.unshift({id: 0, img: '', name: '全部', pid: 0})
      this.selected = Number(this.$route.params.id);
      this.apiForArticle(this.selected);
    },
    // 文章列表
    async apiForArticle(id) {
      let params = {
        page: 1,
        cid: id,
        keyword: this.keywork
      }
      const res = await this.$http.post('articleList', params);
      this.articles = res.param.list;
      this.articles.forEach(item => {
        item.time = new Date(item.time * 1000).toLocaleDateString()
      })
      // this.wechatConfig();
      //  = new Date(this.articles.time * 1000)
      this.loading = false;
      this.allLoaded = true;
      this.page = 1;
    },
    async apiForAllArticle() {
      let params = {
        page: 1,
        cid: 0,
        keyword: this.keywork
      }
      const res = await this.$http.post('articleList', params);
      this.articles = res.param.list;
      this.articles.forEach(item => {
        item.time = new Date(item.time * 1000).toLocaleDateString()
      })
      // this.wechatConfig();
      this.loading = false;
      this.allLoaded = true;
      this.page = 1;
    },
    async wechatConfig () {
      const {status, param, info} = await this.$http.post('apiForConfig', {})
      console.log(wx)
      if (status) {
        // eslint-disable-next-line
        wx.config(param)
        // eslint-disable-next-line
        wx.ready(function () {
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
          // 微信分享
          // eslint-disable-next-line
           wx.hideMenuItems({
            menuList: ["menuItem:share:timeline", "menuItem:share:appMessage", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮
          })
        })
      } else {
        this.$toast(info)
      }
    },
    // 上拉加载数据
    loadMore() {
      if(this.allLoaded) {
        this.loading = false;
      }else {
        this.loading = true;
        setTimeout(async () => {
          this.page++;
          const res = await this.$http.post('articleList', {
            c_id: this.$route.params.id,
            page: this.page
          });
          if(res.param.length === 0) {
            this.allLoaded = true
          }else {
            this.articles = this.articles.concat(res.param);
          }
          this.loading = false;
        }, 1500)
      }
    }
  },
  mounted() {
    if(!this.$route.params.id) {
      this.apiForAllArticle();
    } else {
      this.apiForArticle();
    }
    this.apiForCategory();
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/reset.scss';
@import './list.scss';
</style>
