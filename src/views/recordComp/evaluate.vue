<template>
  <div>
    <el-row>
      <el-col :span="8" :offset="8">
        <el-alert title="" type="success" :closable="false" show-icon center>
          订单{{recordNo}} 关闭成功！
        </el-alert>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>评价服务</span>
          </div>
          <div class="text item">
            <el-input type="textarea" rows=8 v-model="evaluate" placeholder="请输入您的评价"></el-input>
          </div>
          <div class="score">
            评分：
            <el-rate v-model="score" show-text></el-rate>
          </div>
          <div class="btn">
            <el-button type="primary" plain @click="publish()">发表评论</el-button>
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
        score: null,
        customerNo: '',
        recordNo: ''
      }
    },
    methods: {
      publish() {
        this.$http.post('/api/record/close', {
            recordNo: this.recordNo,
            score: this.score,
            evaluate: this.evaluate
          })
          .then(response => {
            var data = response.data;
            console.log(data);
            if (data.result == '1') {
              this.$message({
                message: '恭喜你，评价成功！',
                type: 'success'
              });
              this.evaluate = '';
            } else {
              this.$message.error('出错了哦，' + data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    mounted() {
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

  .score {
    margin-top: 20px;

  }

  .btn {
    margin-top: 50px;
  }

</style>
