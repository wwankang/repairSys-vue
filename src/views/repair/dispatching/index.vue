<template>
  <div class="app-container">


    <el-dialog title="派工" :visible.sync="isShow">

      <el-row :gutter="20">
        <el-col :span="10">
          <span>维修班组: </span>
          <el-select v-model="repair_team_value" filterable placeholder="请选择维修班组">
            <el-option
              v-for="item in repair_team"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="10">
          <span>维修人员: </span>
          <el-select v-model="repair_per_value" filterable placeholder="请选择维修人员">
            <el-option
              v-for="item in repair_per"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <!--<el-divider></el-divider>-->

<!--      <el-form :model="form">-->
<!--        <el-form-item label="活动名称" :label-width="formLabelWidth">-->
<!--          <el-input v-model="form.name" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="活动区域" :label-width="formLabelWidth">-->
<!--          <el-select v-model="form.region" placeholder="请选择活动区域">-->
<!--            <el-option label="区域一" value="shanghai"></el-option>-->
<!--            <el-option label="区域二" value="beijing"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">关闭</el-button>
        <el-button :loading="loading" type="primary" @click="dispatching">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    props:['isShow'],
    data () {
      return {
        loading: false,//加载图标

        //维修班组
        repair_team:[{
          value: '1',
          label: '维修班组1',
        },{
          value: '2',
          label: '维修班组2',
        },{
          value: '3',
          label: '维修班组3',
        },{
          value: '4',
          label: '维修班组4',
        },{
          value: '5',
          label: '维修班组5',
        }],
        //维修人员
        repair_per:[{
          value: '1',
          label: '维修人员1',
        },{
          value: '2',
          label: '维修人员2',
        },{
          value: '3',
          label: '维修人员3',
        },{
          value: '4',
          label: '维修人员4',
        },{
          value: '5',
          label: '维修人员5',
        }],
        repair_team_value: '',
        repair_per_value: ''
      }
    },
    watch:{
      isShow(newVal,oldVal){
        console.log("状态改变为:"+newVal)
        if (newVal === false) {
          console.log("调用父组件closeDialog ")
          this.$emit('closeDialog')

        }
      }
    },
    created: function () {
    },
    methods: {
      cancel(){
        this.isShow = false
      },
      dispatching(){
        this.loading = true
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>

