<template>
    <el-descriptions  direction="vertical" :column="4" border>
        <el-descriptions-item label="学号"  content-class-name="my-content">kooriookami</el-descriptions-item>
        <el-descriptions-item label="姓名"  content-class-name="my-content">周辉</el-descriptions-item>
        <el-descriptions-item label="联系电话">18100000000</el-descriptions-item>
        <el-descriptions-item label="出生日期" :span="2">2002/11/1</el-descriptions-item>
        <el-descriptions-item label="专业">软件工程</el-descriptions-item>

        <el-descriptions-item label="备注">
            <el-tag size="small">湖北工程学院</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
    </el-descriptions>
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