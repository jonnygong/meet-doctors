<template>
  <div class="guide-list">
    <div class="guide-list-nav">
      <ul>
        <li v-for="(i, index) in orders" :key="index">
          <h4>{{ i.title }}</h4>
          <b>{{ i.num }}</b>
        </li>
      </ul>
    </div>

    <mt-navbar v-model="selected">
      <mt-tab-item v-for="(list, index) in menus" :key="index" :id="list.id">{{ list.title }}</mt-tab-item>
    </mt-navbar>

    <mt-tab-container v-model="selected">
      <mt-tab-container-item 
        v-for="(list, index) in menus" 
        :key="index" 
        :id="list.id" 
        v-infinite-scroll="loadMore" 
        infinite-scroll-disabled="loading" 
        infinite-scroll-distance="50">
        <div class="info" v-for="(item, i) in list.lists" :key="i">
          <img :src="item.img">
          <div class="info-content">
            <h3>{{ item.name }}</h3>
            <a :href="`tel:${item.tel}`">{{ item.tel }}</a>
            <b>{{ item.address }}</b>
          </div>
        </div>
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
      selected: 1,
      orders: [
        { title: '今日完成总量', num: '0' },
        { title: '本周完成量', num: '0' },
        { title: '本月完成量', num: '0' }
      ],
      menus: [
        { id: 1, title: '已通过', lists: [] },
        { id: 2, title: '未通过', lists: [] }
      ],
      // 上拉加载数据
      loading: false,
      allLoaded: false,
      page: 1
    }
  },
  methods: {
    // 获取今日药膳完成量，本周完成量，本月完成量
    async apiForCount() {
      const res = await this.$http.post('userCount', {
        guide_id: this.$route.params.id
      });
      this.orders[0].num = res.param.today;
      this.orders[1].num = res.param.tswk;
      this.orders[2].num = res.param.tsmonth;
    },
    // 获取选择该专家助理的用户信息
    async apiForGetUser() {
      const res = await this.$http.post('guideGetUser', {
        guide_id: this.$route.params.id
      });
      // this.menus.lists = res.param
      res.param.forEach(item => {
        if(item.status == 0) {
          this.menus[0].lists.push(item);
          this.loading = false;
          this.allLoaded = false;
          this.page = 1;
        }else {
          this.menus[1].lists.push(item);
          this.loading = false;
          this.allLoaded = false;
          this.page = 1;
        }
      })
    },
    // 上拉加载数据
    loadMore() {
      if(this.allLoaded) {
        this.loading = false;
      }else {
        this.loading = true;
        setTimeout(async () => {
          this.page++;
          const res = await this.$http.post('guideGetUser', {
            guide_id: this.$route.params.id,
            page: this.page
          });
          if(res.param.length === 0) {
            this.allLoaded = true
          }else {
            res.param.forEach(item => {
              if(item.status === 0) {
                this.menus[0].lists.push(item);
              }else {
                this.menus[1].lists.push(item);
              }
            })
          }
          this.loading = false;
        }, 1500)
      }
    }
  },
  mounted() {
    this.apiForGetUser(),
    this.apiForCount()
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/reset.scss';
@import '~@/style/iconfont/iconfont.css';
@import './list.scss';
</style>
