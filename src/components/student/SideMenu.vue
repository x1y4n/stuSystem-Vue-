<template>
    <el-menu
     :default-active="activeIndex"
      router
      mode="horizontal"
      background-color="#BACEC1"
      text-color="#222"
      style="width: 700px;margin-left: 50px;"
      active-text-color="blue">
      <el-menu-item  v-for="(item,i) in navList" :key="i" :index="item.name">
        {{ item.navItem }}
      </el-menu-item>
    </el-menu>
  </template>
  
  <script>
    export default {
      name: 'SideMenu',
      data () {
        return {
          navList: [
            {name: '/studentSearch/searchSelf', navItem: '查询个人信息'},
            {name: '/studentSearch/searchClass', navItem: '查询班级信息'},
            {name: '/studentSearch/searchCourse', navItem: '查询课程信息'},
            {name: '/studentSearch/courseTable', navItem: '查询课程表'},
            {name: '/studentSearch/searchGrade', navItem: '查询个人成绩'}
          ],
          activeIndex:'/studentSearch/searchSelf'
        }
      },
      mounted() {
        this.activeIndex = this.$route.path
      }
    }
  </script>
  
  <style scoped>
  </style>
  
  