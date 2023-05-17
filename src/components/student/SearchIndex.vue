<template>
    <el-container>
      <el-header >
        <switch></switch>
        <SideMenu></SideMenu>
      </el-header>
        <router-view/>
    </el-container>
  </template>
  
  <script>
  import SideMenu from './SideMenu.vue'
    export default {
      name: 'AppLibrary',
      components:{
        SideMenu
      }
    }
  </script>
  
  <style scoped>
  
  </style>
  
  