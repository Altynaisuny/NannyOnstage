<template>
  <div class="login-main">
    <headerBar/>
    <div class="login-card">
    <el-card >
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px">
        <input style="display:none">
        <!-- for disable autocomplete on chrome -->
        <el-form-item label="">
          <el-radio v-model="sign" label="保姆">保姆</el-radio>
          <el-radio v-model="sign" label="客户">客户</el-radio>
        </el-form-item>
        <el-form-item label="手机/账号" prop="user">
          <el-input v-model="loginForm.user" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="">
         <el-button type="text" @click="register()">客户注册</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登陆</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    </div>
  </div>
</template>
<script>
  import headerBar from "../components/HeaderBar.vue";
  export default {
    data() {
      return {
        sign: '客户',
        loginForm: {
          user: "",
          password: ""
        },
        rules: {
          password: [{
            required: true,
            trigger: "blur",
            message: "请输入密码"
          }],
          user: [{
            required: true,
            trigger: "blur",
            message: "账号不能为空"
          }]
        }
      };
    },
    components: {
      headerBar
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            //登录测试api
            this.$http
              .post("/api/login", {
                user: this.loginForm.user,
                password: this.loginForm.password,
                sign : this.sign
              })
              .then(response => {
                var data = response.data;
                if (data.result == '1') {
                  //存入session
                  window.sessionStorage.setItem('id', data.id);
                  window.sessionStorage.setItem('sign', data.sign);
                  window.sessionStorage.setItem('name', data.name);
                  if (data.sign == '保姆'){
                    window.sessionStorage.setItem('nannyNo', data.nannyNo);
                  } else {
                    window.sessionStorage.setItem('customerNo', data.customerNo);
                  }
                  this.$message({message: '恭喜你，登录成功',type: 'success'});
                  this.$router.push("/mainView");
                } else {
                  this.$message.error('账号/密码错误');
                }

              })
              .catch(error => {
                console.log(error);
              });
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //注册
      register(){
        this.$router.push("/registerView/choose");
      }
    },
    mounted(){
      this.resetForm('loginForm');
    }
  };

</script>
<style lang="less" scoped>
  
  .login-main{
    width: 100%;
    height: 100%;
    background-image: url('../assets/login.jpg')
  }
  .login-card{
    width: 500px;
    height: 400px;
    float: right;
  }

</style>
