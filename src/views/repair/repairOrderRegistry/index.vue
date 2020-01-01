<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="14">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="报修资源:">
                <el-radio-group v-model="ruleForm.resource">
                  <el-radio label="临床"></el-radio>
                  <el-radio label="巡检"></el-radio>
                  <el-radio label="领导"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="紧急度:">
                <el-radio-group v-model="ruleForm.resource">
                  <el-radio label="一般"></el-radio>
                  <el-radio label="紧急"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="期望时间:">
                <el-form-item prop="date">
                  <el-date-picker v-model="ruleForm.date" type="datetime" placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="报修部门:">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="报修人:">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="报修电话:">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="报修类别:" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择报修类别">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="报修设备:">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="报修事项:">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="所在区域:">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所在楼宇:">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所在楼层:">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="所在房间:">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="地址详情:">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">确认报修</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>


        </el-form>
      </el-col>
      <el-col :span="6">
        <el-table
          :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%" class="hisTable">
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
      </el-col>
    </el-row>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          date: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''

        },
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          region: [
            {required: true, message: '请选择报修类别', trigger: 'change'}
          ],
          date: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
          type: [
            {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
          ],
          resource: [
            {required: false, message: '请选择活动资源', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '请填写活动形式', trigger: 'blur'}
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
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      methods: {
        handleEdit(index, row) {
          console.log(index, row);
        },
        handleDelete(index, row) {
          console.log(index, row);
        }
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .demo-ruleForm {
    margin-top: 50px;
    margin-right: 50px;
  }
  .hisTable {
    margin-top: 50px;
    margin-left: 50px;
    background-color: #8b8b8b;
  }

</style>

