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
            <el-table-column prop="category_id" label="专家分类" min-width="120">
                <template scope="scope">
                    {{ options.category[scope.row.category_id] }}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="专家姓名" width="120">
            </el-table-column>
            <el-table-column prop="sex" label="专家性别" min-width="100">
                <template scope="scope">
                    {{ sexList[scope.row.sex] }}
                </template>
            </el-table-column>
            <el-table-column prop="age" label="专家年龄" width="100">
            </el-table-column>
            <!--&lt;!&ndash; 图片显示 &ndash;&gt;-->
            <!--<el-table-column prop="img" label="头像" width="130">-->
            <!--<template scope="scope">-->
            <!--<el-popover trigger="hover" placement="top">-->
            <!--<div class="ad-img">-->
            <!--<img :src="scope.row.img" :alt="scope.row.name" width="200" height="auto"-->
            <!--v-if="scope.row.img !== ''">-->
            <!--<p v-else>暂无图片</p>-->
            <!--</div>-->
            <!--<div slot="reference" class="name-wrapper">-->
            <!--<el-tag>查看图片</el-tag>-->
            <!--</div>-->
            <!--</el-popover>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column prop="hospital_id" label="医院" min-width="120">
                <template scope="scope">
                    {{ options.hospital[scope.row.hospital_id] }}
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
            <el-table-column prop="is_show" label="首页推荐" min-width="120">
                <template scope="scope">
                    {{ is_show[scope.row.is_show] }}
                </template>
            </el-table-column>
            <!-- 时间戳转日期 -->
            <el-table-column prop="update_time" label="更新时间" width="180" :formatter="formateTime">
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="180" :formatter="formateTime">
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100">
                <template scope="scope">
                    <el-tag :type="scope.row.status === 1 ? 'success' : scope.row.status === -1 ? 'gray' : 'danger'">
                        {{ scope.row.status === 1 ? '可用' : scope.row.status === -1 ? '已删除' : '不可用' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="320" fixed="right">
                <template scope="scope">
                    <el-button size="small" @click="handleIncome(scope.$index, scope.row)">专家收入明细</el-button>
                    <el-button size="small"
                               @click="statusSubmit(scope.$index, scope.row)"
                               :disabled="scope.row.status === -1">
                        {{ scope.row.status === 1 ? '停用' : scope.row.status === 0 ? '启用' : '已删除' }}
                    </el-button>
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
            <el-button type="warning"
                       @click="batchAction('disable')"
                       :disabled="this.sels.length===0">批量禁用
            </el-button>
            <el-button type="primary"
                       @click="batchAction('active')"
                       :disabled="this.sels.length===0">批量启用
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

  const MODEL_NAME = 'Expert'; // API模块名

  export default {
    data() {
      return {
        // 列表表头数据
        tableColumn: [
          {
            prop: 'info',
            label: '专家简介',
            width: 220,
            sortable: false
          },
          {
            prop: 'tel',
            label: '手机号码',
            width: 130,
            sortable: false
          },
          {
            prop: 'scale',
            label: '收入比例',
            width: 120,
            sortable: false
          },
          {
            prop: 'price',
            label: '价格',
            width: 120,
            sortable: false
          },
          {
            prop: 'income',
            label: '收入',
            width: 120,
            sortable: false
          },
          {
            prop: 'sort',
            label: '排序',
            width: 80,
            sortable: false
          },
          {
            prop: 'click',
            label: '点击率',
            width: 80,
            sortable: false
          },
          {
            prop: 'position',
            label: '职位',
            width: 120,
            sortable: false
          },
          {
            prop: 'pos_name',
            label: '职称',
            width: 120,
            sortable: false
          },
          {
            prop: 'visit_time',
            label: '出诊时间',
            width: 120,
            sortable: false
          },
          {
            prop: 'specialty',
            label: '特长',
            width: 250,
            sortable: false
          },

        ],
        // 搜索条件
        filters: {
          value: '',
          key: 'category_id',
          options: [
            {value: 'category_id', label: '专家分类'},
          ],

        },
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
        list: [],
        sexList: {},
        is_show: {},
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
          category_id: this.filters.value // 可选参数查询
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
        this.filters.options = res.param.category;
        // 搜索选项
        this.filters.options.unshift({name: "全部类别", id: 0});
//                this.options.hospital = res.param.hospital;
        res.param.hospital.forEach(item => {
          this.options.hospital[item.id] = item.name
        });
        res.param.category.forEach(item => {
          this.options.category[item.id] = item.name
        });
        this.options.sex.forEach(item => {
          this.sexList[item.value] = item.label
        });
        this.options.is_show.forEach(item => {
          this.is_show[item.value] = item.label
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
      handleIncome(index, row) {
        this.$router.push(`/income/list/${row.id}`);
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
          'disable': {
            tip: '停用',
            api: `${MODEL_NAME}/status`,
            status: 0
          },
          'active': {
            tip: '启用',
            api: `${MODEL_NAME}/status`,
            status: 1
          }
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