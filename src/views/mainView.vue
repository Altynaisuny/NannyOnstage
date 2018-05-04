<template>
  <el-container>
     <headerBar/>
    <el-main>
      <el-carousel indicator-position="outside">
    <el-carousel-item v-for="item in list" :key="item">
      <h3>{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
    </el-main>
    <el-footer>

    </el-footer>
  </el-container>
</template>
  
<script>

import headerBar from '../components/HeaderBar.vue'

  export default {
  
    data() {
      return {
       list:['1111','2222','3333','4444'],
      };
    },
    components:{headerBar},
    methods: {
     
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang = "less" scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
    /* background-image: url('./assets/header-1.jpg') */
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>
