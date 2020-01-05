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
      <el-row :gutter="24">
        <el-col :span="24">
          <div id="opration-button">
            <el-button icon="el-icon-edit" size="mini" @click="registry">登记</el-button>
            <el-button icon="el-icon-s-grid" size="mini">批量派工</el-button>
            <el-button icon="el-icon-user" size="mini">回访</el-button>
            <el-button icon="el-icon-printer" size="mini">打印维修工单</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="refresh">刷新</el-button>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-table border fit highlight-current-row stripe size="mini" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">

      <el-table-column label="详情" type="expand">
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
        <el-table-column type="index" label="序号"></el-table-column>
        <!--紧急度-->
        <el-table-column
          sortable
          prop="degree"
          label="紧急度">
          <template slot-scope="scope">
            <span v-if="scope.row.degree == 0">一般</span>
            <span v-else-if="scope.row.degree == 1">紧急</span>
            <span v-else>一般</span>
          </template>

        </el-table-column>
        <el-table-column
          prop="dept"
          label="报修科室">
        </el-table-column>
        <el-table-column
          sortable
          prop="name"
          label="报修人">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="报修电话">
        </el-table-column>
        <el-table-column
          prop="address"
          label="报修位置">
        </el-table-column>
        <el-table-column
          sortable
          prop="desc"
          label="报修事项">
        </el-table-column>
        <el-table-column
          prop="rep_man"
          label="维修人">
        </el-table-column>
        <el-table-column
          sortable
          prop="rep_status"
          label="单据状态">
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
          width="230"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="showDialog(scope.row.rep_id)">派工</el-button>
            <el-button type="primary" size="mini" @click="editDialog(scope.row.rep_id)">修改</el-button>
            <el-button type="warning" size="mini" @click="invalidDialog(scope.row.rep_id)">作废</el-button>
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
<!-- 作废表格弹出框   -->
    <div class="edit-container">
      <el-dialog title="作废" :visible.sync="invaliddialogisShow">
        <span>作废说明：</span>
        <el-input type="textarea"></el-input>
        <el-divider></el-divider>
        <paigong :ruleForm="this.invalidForm" :disabled="this.isdisabled"></paigong>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="this.invaliddialogisShow = false">关闭</el-button>
          <el-button size="mini" :loading="loading" type="primary" >确定</el-button>
        </div>
      </el-dialog>
    </div>
<!-- 修改表格弹出框   -->
    <div class="edit-container">
      <el-dialog title="修改" :visible.sync="editdialogisShow">
        <paigong :ruleForm="this.editForm" :disabled="this.isdisabled"></paigong>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="this.dispdialogisShow = false">关闭</el-button>
          <el-button size="mini" :loading="loading" type="primary" >确定</el-button>
        </div>
      </el-dialog>
    </div>

<!--    派工表格弹出框-->
    <div class="dispatching-container">
      <el-dialog title="派工" :visible.sync="dispdialogisShow">
        <el-row :gutter="20">
          <el-col :span="10">
            <span>维修班组:</span>
            <el-select size="mini" v-model="repair_team_value" filterable placeholder="请选择维修班组">
              <el-option
                v-for="item in repair_team"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="10" >
            <span>维修人员: </span>
            <el-select size="mini" v-model="repair_per_value" filterable placeholder="请选择维修人员">
              <el-option
                v-for="item in repair_per"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <paigong :ruleForm="this.dispatchingForm" :disabled="this.isdisabled"></paigong>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="this.dispdialogisShow=false">关闭</el-button>
          <el-button size="mini" :loading="loading" type="primary" >确定</el-button>
        </div>
      </el-dialog>
    </div>


  </div>
</template>
<script>
  import axios from 'axios'
  import { getRepairOrderList } from '@/api/repair/repair'
  import paigong from '@/views/repair/form/index'

  export default {
    components: { paigong },
    data() {
      return {
        isdisabled :true,//表格是否禁用
        loading: false,//加载图标
        //维修班组
        repair_team:[],
        //维修人员
        repair_per:[],
        repair_team_value: '',
        repair_per_value: '',
        dispatchingForm:null,
        editForm: null,
        invalidForm: null,
        dispdialogisShow:false,
        editdialogisShow:false,
        invaliddialogisShow:false,
        activities: [],
        listLoading: true,
        total: 0,
        listQuery: {
          page: 1,
          limit: 20,
          dataStatus:-1,
          date:[]
        },
        radio: '全部',
        tableData: [],
        multipleSelection: []

      }
    },
    created() {
      this.fetchData()

      //获取列表数据 假数据
      this.getTableData()
      //获取维修班组和维修人员数据
      this.getbanzuData()
    },
    watch: {

    },

    methods: {
      async getTableData(){
        const data = await axios.get('/data.json');
        this.tableData = data.data
        this.total = this.tableData.length
      },
      async getbanzuData(){
        const data = await axios.get('/banzu.json');
        this.repair_team = data.data
        this.repair_per = data.data
      },
      fetchData() {
        console.log("报修列表获取数据开始")

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
      showDialog (id){
        const data = this.tableData.filter(item => {
          return item.rep_id===id
        })
        if(data){
          this.dispatchingForm = data[0]
          debugger
        }
        console.log(this.dispatchingForm)
        this.dispdialogisShow = true
        this.isdisabled = true

      },
      editDialog (id){
        const data = this.tableData.filter(item => {
          return item.rep_id===id
        })
        if(data){
          this.editForm = data[0]
        }
        this.editdialogisShow = true
        this.isdisabled = false
      },
      invalidDialog (id){
        const data = this.tableData.filter(item => {
          return item.rep_id===id
        })
        if(data){
          this.invalidForm = data[0]
        }
        this.invaliddialogisShow = true
        this.isdisabled = true
      },
    }
  }
</script>

<style type="text/css" lang="scss" scoped>

  .el-table thead {
    color: #f5f7fa;
    background-color: #42b983;
  }
  #opration-button {
    top: 20px;
  }
  .el-divider--horizontal {
    margin: 10px 0;
  }
</style>

