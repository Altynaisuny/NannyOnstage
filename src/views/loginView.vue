<template>
  <el-container>
    <el-header>
      <headerBar/>
    </el-header>
    <el-main>
      <el-row>

  <el-col :span="8" :offset="8">
     <el-card>
      <div class="main-logo"></div>
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px">
        <input style="display:none"><!-- for disable autocomplete on chrome -->
        <el-form-item label="账号" prop="loginNo">
          <el-input type="loginNo" v-model="loginForm.loginNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登陆</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
       </el-card>
  </el-col>

</el-row>
      
    </el-main>
    <el-footer>

    </el-footer>
  </el-container>
 
</template>
<script>
import headerBar from '../components/HeaderBar.vue'
export default {
  data() {
    return {
      loginForm: {
        loginNo:'',
        password: ''
      },
      rules: {
        password: [{ required :true, trigger: "blur" ,message:"请输入密码"}],
        loginNo :[{required:true, trigger:'blur',message:'账号不能为空'}]
      }
    };

  },
  components:{headerBar},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //登录测试api
          this.$http.post('/api/login',{
            loginNo :this.loginForm.loginNo,
            password : this.loginForm.password
          }).then((response) => {
            console.log(response.data)
          }).catch((error)=>{
            console.log(error);
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}

</script>
<style lang="less" scoped>
.logo {
  display: block;
  width: 32px;
  height: 32px;
  background-image: url("../assets/logo.svg") 0px 0px no-repeat;
}
.box-card {
  width: 480px;
}
</style>


