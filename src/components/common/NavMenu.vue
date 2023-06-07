<template>
    <el-menu
      :default-active="activeIndex"
      router
      mode="horizontal"
      background-color="#F6F4E8"
      text-color="#222"
      active-text-color="red"
      style="min-width: 800px; top: auto;">
      <el-menu-item  v-for="(item,i) in activeUsers" :key="i" :index="item.name">
        {{ item.navItem }}
      </el-menu-item>
      
      <a href="/login" @click="logout()" style="color: #222;float: right;padding: 20px;">注销登陆</a>
      <a href="/password"  style="color: #222;float: right;padding: 20px;">修改密码</a>
      <i class="el-icon-menu" style="float:right;font-size: 45px;color: #222;padding-top: 8px"></i>
    </el-menu>
</template>

<script>
  export default {
    name: 'NavMenu',
    data () {
      return {
        isStu: true,
        activeIndex: '/index',
        navList: [
          {name: '/index', navItem: '首页', isShow: true},
          {name: '/studentSearch', navItem: '学生信息查询', isShow: JSON.parse(localStorage.getItem('userInfo')).sid!=null},
          {name: '/teacherSearch', navItem: '教师信息查询', isShow: JSON.parse(localStorage.getItem('userInfo')).tid!=null},
        ]
      }
    },
    computed: {//通过计算属性过滤掉列表中不需要显示的项目
      activeUsers: function () {
        return this.navList.filter(function (user) {
          return user.isShow;//返回isShow=true的项，添加到activeUsers数组
        })
      }
    },
    created(){
        this.isStu=true
    },
    mounted() {
      this.activeIndex = "/"+this.$route.path.split("/")[1]
      console.log(this.activeIndex)
    },
    methods:{
      logout(){
        console.log("************")
        this.$store.commit("REMOVE_INFO")
      }
    }
  }
</script>

<style scoped>
  a{
    text-decoration: none;
  }

  span {
    pointer-events: none;
  }
</style>

