<template>
  <div>
    <el-row :gutter="24">

      <el-col :span="16">
        <div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row :gutter="24">
              <el-col :span="10">
                <el-form-item label="报修来源:" prop="fromWhere">
                  <el-radio-group v-model="ruleForm.fromWhere">
                    <el-radio label="临床" value="0"></el-radio>
                    <el-radio label="巡检" value="1"></el-radio>
                    <el-radio label="领导" value="2"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="紧急度:" prop="degree">
                  <el-radio-group v-model="ruleForm.degree">
                    <el-radio label="一般" value="0"></el-radio>
                    <el-radio label="紧急" value="1"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

            </el-row>

            <el-row :gutter="24">
              <el-col :span="10">
                <el-form-item label="报修部门:" prop="dept">
                  <el-input v-model="ruleForm.dept"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="报修人:" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="10">
                <el-form-item label="报修电话:" prop="tel">
                  <el-input v-model="ruleForm.tel"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="报修类别:" prop="type">
                  <el-select v-model="ruleForm.type" placeholder="请选择报修类别">
                    <el-option label="区域一" value="0"></el-option>
                    <el-option label="区域二" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="10">
                <el-form-item label="报修设备:" prop="device">
                  <el-input v-model="ruleForm.device"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="期望时间:" prop="date">
                  <el-date-picker v-model="ruleForm.date" type="datetime" placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="20">
                <el-form-item label="报修事项:" prop="desc">
                  <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="10">
                <el-form-item label="所在区域:" prop="area">
                  <el-input v-model="ruleForm.area"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="所在楼宇:" prop="building">
                  <el-input v-model="ruleForm.building"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row :gutter="24">
              <el-col :span="10">
                <el-form-item label="所在楼层:" prop=" floor">
                  <el-input v-model="ruleForm.floor"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="所在房间:" prop="room">
                  <el-input v-model="ruleForm.room"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="地址详情:" prop="address">
                  <el-input v-model="ruleForm.address"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="primary" :loading="loading" @click="submitForm('ruleForm')">确认报修</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>


          </el-form>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="hisTable">
          <el-table
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          >
            <el-table-column
              label="报修历史"
              prop="name">
            </el-table-column>
            <el-table-column
              align="right">
              <template slot="header" slot-scope="scope">
                <el-input
                  v-model="search"
                  size="mini"
                  placeholder="搜索"/>
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">查看
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>

</template>
<script>
  import { repair_order_registry } from '@/api/repair/repair'
  export default {
    data() {
      return {
        loading: false,
        ruleForm: {
          id:'',//报修单唯一id
          fromWhere:'',//报修来源 0，1，2
          degree:'',//紧急度 0,1
          dept:'',//报修部门
          name: '',//报修人
          tel:'',//报修设备
          type:'',//报修类别  单独一张表，
          device:'',//报修设备
          date:'',//期望时间
          desc:'',//报修事项
          area:'',//所在区域
          building:'',//所在楼宇
          floor:'',//所在楼层
          room:'',//所在房间
          address:''//地址详情

        },
        rules: {
          type: [
            {required: true, message: '请选择报修类别', trigger: 'change'}
          ]
        },
        tableData: [{
          name: '张三',
        }, {
          name: '王李四',
        }, {
          name: '王王五',
        }, {
          name: '王小虎',
        }],
        search: ''
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this
            this.loading = true
            return new Promise((resolve, reject) => {
              repair_order_registry(this.ruleForm).then(response => {
                this.loading = false
                this.$message({
                  message:'提交成功',
                  type:'success'
                });
                resolve()
              }).catch(error => {
                this.loading = false
                this.$message({
                  message:'提交失败',
                  type:'error'
                });
                console.log(error);
                reject(error)
              })
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .demo-ruleForm {
    margin-top: 50px;
  }

  .hisTable {
    margin-top: 50px;
    background: blue;
  }

</style>

