<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/registerView/choose' }">注册</el-breadcrumb-item>
  <el-breadcrumb-item>保姆注册</el-breadcrumb-item>
</el-breadcrumb>
    <el-row>
      <el-col :span="8" :offset="4">
        <el-steps :active="active" finish-status="success">
          <el-step title="填写个人信息"></el-step>
          <el-step title="完善密码"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
        <el-alert
    title="编号："
   type="success"
    show-icon
    :closable="false">
    {{nannyNo}}
    请务必牢记
  </el-alert>
        <el-form ref="form" :model="form" label-width="120px" status-icon :rules="rules">
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="再次输入密码" prop="repassword">
            <el-input v-model="form.repassword" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">下一步</el-button>
            <el-button>取消</el-button>
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
        active: 2,
        form: {
          password: '',
          repassword: ''
        },
        nannyNo: '',
        rules: {
          password :[{
            required:true,
            trigger : "blur",
            message:'密码不能为空'
          }],
          repassword:[{
            required:true,
            trigger:'blur',
            message:'请再输入一遍'
          }]
        },
      }
    },
    mounted(){
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.fetchData()
    },
    components: {},
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate(valid => {
          if (valid){
            this.$http.post('/api/firstSetPassword',{
                nannyNo:this.nannyNo,
                password:this.form.password
            }).then(response =>{
                var data = response.data;
                if (data.result == '1'){
                  this.$router.push('/applyView/third')
                } else {
                   this.$message.error(data.message);
                }
            }).catch(error=>{
              console.log(error);
            });
          }
        })
      },
      fetchData() {
        this.nannyNo = this.$route.query.nannyNo
      }
    },
    

  }

</script>
<style lang="less" scoped>


</style>
