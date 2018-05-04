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
}
</script>
<style lang="less" scoped>

</style>


