<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
        <el-table-column
        prop="recordNo"
        label="编号"
        width="220">
      </el-table-column>      
      <el-table-column label="绑定保姆" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.nannyName }}</p>
            <p>性别: {{ scope.row.sex }}</p>
            <p>电话: {{ scope.row.nannyMobile}}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium"  v-if="scope.row.nannyName != null || scope.row.nannyName != ''">{{ scope.row.nannyName }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="describe"
        label="描述"
        width="220">
      </el-table-column>
      <el-table-column
        prop="pay"
        label="薪酬"
        width="180">
      </el-table-column>   
      <el-table-column
        prop="type"
        label="类型"
        width="180">
      </el-table-column> 
      <el-table-column
        prop="workAddress"
        label="地址"
        width="180">
      </el-table-column>      
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">打开</el-button>
          <el-button size="mini" type="danger" v-if="hasClose(scope.row)" @click="handlClose(scope.$index, scope.row)">结束</el-button>
          <el-button size="mini" type="success" v-else @click="handlClose(scope.$index, scope.row)">已结束</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-footer>
          <div class="pagination">
            <el-row>
              <el-col :span="8" :offset="10">
                <el-pagination background layout="prev, pager, next" :page-count="pagination.pageCount" :page-size="pagination.pageSize"
                  :current-page="pagination.currentPage" @current-change="flip">
                </el-pagination>
              </el-col>
            </el-row>
          </div>
        </el-footer>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [],
        //分页配置
        pagination: {
          pageCount: 1,
          pageSize: 10, //页面显示条数
          currentPage: 1 //查询页码
        }
      }
    },
    methods: {
      hasClose(row){
          if (row.status == "0" ||  row.status == "1"){
            return true;
          }
          return false;
      },
      handleEdit(index, row) {
        this.$router.push({path:'/recordView/apply', query:{recordNo : row.recordNo}});
      },
      //结束
      handlClose(index, row) {
        console.log(index, row);
          this.$confirm('此操作将完成该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
         //这里发请求，将订单状态置为 2
           this.$http.post('/api/record/close', {
             recordNo : row.recordNo
            }).then(response => {
              var data = response.data;
              if (data.result == '0') {
                //失败
                this.$message.error(data.message);
              }  else {
                this.$router.push({path:'/recordView/evaluate', query:{recordNo : row.recordNo}});
              }
              
            }).catch(error => {
              console.log(error);
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      flip(val) {
        this.pagination.currentPage = val
        this.fetchData();
      },
      fetchData(){
        this.$http.post('/api/record/selectCustomerRecordPublish', {
            customerNo: window.sessionStorage.getItem("customerNo"),
            pageSize: this.pagination.pageSize,
            currentPage: this.pagination.currentPage
          })
          .then(response => {
            var data = response.data;
            this.tableData = data.list;
            this.pagination.pageCount = data.rows % this.pagination.pageSize == 0 ? data.rows / this.pagination.pageSize : parseInt(data.rows / this.pagination.pageSize) + 1;
          })
          .catch(error => {
            console.log(error);
          })
      }
    },
    mounted(){
        this.fetchData();
    }
  }

</script>
<style lang="less" scoped>


</style>
