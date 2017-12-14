<template>
  <div class="gui-time">
    <h1>确认就诊时间</h1>
    <div class="tip">
      <i class="iconfont icon-yuyuexuzhi"></i>
      请先与协调人沟通，确定就诊时间。
    </div>
    <mt-field 
      label="就诊时间" 
      placeholder="请选择就诊时间" 
      v-model="visit_time" 
      readonly  
      @click.native="open('picker')">
    </mt-field>
    <mt-field label="地址" placeholder="请输入地址" v-model="params.visit_address"></mt-field>
    <!-- 时间选择器 -->
    <mt-datetime-picker
      ref="picker"
      v-model="value"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleChange">
    </mt-datetime-picker>
    <div class="btn">
      <button @click="apiForVisit">提 交</button>
    </div>
  </div>
</template>

<script>
import { formatDateTime } from '@/plugins/formatDateTime.js'
import { MessageBox } from 'mint-ui'
export default {
  data() {
    return {
      value: new Date(),
      visit_time: '',
      params: {
        id: this.$route.params.id,
        visit_time: '',
        visit_address: '',
        openid: this.$route.query.open
      }
    }
  },
  methods: {
    // 时间选择器
    open(picker) {
        this.$refs[picker].open();
    },
    // 处理时间格式
    handleChange(value) {
      // console.log(value.getTime());  转时间戳
      let hour = value.getHours() < 10 ? '0' + value.getHours() : value.getHours();
      let minute = value.getMinutes() < 10 ? '0' + value.getMinutes() : value.getMinutes();
      this.visit_time = `${value.getFullYear()}-${value.getMonth()+1}-${value.getDate()} ${hour}:${minute}`;
      this.params.visit_time = value.getTime() / 1000
    },
    openMsgBox() {
      MessageBox.alert('提交成功！', '提示').then(() => {
        this.$router.go(-2);
      })
    },
    // 提交确认急诊时间
    async apiForVisit() {
      const res = await this.$http.post('guideVisit', this.params);
      if(res.status === '200') {
        this.openMsgBox()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../style/iconfont/iconfont.css';
@import './../../../style/reset.scss';
@import 'time.scss';
</style>
