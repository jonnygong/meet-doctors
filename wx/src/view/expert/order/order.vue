<template>
  <div class="exp-order">
    <h1>预约单</h1>
    <div class="exp-order-content">
      <div class="exp-order-content-one">
        <mt-field label="编号" v-model="params.reg_sn" readonly></mt-field>
        <mt-field label="状态" readonly v-if="params.status === 1" value="交易关闭"></mt-field>
        <mt-field label="状态" readonly v-if="params.status === 2" value="未付款"></mt-field>
        <mt-field label="状态" readonly v-if="params.status === 3" value="已付款"></mt-field>
        <mt-field label="状态" readonly v-if="params.status === 4" value="已经完成"></mt-field>
      </div>
      
      <div class="exp-order-content-two" v-for="(i, index) in 3" :key="index">
        <div class="exp-order-content-two-title" @click="handleSelect(index)">
          <span v-if="index == 0">1. 会员基本信息</span>
          <span v-if="index == 1">2. 患者自述</span>
          <span v-if="index == 2">3. 最近就诊图片</span>
          <i class="iconfont icon-xiala"></i>
        </div>
        <div class="exp-order-content-two-options" v-show="show == index">
          <div class="option" v-if="index == 0">
            <span>患者姓名：{{ params.name }}</span>
            <span>性别：{{ params.sex === 1 ? '男' : '女' }}</span>
            <span>联系电话：{{ params.tel }}</span>
            <span>身高：{{ params.height }}cm</span>
            <span>体重：{{ params.weight }}kg</span>
            <span>年龄：{{ params.age }}</span>
            <span>预约时间：{{ params.bespeak_time }}</span>
          </div>
          <div class="option" v-if="index == 1">
            <p v-html="params.content"></p>
          </div>
          <div class="option" v-if="index == 2">
            <ul v-for="(item, index)  in params.img" :key="index">
              <li><img :src="item"></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatFullDate } from '@/plugins/formatDateTime.js'
export default {
  data() {
    return {
      params: {},
      show: 0
    }
  },
  methods: {
    handleSelect(index) {
      if(this.show == index) {
        this.show = -1
      }else {
        this.show = index
      }
    },
    // 获取预约单详情
    async apiForDetail() {
      const res = await this.$http.post('expertDetails', {
        id: this.$route.params.id
      });
      this.params = res.param;
      this.params.bespeak_time = formatFullDate(this.params.bespeak_time);
      this.params.img = res.param.img.split(',')
    }
  },
  mounted() {
    this.apiForDetail();
  }
}
</script>

<style lang="scss" scoped>
@import './../../../style/iconfont/iconfont.css';
@import './../../../style/reset.scss';
@import 'order.scss';
</style>
