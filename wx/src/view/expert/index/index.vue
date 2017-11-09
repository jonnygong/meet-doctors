<template>
  <div class="exp-index">
    <header>
      <img src="./../../../assets/headurl.png">
      <div class="nickname">夏日驿站</div>
    </header>

    <div class="exp-index-nav">
      <ul>
        <li v-for="(i, index) in orders" :key="index">
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
          <div class="item">
            <div class="item-left">
              <span>预约人：张久久</span>
              <span>联系方式：18888888888</span>
              <span>预约时间：2017年12月11日</span>
              <span>就医地点：杭州妇保医院</span>
            </div>
            <div class="item-right">
              <button v-if="item.id === '1'" @click="toOrder">查 看</button>
              <button v-else disabled>查 看</button>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [
        { title: '今日预约总量', num: '20' },
        { title: '本周完成', num: '20' },
        { title: '本月完成', num: '20' }
      ],
      selected: '1',
      types: [
        { id: '1', name: '专家待看' },
        { id: '2', name: '已完成' }
      ]
    }
  },
  methods: {
    toOrder() {
      this.$router.push('/expert/order')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../style/reset.scss';
@import 'index.scss';
</style>
