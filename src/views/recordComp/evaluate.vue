<template>
  <div>
    <el-row>
       
      <el-col :span="8" :offset="8">
          <el-alert
    title=""
    type="success"
    :closable="false"
    show-icon
    center>
    订单{{recordNo}}
    关闭成功！
  </el-alert>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>评价服务</span>
          </div>
          <div class="text item">
            <el-input type="textarea" v-model="evaluate"></el-input>
            <el-rate v-model="score" show-text>
            </el-rate>
            <el-button type="primary" plain>发表评论</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        evaluate: '',
        score: '',
        customerNo:'',
        recordNo:''
      }
    },
    methods: {

    },
    mounted(){
         this.recordNo = this.$route.query.recordNo
    }
  }

</script>
<style lang="less" scoped>
item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

</style>
