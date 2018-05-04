<template>
  <div>
      <headerBar/>
      <router-view/>
  </div>
</template>
<script>
import headerBar from "../components/HeaderBar.vue";
export default {
  data(){
      return{

      }
  },
  components:{headerBar},
  methods:{

  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>

</style>

