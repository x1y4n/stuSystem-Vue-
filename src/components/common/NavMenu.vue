<template>
    <el-menu
      :default-active="activeIndex"
      router
      mode="horizontal"
      background-color="#F6F4E8"
      text-color="#222"
      active-text-color="red"
      style="min-width: 800px; top: auto;">
      <el-menu-item  v-for="(item,i) in navList" :key="i" :index="item.name">
        {{ item.navItem }}
      </el-menu-item>
      <a href="/password" style="color: #222;float: right;padding: 20px;">注销登陆</a>
      <a href="/password" style="color: #222;float: right;padding: 20px;">修改密码</a>
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
          {name: '/index', navItem: '首页'},
          {name: '/studentSearch', navItem: '信息查询'},
          {name: '/library', navItem: '提交成绩'},
          {name: '/admin', navItem: '个人中心'}
        ]
      }
    },
    created(){
        this.isStu=true
    },
    mounted() {
      this.activeIndex = "/"+this.$route.path.split("/")[1]
      console.log(this.activeIndex)

    },
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

