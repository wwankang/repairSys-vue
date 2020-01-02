<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="24">
        <el-col :span="10">
          <el-date-picker size="mini" width="100" v-model="listQuery.date" type="datetimerange" start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :default-time="['00:00:00']"></el-date-picker>
        </el-col>
        <el-col :span="8">
          <el-radio-group v-model="radio" size="mini">
            <el-radio-button label="未派工" @click.native="changeStatus(0)"></el-radio-button>
            <el-radio-button label="待处理" @click.native="changeStatus(1)"></el-radio-button>
            <el-radio-button label="维修中" @click.native="changeStatus(2)"></el-radio-button>
            <el-radio-button label="已完成" @click.native="changeStatus(3)"></el-radio-button>
            <el-radio-button label="全部" @click.native="changeStatus(-1)"></el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" icon="el-icon-search" size="mini" @click.native="search">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="mini" @click.native="reset">重置</el-button>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-button icon="el-icon-edit" size="mini" @click="registry">登记</el-button>
      <el-button icon="el-icon-s-grid" size="mini">批量派工</el-button>
      <el-button icon="el-icon-user" size="mini">回访</el-button>
      <el-button icon="el-icon-printer" size="mini">打印维修工单</el-button>
      <el-button icon="el-icon-refresh" size="mini" @click="refresh">刷新</el-button>
      <el-divider></el-divider>
      <el-table border stripe ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">

      <el-table-column label="详情" type="expand" width="50">
          <template slot-scope="props">
            <el-tabs type="border-card">
              <el-tab-pane label="报修状态跟踪">
                <div class="block">
                  <el-timeline>
                    <el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp" placement="top">
                      {{activity.content}}
                    </el-timeline-item>
                  </el-timeline>
                </div>
              </el-tab-pane>
              <el-tab-pane label="维修协助">维修协助</el-tab-pane>
              <el-tab-pane label="耗材">耗材</el-tab-pane>
              <el-tab-pane label="回访记录">回访记录</el-tab-pane>
              <el-tab-pane label="评价">评价</el-tab-pane>
              <el-tab-pane label="附件">附件</el-tab-pane>
            </el-tabs>
          </template>
        </el-table-column>
        <!--多选框-->
        <el-table-column type="selection"></el-table-column>
        <!--序号-->
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <!--紧急度-->
        <el-table-column
          sortable
          prop="rep_imp"
          label="紧急度"
          width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.rep_imp == 0">一般</span>
            <span v-else-if="scope.row.rep_imp == 1">紧急</span>
            <span v-else>一般</span>
          </template>

        </el-table-column>
        <el-table-column
          prop="rep_dep"
          label="报修科室"
          width="120">
        </el-table-column>
        <el-table-column
          sortable
          prop="rep_person"
          label="报修人"
          width="120">
        </el-table-column>
        <el-table-column
          prop="rep_num"
          label="报修电话"
          width="120">
        </el-table-column>
        <el-table-column
          prop="rep_addr"
          label="报修位置"
          width="120">
        </el-table-column>
        <el-table-column
          sortable
          prop="rep_desc"
          label="报修事项"
          width="200">
        </el-table-column>
        <el-table-column
          prop="rep_man"
          label="维修人"
          width="120">
        </el-table-column>
        <el-table-column
          sortable
          prop="rep_status"
          label="单据状态"
          width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.rep_status == 0">未派工</span>
            <span v-else-if="scope.row.rep_status == 1">待处理</span>
            <span v-else-if="scope.row.rep_status == 2">维修中</span>
            <span v-else-if="scope.row.rep_status == 3">已完成</span>
            <span v-else>单据状态有误</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="250"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="dispatching(scope.row.rep_id)">派工</el-button>
            <el-button type="primary" size="mini" @click="remove(scope.row)">修改</el-button>
            <el-button type="warning" size="mini" @click="remove(scope.row)">作废</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="listQuery.limit"
        :total="total"
        @size-change="changeSize"
        @current-change="fetchPage"
        @prev-click="fetchPrev"
        @next-click="fetchNext">
      </el-pagination>
    </div>
    <dispatching></dispatching>


  </div>
</template>
<script>
  import axios from 'axios'
  import { getRepairOrderList } from '@/api/repair/repair'
  import dispatching from '@/views/repair/dispatching'

  export default {
    components: { dispatching },
    data() {
      return {
        activities: [{
          content: '支持使用图标',
          timestamp: '2018-04-12 20:46',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more'
        }, {
          content: '支持自定义颜色',
          timestamp: '2018-04-03 20:46',
          color: '#0bbd87'
        }, {
          content: '支持自定义尺寸',
          timestamp: '2018-04-03 20:46',
          size: 'large'
        }, {
          content: '默认样式的节点',
          timestamp: '2018-04-03 20:46'
        }],
        listLoading: true,
        total: 0,
        listQuery: {
          page: 1,
          limit: 20,
          dataStatus:-1,
          date:[]
        },
        radio: '全部',
        tableData: [{
          "rep_id":'101',
          "rep_imp": 0,
          "rep_dep": "护士台",
          "rep_person": "李东梅",
          "rep_num": "18535541",
          "rep_addr": "北京333",
          "rep_desc": "电动床无法放平",
          "rep_man": "李师傅",
          "rep_status": 4
        }],
        multipleSelection: []

      }
    },
    created() {
      this.fetchData()
    },
    watch: {

    },

    methods: {
      fetchData() {
        console.log("报修列表获取数据开始")

        //测试数据
        // const data = axios.get('/data.json');
        // console.log(data);
        // this.tableData = data.data
        // this.total = this.tableData.length
        // this.listLoading = true

        getRepairOrderList(this.listQuery).then(response => {
          this.tableData = response.data.records
          this.listLoading = false
          this.total = response.data.records.length
        })
        this.listLoading = false
        console.log("报修列表获取数据完成")
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      changeSize(limit) {
        this.listQuery.limit = limit
        this.fetchData()
      },
      fetchNext() {
        this.listQuery.page = this.listQuery.page + 1
        this.fetchData()
      },
      fetchPrev() {
        this.listQuery.page = this.listQuery.page - 1
        this.fetchData()
      },
      fetchPage(page) {
        this.listQuery.page = page
        this.fetchData()
      },
      registry(){
        this.$router.push('/repairOrderRegistry')
      },
      refresh(){
        console.log("报修列表刷新开始")
        this.fetchData()
        console.log("报修列表刷新完成")
      },
      search() {
        console.log("条件查询")
        console.log(this.listQuery.date)
        this.fetchData()
      },
      changeStatus (status){
        this.listQuery.dataStatus = status
        console.log("切换状态"+status)
      },
      reset (){
        this.listQuery.dataStatus = -1
        this.search()
      },
      dispatching (id){
        const item = this.tableData.filter(item => {
          return item.rep_id===id
        })
        console.log(item)

      }


    }
  }
</script>

<style type="text/css" scoped>

  .el-table thead {
    color: #f5f7fa;
    background-color: #42b983;
  }
</style>

