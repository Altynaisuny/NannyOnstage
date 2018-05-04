<template>
  <div>
      <el-row>
  <el-col :span="8" :offset="10">
      <h3>请选择注册类型</h3>
       </el-col>
</el-row>
    <el-row>
  <el-col :span="6" :offset="4">
    <el-card shadow="hover">
      
      <el-button type="primary" plain @click="jump('客户')">客户注册</el-button>
    </el-card>
  </el-col>
  <el-col :span="6" :offset="2">
    <el-card shadow="hover">
      
      <el-button type="primary" plain  @click="jump('保姆')">保姆注册</el-button>
    </el-card>
  </el-col>
</el-row>
  </div>
</template>
<script>

export default {
  data(){
      return{

      }
  },
  methods:{
      jump(obj){
          if (obj == '客户'){
            this.$router.push("/registerView/customer")
          } else {
            this.$router.push("/applyView/first")
          }
      }
  }
}
</script>
<style lang="less" scoped>

</style>


