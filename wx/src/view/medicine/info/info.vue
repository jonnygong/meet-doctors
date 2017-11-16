<template>
  <div class="doc-info">
    <h1>个人信息填写</h1>
    <div class="part-one">
      <mt-field label="姓名" placeholder="请输入姓名" :attr="{ maxlength: 5 }" v-model="params.name"></mt-field>
      <mt-field label="电话" placeholder="请输入联系电话" :attr="{ maxlength: 11 }" type="tel" v-model="params.tel"></mt-field>
      <mt-field label="地址" placeholder="请输入地址" v-model="params.address"></mt-field>
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
      params: { 
        goods_id: this.$route.params.id,
        name: '',
        tel: '',
        address: '',
        img: []
      }
    }
  },
  methods: {
    // 删除图片
    DelImg(index) {
      this.params.img.splice(index, 1);
    },
    handleUplaodImage ( $event ){
      this.params.img.push( $event );
    },
    // 提交表单
    async apiForSubmit() {
      const res = await this.$http.post('patientGooSave', this.params);
      this.handleMsgBox();
    },
    // 表单提交成功后执行
    handleMsgBox() {
      MessageBox({
        message: '提交成功!', 
        confirmButtonText: '确定'
      }).then(action => {
        this.$router.replace('/personal');
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../style/reset.scss';
@import './info.scss';
</style>
