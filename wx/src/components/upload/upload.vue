<template>
  <li>
    <input type="file" @change="toBase" multiple>
    <i class="iconfont icon-add"></i>
  </li>
</template>

<script>
export default {
  methods: {
    toBase(e) {
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        const imgFile = new FileReader();
        imgFile.onload = event => {
          // 转为base64
          this.apiForImgUpload(event.target.result);
        };
        imgFile.readAsDataURL(files[i]);
      }
    },
    // 图片上传接口
    async apiForImgUpload(uploadimg) {
      const imgs = await this.$http.post("apiForImgUpload", {
        uploadimg
      });
      if (imgs == null) {
        return this.handleEmit({ path: "" });
      } else {
        this.handleEmit(imgs.param);
      }
    },
    handleEmit({ path }) {
      this.$emit("input", path);
    }
  }
};
</script>

<style lang="scss" scoped>
@import './../../style/iconfont/iconfont.css';
@import "./upload.scss";
</style>
