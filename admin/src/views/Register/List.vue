<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <!--<el-form-item>-->
                <!--<el-input v-model="filters.value" placeholder="关键词"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item>
                    <el-select v-model="filters.status" placeholder="请选择订单状态">
                        <el-option
                                v-for="(item,index) in filters.options.status"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="filters.expert_id" placeholder="请选择专家">
                        <el-option
                                v-for="(item,index) in filters.options.expert_id"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="filters.guide_id" placeholder="请选择导诊">
                        <el-option
                                v-for="(item,index) in filters.options.guide_id"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
                <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-date-picker
                            v-model="filters.bespeak_time"
                            type="date"
                            placeholder="选择预约日期">
                    </el-date-picker>
                    <!--<el-button type="primary"-->
                               <!--@click="this.filters.bespeak_time = ''">清空-->
                    <!--</el-button>-->
                </el-form-item>

                <el-form-item>
                    <el-date-picker
                            v-model="filters.visit_time"
                            type="date"
                            placeholder="选择就诊日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               icon="search"
                               @click="getListData">搜索
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               @click="getDataList">刷新
                    </el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="list"
                  highlight-current-row
                  v-loading="listLoading"
                  @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>


            <el-table-column prop="reg_sn" label="预约单唯一ID" width="160">
            </el-table-column>
            <el-table-column prop="name" label="患者姓名" width="120">
            </el-table-column>
            <el-table-column prop="sex" label="性别" min-width="80">
                <template scope="scope">
                    {{ sexList[scope.row.sex] }}
                </template>
            </el-table-column>
            <!-- 普通列表显示 -->
            <el-table-column
                    v-for="(item,index) in tableColumn"
                    :key="index"
                    :prop="item.prop"
                    :label="item.label"
                    :min-width="item.width"
                    :sortable="item.sortable">
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100">
                <template scope="scope">
                    <el-tag :type="scope.row.status === 1 ? 'success' : scope.row.status === -1 ? 'gray' : scope.row.status === 2 ? 'warning' : scope.row.status === 3 ? 'success' : 'primary' ">
                        {{ scope.row.status === 1 ? '交易关闭' : scope.row.status === -1 ? '已删除' : scope.row.status === 2 ? '未付款' : scope.row.status === 3 ? '已付款' : '已完成'
                        }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="is_audit" label="用户申请审核" min-width="120">
                <template scope="scope">
                    {{ is_audit[scope.row.is_audit] }}
                </template>
            </el-table-column>
            <el-table-column prop="bespeak_time" label="预约时间" width="180" :formatter="formateTime">
            </el-table-column>
            <!--<el-table-column prop="bespeak_address" label="预约地址" width="120">-->
            <!--</el-table-column>-->
            <el-table-column prop="visit_time" label="就诊时间" width="180" :formatter="formateTime">
            </el-table-column>
            <el-table-column prop="visit_address" label="就诊地址" width="120">
            </el-table-column>
            <el-table-column prop="expert_id" label="专家" min-width="120">
                <template scope="scope">
                    {{ options.expert[scope.row.expert_id] }}
                </template>
            </el-table-column>
            <el-table-column prop="hospital_id" label="医院" min-width="120">
                <template scope="scope">
                    {{ options.hospital[scope.row.hospital_id] }}
                </template>
            </el-table-column>
            <el-table-column prop="guide_id" label="导诊" min-width="120">
                <template scope="scope">
                    {{ options.guide[scope.row.guide_id] }}
                </template>
            </el-table-column>
            <!-- 图片显示 -->
            <el-table-column prop="visit_report" label="就诊报告" width="130">
                <template scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <div class="ad-img">
                            <img :src="scope.row.visit_report" :alt="scope.row.name" width="200" height="auto"
                                 v-if="scope.row.visit_report !== ''">
                            <p v-else>暂无图片</p>
                        </div>
                        <div slot="reference" class="name-wrapper">
                            <el-tag>查看图片</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <!--<el-table-column prop="update_time" label="更新时间" width="180" :formatter="formateTime">-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="create_time" label="创建时间" width="180" :formatter="formateTime">-->
            <!--</el-table-column>-->

            <el-table-column label="操作" width="150" fixed="right">
                <template scope="scope">
                    <!--<el-button size="small"-->
                    <!--@click="statusSubmit(scope.$index, scope.row)"-->
                    <!--:disabled="scope.row.status === -1">-->
                    <!--{{ scope.row.status === 1 ? '停用' : scope.row.status === 0 ? '启用' : '已删除' }}-->
                    <!--</el-button>-->
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger"
                       @click="batchAction('remove')"
                       :disabled="this.sels.length===0">批量删除
            </el-button>
            <el-button type="danger"
                       @click="batchAction('close')"
                       :disabled="this.sels.length===0">交易关闭
            </el-button>
            <el-button type="warning"
                       @click="batchAction('notPay')"
                       :disabled="this.sels.length===0">未付款
            </el-button>
            <el-button type="success"
                       @click="batchAction('pay')"
                       :disabled="this.sels.length===0">已付款
            </el-button>
            <el-button type="primary"
                       @click="batchAction('finish')"
                       :disabled="this.sels.length===0">已经完成
            </el-button>
            <el-pagination layout="prev, pager, next"
                           @current-change="handleCurrentChange"
                           :page-size="pagesize"
                           :total="total" style="float:right;"></el-pagination>
        </el-col>
    </section>
</template>

<script>
  import util from '@/utils/js'

  const MODEL_NAME = 'Register'; // API模块名

  export default {
    data() {
      return {
        // 列表表头数据
        tableColumn: [
          {
            prop: 'tel',
            label: '患者手机号',
            width: 130,
            sortable: false
          },
          {
            prop: 'weight',
            label: '体重',
            width: 120,
            sortable: false
          },
          {
            prop: 'height',
            label: '身高',
            width: 120,
            sortable: false
          },
          {
            prop: 'age',
            label: '年龄',
            width: 120,
            sortable: false
          },
          {
            prop: 'content',
            label: '患者自述',
            width: 120,
            sortable: false
          },

        ],
        // 搜索条件
        filters: {
          status: '',
          expert_id: '',
          guide_id: '',
          bespeak_time: '',
          visit_time: '',
          options: {
            status: [],
            expert_id: [],
            guide_id: [],
            bespeak_time: [],
            visit_time: [],
          },
        },
        options: {
          expert: [],
          status: [],
          guide: [],
          hospital: [],
          sex: [
            {value: 1, label: '男'},
            {value: 2, label: '女'},
          ],
          is_audit: [
            {value: 0, label: '未申请'},
            {value: 1, label: '申请'},
          ],
        },
        list: [],
        sexList: {},
        is_audit: {},

        total: 0,
        page: 1,
        pagesize: 10,
        listLoading: false,
        sels: [],//列表选中列
      }
    },
    methods: {
      // 格式化更新时间
      formateTime(row, column) {
        return ` ${util.formatDate.format(new Date(row[column.property] * 1000), 'yyyy-MM-dd hh:mm:ss')}`
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getListData();
      },
      //获列表
      async getListData() {
        this.listLoading = true;
        let params = {
          page: this.page,
          status: this.filters.status, // 可选参数查询
          expert_id: this.filters.expert_id, // 可选参数查询
          guide_id: this.filters.guide_id, // 可选参数查询
          bespeak_time: new Date(this.filters.bespeak_time) / 1000, // 可选参数查询
          visit_time: new Date(this.filters.visit_time) / 1000, // 可选参数查询
        };
        const res = await this.$http.post(`${MODEL_NAME}/list`, params);
        this.listLoading = false;
        if (res === null) return;
        this.total = res.param.pages.total;
        this.pagesize = res.param.pages.pagesize;
        this.list = res.param.list;
      },
      //获列表
      async getDataList() {
        this.listLoading = true;
        let params = {
          page: this.page,
        };
        const res = await this.$http.post(`${MODEL_NAME}/list`, params);
        this.listLoading = false;
        if (res === null) return;
        this.total = res.param.pages.total;
        this.pagesize = res.param.pages.pagesize;
        this.list = res.param.list;
      },
      //获列表
      async getListArray() {
        this.listLoading = true;
        let params = {};
        const res = await this.$http.post(`${MODEL_NAME}/array`, params);
        this.listLoading = false;
        if (res === null) return;

        this.options.status = res.param.status;
        res.param.expert.forEach(item => {
          this.options.expert[item.id] = item.name
        });
        res.param.hospital.forEach(item => {
          this.options.hospital[item.id] = item.name
        });
        res.param.guide.forEach(item => {
          this.options.guide[item.id] = item.name
        });
//            res.param.status.forEach(item => {
//                this.filters.options.status[item.id] = item.name
//            });
        this.options.sex.forEach(item => {
          this.sexList[item.value] = item.label
        });
        this.options.is_audit.forEach(item => {
          this.is_audit[item.value] = item.label
        });

        this.filters.options.expert_id = res.param.expert;
        this.filters.options.expert_id.unshift({name: "全部", id: 0});
        this.filters.options.guide_id = res.param.guide;
        this.filters.options.guide_id.unshift({name: "全部", id: 0});
        this.filters.options.status = this.formateOptions(res.param.status);
        // 搜索选项
        this.filters.options.status.unshift({name: "全部", id: 0});
      },
      formateOptions(source) {
        let _data = [];
        for (let key in source) {
          _data.push({name: source[key], id: key * 1})
        }
        return _data.slice(0);
      },
      //删除
      handleDel(index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(async () => {
          let params = {
            id: row.id,
            status: -1
          };

          const res = await this.$http.post(`${MODEL_NAME}/status`, params);
          if (res === null) return;
          this.$message({
            message: '状态修改成功',
            type: 'success'
          });
          row.status = -1;
          this.getListData();
        }).catch(() => {

        });
      },
      //显示编辑界面
      async handleEdit(index, row) {
        console.log(this.$route.path);
        this.$router.push(`${this.$route.path}/edit/${row.id}`);
      },
      //显示新增界面
      handleAdd() {
        console.log(this.$route.path);
        this.$router.push(`${this.$route.path}/add`);
      },
      // 修改状态
      async statusSubmit(index, row) {
        let params = {
          id: row.id,
          status: 1 - row.status
        };

        const res = await this.$http.post(`${MODEL_NAME}/status`, params);
        if (res === null) return;
        this.$message({
          message: '状态修改成功',
          type: 'success'
        });
        row.status = 1 - row.status;
      },
      selsChange(sels) {
        this.sels = sels;
      },
      //批量删除
      batchAction(action) {
        // 三种操作：remove disable active
        let id = this.sels.map(item => item.id).toString();
        const actions = {
          'remove': {
            tip: '删除',
            api: `${MODEL_NAME}/status`,
            status: -1
          },
          'close': {
            tip: '交易关闭',
            api: `${MODEL_NAME}/status`,
            status: 1
          },
          'notPay': {
            tip: '未付款',
            api: `${MODEL_NAME}/status`,
            status: 2
          },
          'pay': {
            tip: '已付款',
            api: `${MODEL_NAME}/status`,
            status: 3
          },
          'finish': {
            tip: '已经完成',
            api: `${MODEL_NAME}/status`,
            status: 4
          },
        };
        this.$confirm(`确认${actions[action].tip}选中记录吗？`, '提示', {
          type: 'warning'
        }).then(async () => {
          this.listLoading = true;
          // 非批量删除，带上 status
          let params = (Object.assign({
            id: id + '',
            status: actions[action].status
          }, params));
          const res = await this.$http.post(actions[action].api, params);
          this.listLoading = false;
          if (res === null) return;
          this.$message({
            message: res.info,
            type: 'success'
          });
          this.getListData();
        }).catch(() => {

        });
      },
    },
    mounted() {
      this.getListArray();
      this.getListData();
    }
  }
</script>

<style lang="scss">
</style>