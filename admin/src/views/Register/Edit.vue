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
            <!--&lt;!&ndash; 富文本 &ndash;&gt;-->
            <!--<el-form-item label="富文本" prop="name">-->
            <!--<UE :defaultMsg="formData.detail" ref="ue"></UE>-->
            <!--</el-form-item>-->
            <!-- 多图片上传 -->
            <el-form-item label="就诊图片" prop="img">
                <i-muti-uploader :value="formData.img" ref="album"></i-muti-uploader>
            </el-form-item>
            <!-- 自定义表单项目 -->
            <!-- ... -->
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="handleCancel">取消</el-button>
            <el-button type="primary" @click.native="formSubmit" :loading="formLoading">提交</el-button>
        </div>
    </div>
</template>

<script>
  import util from "@/utils/js";
  import UE from "@/components/UEditor";
  import Uploader from "@/components/Uploader";
  import BaiduMap from "@/components/BaiduMap";
  import MutiUploader from "@/components/MutiUploader";

  const MODEL_NAME = "Register"; // http://api.zhongjiao.kfw001.com/webadmin/控制器/方法 -> 接口控制器名称

  export default {
    data() {
      // 富文本校验
      var validateContent = (rule, value, callback) => {
        value = this.$refs["ue"].getUEContent();
        if (value === "") {
          callback(new Error("请输入内容"));
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
            type: "text",
            prop: "name",
            label: "患者姓名"
          },
          {
            type: "text",
            prop: "tel",
            label: "患者手机号",
          },
          {
            type: "select",
            prop: "sex",
            label: "患者性别",
            option: "sex", // 下拉列表数据别名
            labelProp: "label", // 下拉列表数组内元素 label 别名
            valueProp: "value", // 下拉列表数组内元素 value 别名
            placeholder: "请输入内容"
          },
          {
            type: "number",
            prop: "weight",
            label: "体重(kg)",
          },
          {
            type: "number",
            prop: "height",
            label: "身高(cm)",
          },
          {
            type: "number",
            prop: "age",
            label: "年龄",
          },

          {
            type: "textarea",
            prop: "content",
            label: "患者自述",
            placeholder: "请输入内容"
          },
          {
            type: "time",
            prop: "visit_time",
            label: "就诊时间",
          },
          {
            type: "textarea",
            prop: "visit_address",
            label: "就诊地址",
            placeholder: "请输入内容"
          },
          {
            type: "time",
            prop: "bespeak_time",
            label: "预约时间",
            placeholder: "选择日期"
          },
          {
            type: "select",
            prop: "is_audit",
            label: "用户申请审核",
            option: "is_audit", // 下拉列表数据别名
            labelProp: "label", // 下拉列表数组内元素 label 别名
            valueProp: "value", // 下拉列表数组内元素 value 别名
            placeholder: "请输入内容"
          },
          {
            type: "upload",
            prop: "visit_report",
            label: "就诊报告",
          },
        ],
        // 下拉列表数据
        options: {
          sex: [
            {value: 1, label: '男'},
            {value: 2, label: '女'},
          ],
          is_audit: [
            {value: 0, label: '没申请'},
            {value: 1, label: '申请'},
          ],
          expert: [],
          status: [],
        },
        sexList: {},
        is_audit: {},
        formLoading: false,
        formRules: {
          name: [
            {required: true, message: "请输入内容", trigger: "blur"}
          ],
          tel: [
            {required: true, message: "请输入内容", trigger: "blur"}
          ],
          sex: [
            {type: "number", required: true, message: "请输入内容", trigger: "blur"}
          ],
          weight: [
            {type: "number", required: true, message: "请输入内容", trigger: "blur"}
          ],
          height: [
            {type: "number", required: true, message: "请输入内容", trigger: "blur"}
          ],
          age: [
            {type: "number", required: true, message: "请输入内容", trigger: "blur"}
          ],
          content: [
            {required: true, message: "请输入内容", trigger: "blur"}
          ],
          img: [
            {required: true, message: "请输入内容", trigger: "blur"}
          ],
          bespeak_time: [
            {type: "date", required: true, message: "请输入内容", trigger: "blur"}
          ],
        },
        //新增界面数据
        formData: {
          name: "",
          tel: "",
          sex: "",
          weight: "",
          height: "",
          age: "",
          content: "",
          img: "",
          visit_time: "",
          visit_address: "",
          bespeak_time: "",
          is_audit: "",

        }
      };
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
      //显示编辑界面
      async handleEdit(index, row) {
        let params = {
          id: this.$route.params.id
        };
        const res = await this.$http.post(`${MODEL_NAME}/info`, params);
        if (res === null) return;
        this.formData = Object.assign({}, res.param);
        this.formData.visit_time = new Date(this.formData.visit_time * 1000);
        this.formData.bespeak_time = new Date(this.formData.bespeak_time * 1000);
        this.formData.weight = Number(this.formData.weight);
        this.formData.height = Number(this.formData.height);
      },
      async getArrayData() {
        const res = await this.$http.post(`${MODEL_NAME}/array`);
        if (res === null) return;
        this.options.expert = res.param.expert;
        this.options.status = res.param.status;

      },
      formateOptions(source) {
        let _data = [];
        for (let key in source) {
          _data.push({label: source[key], value: key * 1});
        }
        return _data.slice(0);
      },
      //编辑
      formSubmit() {
        this.$refs.formData.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {}).then(async () => {
              this.formLoading = true;
              // 处理时间为时间戳
              let _bespeak_time_ = this.formData.bespeak_time;
              if (typeof this.formData.bespeak_time === 'number') {
                _bespeak_time_ = this.formData.bespeak_time / 1000
              } else {
                _bespeak_time_ = new Date(this.formData.bespeak_time).getTime() / 1000
              }
              let _visit_time_ = this.formData.visit_time;
              if (typeof this.formData.visit_time === 'number') {
                _visit_time_ = this.formData.visit_time / 1000
              } else {
                _visit_time_ = new Date(this.formData.visit_time).getTime() / 1000
              }
              let params = Object.assign({}, this.formData);
              params.bespeak_time = _bespeak_time_; // 后台接收10位时间戳，需要转换
              params.visit_time = _visit_time_; // 后台接收10位时间戳，需要转换
              params.img = this.getImageList("album"); // 多图上传
              const res = await this.$http.post(`${MODEL_NAME}/update`, params);
              this.formLoading = false;
              if (res === null) return;
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.handleCancel();
            });
          }
        });
      },
      selsChange(sels) {
        this.sels = sels;
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
      this.handleEdit();
    },
    components: {
      UE,
      "i-uploader": Uploader,
      "i-baidu-map": BaiduMap,
      "i-muti-uploader": MutiUploader
    }
  };
</script>

<style lang="scss" scoped>

</style>
