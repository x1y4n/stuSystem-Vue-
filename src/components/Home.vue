<template>
  <div style="background-color: #F2E9E8;">
    <nav-menu v-if="isShow"></nav-menu>
    <router-view/>
  </div>
</template>

<script>
  import NavMenu from './common/NavMenu.vue'
  export default {
    name: 'Home',
    components: {NavMenu,},
    data(){
      return {
        isShow:JSON.parse(localStorage.getItem('userInfo')).id==null,
        
      }
    }
  }
</script>

<style scoped>

</style>

