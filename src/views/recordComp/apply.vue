<template>
  <div>
    <el-row>
      <el-col :span="15" :offset="3">
        <el-card class="box-card">
          <el-tag type="warning" v-if="recordInfo.nannyNo == null || recordInfo.nannyNo == ''">未选定</el-tag>
          <el-tag type="danger" v-else>已选定</el-tag>
          <div class="text item">
            创建时间：{{recordInfo.createTime}}
          </div>
          <div class="text item">
            类型：{{recordInfo.type}}
          </div>
          <div class="text item">
            薪酬：{{recordInfo.pay}}
          </div>
          <div class="text item">
            描述：{{recordInfo.describe}}
          </div>
          <div class="text item">
            工作地址：{{recordInfo.workAddress}}
          </div>
          <div class="text item">
            编号：{{recordInfo.recordNo}}
          </div>
          <div class="text item">
            电话：{{recordInfo.mobile}}
          </div>
        </el-card>
      </el-col>
      <el-col :span="15" :offset="3">
        <el-alert title="" type="info" :closable="false">
          申请列表
        </el-alert>
        <el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'occurTime', order: 'descending'}">
          <el-table-column prop="occurTime" label="日期" width="180" sortable>
          </el-table-column>
          <el-table-column prop="nannyName" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="mobile" label="电话">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
              <el-button size="mini" type="success" v-if="isShowBtn2(scope.row)" @click="handleChoose(scope.$index, scope.row)">选定</el-button>
              <el-button size="mini" type="danger" v-if="isShowBtn(scope.row)" @click="cancelChose(scope.row)">取消选定</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        customerNo: '',
        tableData: [],
        recordInfo: {
          recordNo: '',
          createTime: '',
          describe: '',
          mobile: '',
          pay: '',
          type: '',
          workAddress: '',
          nannyNo:''
        },
      }
    },
    methods: {
      fetchData() {
        this.$http.post('/api/record/selectNannyApplyList', {
            recordNo: this.recordInfo.recordNo,
            customerNo: this.customerNo
          })
          .then(response => {
            var data = response.data;
            this.tableData = data.list;
            this.recordInfo.createTime = data.recordInfo.createTime
            this.recordInfo.recordNo = data.recordInfo.recordNo
            this.recordInfo.describe = data.recordInfo.describe
            this.recordInfo.pay = data.recordInfo.pay
            this.recordInfo.mobile = data.recordInfo.mobile
            this.recordInfo.type = data.recordInfo.type
            this.recordInfo.workAddress = data.recordInfo.workAddress
            this.recordInfo.nannyNo = data.recordInfo.nannyNo
          })
          .catch(error => {
            console.log(error);
          })
      },
      handleEdit(index, row) {
        console.log(obj);
      },
      handleChoose(index, row) {
        this.$http.post('/api/record/choseNanny', {
            recordNo: this.recordInfo.recordNo,
            nannyNo: row.nannyNo
          })
          .then(response => {
            var data = response.data;
            if (data.result == '1') {
              this.$message({
                message: '恭喜你，选定成功',
                type: 'success'
              });
              this.fetchData();
            } else {
              this.$message.error('选定失败！'+data.message);
            }
          })
          .catch(error => {
            console.log(error);
          })
      },
      //取消选定按钮是否显示
      isShowBtn(row){
        //没有选定保姆
        if (null == this.recordInfo.nannyNo || "" == this.recordInfo.nannyNo){
          return false;
        }
        //已选定了该保姆
        if (this.recordInfo.nannyNo == row.nannyNo){
          return true;
        }
          return false;
      },
      //选定按钮是否显示
      isShowBtn2(row){
        if (null == this.recordInfo.nannyNo || "" == this.recordInfo.nannyNo){
          return true;
        }
        return false;
      },
      cancelChose(row){
          this.$http.post('/api/record/cancelChose', {
            recordNo: this.recordInfo.recordNo,
          })
          .then(response => {
            var data = response.data;
            if (data.result == '1') {
              this.$message({
                message: '已取消',
                type: 'success'
              });
              this.fetchData();
            } else {
              this.$message.error('取消失败！'+result.message);
            }
          })
          .catch(error => {
            console.log(error);
          })
      }
    },
    mounted() {
      this.recordInfo.recordNo = this.$route.query.recordNo
      this.customerNo = window.sessionStorage.getItem("customerNo");
      this.fetchData()
    },
    computed:{

    }
  }

</script>
<style lang="less" scoped>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }

</style>
