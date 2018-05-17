<template>
  <div>
    <el-container>

      <el-aside width="300px" style="background-color: rgb(238, 241, 246);border: 5px solid #eee">
        <el-select v-model="selectOption" placeholder="请选择服务类型">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-button icon="el-icon-search" circle></el-button>
        <el-input v-model="selectMoney" placeholder="请输入薪酬"></el-input>
        <el-input v-model="selectAddress" placeholder="请输入工作地点"></el-input>
      </el-aside>
      <el-container>
        <el-main>
          <el-row :gutter="20">
            <div v-for="item in list" :key="item.recordNo" class="record-item">
              <el-col :span="6">
                <el-card shadow="hover" :body-style="{height:'150px'}">
                  <div>
                    <div style="margin-bottom:10px;">
                      <el-alert title="" :closable="false" type="info">{{item.describe}}</el-alert>
                    </div>
                    <el-tag type="success">{{item.type}}</el-tag>
                    <el-tag type="warning">{{item.pay}}元/月</el-tag>
                    <el-tag type="info">{{item.workAddress}}</el-tag>
                    <div class="bottom clearfix">
                      <time class="time">{{item.createTime}}</time>
                      <el-button type="text" class="button" @click="detail(item)">详情</el-button>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </div>
          </el-row>
        </el-main>
        <el-footer>
          <div class="pagination">
            <el-row>
              <el-col :span="8" :offset="8">
                <el-pagination background layout="prev, pager, next" :page-count="pagination.pageCount" :page-size="pagination.pageSize"
                  :current-page="pagination.currentPage" @current-change="flip">
                </el-pagination>
              </el-col>
            </el-row>
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        selectOption: '',
        list: [],
        //分页配置
        pagination: {
          pageCount: 1,
          pageSize: 10, //页面显示条数
          currentPage: 1 //查询页码
        },
        options: [{
            value: '家庭钟点',
            label: '家庭钟点',
          }, {
            value: '病人陪护',
            label: '病人陪护'
          },
          {
            value: '钟点工',
            label: '钟点工'
          },
          {
            value: '家教辅导',
            label: '家教辅导'
          },
          {
            value: '营养指导',
            label: '营养指导'
          },
          {
            value: '育婴早教',
            label: '育婴早教'
          },
          {
            value: '母婴护理',
            label: '母婴护理'
          },
          {
            value: '产妇护理',
            label: '产妇护理'
          },
          {
            value: '家庭护理',
            label: '家庭护理'
          }],
        selectMoney:'',//查询金额
        selectAddress:'',//查询地址
      };
    },
    components: {},
    mounted() {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.fetchData()
    },
    methods: {
      flip(val) {
        this.pagination.currentPage = val
        this.fetchData();
      },
      fetchData() {
        this.$http
          .post("/api/record/unclosed", {
            pageSize: this.pagination.pageSize,
            currentPage: this.pagination.currentPage
          })
          .then(response => {
            var data = response.data;
            this.list = data.list;
            this.pagination.pageCount = data.rows % this.pagination.pageSize == 0 ? data.rows / this.pagination.pageSize : parseInt(data.rows / this.pagination.pageSize) + 1;
          })
          .catch(error => {
            console.log(error);
          });
      },
      detail(obj){
        this.$router.push({path:'/recordView/detail', query:{recordNo : obj.recordNo}});
      }
    }
  };

</script>
<style lang="less" scoped>
  .pagination {
    margin-top: 15px;
  }
.record-item{
}
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .money-svg {
    width: 32px;
    height: 32px;
    display: inline-block;
    background: url('/assets/money.svg') no-repeat 0px 0px;
  }

</style>
