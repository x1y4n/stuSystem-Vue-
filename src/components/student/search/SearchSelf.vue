<template>
    <el-descriptions  direction="vertical" :column="4" border>
        <el-descriptions-item label="学号"  content-class-name="my-content">{{ info.sid }}</el-descriptions-item>
        <el-descriptions-item label="姓名"  content-class-name="my-content">{{info.sname}}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{info.sphone}}</el-descriptions-item>
        <el-descriptions-item label="出生日期" :span="2">{{info.sbirthday}}</el-descriptions-item>
        <el-descriptions-item label="专业">{{info.major}}</el-descriptions-item>
        <el-descriptions-item label="性别">{{info.sgender}}</el-descriptions-item>

        <el-descriptions-item label="备注">
            <el-tag size="small">{{info.sremark}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="联系地址">{{info.saddress}}</el-descriptions-item>
    </el-descriptions>
</template>

<script>
    export default {
      data(){
        return{ 
          info:{}
        }
        },
      mounted: function(){
	      this.getStu();//需要触发的函数
        },
      methods:{
        getStu(){
          console.log(JSON.parse(localStorage.getItem('userInfo')).sid)
          this.$axios.get(`http://localhost:8081/api/stu/`+JSON.parse(localStorage.getItem('userInfo')).sid).then(res=>{
            if (res.data.code === 200) {
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