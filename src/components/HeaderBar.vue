<template>
  <div class="header-bar">
   <el-row>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-col :span="2" :offset="8">
         <el-menu-item index="1">处理中心</el-menu-item>
      </el-col>
     <el-col :span="2">
       <el-menu-item index="2">消息中心</el-menu-item>
     </el-col>
     <el-col :span="2">
        <el-menu-item index="3">订单管理</el-menu-item>
     </el-col>
    </el-menu>
    </el-row>
  </div>
  
</template>

<script>
export default {

    data(){
      return{
        activeIndex: '',
      }
    },
    methods:{
       handleSelect(key, keyPath) {
      }
    }
    
}
</script>

<style lang="less">

</style>

