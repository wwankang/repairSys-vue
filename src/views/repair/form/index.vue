<template>
  <div class="dispatching-container">
    <el-form size="mini" :model="ruleForm"  :disabled="this.disabled" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="20">
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

      <el-row :gutter="20">
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
      <el-row :gutter="20">
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
      <el-row :gutter="20">
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
      <el-row :gutter="20">
        <el-col :span="20">
          <el-form-item label="报修事项:" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
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
      <el-row :gutter="20">
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
    </el-form>
  </div>
</template>

<script>
  export default {
    props:['ruleForm','disabled'],
    data () {
      return {
      }
    },
    created: function () {
    },
    methods: {

    }
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>

