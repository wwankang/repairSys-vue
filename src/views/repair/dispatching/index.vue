<template>
  <div class="app-container">


    <el-dialog title="派工" :visible.sync="isShow">

      <el-row :gutter="20">
        <el-col :span="10">
          <el-select v-model="value" filterable placeholder="请选择維修班组">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="10">
          <el-select v-model="value" filterable placeholder="请选择維修人员">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-divider></el-divider>

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
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button @click="dialogFormVisible = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
<!--      </div>-->
    </el-dialog>

  </div>
</template>

<script>
  export default {
    props:['isShow'],
    data () {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
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
      hide(){//弹层消失事件
        this.$message({
          text : 'hide'
        })
      },
      closed(){
        this.$message({
          text : 'closed'
        })
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>

