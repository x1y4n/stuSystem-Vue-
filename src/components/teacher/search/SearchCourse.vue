<template>
    <div>
        
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
                >
                </el-table-column>

                <el-table-column
                prop="coursename"
                label="课程名"
                sortable
                >
                </el-table-column>

                <el-table-column
                prop="xs"
                label="学时"
                sortable
                >
                </el-table-column>

                <el-table-column
                prop="credit"
                label="学分"
                sortable
                >
                </el-table-column>
                <el-table-column
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                </template>

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
	      this.getCourse();//需要触发的函数
        },
        methods: {
            handleClick(row) {
                console.log(row);
                this.$router.push({
                path: '/teacherSearch/searchGrade',
                query: {
                    courseid: row.courseid,
                }
	});
            },
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
            getCourse(){
                this.$axios.get(`/api/teacher/courses/`+JSON.parse(localStorage.getItem('userInfo')).tid).then(res=>{
                    if (res.data.code === 200) {
                        this.info = res.data.data
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