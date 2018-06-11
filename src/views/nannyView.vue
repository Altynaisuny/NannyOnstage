<template>
  <div>
    <el-container>
      <el-header>
        <el-row>

          <el-col :span="14" :offset="6">

            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="编号">
                <el-input v-model="formInline.nannyNo" placeholder="保姆编号"></el-input>
              </el-form-item>
             <el-form-item label="姓名">
                <el-input v-model="formInline.nannyName" placeholder="保姆姓名"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="danger" @click="reset()">重置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="400px">
          <div class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item :to="{path:'/recordView/all'}">发布历史</el-breadcrumb-item>
              <el-breadcrumb-item>订单详情</el-breadcrumb-item>
              <el-breadcrumb-item>查看保姆</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <el-card class="box-card">
            <div>
              姓名:{{nannyInfo.nannyName}}
            </div>
            <div>
              编号：{{nannyInfo.nannyNo}}
            </div>
            <div>
              性别：{{nannyInfo.sex}}
            </div>
            <div>
              生日：{{nannyInfo.birthday}}
            </div>
            <div>
              手机：{{nannyInfo.mobile}}
            </div>
            <div>
              标签：{{nannyInfo.tag}}
            </div>
            <div>
              教育程度：{{nannyInfo.edu}}
            </div>
            <div>
              要求：{{nannyInfo.require}}
            </div>
            <div>
              自我介绍：{{nannyInfo.describe}}
            </div>
            <div>
              意向人群：{{nannyInfo.aim}}
            </div>
          </el-card>
        </el-aside>
        <el-main>
          <div class="tabs">
            <el-tabs type="border-card">
              <el-tab-pane label="从业资历">
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column prop="startTime" label="开始日期" width="180">
                  </el-table-column>
                  <el-table-column prop="endTime" label="结束日期" width="180">
                  </el-table-column>
                  <el-table-column prop="evaluate" label="评价" width="180">
                  </el-table-column>
                  <el-table-column prop="score" label="评分" width="180">
                  </el-table-column>
                  <el-table-column prop="type" label="类型" width="180">
                  </el-table-column>
                  <el-table-column prop="workAddress" label="工作地址">
                  </el-table-column>
                </el-table>
                <div class="pagination">
                  <el-row>
                    <el-col :span="8" :offset="8">
                      <el-pagination background layout="prev, pager, next" :page-count="pagination.pageCount" :page-size="pagination.pageSize"
                        :current-page="pagination.currentPage" @current-change="flip">
                      </el-pagination>
                    </el-col>
                  </el-row>
                </div>
              </el-tab-pane>
              <!-- <el-tab-pane label="配置管理">综合评分</el-tab-pane>
              <el-tab-pane label="角色管理">角色管理</el-tab-pane>
              <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane> -->
            </el-tabs>
          </div>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formInline: {
          nannyNo: '',
          region: '',
          nannyName:''
        },
        nannyInfo: {
          nannyNo: '',
          nannyName: '',
          sex: '',
          birthday: '',
          mobile: '',
          tag: '',
          edu: '',
          require: '',
          describe: '',
          aim: ''
        },
        //分页配置
        pagination: {
          pageCount: 1,
          pageSize: 10, //页面显示条数
          currentPage: 1 //查询页码
        },
        tableData: [],

      }
    },
    methods: {
      onSubmit() {
        
        this.detail();
      },
      fetchTableData() {

      },
      reset(){
        this.formInline.nannyNo = '';
        this.formInline.nannyName = ''
      },
      flip(val) {
        this.pagination.currentPage = val
        this.detail();
      },
      detail() {
        this.$http.post('/api/nanny/info', {
          nannyNo: this.formInline.nannyNo,
          nannyName:this.formInline.nannyName,
          pageSize: this.pagination.pageSize,
          currentPage: this.pagination.currentPage
        }).then(response => {
          var data = response.data;
          console.log(data);
          this.nannyInfo.nannyName = data.info.nannyName;
          this.nannyInfo.sex = data.info.sex;
          this.nannyInfo.aim = data.info.aim;
          this.nannyInfo.describe = data.info.describe;
          this.nannyInfo.edu = data.info.edu;
          this.nannyInfo.mobile = data.info.mobile;
          this.nannyInfo.nannyNo = data.info.nannyNo;
          this.nannyInfo.require = data.info.require;
          this.nannyInfo.tag = data.info.tag;
          this.nannyInfo.birthday = data.info.birthday;
          this.tableData = data.list;
          this.pagination.pageCount = data.rows % this.pagination.pageSize == 0 ? data.rows / this.pagination.pageSize :
            parseInt(data.rows / this.pagination.pageSize) + 1;
          if (data.result == '0') {
            //失败
            this.$message.error(data.message);
          }
        }).catch(error => {
          console.log(error);
        });
      }
    },
    mounted() {
      this.formInline.nannyNo = this.$route.query.nannyNo;
      this.detail();
    }
  }

</script>
<style lang="less" scoped>
  .item {
    padding: 18px 0;
  }

  .breadcrumb {
    margin: 20px;
  }

  .tabs {
    margin-top: 34px;
  }

</style>
