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
            <!-- 富文本 -->
            <el-form-item label="专家详情" prop="content">
                <UE :defaultMsg="formData.content" ref="content"></UE>
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
  import util from '@/utils/js';
  import UE from '@/components/UEditor';
  import Uploader from '@/components/Uploader';
  import BaiduMap from '@/components/BaiduMap';

  const MODEL_NAME = 'Expert'; // http://api.zhongjiao.kfw001.com/webadmin/控制器/方法 -> 接口控制器名称

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
            label: '专家分类',
            option: 'category', // 下拉列表数据别名
            labelProp: 'name', // 下拉列表数组内元素 label 别名
            valueProp: 'id', // 下拉列表数组内元素 value 别名
            placeholder: '请输入内容'
          },
          {
            type: 'text',
            prop: 'name',
            label: '专家名称'
          },
          {
            type: 'upload',
            prop: 'img',
            label: '头像'
          },
          {
            type: 'select',
            prop: 'is_show',
            label: '首页推荐',
            option: 'is_show', // 下拉列表数据别名
            labelProp: 'label', // 下拉列表数组内元素 label 别名
            valueProp: 'value', // 下拉列表数组内元素 value 别名
            placeholder: '请输入内容'
          },
          {
            type: 'number',
            prop: 'tel',
            label: '手机号码'
          },
          {
            type: 'number',
            prop: 'sort',
            label: '排序'
          },
          {
            type: 'select',
            prop: 'hospital_id',
            label: '医院',
            option: 'hospital', // 下拉列表数据别名
            labelProp: 'name', // 下拉列表数组内元素 label 别名
            valueProp: 'id', // 下拉列表数组内元素 value 别名
            placeholder: '请输入内容'
          },
          {
            type: 'text',
            prop: 'pos_name',
            label: '职称'
          },
          {
            type: 'text',
            prop: 'visit_time',
            label: '出诊时间'
          },
          {
            type: 'text',
            prop: 'specialty',
            label: '特长'
          },
          {
            type: 'select',
            prop: 'sex',
            label: '性别',
            option: 'sex', // 下拉列表数据别名
            labelProp: 'label', // 下拉列表数组内元素 label 别名
            valueProp: 'value', // 下拉列表数组内元素 value 别名
            placeholder: '请输入内容'
          },
          {
            type: 'number',
            prop: 'age',
            label: '年龄'
          },
          {
            type: 'number',
            prop: 'scale',
            label: '收入比例'
          },
          {
            type: 'number',
            prop: 'price',
            label: '价格'
          },
          {
            type: 'text',
            prop: 'position',
            label: '职位'
          },
          {
            type: 'textarea',
            prop: 'info',
            label: '专家简介'
          },
        ],
        // 下拉列表数据
        options: {
          category: [],
          hospital: [],
          sex: [
            {value: 1, label: "男"},
            {value: 2, label: "女"},
          ],
          is_show: [
            {value: 0, label: "不显示"},
            {value: 1, label: "显示"},
          ],
        },
        formLoading: false,
        formRules: {
          category_id: [
            {type: 'number', required: true, message: '请输入内容', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入内容', trigger: 'blur'}
          ],
          is_show: [
            {type: 'number', required: true, message: '请输入内容', trigger: 'blur'}
          ],
          tel: [
            {type: 'number', required: true, message: '请输入内容', trigger: 'blur'}
          ],
          sort: [
            {type: 'number', required: true, message: '请输入内容', trigger: 'blur'}
          ],
          hospital_id: [
            {type: 'number', required: true, message: '请输入内容', trigger: 'blur'}
          ],
          pos_name: [
            {required: true, message: '请输入内容', trigger: 'blur'}
          ],
          visit_time: [
            {required: true, message: '请输入内容', trigger: 'blur'}
          ],
          specialty: [
            {required: true, message: '请输入内容', trigger: 'blur'}
          ],
          img: [
            {required: true, message: '请输入内容', trigger: 'blur'}
          ],
        },
        //新增界面数据
        formData: {
          category_id: '',
          name: '',
          sex: '',
          age: '',
          info: '',
          content: '',
          is_show: '',
          tel: '',
          scale: '',
          price: '',
          sort: '',
          hospital_id: '',
          position: '',
          pos_name: '',
          visit_time: '',
          specialty: '',
          img: ''
        }
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
      async getArrayData() {
        const res = await this.$http.post(`${MODEL_NAME}/array`);
        if (res === null) return;
        this.array = res.param;
        this.options.hospital = res.param.hospital;
        this.options.category = res.param.category;
//                // 搜索选项
//                this.filters.options.type = this.formateOptions(res.param.type);
//                this.filters.options.type.unshift({label: '全部分类', value: ''});
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
        this.$refs.formData.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(async () => {
              this.formLoading = true;
              // 处理时间为时间戳
              let _next_open_ = this.formData.visit_time;
              if (typeof this.formData.visit_time === 'number') {
                _next_open_ = this.formData.visit_time / 1000
              } else {
                _next_open_ = new Date(this.formData.visit_time).getTime() / 1000
              }
              let params = Object.assign({}, this.formData);
              params.content = this.getUEContent('content'); // 富文本内容
              params.visit_time = _next_open_; // 后台接收10位时间戳，需要转换
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
      }
    },
    mounted() {
      this.getArrayData();
    },
    components: {
      UE,
      'i-uploader': Uploader,
      'i-baidu-map': BaiduMap
    },
  }
</script>

<style lang="scss" scoped>

</style>
