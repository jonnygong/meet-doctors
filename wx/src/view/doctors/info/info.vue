<template>
  <div class="doc-info">
    <h1>预约信息填写</h1>
    <div class="part-one">
      <mt-field label="患者姓名" placeholder="请输入患者姓名" v-model="params.username"></mt-field>
      <mt-radio
        title="患者性别"
        v-model="params.sex"
        :options="['男', '女']">
      </mt-radio>
      <mt-field label="联系电话" placeholder="请输入联系电话" v-model="params.tel"></mt-field>
      <mt-field label="联系地址" placeholder="请输入联系地址" v-model="params.address"></mt-field>
    </div>
    <div class="part-three">
      <mt-field label="体重" placeholder="请输入体重(kg)" v-model="params.weight"></mt-field>
      <mt-field label="身高" placeholder="请输入身高(cm)" v-model="params.height"></mt-field>
      <mt-field label="年龄" placeholder="请输入年龄" v-model="params.age"></mt-field>
    </div>
    <div class="part-four">
      <textarea placeholder="请输入病情描述" v-model="params.desc"></textarea>
    </div>
    <div class="part-five">
      <!-- <ul class="upload-img_up">
        <upload @input="handleUplaodImage( $event )"></upload>
        <li v-for="(img, index) in params.uploadImgs" :key="index">
          <img :src="img" >
          <i class="iconfont" @click="DelImg(index)">&#xe724;</i>
        </li>
      </ul> -->
      <button @click="handleMsgBox">提&nbsp;&nbsp;&nbsp;&nbsp;交</button>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default {
  components: {
    upload: require('@/components/upload/upload')
  },
  data() {
    return {
      params: { 
        username: '',
        sex: '男',
        tel: '',
        address: '',
        weight: '',
        height: '',
        age: '',
        desc: '',
        uploadImgs: []
      }
    }
  },
  methods: {
    DelImg(index) {
      this.params.uploadImgs.splice(index, 1);
    },
    handleUplaodImage ( $event ){
      this.params.uploadImgs.push( $event );
    },
    // 表单提交成功后执行
    handleMsgBox() {
      MessageBox({
        message: '提交成功!', 
        confirmButtonText: '点击前往联系医导'
      }).then(action => {
        this.$router.push('/doctor/guide');
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../style/reset.scss';
@import './info.scss';
</style>
