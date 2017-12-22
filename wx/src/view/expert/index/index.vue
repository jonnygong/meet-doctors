<template>
  <div class="exp-index">
    <header>
      <img src="~@/assets/card.png" alt="" class="bg-img">
      <div class="card-info">
        <img :src="headUrl" class="headimg">
        <div class="nickname">{{ nickName }}</div>
      </div>
    </header>

    <div class="exp-index-nav">
      <ul>
        <li v-for="(i, orderIndex) in orders" :key="orderIndex">
          <h4>{{ i.title }}</h4>
          <b>{{ i.num }}</b>
        </li>
      </ul>
    </div>

    <div class="exp-index-content">
      <mt-navbar v-model="selected">
        <mt-tab-item v-for="(item, index) in types" :key="index" :id="item.id">
          {{ item.name }}
        </mt-tab-item>
      </mt-navbar>

      <mt-tab-container v-model="selected">
        <mt-tab-container-item v-for="(item, index) in types" :key="index" :id="item.id">
          <div class="item" v-for="(list, i) in item.lists" :key="i">
            <div class="item-left">
              <span>预约人：{{ list.name }}</span>
              <span>联系方式：{{ list.tel }}</span>
              <span>预约时间：{{ list.bespeak_time }}</span>
              <span>就医地点：{{ list.hospital_name }}</span>
            </div>
            <div class="item-right">
              <router-link :to="`/expert/order/${list.id}`" v-if="item.id === 1">查 看</router-link>
              <slot v-else></slot>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import { formatFullDate } from '@/plugins/formatDateTime.js'
export default {
  data() {
    return {
      headUrl: localStorage.getItem('headUrl'),
      nickName: localStorage.getItem('nickName'),
      orders: [
        { title: '今日预约总量', num: '' },
        { title: '本周完成', num: '' },
        { title: '本月完成', num: '' }
      ],
      selected: 1,
      types: [
        { id: 1, name: '专家待看', lists: [] },
        { id: 2, name: '已完成', lists: [] }
      ]
    }
  },
  methods: {
    // 今日预约量，本周完成量，本月完成量
    async apiForCount() {
      const res = await this.$http.post('expertCount', {
        expert_id: this.$route.params.id
      });
      this.orders[0].num = res.param.today;
      this.orders[1].num = res.param.tswk;
      this.orders[2].num = res.param.tsmonth;
    },
    // 预约单列表
    async apiForOrders(api, index) {
      const res = await this.$http.post(api, {
        expert_id: this.$route.params.id
      });
      this.types[index].lists = res.param;
      this.types[index].lists.forEach(item => {
        item.bespeak_time = formatFullDate(item.bespeak_time);
      })
    }
  },
  mounted() {
    // 获取今日预约量，本周完成量，本月完成量
    this.apiForCount();
    // 专家待看
    this.apiForOrders('expertToSee', 0);
    // 已完成
    this.apiForOrders('expertFinish', 1);
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/reset.scss';
@import 'index.scss';
</style>
