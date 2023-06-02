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
  
       
        <el-row>
            <el-col>
                <el-button type="primary" round @click="doQuery()">查询</el-button>
                <el-button type="primary" @click="handleCreate()" round>添加</el-button>
            </el-col>
        </el-row>      
        <el-table
        :data="info"
        style="width: 100%"
        height="500px"
        v-loading="loading"
        :row-class-name="tableRowClassName"
        :default-sort = "{prop: 'courseid'}"
        >
        
  
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
            prop="tid"
            align="center"
            label="教师号"
            sortable
            width="160px">
            </el-table-column>
            
            <el-table-column
            prop="credit"
            align="center"
            label="学分"
            sortable
            width="160px">
            </el-table-column>

            <el-table-column
            prop="xs"
            align="center"
            label="学时"
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
        
  
        <!-- 新增标签弹层 -->
        <el-dialog title="新增课程信息" :visible.sync="dialogFormVisible">
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
                    <el-col :span="10">
                        <el-form-item  label="教师号" prop="tid">
                            <el-select  v-model="FormData.tid" clearable  placeholder="请选择教师号">
                                <el-option
                                v-for="item in teacherid"
                                :key="item.tid"
                                :label="item.tid"
                                :value="item.tid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="学分" prop="credit" >
                            <el-input v-model="FormData.credit" ></el-input>
                        </el-form-item>
                    </el-col>  
                    <el-col :span="6">
                        <el-form-item label="学时" prop="xs" >
                            <el-input v-model="FormData.xs" ></el-input>
                        </el-form-item>
                    </el-col>    
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm1('FormData')">确定</el-button>
            </div>
        </el-dialog>
  
        <!-- 编辑标签弹层 -->
        <el-dialog title="编辑个人信息" :visible.sync="dialogFormVisible4Edit">
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
                    <el-col :span="10">
                        <el-form-item  label="教师号" prop="tid">
                            <el-select  v-model="FormData.tid" clearable  placeholder="请选择教师号">
                                <el-option
                                v-for="item in teacherid"
                                :key="item.tid"
                                :label="item.tid"
                                :value="item.tid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="学分" prop="credit" >
                            <el-input v-model="FormData.credit" ></el-input>
                        </el-form-item>
                    </el-col>  
                    <el-col :span="6">
                        <el-form-item label="学时" prop="xs" >
                            <el-input v-model="FormData.xs" ></el-input>
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
                pagination: {},
                dataList: [],//当前页要展示的分页列表数据
                searchList: {
                    courseid:'',
                    coursename:'',
                }, //查询条件
                teacherid: [], 
                FormData: {
                    courseid:'',
                    coursename:'',
                    tid:'',
                    credit: '',
                    xs:'',
                },//添加/编辑表单数据
  
                dialogFormVisible: false,//增加表单是否可见
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
            this.getTeacherId()
        },
        methods: {

            //表格状态
            tableRowClassName({row, rowIndex}) {
                if(row.grade<60)
                    return 'warning-row';
                else if(row.grade>86)
                    return 'success-row'
            },
            //添加验证
            submitForm1(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('succeed submit!!');
                    this.handleAdd()
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
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
  
            //根据条件查询学生成绩
            doQuery(){
                this.$axios.post(`/api/admin/course/query`,{
                    "coursename": this.searchList.coursename,
                    "courseid": this.searchList.courseid,
                }).then(res=>{
                    if (res.data.code === 200) {
                        this.$message.success("查询成功")
                        this.info = res.data.data
                        console.log(this.info)
                    }else{
                        this.$message.error("查询失败")
                    }
                })
            },
             //弹出添加窗口
             handleCreate() {
                this.dialogFormVisible = true;
                this.resetForm();
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
  
            //添加学生成绩信息
            handleAdd() {
                // 发送Ajax请求
                this.$axios.post(`api/admin/course`,{
                    "coursename": this.FormData.coursename,
                    "courseid": this.FormData.courseid,
                    "tid": this.FormData.tid,
                    "credit": this.FormData.credit,
                    "xs": this.FormData.xs,
                }).then(res=>{
                    if (res.data.code === 200) {
                        this.$message.success("添加成功")
                        this.dialogFormVisible=false
                        this.getAllScores()
                    }else{
                        this.$message.error("添加失败")
                    }
                })
            },

            //删除学生成绩信息
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

            //编辑学生成绩信息
            handleEdit(){
                this.$axios.put("/api/admin/course",{
                    "coursename": this.FormData.coursename,
                    "courseid": this.FormData.courseid,
                    "tid": this.FormData.tid,
                    "credit": this.FormData.credit,
                    "xs": this.FormData.xs,
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
  
            //查询所有课程
            getAllScores(){
                this.$axios.get(`/api/admin/course`,).then(res=>{
                    if (res.data.code === 200) {
                        this.info = res.data.data
                    }else{
                        this.$message.error("查询失败")
                    }
                })
            },
  
            //查询所有老师id
            getTeacherId(){
                this.$axios.get(`/api/admin/teacherid`,).then(res=>{
                    if (res.data.code === 200) {
                        this.teacherid = res.data.data
                        console.log(this.teacherid)
                    }else{
                        this.$message.error("查询失败")
                    }
                })
            }
  
        }
    }
  </script>
<style>
 .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>