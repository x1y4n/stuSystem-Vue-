<template>
    <div style="margin-left: 10px;">
        <el-row :gutter="20" style="margin-top: 20px;">
            <el-col :span="4">
                <el-input placeholder="按课程名称查询" clearable v-model="searchList.coursename"></el-input>
            </el-col>
  
            <el-col :span="4">
                <el-input placeholder="按课程号查询" clearable v-model="searchList.courseid"></el-input>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px;">
            <el-col :span="4">
                <el-input placeholder="按教师号查询" clearable v-model="searchList.tid"></el-input>
            </el-col>

            <el-col :span="4">
                <el-select v-model="searchList.week" clearable  placeholder="按时间查询">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
  
       
        <el-row>
            <el-col>
                <el-button type="primary" round @click="doQuery()">查询</el-button>
                <el-button type="primary" round @click="addCourseTable()">添加课表信息</el-button>
            </el-col>
        </el-row>      
        <el-table
        :data="info"
        style="width: 100%"
        height="500px"
        v-loading="loading"
        :default-sort = "{prop: 'week'}"
        >
        
        <el-table-column
            align="center"
            label="上课时间"
            sortable
            width="160px">

                <el-table-column
                prop="week"
                align="center"
                label="星期数"
                sortable
                width="160px">
                </el-table-column>

                <el-table-column
                align="center"
                label="节数"
                width="160px">
                    <template slot-scope="scope">
                        {{ scope.row.start }}-{{ scope.row.end }}节
                    </template>
                </el-table-column>
            
            </el-table-column>
            
            <el-table-column
            prop="courseid"
            align="center"
            label="课程号"
            sortable
            width="160px">
            </el-table-column>

            <el-table-column
            prop="coursename"
            align="center"
            label="课程名"
            sortable
            width="160px">
            </el-table-column>

            <el-table-column
            prop="classid"
            align="center"
            label="班级"
            sortable
            width="160px">
            </el-table-column>
            
            <el-table-column
            prop="tid"
            align="center"
            label="教师号"
            sortable
            width="160px">
            </el-table-column>

            <el-table-column
            prop="tname"
            align="center"
            label="教师名"
            sortable
            width="160px">
            </el-table-column>

            <el-table-column
            prop="address"
            align="center"
            label="上课地址"
            sortable
            width="160px">
            </el-table-column>

            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <!-- 编辑标签弹层 -->
        <el-dialog title="编辑课程表" :visible.sync="dialogFormVisible4Edit">
            <el-form ref="FormData" :model="FormData" :rules="rules" label-position="right" label-width="100px">
                <el-row :gutter="10">
                    <el-col :span="10">
                        <el-form-item label="课程名" prop="coursename" >
                            <el-input v-model="FormData.coursename" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="课程号" prop="courseid" >
                            <el-input v-model="FormData.courseid" ></el-input>
                        </el-form-item>
                    </el-col>     
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="6">
                        <el-form-item label="上课地址" prop="address" >
                            <el-input v-model="FormData.address" ></el-input>
                        </el-form-item>
                    </el-col> 
                    <el-col :span="6">
                        <el-form-item label="星期数" prop="week" >
                            <el-input v-model="FormData.week" ></el-input>
                        </el-form-item>
                    </el-col>  
                    <el-col :span="6">
                        <el-form-item label="开始节数" prop="starts" >
                            <el-input v-model="FormData.start" ></el-input>
                        </el-form-item>
                    </el-col>    
                    <el-col :span="6">
                        <el-form-item label="结束节数" prop="end" >
                            <el-input v-model="FormData.end" ></el-input>
                        </el-form-item>
                    </el-col>    
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible4Edit = false">取消</el-button>
                <el-button type="primary" @click="submitForm2('FormData')">确定</el-button>
            </div>
        </el-dialog>
    </div>
  </template>
  <script>
    export default{
        data(){
            return {
                options: [{
                    value: '1',
                    label: '星期一'
                    }, {
                    value: '2',
                    label: '星期二'
                    }, {
                    value: '3',
                    label: '星期三'
                    }, {
                    value: '4',
                    label: '星期四'
                    }, {
                    value: '5',
                    label: '星期五'
                    }, {
                    value: '6',
                    label: '星期六'
                    }, {
                    value: '7',
                    label: '星期天'
                    }
                ],
                searchList: {
                    courseid:'',
                    coursename:'',
                    tid:'',
                    week:'',
                }, //查询条件
                teacherid: [], 
                FormData: {
                    courseid:'',
                    coursename:'',
                    address:'',
                    start: '',
                    end:'',
                    week:'',
                },//添加/编辑表单数据
  
                dialogFormVisible4Edit:false,//编辑表单是否可见
                loading:false,//是否显示加载圈
                busy:true,//是否可以请求
                rules: {//校验规则
                coursename: [{required: true, message: '课程名不能为空', trigger: 'blur'}],
                courseid: [{required: true, message: '课程号不能为空', trigger: 'blur'}],
                },
                info: [],
                multipleSelection:[]
            }
        },
        //钩子函数，VUE对象初始化完成后自动执行
        created() {
            this.getAllScores();//需要触发的函数
            this.getAllScores()
        },
        methods: {
            // 跳转添加排课页面
            addCourseTable(){
                this.$router.push("makeCourseTable")
            },

            //编辑验证
            submitForm2(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.handleEdit()
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
  
            //根据条件查询课程表
            doQuery(){
                console.log(this.searchList.week)
                this.$axios.post(`/api/classtable/query`,{
                    "coursename": this.searchList.coursename,
                    "courseid": this.searchList.courseid,
                    "tid": this.searchList.tid,
                    "week": this.searchList.week
                }).then(res=>{
                    if (res.data.code === 200) {
                        this.$message.success("查询成功")
                        this.info = res.data.data
                    }else{
                        this.$message.error("查询失败")
                    }
                })
            },
            
            //弹出编辑窗口
            handleUpdate(row) {
                this.resetForm();
                this.FormData = row
                this.dialogFormVisible4Edit=true//编辑表单是否可见
            },
            //重置表单
            resetForm() {
                this.FormData = {};
            },
  

            //删除课程表信息
            handleDelete(row) {
                //1. 弹出提示框
                this.$confirm("此操作将永久删除当前数据，是否继续？", "提示", {
                    type: 'info'
                }).then(() => {
                    console.log(row.sid,row.courseid)
                    this.$axios.delete(`/api/admin/course/`,{
                        data:{
                            "sid":row.sid,
                        "courseid":row.courseid
                        }
                    }).then((res) => {
                        if (res.data.code === 200) {
                            this.$message.success("删除成功")
                        } else if (res.data.code === 404) {
                            this.$message.error("删除失败")
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    }).finally(() => {
                        this.getAllScores();
                    })
                }).catch(()=>{
                    this.$message.success("取消删除操作")
                })
            },

            //编辑课程表信息
            handleEdit(){
                this.$axios.put("/api/classtable",{
                    "coursename": this.FormData.coursename,
                    "courseid": this.FormData.courseid,
                    "address": this.FormData.address,
                    "start": this.FormData.start,
                    "end": this.FormData.end,
                    "week": this.FormData.week,
                }).then(res=>{
                    this.resetForm()
                    if (res.data.code === 200) {
                        this.$message.success("更新成功")
                        this.dialogFormVisible4Edit=false
                        this.getAllScores()
                    }else{
                        this.$message.error("更新失败")
                    }
                })
            },
  
            //查询所有课程表信息
            getAllScores(){
                this.$axios.get(`/api/classtable`,).then(res=>{
                    if (res.data.code === 200) {
                        this.info = res.data.data
                    }else{
                        this.$message.error("查询失败")
                    }
                })
            },
  
        }
    }
  </script>