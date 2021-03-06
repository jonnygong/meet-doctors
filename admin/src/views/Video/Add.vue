<template>
    <div class="form-wrapper">
        <el-form :model="formData" label-width="120px" :rules="formRules" ref="formData">
            <el-form-item v-for="(item, index) in formItems"
                          :label="item.label"
                          :prop="item.prop"
                          :key="index">
                <!-- 普通文本、文本域 -->
                <el-input v-if="item.type === 'text' || item.type === 'textarea'"
                          :type="item.type"
                          v-model="formData[item.prop]"
                          :placeholder="item.placeholder ? item.placeholder : '请输入内容' "
                          auto-complete="off"></el-input>
                <!-- 数字 -->
                <el-input v-else-if="item.type === 'number'"
                          v-model.number="formData[item.prop]"
                          :placeholder="item.placeholder ? item.placeholder : '请输入内容' "
                          auto-complete="off"></el-input>
                <!-- 时间段 -->
                <el-row v-else-if="item.type === 'period'">
                    <el-col :span="11">
                        <el-form-item :prop="item.start_prop">
                            <el-date-picker v-model.date="formData[item.start_prop]"
                                            align="right"
                                            type="datetime"
                                            placeholder="选择开始日期"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-form-item :prop="item.end_prop">
                            <el-date-picker v-model.date="formData[item.end_prop]"
                                            align="right"
                                            type="datetime"
                                            placeholder="选择结束日期"
                                            style="width: 100%;"></el-date-picker>

                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 时间选择 -->
                <el-date-picker v-else-if="item.type === 'time'"
                                v-model.date="formData[item.prop]"
                                align="right"
                                type="datetime"
                                :placeholder="item.placeholder ? item.placeholder : '请选择时间' "
                                style="width: 100%;"></el-date-picker>
                <!-- 单图片上传 -->
                <i-uploader v-else-if="item.type === 'upload'"
                            v-model="formData[item.prop]"></i-uploader>
                <!-- 选择器 -->
                <el-select v-else-if="item.type === 'select'"
                           v-model.number="formData[item.prop]"
                           :placeholder="item.placeholder ? item.placeholder : '请选择内容' ">
                    <el-option :label="option[item.labelProp]"
                               :value="option[item.valueProp]"
                               :key="optionIndex"
                               v-for="(option, optionIndex) in options[item.option]"></el-option>
                </el-select>
                <!-- 经纬度 -->
                <el-row v-else-if="item.type === 'location'">
                    <el-col :span="24">
                        <el-row type="flex" justify="space-between">
                            <el-col :span="11">
                                <el-form-item prop="latitude">
                                    <el-input placeholder="请输入内容" v-model.number="formData.latitude">
                                        <template slot="prepend">经度</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="2">
                                <el-form-item prop="longitude">
                                    <el-input placeholder="请输入内容" v-model.number="formData.longitude">
                                        <template slot="prepend">纬度</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <i-baidu-map :lng="formData.longitude" :lat="formData.latitude"
                                     @success="locationSuccess"></i-baidu-map>
                    </el-col>
                </el-row>
            </el-form-item>
            <!-- 多图片上传 -->
            <el-form-item label="多图片上传" prop="img">
                <i-muti-uploader :value="formData.img" ref="album"></i-muti-uploader>
            </el-form-item>
            <!--<el-form-item label="视频上传" prop="video_url">-->
                <!--<el-input v-model="formData.video_url" auto-complete="off"></el-input>-->
                <!--<el-upload-->
                        <!--:action="`${baseUrl}/Video/video`"-->
                        <!--name="file"-->
                        <!--:with-credentials="true"-->
                        <!--:show-file-list="false"-->
                        <!--:on-success="handleUploadSuccess"-->
                        <!--:on-error="handleUploadError">-->
                    <!--<el-button type="primary" style="margin-top: 10px">上传数据</el-button>-->
                <!--</el-upload>-->
            <!--</el-form-item>-->
            <!-- 富文本 -->
            <el-form-item label="文字" prop="content">
                <UE :defaultMsg="formData.content" ref="content"></UE>
            </el-form-item>
            <!-- ... -->
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="handleCancel">取消</el-button>
            <el-button type="primary" @click.native="formSubmit" :loading="formLoading">提交</el-button>
        </div>
    </div>
</template>

