<template>
  <div class="doc-info">
    <h1>预约信息填写</h1>
    <div class="part-one">
      <mt-field label="姓名" placeholder="请输入姓名" :attr="{ maxlength: 5 }" v-model="params.name"></mt-field>
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
        <li v-for="(img, index) in params.img" :key="index">
          <img :src="img" >
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
export default {
  components: {
    uploadImg
  },
  data() {
    return {
      value: new Date(),
      params: { 
        name: '',
        sex: '1',
        tel: '',
        bespeak_time: '',
        weight: '',
        height: '',
        age: '',
        content: '',
        img: [],
        hospital_id: 1,
        expert_id: this.$route.params.id
      },
      sexs: [
        { label: '男', value: '1' },
        { label: '女', value: '2' }
      ],
      yuyue_time: ''
    }
  },
  methods: {
    // 时间选择器
    open(picker) {
        this.$refs[picker].open();
    },
    // 处理时间格式
    handleChange(value) {
      // console.log(value.getTime()/1000);  //转时间戳
      let hour = value.getHours() < 10 ? '0' + value.getHours() : value.getHours();
      let minute = value.getMinutes() < 10 ? '0' + value.getMinutes() : value.getMinutes();
      this.yuyue_time = `${value.getFullYear()}-${value.getMonth()+1}-${value.getDate()} ${hour}:${minute}`;
      this.params.bespeak_time = value.getTime()/1000;
    },
    // 删除图片
    DelImg(index) {
      this.params.img.splice(index, 1);
    },
    handleUplaodImage ( $event ){
      this.params.img.push( $event );
    },
    // 提交表单
    async apiForSubmit() {
      const res = await this.$http.post('patientDocElistRegister', this.params);
      this.handleMsgBox(res.param);
    },
    // 表单提交成功后执行
    handleMsgBox(id) {
      MessageBox({
        message: '提交成功!', 
        confirmButtonText: '点击前往联系医导'
      }).then(action => {
        this.$router.push(`/doctor/guide/${id}`);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/reset.scss';
@import './info.scss';
</style>
