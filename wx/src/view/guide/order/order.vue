<template>
  <div class="exp-order">
    <h1>预约单</h1>
    <div class="exp-order-content">
      <div class="exp-order-content-one">
        <mt-field label="编号" v-model="params.num" readonly></mt-field>
        <mt-field label="状态" v-model="params.status" readonly></mt-field>
      </div>
      
      <div class="exp-order-content-two" v-for="(i, index) in 4" :key="index">
        <div class="exp-order-content-two-title" @click="handleSelect(index)">
          <span v-if="index == 0">1. 会员基本信息</span>
          <span v-if="index == 1">2. 患者自述</span>
          <span v-if="index == 2">3. 最近就诊图片</span>
          <span v-if="index == 3">4. 医生信息</span>
          <i class="iconfont icon-xiala"></i>
        </div>
        <div class="exp-order-content-two-options" v-show="show == index">
          <div class="option" v-if="index == 0">
            <span>患者姓名：张久久</span>
            <span>联系电话：18888888888</span>
            <span>身高：165cm</span>
            <span>体重：50kg</span>
            <span>年龄：22</span>
            <span>预约时间：2017年11月15日</span>
          </div>
          <div class="option" v-if="index == 1">
            <p>我是一名32周的孕妇，从前天开始胃里反吐酸水，烧的胃和胸口疼，前天我吃了一包汤圆，和一碗面，晚上吃的是稀饭和酸萝卜，昨天吃的也是稀饭酸萝卜，到了晚上八点左右就一直吐酸水然后开始胃里和胸口被酸水经过烧的痛我现在还一样很难受，又不敢吃药</p>
          </div>
          <div class="option" v-if="index == 2">
            
          </div>
          <div class="option" v-if="index == 3">
            <dl>
              <dd>姓名：刘欢欢</dd>
              <dd>医院：杭州妇保</dd>
              <dd>主治：儿科</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
    <div class="btn">
      <button @click="openMsgBox">填写就诊时间</button>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default {
  data() {
    return {
      params: {
        num: '20175652231',
        status: '未支付'
      },
      show: -1
    }
  },
  methods: {
    handleSelect(index) {
      if(this.show == index) {
        this.show = -1
      }else {
        this.show = index;
      }
    },
    openMsgBox() {
      // MessageBox.alert('你是否与协调人沟通过？', '温馨提示').then(() => {})
      this.$router.push('/guide/time');
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../style/iconfont/iconfont.css';
@import './../../../style/reset.scss';
@import 'order.scss';
</style>