<script>
  import util from '@/utils/js';
  import UE from '@/components/UEditor';
  import Uploader from '@/components/Uploader';
  import BaiduMap from '@/components/BaiduMap';
  import MutiUploader from "@/components/MutiUploader";
  import configs from '@/configs/api';
  const {baseUrl} = configs;

  const MODEL_NAME = 'Video'; // http://api.zhongjiao.kfw001.com/webadmin/控制器/方法 -> 接口控制器名称

  export default {
    data() {
      var validateContent = (rule, value, callback) => {
        value = this.$refs['content'].getUEContent();
        if (value === '') {
          callback(new Error('请输入内容'));
        } else {
          callback();
        }
      };
      return {
        /**
         * type 'text'(普通文本) 'number'(数值) 'textarea'(文本域)
         *      'period'(时间段)  --> start_prop / end_prop 对应 开始 / 结束 时间字段名称
         *      'time'(时间选择) 'upload'(图片上传) 'location'(经纬度)
         *      'select'(选择器)  --> option 字段对应 data 中 options 里字段名
         * prop 对应 formData 字段 和 validate 名称
         * label 对应表单名称
         * placeholder 对应提示信息
         */
        formItems: [
          {
            type: 'select',
            prop: 'category_id',
            label: '所属分类',
            option: 'category', // 下拉列表数据别名
            labelProp: 'name', // 下拉列表数组内元素 label 别名
            valueProp: 'id', // 下拉列表数组内元素 value 别名
            placeholder: '请输入内容'
          },
          {
            type: 'upload',
            prop: 'cover',
            label: '封面'
          },
          {
            type: 'text',
            prop: 'video_url',
            label: '视频链接'
          },
          {
            type: 'number',
            prop: 'sort',
            label: '排序',
            placeholder: '请输入排序' // 不加则显示缺省内容
          },
          {
            type: 'text',
            prop: 'title',
            label: '视频标题'
          },
          {
            type: 'text',
            prop: 'info',
            label: '视频简介'
          },
          {
            type: 'select',
            prop: 'hospital_id',
            label: '归属医院',
            option: 'hospital', // 下拉列表数据别名
            labelProp: 'name', // 下拉列表数组内元素 label 别名
            valueProp: 'id', // 下拉列表数组内元素 value 别名
            placeholder: '请输入内容'
          },
          {
            type: 'select',
            prop: 'is_receive',
            label: '是否可领取药膳',
            option: 'is_receive', // 下拉列表数据别名
            labelProp: 'label', // 下拉列表数组内元素 label 别名
            valueProp: 'value', // 下拉列表数组内元素 value 别名
            placeholder: '请输入内容'
          },
          {
            type: 'text',
            prop: 'long_time',
            label: '视频时长',
          },

        ],
        // 下拉列表数据
        options: {
          category: [],
          hospital: [],
          is_receive: [
            {value: 0, label: '不可以'},
            {value: 1, label: '可以'},
          ],
        },
        formLoading: false,
        formRules: {
          category_id: [
            {type: 'number', required: true, message: '请输入内容', trigger: 'blur'}
          ],
          cover: [
            {required: true, message: '请输入内容'}
          ],
          title: [
            {required: true, message: '请输入内容', trigger: 'blur'}
          ],
          info: [
            {required: true, message: '请输入内容', trigger: 'blur'}
          ],
          video_url: [
            {required: true, message: '请输入内容', trigger: 'blur'}
          ],
          sort: [
            {type: 'number', required: true, message: '请输入内容', trigger: 'blur'}
          ],
          hospital_id: [
            {type: 'number', required: true, message: '请输入内容', trigger: 'blur'}
          ],
          long_time: [
            {required: true, message: '请输入内容', trigger: 'blur'}
          ],
          img: [
            {required: true, message: '请输入内容'}
          ],
          content: [
            {validator: validateContent, trigger: 'blur'}
          ],
          is_receive: [
            {type: 'number', required: true, message: '请输入内容', trigger: 'blur'}
          ],
        },
        //新增界面数据
        formData: {
          category_id: '',
          cover: '',
          title: '',
          info: '',
          video_url: '',
          sort: '',
          img: '',
          content: '',
          hospital_id: '',
          long_time: '',
          is_receive: '',
        },
        baseUrl: baseUrl
      }
    },
    methods: {
      // 百度地图定位成功后的回调
      locationSuccess(data) {
        this.formData.longitude = data.lng;
        this.formData.latitude = data.lat;
      },
      handleCancel() {
        this.$router.back();
      },
      handleUploadSuccess(response, file, fileList) {
        if (response.status === '200') {
          this.$message({
            message: '上传成功',
            type: 'success'
          });
          this.formData.video_url = response.param.path
        } else {
          this.$message({
            message: response.info,
            type: 'warning'
          });
        }
      },
      handleUploadError(err, file, fileList) {
        this.$message({
          message: '上传失败',
          type: 'warning'
        });
      },
      async getArrayData() {
        const res = await this.$http.post(`${MODEL_NAME}/array`);
        if (res === null) return;
        this.options.category = res.param.category;
        this.options.hospital = res.param.hospital;
        this.options.hospital.unshift({name: "全部医院", id: 0});
      },
      formateOptions(source) {
        let _data = [];
        for (let key in source) {
          _data.push({label: source[key], value: key * 1})
        }
        return _data.slice(0);
      },
      //新增
      formSubmit() {

        this.formData.img = this.getImageList("album"); // 多图上传
        this.$refs.formData.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(async () => {
              this.formLoading = true;

              let params = Object.assign({}, this.formData);
              params.content = this.getUEContent('content'); // 富文本内容

              const res = await this.$http.post(`${MODEL_NAME}/add`, params);
              this.formLoading = false;
              if (res === null) return;
              this.$message({
                message: '新建成功',
                type: 'success'
              });
              this.handleCancel();
            });
          }
        });
      },
      // UEditor 获取内容，传入 ref 的值
      getUEContent(ele) {
        return this.$refs[ele].getUEContent();
      },
      // 多图上传获取内容，传入 ref 的值
      getImageList(ele) {
        return this.$refs[ele].getImageList();
      },
    },
    mounted() {
      this.getArrayData();
    },
    components: {
      UE,
      'i-uploader': Uploader,
      'i-baidu-map': BaiduMap,
      "i-muti-uploader": MutiUploader
    },
  }
</script>

<style lang="scss" scoped>

</style>
