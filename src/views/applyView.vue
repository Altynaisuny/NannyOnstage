<template>
  <div>
     <headerBar/>
      <el-main>
        <router-view></router-view>
      </el-main>
  </div>

</template>
<script>
  import headerBar from "../components/HeaderBar.vue";

  export default {
    data() {
      return {

      };
    },
    components: {
      headerBar
    },
    methods: {
 
    }
  };

</script>
<style lang="less" scoped>


</style>
