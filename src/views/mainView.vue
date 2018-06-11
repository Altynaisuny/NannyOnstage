<template>
  <el-container>
    <headerBar/>
    <el-main>
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="(img,index) in imgList" :key="index">
          <img v-bind:src="img.url"/>
          <h3>hello</h3>
        </el-carousel-item>
      </el-carousel>
    </el-main>
    <el-footer>

    </el-footer>
  </el-container>
</template>

<script>
  import headerBar from '../components/HeaderBar.vue'
  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'

  export default {

    data() {
      return {
        
        imgList:[
          {
            url:require('../assets/header-1.jpg')
          },
          {
            url:require('../assets/header-2.png')
          },
          {
            url:require('../assets/header-3.jpg')
          }
        ]
      };
    },
    components: {
      headerBar,Waterfall,WaterfallSlot
    },
    methods: {
      fetchData(){
        this.$http
          .post("/api/record/unclosed", {
            
          })
          .then(response => {
            console.log(response.data)
           })
          .catch(error => {
            console.log(error);
          });
      }
    },
    mounted(){
      this.fetchData();
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

</style>
