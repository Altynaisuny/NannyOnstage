<template>
  <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/registerView/choose' }">注册</el-breadcrumb-item>
  <el-breadcrumb-item>保姆注册</el-breadcrumb-item>
</el-breadcrumb>
      <el-row>
      <el-col :span="8" :offset="8">
          <el-alert
    title="成功"
    type="success"
    description="注册成功"
    :closable="false"
    show-icon>
  </el-alert>
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

  }
}
</script>
<style lang="less" scoped>

</style>


