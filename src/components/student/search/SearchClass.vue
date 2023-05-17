<template>
    <div>
    <el-descriptions  direction="vertical" :column="4" border>
        <el-descriptions-item label="班级名称" content-class-name="my-content">{{info.classid}}</el-descriptions-item>
        <el-descriptions-item label="专业" content-class-name="my-content">{{info.major}}</el-descriptions-item>
        <el-descriptions-item label="班级人数">{{info.num}}</el-descriptions-item>
        <el-descriptions-item label="入学年份" >{{info.classTime}}</el-descriptions-item>
        <el-descriptions-item label="辅导员">{{info.fdy}}</el-descriptions-item>
    </el-descriptions>
    </div>
</template>

<script>
    export default {
      data(){
        return{
           info:{}
        }
        }, 
      mounted: function(){
	      this.getClass();//需要触发的函数
        },
      methods:{
        getClass(){
          this.$axios.get(`http://localhost:8081/api/stu/class/`+this.$store.state.userInfo.sid).then(res=>{
            if (res.data.code === 200) {
              console.log(res.data)
              this.info = res.data.data
              console.log(this.info)
            }
          })
        }
      }
    }
</script>

<style>
  .my-content {
    color: #bf1919;
    font-size: medium;
  }
</style>