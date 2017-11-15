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
      v-model="params.cure" 
      readonly  
      @click.native="open('picker')">
    </mt-field>
    <mt-field label="地址" placeholder="请输入地址" v-model="params.address"></mt-field>
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
      <button @click="openMsgBox">提 交</button>
    </div>
  </div>
</template>

<script>
import { formatDateTime } from './../../../plugins/formatDateTime.js'
import { MessageBox } from 'mint-ui'
export default {
  data() {
    return {
      value: new Date(),
      params: {
        cure: '',
        address: ''
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
      this.params.cure = `${value.getFullYear()}-${value.getMonth()}-${value.getDate()} ${hour}:${minute}`;
    },
    openMsgBox() {
      MessageBox.alert('提交成功！', '提示').then(() => {
        this.$router.push('/personal');
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../style/iconfont/iconfont.css';
@import './../../../style/reset.scss';
@import 'time.scss';
</style>
