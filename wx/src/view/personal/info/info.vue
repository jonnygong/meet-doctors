<template>
  <div class="doc-info">
    <h1>预约单</h1>
    <div class="part-one">
      <mt-field label="姓名" placeholder="请输入姓名" :attr="{ maxlength: 5 }" v-model="params.name" readonly></mt-field>
      <mt-radio
        title="性别"
        v-model="params.sex"
        :options="sexs">
      </mt-radio>
      <mt-field label="联系电话" placeholder="请输入联系电话" :attr="{ maxlength: 11 }" type="tel" v-model="params.tel"></mt-field>
    </div>
    <div class="part-two">
      <mt-field 
        label="预约时间" 
        placeholder="请选择预约时间" 
        v-model="yuyue_time" 
        readonly  
        @click.native="open('picker')">
      </mt-field>
      <mt-field v-if="params.visit_time != 0" label="就诊时间" type="text" v-model="visit_time" readonly>
        <span class="red"></span>
      </mt-field>
    </div>
    <div class="part-three">
      <mt-field label="体重" placeholder="请输入体重(kg)" type="number" v-model="params.weight">
        <span>kg</span>
      </mt-field>
      <mt-field label="身高" placeholder="请输入身高(cm)" type="number" v-model="params.height">
        <span>cm</span>
      </mt-field>
      <mt-field label="年龄" placeholder="请输入年龄" type="number" v-model="params.age"></mt-field>
    </div>
    <div class="part-four">
      <textarea placeholder="请输入病情描述" v-model="params.content"></textarea>
    </div>
    <div class="part-five">
      <ul class="upload-img_up">
        <upload-img @input="handleUplaodImage( $event )"></upload-img>
        <li v-for="(item, index) in imgs" :key="index">
          <img :src="item" >
          <i class="iconfont icon-guanbi" @click="DelImg(index)"></i>
        </li>
      </ul>
      <button @click="apiForSubmit">提 交</button>
    </div>

    <!-- 时间选择器 -->
    <mt-datetime-picker
      ref="picker"
      v-model="value"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleChange">
    </mt-datetime-picker>

  </div>
</template>

<script>
import { MessageBox, Toast } from 'mint-ui'
import uploadImg from '@/components/upload/upload'
import { formatDateTime } from '@/plugins/formatDateTime.js'
export default {
  components: {
    uploadImg
  },
  data() {
    return {
      value: new Date(),
      params: {},
      sexs: [
        { label: '男', value: '1' },
        { label: '女', value: '2' }
      ],
      yuyue_time: '',
      imgs: [],
      visit_time: ''
    }
  },
  methods: {
    // 获取预约单信息
    async apiForDetails() {
      const res = await this.$http.post('patientPerDetails', {
        id: this.$route.params.id
      });
      this.params = res.param;
      this.params.sex = this.params.sex.toString();
      this.yuyue_time = formatDateTime(res.param.bespeak_time);
      this.visit_time = formatDateTime(res.param.visit_time);
      // 处理多张图片
      this.imgs = this.params.img.split(',');
    },
    // 时间选择器
    open(picker) {
        this.$refs[picker].open();
    },
    // 处理时间格式
    handleChange(value) {
      // console.log(value.getTime());  转时间戳
      let hour = value.getHours() < 10 ? '0' + value.getHours() : value.getHours();
      let minute = value.getMinutes() < 10 ? '0' + value.getMinutes() : value.getMinutes();
      this.yuyue_time = `${value.getFullYear()}-${value.getMonth()+1}-${value.getDate()} ${hour}:${minute}`;
      this.params.bespeak_time = value.getTime()/1000;
    },
    // 删除图片
    DelImg(index) {
      this.imgs.splice(index, 1);
    },
    handleUplaodImage ( $event ){
      this.imgs.push( $event );
    },
    // 提交表单
    async apiForSubmit() {
      this.params.img = this.imgs;
      const res = await this.$http.post('patientPerSave', this.params);
      this.handleMsgBox();
    },
    // 表单提交成功后执行
    handleMsgBox() {
      MessageBox({
        message: '提交成功!', 
        confirmButtonText: '返回个人中心'
      }).then(action => {
        this.$router.push(`/personal`);
      })
    }
  },
  mounted() {
    this.apiForDetails()
  }
}
</script>

<style lang="scss" scoped>
@import './../../../style/reset.scss';
@import './info.scss';
</style>
