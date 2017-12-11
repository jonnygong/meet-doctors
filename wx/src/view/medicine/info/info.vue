<template>
  <div class="goods-info">
    <h1>个人信息填写</h1>
    <div class="part-one">
      <mt-field label="姓名" placeholder="请输入姓名" :attr="{ maxlength: 15 }" v-model="params.name"></mt-field>
      <div class="part-one-wrapper">
        <div class="part-one-wrapper-title">
          电话
        </div>
        <div class="part-one-wrapper-value">
          <input 
            type="tel" 
            placeholder="请输入联系电话" 
            maxlength="11"  
            v-model="params.tel" 
            @blur="validatemobile">
          <i class="mintui mintui-field-error" v-show="hide" @click="clear"></i>
        </div>
      </div>
      <mt-field label="地址" placeholder="请输入地址" v-model="params.address"></mt-field>
    </div>
    <div class="part-two">
      <ul class="upload-img_up">
        <upload-img @input="handleUplaodImage( $event )"></upload-img>
        <li v-for="(img, index) in params.img" :key="index">
          <img :src="img" >
          <i class="iconfont icon-guanbi" @click="DelImg(index)"></i>
        </li>
      </ul>
      <span>提示：请上传医院床头卡，便于审核通过。</span>
    </div>
    <div class="part-three">
      <mt-radio 
        align="right" 
        title=""
        v-model="params.guide_id"
        :options="options">
      </mt-radio>
    </div>
    <div class="btn">
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
        img: [],
        guide_id: '1'
      },
      hide: false,
      options: []
    }
  },
  methods: {
    // 校验手机格式
    validatemobile() {
      let tel = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      if(!tel.test(this.params.tel)) {
        Toast({
          message: this.params.tel.length == 0 ? '请输入联系电话！' : '请输入正确的联系电话！'
        });
      }
    },
    // icon点击事件，清除tel表单
    clear() {
      this.params.tel = '';
      this.hide =false;
    },
    // 删除图片
    DelImg(index) {
      this.params.img.splice(index, 1);
    },
    // 获取图片路径
    handleUplaodImage($event){
      this.params.img.push( $event );
    },
    // 表单提交成功后执行
    handleMsgBox() {
      MessageBox({
        message: '提交成功!', 
        confirmButtonText: '确定'
      }).then(action => {
        this.$router.replace('/personal');
      })
    },
    // 提交表单
    async apiForSubmit() {
      const res = await this.$http.post('patientGooSave', this.params);
      if(res.status === "200") {
        this.handleMsgBox();
      }
    },
    // 获取专家助理
    async apiForGetGuide() {
      const res = await this.$http.post('patientGooGetGuide', {
        hospital_id: localStorage.getItem('hospital_id')
      });
      this.options = [];
      res.param.forEach( (item, index) => {
        this.options.push({
          label: item.name,
          value: item.id.toString()
        });
      });
    }
  },
  mounted() {
    this.apiForGetGuide()
  },
  watch: {
    params: {
      handler(item) {
        if(item.tel.length !== 0) {
          this.hide = true;
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/reset.scss';
@import './info.scss';
</style>
