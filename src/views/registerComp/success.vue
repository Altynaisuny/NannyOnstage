<template>
  <div>
      <h4>注册成功！</h4>
      账号：{{customerNo}},您也可以使用手机号登陆
  </div>
</template>
<script>
export default {
  data(){
      return{
        customerNo : ''
      }
  },
  methods:{

  },
  mounted(){
      this.customerNo = this.$route.query.customerNo
  }
}
</script>
<style lang="less" scoped>

</style>


