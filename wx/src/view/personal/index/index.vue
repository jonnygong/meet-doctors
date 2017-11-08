<template>
  <div class="per-index">
    <header>
      <img src="./../../../assets/headurl.png">
      <div class="nickname">夏日驿站</div>
    </header>
    <div class="main">
      <div class="main-menu" v-for="(item, index) in 4" :key="index">
        <div class="main-menu-title" @click="openOptions(index)">
          <i class="iconfont icon-yuyue"></i>
          <span>预约信息</span>
          <i class="iconfont icon-xiala"></i>
        </div>
        <div class="main-menu-content" v-show="show == index">
          <div class="item" v-for="(ie, i) in 2" :key="i">
            <div class="item-left">
              <span>医院：杭州妇保医院 / ***医生</span>
              <span>预约人：张久久</span>
              <span>联系方式：18888888888</span>
            </div>
            <img src="./../../../assets/nopay.png">
            <div class="item-right">
              <span>10月27日</span>
              <button>查看预约信息</button>
              <button @click="applyPay">申请支付审核</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default {
  data() {
    return {
      show: -1
    }
  },
  methods: {
    openOptions(index) {
      if(this.show == index) {
        this.show = -1
      }else {
        this.show = index;
      }
    },
    // 提交支付审核
    applyPay() {
      MessageBox.confirm('是否申请支付审核？', '提示').then(() => {

      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../style/reset.scss';
@import 'index.scss';
</style>
