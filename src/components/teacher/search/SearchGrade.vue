<template>
    <div>
        <div class="filter-container">
                        <el-input placeholder="图书名称" style="width: 200px;" class="filter-item"></el-input>
                        <el-button class="dalfBut">查询</el-button>
                        <el-button type="primary" class="butT" @click="handleCreate()">新建</el-button>
        </div>
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
            prop="sid"
            label="学号"
            sortable
            width="350">
            </el-table-column>

            <el-table-column
            prop="sname"
            label="姓名"
            sortable
            width="350">
            </el-table-column>

            <el-table-column
            prop="grade"
            label="成绩"
            sortable
            width="300">
            </el-table-column>

            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- @current-change="handleCurrentChange" -->
        <el-pagination
            class="pagiantion"
            :current-page="pagination.currentPage"
            :page-size="pagination.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="pagination.total">
        </el-pagination>



        <!-- 新增标签弹层 -->
        <el-dialog title="提交成绩" :visible.sync="dialogFormVisible">
            <el-form ref="addFormData" :model="addFormData" :rules="rules" label-position="right" label-width="100px">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="课程名">
                            <el-input v-model="info[0].coursename" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="课程号" prop="courseid">
                            <el-input v-model="info[0].courseid" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="10">
                        <el-form-item label="学号" prop="sid">
                            <el-input v-model="addFormData.sid" ></el-input>
                        </el-form-item>
                    </el-col>
                    
                    <el-col :span="8">
                        <el-form-item label="成绩" prop="grade">
                            <el-input v-model.number="addFormData.grade" ></el-input>
                        </el-form-item>
                    </el-col>
                    
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm1('addFormData')">确定</el-button>
            </div>
        </el-dialog>

        <!-- 编辑标签弹层 -->
        <el-dialog title="编辑成绩" :visible.sync="dialogFormVisible4Edit">
            <el-form ref="editFormData" :model="editFormData" :rules="rules" label-position="right"
                    label-width="100px">
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="学号">
                                    <el-input v-model="editFormData.sid" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="课程号">
                                    <el-input v-model="editFormData.courseid" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="成绩" prop="grade">
                            <el-input v-model.number="editFormData.grade"></el-input>
                        </el-form-item>
                    <el-form-item>
                        <el-button @click="dialogFormVisible4Edit = false">取消</el-button>
                        <el-button type="primary" @click="submitForm2('editFormData')">确定</el-button>
                    </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    export default{
        data(){
            var checkGrade = (rule, value, callback) => {
                if (!value) {
                return callback(new Error('成绩不能为空'));
                }
                setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    if (value < 0 || value>100) {
                    callback(new Error('成绩必须为0-100'));
                    } else {
                    callback();
                    }
                }
                }, 1000);
            };
            return {
                pagination: {},
                dataList: [],//当前页要展示的分页列表数据
                addFormData: {
                    courseid:'',
                    sid:'',
                    grade:''
                },//添加表单数据
                editFormData: {},//编辑表单数据
                dialogFormVisible: false,//增加表单是否可见
                dialogFormVisible4Edit:false,//编辑表单是否可见
                loading:false,//是否显示加载圈
                busy:true,//是否可以请求
                rules: {//校验规则
                sid: [{required: true, message: '学号不能为空', trigger: 'blur'}],
                grade:[{validator: checkGrade, trigger: 'blur'}]
                },
                info: [{},{}],
                multipleSelection:[]
            }
        },
        //钩子函数，VUE对象初始化完成后自动执行
        created() {
            this.getGrade();//需要触发的函数
        },
        methods: {
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
            doQuery(){
            },
             //弹出添加窗口
             handleCreate() {
                this.dialogFormVisible = true;
                this.resetForm();
            },
            //弹出编辑窗口
            handleUpdate(row) {
                this.editFormData = row
                this.dialogFormVisible4Edit=true//编辑表单是否可见
            },
            //重置表单
            resetForm() {
                this.formData = {};
            },

            //添加成绩
            handleAdd() {
                // 发送Ajax请求
                this.$axios.post(`/api/teacher/grade/`,{
                    "sid": this.addFormData.sid,
                    "grade": this.addFormData.grade,
                    "courseid": this.info[0].courseid
                }).then(res=>{
                    if (res.data.code === 200) {
                        this.$message.success("添加成功")
                        this.dialogFormVisible=false
                        this.getGrade()
                    }else{
                        this.$message.error("添加失败")
                    }
                })
            },

            //编辑成绩
            handleEdit(){
                this.$axios.put("/api/teacher/grade/",{
                    "grade": this.editFormData.grade,
                    "sid": this.editFormData.sid,
                    "courseid": this.editFormData.courseid
                }).then(res=>{
                    if (res.data.code === 200) {
                        this.$message.success("更新成功")
                        this.dialogFormVisible4Edit=false
                        this.getGrade()
                    }else{
                        this.$message.error("更新失败")
                    }
                })
            },

            //查询全部成绩
            getGrade(){
                this.$axios.post(`/api/teacher/courses/`,{
                    "tid":JSON.parse(localStorage.getItem("userInfo")).tid,
                    "courseid":this.$route.query.courseid
                }).then(res=>{
                    if (res.data.code === 200) {
                        this.info = res.data.data
                        console.log(this.info)
                    }else{
                        this.$message.error("更新失败")
                    }
                })
            }
        }
    }
</script>