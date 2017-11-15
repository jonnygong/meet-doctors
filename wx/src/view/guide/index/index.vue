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
          <div class="item" v-if="item.id === 1" v-for="(list, i) in 2" :key="i">
            <div class="item-left">
              <span>就医地点/专家：杭州妇保医院/**医生</span>
              <span>预约人：张久久 <a :href="`tel:18888888888`">电 话</a></span>
              <span>预约时间：2017年12月11日</span>
            </div>
            <div class="item-right">
              <button @click="toOrder">查 看</button>
              <button @click="apply(item.id)">支 付</button>
              <button @click="closeOrder">关 闭</button>
            </div>
          </div>
          <div class="item" v-if="item.id === 2" v-for="(list, i) in 2" :key="i">
            <div class="item-left">
              <span>就医地点/专家：杭州妇保医院/**医生</span>
              <span>预约人：张久久</span>
              <span>联系电话：18888888888</span>
              <span>预约时间：2017年12月11日</span>
            </div>
            <div class="item-right">
              <button @click="toOrder">查 看</button>
              <button @click="apply(item.id)">支付审核</button>
            </div>
          </div>
          <div class="item" v-if="item.id === 3" v-for="(list, i) in 2" :key="i">
            <div class="item-left">
              <span>就医地点/专家：杭州妇保医院/**医生</span>
              <span>预约人：张久久</span>
              <span>联系电话：18888888888</span>
              <span>预约时间：2017年12月11日</span>
            </div>
            <div class="item-right">
              <button @click="toOrder">查 看</button>
              <button @click="apply(item.id)">就医确认</button>
            </div>
          </div>
          <div class="item" v-if="item.id === 4" v-for="(list, i) in 2" :key="i">
            <div class="item-left">
              <span>就医地点/专家：杭州妇保医院/**医生</span>
              <span>预约人：张久久</span>
              <span>联系电话：18888888888</span>
              <span>预约时间：2017年12月11日</span>
            </div>
            <div class="item-right">
              <button @click="toOrder">查 看</button>
            </div>
          </div>
          <div class="item" v-if="item.id === 5" v-for="(list, i) in 2" :key="i">
            <div class="item-left">
              <span>就医地点/专家：杭州妇保医院/**医生</span>
              <span>预约人：张久久</span>
              <span>联系电话：18888888888</span>
              <span>预约时间：2017年12月11日</span>
              <span>预约关闭</span>
            </div>
            <div class="item-right">
              <button @click="toOrder">查 看</button>
              <button>恢复</button>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default {
  data() {
    return {
      orders: [
        { title: '今日预约总量', num: '20' },
        { title: '本周完成', num: '20' },
        { title: '本月完成', num: '20' }
      ],
      selected: 1,
      types: [
        { id: 1, name: '未支付' },
        { id: 2, name: '支付审核' },
        { id: 3, name: '专家待看' },
        { id: 4, name: '已完成' },
        { id: 5, name: '已关闭' },
      ],
      // 提示信息
      msg: ''
    }
  },
  methods: {
    toOrder() {
      this.$router.push('/guide/order')
    },
    // 确认客户支付 || 协助客户做支付确认
    apply(id) {
      if(id === 1) {
        this.msg = '是否协助客户做支付确认？';
      }else if(id === 2) {
        this.msg = '是否确认客户已经支付？';
      }
      MessageBox.confirm(this.msg, '提示').then(() => {});
    },
    closeOrder() {
      MessageBox.confirm('是否确认关闭预约单', '提示').then(() => {
        // 删除该数据
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../style/reset.scss';
@import 'index.scss';
</style>
