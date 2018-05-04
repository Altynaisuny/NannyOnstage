<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/registerView/choose' }">注册</el-breadcrumb-item>
  <el-breadcrumb-item>保姆注册</el-breadcrumb-item>
</el-breadcrumb>
     <el-row>
          <el-col :span="8" :offset="3">
            <el-steps :active="active" finish-status="success">
          <el-step title="填写个人信息"></el-step>
          <el-step title="完善密码"></el-step>
          <el-step title="完成"></el-step>
          </el-steps>
            <el-form ref="form" :model="form" label-width="100px" size="small"  status-icon :rules="rules">
              <el-form-item label="姓名" prop="nannyName">
                <el-input v-model="form.nannyName"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                <el-select v-model="form.sex" placeholder="请选择性别">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="出生日期" prop="birthday">
                <el-col :span="12">
                  <el-date-picker type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="form.birthday" style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="地址" prop="address">
                <el-input v-model="form.address"></el-input>
              </el-form-item>
              <el-form-item label="身份证号" prop="pinCard">
                <el-input v-model="form.pinCard"></el-input>
              </el-form-item>
              <el-form-item label="手机" prop="mobile">
                <el-input v-model="form.mobile"></el-input>
              </el-form-item>
              <el-form-item label="首次注册">
                <el-switch v-model="form.delivery"></el-switch>
              </el-form-item>
              <el-form-item label="从业相关">
                <el-alert
                  title=""
                  type="success"
                  description="请诚实勾选"
                  close-text="知道了">
                </el-alert>
                <el-checkbox-group v-model="form.tag">
                  <el-checkbox label="3年以上年保育经验" name="tag"></el-checkbox>
                  <el-checkbox label="已育子女" name="tag"></el-checkbox>
                  <el-checkbox label="婚姻美满" name="tag"></el-checkbox>
                  <el-checkbox label="无犯罪行为" name="tag"></el-checkbox>
                  <el-checkbox label="银行无贷款" name="tag"></el-checkbox>
                  <el-checkbox label="无劳务诉讼" name="tag"></el-checkbox>
                  <el-checkbox label="无精神病史" name="tag"></el-checkbox>
                  <el-checkbox label="无偷盗前科" name="tag"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="服务意向">
                <el-checkbox-group v-model="form.aim">
                  <el-checkbox label="家庭钟点" name="aim"></el-checkbox>
                  <el-checkbox label="病人陪护" name="aim"></el-checkbox>
                  <el-checkbox label="终点工" name="aim"></el-checkbox>
                  <el-checkbox label="家教辅导" name="aim"></el-checkbox>
                  <el-checkbox label="营养指导" name="aim"></el-checkbox>
                  <el-checkbox label="育婴早教" name="aim"></el-checkbox>
                  <el-checkbox label="母婴护理" name="aim"></el-checkbox>
                  <el-checkbox label="产妇护理" name="aim"></el-checkbox>
                  <el-checkbox label="家庭护理" name="aim"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="学历">
                <el-select v-model="form.edu" placeholder="请选择">
                  <el-option label="小学" value="小学"></el-option>
                  <el-option label="初中" value="初中"></el-option>
                  <el-option label="高中" value="高中"></el-option>
                  <el-option label="大学" value="大学"></el-option>
                  <el-option label="硕士" value="硕士"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="对雇主要求">
                <el-input type="textarea" v-model="form.require"></el-input>
              </el-form-item>
              <el-form-item label="自我介绍">
                <el-input type="textarea" v-model="form.describe"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">下一步</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="8" :offset="3">
            <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="审核标准" name="1">
              <div>信息采集根据填写的详实度进行审核</div>
            </el-collapse-item>
            <el-collapse-item title="提示" name="2">
              <div>说明</div>
            </el-collapse-item>
            <el-collapse-item title="提示" name="3">
              <div>说明</div>
            </el-collapse-item>
            <el-collapse-item title="提示" name="4">
              <div>说明</div>
            </el-collapse-item>
          </el-collapse>
          </el-col>
        </el-row>
  </div>
</template>
<script>
export default {
  data(){
      return{
        active: 1,
        activeName: '1',
        form: {
          nannyName: "",
          sex: "",
          birthday: "",
          mobile :'',
          delivery: false,//首次注册
          tag: [],//个人标签
          aim: [],//意向
          describe: "",//自我介绍
          address:'',
          pinCard:'',//身份证
          edu:'',//教育水平
          require:''//对雇主要求
        },
        rules: {
          nannyName :[{
            required: true,
            trigger : "blur",
            message:'姓名不能为空'
          }],
          sex :[{
            required: true,
            trigger : "blur",
            message:'性别不能为空'
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
  components:{},
  methods:{
     onSubmit(formName) {
        this.$refs[formName].validate(valid => {
          if (valid){
            this.$http.post('/api/apply',{
              nannyName :this.form.nannyName,
              sex : this.form.sex,
              birthday : this.form.birthday,
              mobile : this.form.mobile,
              tag : this.form.tag.toString(),
              aim : this.form.aim.toString(),
              describe : this.form.describe,
              address : this.form.address,
              pinCard :this.form.pinCard,
              edu : this.form.edu,
              require : this.form.require
          }).then(response => {
            var data = response.data;
            if (data.result == '0'){
              //注册失败
              this.$message.error(data.message);
            }else {
              //注册成功后，返回nannyNo.
              this.$router.push({path:'/applyView/second', query:{nannyNo : data.nannyNo}});
              if (this.active++ > 2) {
                this.active = 0;
              }
            }
          }).catch(error => {
            console.log(error);
          });
          }else{

          }
        })
        
      },
      next() {
        if (this.active++ > 2) this.active = 0;
      }
  }
}
</script>
<style lang="less" scoped>

</style>


