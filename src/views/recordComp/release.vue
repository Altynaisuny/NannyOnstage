<template>
  <div>
    <el-row>
      <el-col :span="8" :offset="8">
        <h1>信息发布</h1>
        <el-form ref="form" :model="form" label-width="100px" status-icon :rules="rules">
          <el-form-item label="具体描述" prop="describe">
            <el-input type="textarea" v-model="form.describe"></el-input>
          </el-form-item>
          <el-form-item label="薪酬" prop="pay">
            <el-input v-model="form.pay">
              <template slot="append">元/月</template>
            </el-input>
          </el-form-item>
          <el-form-item label="服务类型" prop="type">
            <el-select v-model="form.type" filterable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工作地点" prop="workAddress">
            <el-input v-model="form.workAddress"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="mobile">
            <el-input v-model="form.mobile"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">发布</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>

    </el-row>

  </div>

</template>
<script>
  export default {
    data() {
      return {
        form: {
          describe: '',
          pay: '',
          workAddress: '',
          mobile: '',
          status: '',
          type: ''
        },
        customerNo:'',
        rules: {
          describe: [{
            required: true,
            trigger: "blur",
            message: '不能为空'
          }],
          mobile: [{
            required: true,
            trigger: "blur",
            message: '不能为空'
          }],
          pay: [{
            required: true,
            trigger: "blur",
            message: '不能为空'
          }],
          workAddress: [{
            required: true,
            trigger: "blur",
            message: '不能为空'
          }],
          type: [{
            required: true,
            trigger: "blur",
            message: '不能为空'
          }],
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
          }
        ]
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$http.post('/api/record/release', {
                describe: this.form.describe,
                pay:this.form.pay,
                workAddress:this.form.workAddress,
                mobile:this.form.mobile,
                status:'0',
                type:this.form.type,
                customerNo : this.customerNo
              })
              .then(response=>{
                var data = response.data;
                if (data.result == '1'){
                    this.$message({message: '发布成功！订单号：'+data.recordNo,type: 'success'});
                    this.resetForm('form');
                } else {
                    this.$message.error(data.message);
                }
              })
              .catch(error=> {
                console.log(error);
              });
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted(){
        this.customerNo = window.sessionStorage.getItem("customerNo")
    }
  }

</script>
<style lang="less" scoped>


</style>
