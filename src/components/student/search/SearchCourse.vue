<template>
    <div>
         <!-- 1.查询表单 -->
         <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label="课程号" prop="cx_cno">
                            <el-input 
                            placeholder="请输入课程号"
                            v-model="ruleForm.cx_cno"
                            style="width:200px"
                            >
                            <!-- clearable 输入框可清除属性 -->
                            </el-input>
                        </el-form-item>
                    </el-col>  
                    <el-col :span='12'>
                        <el-form-item label="课程名" prop="cx_cname">
                            <el-input 
                            placeholder="请输入课程名称"
                            v-model="ruleForm.cx_cname"
                            style="width:200px"
                            >
                            <!-- clearable 输入框可清除属性 -->
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :span="8">
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                </el-row>
            </el-form>
            <!-- 2.列表展示（可勾选） -->
            <el-table
            :data="tableData"
            style="width: 100%"
            v-loading="loading"
            :default-sort = "{prop: 'date', order: 'descending'}"
            >
                <el-table-column
                prop="cno"
                label="课程号"
                sortable
                width="300">
                </el-table-column>

                <el-table-column
                prop="cname"
                label="课程名"
                sortable
                width="350">
                </el-table-column>

                <el-table-column
                prop="xs"
                label="学时"
                sortable
                width="300">
                </el-table-column>

                <el-table-column
                prop="xf"
                label="学分"
                sortable
                width="200">
                </el-table-column>

<!-- 
                <el-table-column
                prop="address"
                label="地址"
                :formatter="formatter">
                </el-table-column> -->
        </el-table>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                loading:false,//是否显示加载圈
                busy:true,//是否可以请求
                queryParams:{
                pcustName:'',
                custClass:''
                },

                //定义表单规则
                ruleForm:{
                    cx_cno: '',
                    cx_cname: '',
                },
                rules:{
                    cx_cno:[
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    ],
                    cx_cname:[
                        { required: true, message: '请填写课程名', trigger: 'blur' }
                    ]
                },
                tableData: [{
                cno: '001',
                cname: '计算机网络',
                xs: '16学时',
                xf: '4'
                }, {
                cno: '002',
                cname: '操作系统',
                xs: '16学时',
                xf: '6'
                }, 
                {
                cno: '003',
                cname: '数据库原理',
                xs: '16学时',
                xf: '6'
                }, 
                {
                cno: '004',
                cname: 'java程序设计',
                xs: '16学时',
                xf: '2'
                },],
                multipleSelection:[]
            }
        },
        methods: {
            doQuery(){
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            // formatter(row, column) {
            //     console.log(row.address)
            //     return row.address;
            // }
        }
    }
</script>