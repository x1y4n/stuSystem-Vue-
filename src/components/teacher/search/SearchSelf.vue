<template>
    <el-descriptions  direction="vertical" :column="4" border>
        <el-descriptions-item label="教师号"  content-class-name="my-content">{{info.tid}}</el-descriptions-item>
        <el-descriptions-item label="姓名"  content-class-name="my-content">{{info.tname}}</el-descriptions-item>
        <el-descriptions-item label="性别">{{ info.tgender }}</el-descriptions-item>
        <el-descriptions-item label="出生日期" :span="2">{{info.tbirthday}}</el-descriptions-item>
        <el-descriptions-item label="院系">{{info.tdept}}</el-descriptions-item>
        <el-descriptions-item label="电话">{{info.tphone}}</el-descriptions-item>
    </el-descriptions>
</template>
<script>
    export default {
      data(){
        return{
           info: {}
        }
      },
      mounted:function(){
        this.getInfo()
      },
      methods:{
        getInfo(){
          this.$axios.get(`http://localhost:8081/api/teacher/`+JSON.parse(localStorage.getItem('userInfo')).tid).then((res)=>{
            if (res.data.code === 200) {
              console.log(res)
              this.info = res.data.data
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