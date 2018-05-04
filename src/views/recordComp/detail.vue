<template>
  <div>
    <el-row>
      <el-col :span="6" :offset="7">
        <h2>{{record.describe}}</h2>
        <el-col :span="1">
            <el-tag type="success">{{record.type}}</el-tag>
        </el-col>
      </el-col>
    </el-row>

    <el-row>
        <el-col :span="8" :offset="7">
      <el-alert title="联系方式：" type="info" :closable="false">
        {{record.mobile}}
      </el-alert>
        </el-col>
    </el-row>

    <el-row>
        <el-col :span="8" :offset="7">
      <el-alert title="薪酬：" type="info" :closable="false">
        {{record.pay}}/月
      </el-alert>
        </el-col>
    </el-row>

    <el-row>
        <el-col :span="8" :offset="7">
      <el-alert title="工作地址：" type="info" :closable="false">
        {{record.workAddress}}
      </el-alert>
        </el-col>
    </el-row>

    <el-row>
        <el-col :span="8" :offset="7">
      <el-alert title="编号：" type="info" :closable="false">
        {{record.recordNo}}
      </el-alert>
        </el-col>
    </el-row>

    <el-row>
      <el-col :span="6" :offset="7">
        <i class="el-icon-date"></i>
        <time class="time">{{record.createTime}}</time>
      </el-col>
    </el-row>
    <el-row>
        <el-col :span="6" :offset="7">
         <el-button type="primary" plain v-show="user.sign == '保姆' " @click="apply()">申请</el-button>
        </el-col>
    </el-row>
    <el-row>
         <div class="record-comment">
      <el-col :span="8" :offset="7">
        <el-input type="textarea" clearable :rows="4" v-model="comment"></el-input>
      </el-col>
       </div>
    </el-row>
    <el-row>
       
      <el-col :span="2" :offset="7">
        <span class="text-number-guide">您至少输入5个字</span>
      </el-col>
      <el-col :span="2" :offset="5">
        <el-button type="primary" round :disabled="user.id == null" @click="publish()">发布</el-button>
      </el-col>
     
    </el-row>
    <el-row>
      <el-col :span="6" :offset="7">
        <el-rate v-show="record.status == '1' " v-model="score" disabled show-score text-color="#ff9900" score-template="{value}">
        </el-rate>
        <!-- 评分系统只对发布了该订单的客户生效，查询recordNo 是不是匹配当前登录的用户 -->
        <el-rate v-show="record.status == '0' " v-model="score" show-text text-color="#ff9900" :max="5">
        </el-rate>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="7">
        评论
        <hr/>
      </el-col>
    </el-row>
    <div v-for="item in list" :key="item.id">
    <el-row>
      <el-col :span="8" :offset="7">
           <el-card>
               <div>
                   {{item.comment}}
               </div>
               <div class="comment-name">
                   {{item.customerName}}
                   {{item.nannyName}}
               </div>
      <div>
      <i class="el-icon-date"></i>
      <time class="time">{{item.createTime}}</time>
      </div>
    </el-card>
      </el-col>
    </el-row>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        record: {
          recordNo: '',
          type: '',
          pay: '',
          workAddress: '',
          mobile: '',
          describe: '',
          createTime: '',
          status: ''
        },
        comment: '',
        score: null,
        user: {
          id: null,
          sign: null,
          name: null,
          NO:null
        },
        list:[]
      }
    },
    methods: {
        //详情获取
      fetchData() {
        this.$http.post('/api/record/detail', {
            recordNo: this.record.recordNo,
          })
          .then(response => {
            var data = response.data;
            this.record.type = data.type
            this.record.describe = data.describe
            this.record.createTime = data.createTime
            this.record.status = data.status
            this.record.pay = data.pay
            this.record.workAddress = data.workAddress
            this.record.mobile = data.mobile
          })
          .catch(error => {
            console.log(error);
          })
      },
      //发布
        publish(){
          this.$http.post('/api/record/insertComment', {
            NO: this.user.NO,
            recordNo: this.record.recordNo,
            comment:this.comment
          })
          .then(response => {
            var data = response.data;
            if (data.result == '1'){
            this.$message({
          message: '评论插入成功！',
          type: 'success'
        });
        this.comment = ''
        this.getComment()
            } else {
this.$message.error(data.message);
            }
          })
          .catch(error => {
            console.log(error);
          })
        },
        getComment(){
            this.$http.post('/api/record/selectComment', {
            recordNo: this.record.recordNo,
          })
          .then(response => {
            var data = response.data;
            this.list = data;
          })
          .catch(error => {
            console.log(error);
          })
        },
        apply(){
            this.$http.post('/api/record/apply', {
            recordNo: this.record.recordNo,
            nannyNo:window.sessionStorage.getItem("nannyNo"),
            status:this.record.status
          })
          .then(response => {
            var data = response.data;
            if(data.result == '1'){
this.$message({
          message: '恭喜你，已申请成功，请等待相关！',
          type: 'success'
        });
            } else {
this.$message.error('申请出错！');
            }
          })
          .catch(error => {
            console.log(error);
          })
        }
    },
    mounted() {
      this.record.recordNo = this.$route.query.recordNo
      this.fetchData();
      this.user.id = window.sessionStorage.getItem('id')
      this.user.sign = window.sessionStorage.getItem('sign');
      this.user.name = window.sessionStorage.getItem('name');

      if (window.sessionStorage.getItem("sign") == '保姆'){
          this.user.NO = window.sessionStorage.getItem("nannyNo")
      } else {
          this.user.NO = window.sessionStorage.getItem("customerNo")
      }
    //获取评论列表
    this.getComment();
    }
  }

</script>
<style lang="less" scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .text-number-guide {
    font-size: 13px;
    color: #999;
  }

  .record-comment{
      margin-top: 20px;
  }

  .comment-name{
      color: #409EFF;
      font-size: 13px;
  }

</style>
