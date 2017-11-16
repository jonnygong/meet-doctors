<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-select v-model="filters.value" placeholder="请选择搜索字段">
                        <el-option
                                v-for="(item,index) in filters.options"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               icon="search"
                               @click="getListData">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               @click="getListData">刷新</el-button>
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
            <el-table-column prop="is_audit" label="用户申请审核" min-width="120">
                <template scope="scope">
                    {{ is_audit[scope.row.is_audit] }}
                </template>
            </el-table-column>
            <el-table-column prop="bespeak_time" label="预约时间" width="180" :formatter="formateTime">
            </el-table-column>
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
            <el-table-column prop="update_time" label="更新时间" width="180" :formatter="formateTime">
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="180" :formatter="formateTime">
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100">
                <template scope="scope">
                    <el-tag :type="scope.row.status === 1 ? 'success' : scope.row.status === -1 ? 'gray' : scope.row.status === 2 ? 'warning' : scope.row.status === 3 ? 'success' : 'primary' ">
                        {{ scope.row.status === 1 ? '交易关闭' : scope.row.status === -1 ? '已删除' : scope.row.status === 2 ? '未付款' : scope.row.status === 3 ? '已付款' : '已完成' }}
                    </el-tag>
                </template>
            </el-table-column>

        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next"
                           @current-change="handleCurrentChange"
                           :page-size="pagesize"
                           :total="total" style="float:right;"></el-pagination>
        </el-col>
    </section>
</template>

<script>
    import util from '@/utils/js'

    const MODEL_NAME = 'Count'; // API模块名

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
                        prop: 'address',
                        label: '患者地址',
                        width: 120,
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
                value: '',
                key: 'guide_id',
                options: [
                  {value: 'guide_id', label: '导诊'},
                ],

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
//                    key: this.filters.key, // 可选参数查询
                  guide_id: this.filters.value // 可选参数查询
                };
                const res = await this.$http.post(`/Count/todaypay`, params);
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
              this.filters.options = res.param.guide;
              // 搜索选项
              this.filters.options.unshift({ name: "全部", id: "" });
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
//                this.options.status[item.id] = item.name
//            });
                this.options.sex.forEach(item => {
                    this.sexList[item.value] = item.label
                });
              this.options.is_audit.forEach(item => {
                this.is_audit[item.value] = item.label
              });
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