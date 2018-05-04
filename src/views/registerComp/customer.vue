<template>
  <div>
      <el-row>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/registerView/choose' }">注册</el-breadcrumb-item>
      <el-breadcrumb-item>客户注册</el-breadcrumb-item>
    </el-breadcrumb>
      </el-row>
    <el-row>
      <el-col :span="8" :offset="3">
        <el-form ref="form" :model="form" label-width="100px" size="small" status-icon :rules="rules">
          <el-form-item label="姓名" prop="customerName">
            <el-input v-model="form.customerName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="form.sex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
            <el-col :span="12">
              <el-date-picker type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="form.birthday"
                style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
           <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="pinCard">
            <el-input v-model="form.pinCard"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="form.mobile"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">下一步</el-button>
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
          customerName: "",
          sex: "",
          birthday: "",
          mobile: '',
          address: '',
          pinCard: '', //身份证
          password:'',
          email:''
        },
        rules: {
          customerName: [{
            required: true,
            trigger: "blur",
            message: '姓名不能为空'
          }],
          sex: [{
            required: true,
            trigger: "blur",
            message: '性别不能为空'
          }],
          mobile: [{
            required: true,
            trigger: "blur",
            message: "手机不能为空"
          }],
          pinCard: [{
            required: true,
            trigger: "blur",
            message: "实名认证必填项"
          }]
        }
      }

    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$http.post('/api/customer/register', {
              customerName: this.form.customerName,
              sex: this.form.sex,
              birthday: this.form.birthday,
              mobile: this.form.mobile,
              address: this.form.address,
              pinCard: this.form.pinCard, 
              password:this.form.password,
              email:this.form.email
            }).then(response => {
              var data = response.data;
              if (data.result == '0') {
                //注册失败
                this.$message.error(data.message);
              }  else {
                  this.$router.push({path:'/registerView/success', query:{customerNo : data.customerNo}});
              }
              
            }).catch(error => {
              console.log(error);
            });
          }
        })

      },
    }
}
</script>
<style lang="less" scoped>


</style>
