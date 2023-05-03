<template>
    <div>
    <el-descriptions  direction="vertical" :column="4" border>
        <el-descriptions-item label="班级名称" content-class-name="my-content">3017541</el-descriptions-item>
        <el-descriptions-item label="专业" content-class-name="my-content">软件工程</el-descriptions-item>
        <el-descriptions-item label="班级人数">58</el-descriptions-item>
        <el-descriptions-item label="入学年份" >2020</el-descriptions-item>
        <el-descriptions-item label="辅导员">李红梅</el-descriptions-item>
    </el-descriptions>
    </div>
</template>

<script>
    export default {
      data(){
        return{
           
        }
        },
    }
</script>

<style>
  .my-content {
    color: #bf1919;
    font-size: medium;
  }
</style>