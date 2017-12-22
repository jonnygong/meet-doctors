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
                               @click="getListData">搜索
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               @click="getListData">刷新
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               @click="handleAdd">新增
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
            <el-table-column prop="goods_id" label="产品名称" min-width="120">
                <template scope="scope">
                    {{ options.goods[scope.row.goods_id] }}
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
            <!-- 图片显示 -->
            <el-table-column prop="img" label="医院床头卡" width="130">
                <template scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <div class="ad-img">
                            <img :src="scope.row.img" :alt="scope.row.name" width="200" height="auto"
                                 v-if="scope.row.img !== ''">
                            <p v-else>暂无图片</p>
                        </div>
                        <div slot="reference" class="name-wrapper">
                            <el-tag>查看图片</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100">
                <template scope="scope">
                    <el-tag :type="scope.row.status === 0 ? 'gray' : scope.row.status === 1 ? 'warning' : 'success'">
                        {{ scope.row.status === 0 ? '审核未通过' : scope.row.status === 1 ? '待审核' : '审核通过' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180" fixed="right">
                <template scope="scope">
                    <!--<el-button size="small"-->
                    <!--@click="statusSubmit(scope.$index, scope.row)"-->
                    <!--:disabled="scope.row.status === -1">-->
                    <!--{{ scope.row.status === 1 ? '停用' : scope.row.status === 0 ? '启用' : '已删除' }}-->
                    <!--</el-button>-->
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" @click="handleEditReason(scope.$index, scope.row)">未通过理由</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger"
                       @click="batchAction('disable')"
                       :disabled="this.sels.length===0">审核不通过
            </el-button>
            <el-button type="warning"
                       @click="batchAction('active')"
                       :disabled="this.sels.length===0">恢复审核状态
            </el-button>
            <el-button type="primary"
                       @click="batchAction('send')"
                       :disabled="this.sels.length===0">审核通过
            </el-button>
            <el-pagination layout="prev, pager, next"
                           @current-change="handleCurrentChange"
                           :page-size="pagesize"
                           :total="total" style="float:right;"></el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="未通过理由" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="140px" :rules="editFormRules" ref="editForm">
                <el-form-item label="未通过理由" prop="remark">
                    <el-input v-model="editForm.remark" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>


    </section>
</template>

<script>
  import util from '@/utils/js'

  const MODEL_NAME = 'Recipient'; // API模块名

  export default {
    data() {
      return {
        // 列表表头数据
        tableColumn: [
          {
            prop: 'name',
            label: '用户名称',
            width: 120,
            sortable: false
          },
          {
            prop: 'tel',
            label: '用户电话',
            width: 130,
            sortable: false
          },
          {
            prop: 'address',
            label: '用户地址',
            width: 180,
            sortable: false
          },


        ],
        filters: {
          value: '',
          key: 'goods_id',
          options: [
            {value: 'goods_id', label: '产品'},
          ],

        },
        options: {
          goods: [],
        },
        list: [],
        total: 0,
        page: 1,
        pagesize: 10,
        listLoading: false,
        sels: [],//列表选中列

        editFormVisible: false, //编辑界面是否显示
        editLoading: false,
        editFormRules: {
          remark: [
            {required: true, message: '请输入内容', trigger: 'blur'}
          ],

        },
        //编辑界面数据
        editForm: {
          id: '',
          remark: '',
        },
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
//          key: this.filters.key, // 可选参数查询
          goods_id: this.filters.value // 可选参数查询
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
        this.filters.options = res.param.goods;
        // 搜索选项
        this.filters.options.unshift({name: "全部产品", id: ""});
        res.param.goods.forEach(item => {
          this.options.goods[item.id] = item.name
        });
        this.getListData();
      },
      //显示编辑界面
      async handleEditReason(index, row) {
        this.editFormVisible = true;
        let params = {
          id: row.id
        };
        const res = await this.$http.post(`${MODEL_NAME}/info`, params);
        if (res === null) return;
//        this.id = row.id,
//        this.name = row.name,
        this.editForm = res.param;
        console.log(row.id)
      },
      //编辑
      editSubmit() {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(async () => {
              this.editLoading = true;
              let params = {
                id: this.editForm.id,
                remark: this.editForm.remark,
                openid: this.editForm.openid
              };
              const res = await this.$http.post(`${MODEL_NAME}/remark`, params);
              this.editLoading = false;
              if (res === null) return;
              this.$message({
                message: res.info,
                type: 'success'
              });
              this.$refs['editForm'].resetFields();
              this.editFormVisible = false;
              this.getListData();
            });
          }
        });
      },
      //删除
      handleDel(index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(async () => {
          let params = {
            id: row.id,
            status: 0
          };

          const res = await this.$http.post(`${MODEL_NAME}/status`, params);
          if (res === null) return;
          this.$message({
            message: '状态修改成功',
            type: 'success'
          });
          row.status = 0;
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
//          'remove': {
//            tip: '删除',
//            api: `${MODEL_NAME}/status`,
//            status: -1
//          },
          'disable': {
            tip: '关闭',
            api: `${MODEL_NAME}/status`,
            status: 0
          },
          'active': {
            tip: '申请',
            api: `${MODEL_NAME}/status`,
            status: 1
          },
          'send': {
            tip: '已邮寄',
            api: `${MODEL_NAME}/status`,
            status: 2
          },
        };
        const total = this.sels.length;
        let result = 0;

        this.$confirm(`确认${actions[action].tip}选中记录吗？`, '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          this.sels.forEach(async (item) => {

            // 非批量删除，带上 status
            let params = (Object.assign({
              id: item.id,
              status: actions[action].status,
              openid: item.openid
            }, params));
            const res = await this.$http.post(actions[action].api, params);
            if (res === null) return;
            result++;
            if (total === result) {
              console.log( total, result)
              this.listLoading = false;
              this.$message({
                message: `成功${actions[action].tip}${result}条数据`,
                type: 'success'
              });
              this.getListData();
            }
          })


        }).catch(() => {

        });



      },
    },
    mounted() {
      this.getListArray();
    }
  }
</script>

<style lang="scss">
</style>