<template>
    <div>
         <!-- 1.查询表单 -->
         <el-form style="margin-top: 20px;" :model="ruleForm" :rules="rules" ref="ruleForm">
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
            :data="info"
            style="width: 100%"
            v-loading="loading"
            :default-sort = "{prop: 'date', order: 'descending'}"
            >
                <el-table-column
                prop="courseid"
                label="课程号"
                sortable
                width="300">
                </el-table-column>

                <el-table-column
                prop="coursename"
                label="课程名"
                sortable
                width="350">
                </el-table-column>

                <el-table-column
                prop="grade"
                label="成绩"
                sortable
                width="300">
                </el-table-column>

                <el-table-column
                prop="credit"
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
                info: [],
                multipleSelection:[]
            }
        },
        mounted: function(){
	      this.getScore();//需要触发的函数
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
            getScore(){
                this.$axios.get(`/api/stu/score/`+JSON.parse(localStorage.getItem('userInfo')).sid).then(res=>{
                    if (res.data.code === 200) {
                        this.info = res.data.data
                        console.log(this.info)
                        }
                    })
            }
            // formatter(row, column) {
            //     console.log(row.address)
            //     return row.address;
            // }
        }
    }
</script>