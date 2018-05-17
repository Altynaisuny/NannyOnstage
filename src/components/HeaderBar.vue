<template>
  <div class="header-bar">
    <el-row>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64"
        text-color="#fff" active-text-color="#ffd04b">
        <el-col :offset="4" :span="2">
          <el-menu-item index="1">首页</el-menu-item>
        </el-col>
        <el-submenu index="2">
          <template slot="title">内容</template>
          <el-menu-item index="2-1">信誉排行</el-menu-item>
          <el-menu-item index="2-2">从业经历</el-menu-item>
          <el-menu-item index="2-3">投诉</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">信息中心</template>
          <el-menu-item index="4-1" v-if="user.sign == '客户'">寻找保姆</el-menu-item>
          <el-menu-item index="4-2">查看所有</el-menu-item>
          <el-menu-item index="4-3" v-if="user.sign == '客户'">发布历史</el-menu-item>
          <el-menu-item index="4-4" v-if="user.sign == '保姆'">我的申请</el-menu-item>
        </el-submenu>
        <el-menu-item index="6-1" v-if="user.name == null || user.name == '' ">登录/注册</el-menu-item>
        <el-submenu index="6-2">
          <template slot="title">{{user.name}}</template>
          <el-menu-item index="6-2-1">重新登录</el-menu-item>
          <el-menu-item index="6-2-2">退出登录</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-row>
  </div>

</template>

<script>
  export default {

    data() {
      return {
        activeIndex: '1',
        user: {
          id: null,
          sign: null,
          name: null
        }
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        switch (key) {
          case '1':
            this.$router.push("/mainView");
            break;
          case '2':
            this.$router.push("");
            break;
          case '2-2':
            this.$router.push("/nannyView");
            break;
          case '3':
            this.$router.push("");
            break;
          case '4-1':
            this.$router.push("/recordView/release");
            break;
          case '4-2':
            this.$router.push("/recordView/list");
            break;
          case '4-3':
            this.$router.push("/recordView/all");
            break;
          case '5':
            this.$router.push("");
            break;
          case '6-1':
            this.$router.push("/loginView");
            break;
          case '6-2-1':
            window.sessionStorage.clear();
            this.$router.push("/loginView");
            break;
          case '6-2-2':
            this.$confirm('此操作将退出登录, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              window.sessionStorage.clear();
              this.$router.push("/loginView");
              this.$message({
                type: 'success',
                message: '退出登录成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消操作'
              });
            });

            break;
        }
      }
    },
    mounted() {
      this.user.id = window.sessionStorage.getItem('id')
      this.user.sign = window.sessionStorage.getItem('sign');
      this.user.name = window.sessionStorage.getItem('name');
    }

  }

</script>
<style lang="less">


</style>
