<template>
  <div class="per-index">
    <header>
      <img :src="headUrl">
      <div class="nickname">{{ nickName }}</div>
    </header>
    <div class="main">
      <div class="main-menu" v-for="(item, index) in menus" :key="index">
        <div class="main-menu-title" @click="openOptions(index)">
          <i :class="`iconfont icon-${item.icon}`"></i>
          <span>{{ item.menu }}</span>
          <i class="iconfont icon-xiala"></i>
        </div>

        <div class="main-menu-content" v-if="item.menu === '预约信息'" v-show="show == index">
          <div class="item" v-for="(li, i) in item.lists" :key="i">
            <div class="item-left">
              <span>医院：{{ li.hospital_name }} / {{ li.expert_name }}医生</span>
              <span>预约人：{{ li.name }}</span>
              <span>医导联系方式：{{ li.tel }}</span>
            </div>
            <img v-if="li.status == 2" src="./../../../assets/nopay.png">
            <img v-else src="./../../../assets/pay.png">
            <div class="item-right" v-if="li.status == 2">
              <span>{{ li.bespeak_time}}</span>
              <button @click="handleToInfo(li.id)">查看预约信息</button>
              <button @click="applyPay(li.is_audit, li.id)">申请支付审核</button>
            </div>
            <div class="item-right" v-else>
              <span>{{ li.bespeak_time}}</span>
              <button @click="handleToInfo(li.id)">查看预约信息</button>
            </div>
          </div>
        </div>

        <div class="main-menu-content" v-if="item.menu === '就诊记录'" v-show="show == index">
          <div class="item" v-for="(li, i) in item.lists" :key="i">
            <div class="item-left">
              <span>医院：{{ li.hospital_name }} / {{ li.expert_name }}医生</span>
              <span>预约人：{{ li.name }}</span>
              <span>医导联系方式：{{ li.tel }}</span>
              <span>已就诊</span>
            </div>
            <div class="item-right">
              <span>{{ li.bespeak_time }}</span>
            </div>
          </div>
        </div>
        
        <div class="main-menu-content" v-if="item.menu === '药领取膳'" v-show="show == index">
          <div class="item" v-for="(li, i) in item.lists" :key="i">
            <div class="item-left">
              <span>药膳名称：{{ li.goods_name }}</span>
              <span>送货地址：{{ li.address }}</span>
            </div>
            <div class="item-right">
              <span>{{ li.create_time }}</span>
            </div>
          </div>
        </div>
        
        <div class="main-menu-content" v-if="item.menu === '成绩单'" v-show="show == index">
          <ul>
            <li v-for="(li, i) in item.lists" :key="i">
              <span>{{ li.name }}</span><br>
              <span>{{ li.score }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from './../../../plugins/formatDateTime.js'
import { MessageBox, Toast } from 'mint-ui'
export default {
  data() {
    return {
      headUrl: localStorage.getItem('headUrl'),
      nickName: localStorage.getItem('nickName'),
      menus: [
        { icon: 'yuyue', menu: '预约信息', lists: [] },
        { icon: 'jilu', menu: '就诊记录', lists: [] },
        { icon: 'lingqu', menu: '药领取膳', lists: [] },
        { icon: 'chengjidan', menu: '成绩单', lists: [] },
      ],
      show: -1
    }
  },
  methods: {
    // 下拉功能
    openOptions(index) {
      if(this.show == index) {
        this.show = -1
      }else {
        this.show = index;
      }
    },
    // 获取预约信息
    async apiForOrder() {
      const res = await this.$http.post('patientPerOrder', {});
      this.menus[0].lists = res.param;
      this.menus[0].lists.forEach(item => {
        item.bespeak_time = formatDate(item.bespeak_time)
      })
    },
    // 提交申请支付审核
    async apiForAudit(id) {
      const res = await this.$http.post('patientPerAudit', {
        id: id
      })
    },
    // 预约信息-跳转至预约详情
    handleToInfo(id) {
      this.$router.push(`/personal/info/${id}`)
    },
    // 预约信息-提交支付审核
    applyPay(audit, id) {
      if(audit == 0) {
        MessageBox.confirm('是否申请支付审核？', '提示').then(() => {
          Toast({
            message: '等待医导通过审核...'
          });
          this.apiForAudit(id);
          this.$set('', audit, 1);
        });
      }else {
        MessageBox.alert('您已提交申请，请勿重复提交', '提示')
      }
    },
    // 获取就诊记录
    async apiForRecord() {
      const res = await this.$http.post('patientPerRecord', {});
      this.menus[1].lists = res.param;
      this.menus[1].lists.forEach(item => {
        item.bespeak_time = formatDate(item.bespeak_time)
      })
    },
    // 获取药膳记录
    async apiForGoods() {
      const res = await this.$http.post('patientPerGoods', {});
      this.menus[2].lists = res.param;
      this.menus[2].lists.forEach(item => {
        item.create_time = formatDate(item.create_time)
      })
    },
    // 获取成绩单
    async apiForReport() {
      const res = await this.$http.post('patientPerReport', {
        hospital_id: localStorage.getItem('hospital_id')
      });
      this.menus[3].lists = [
        { name: '分类', score: '分数' },
        { name: '孕前', score: res.param.front_score },
        { name: '孕中', score: res.param.in_score },
        { name: '产后', score: res.param.after_score },
        { name: '康复', score: res.param.recovery_score },
        { name: '总成绩', score: res.param.score }
      ];
    }
  },
  mounted() {
    this.apiForOrder();
    this.apiForRecord();
    this.apiForGoods();
    this.apiForReport();
  }
}
</script>

<style lang="scss" scoped>
@import './../../../style/reset.scss';
@import 'index.scss';
</style>
