<template>
    <div style="margin-left: 10px;">
        根据学号查询、根据姓名查询某个学生信息，根据专业、班级查询某个专业、班级所有学生信息
        <el-row :gutter="20">
            <el-col :span="6">
                <el-input placeholder="按学号查询" clearable v-model="searchList.sid"></el-input>
            </el-col>

            <el-col :span="6">
                <el-input placeholder="按姓名查询" clearable v-model="searchList.sname"></el-input>
            </el-col>

            <el-col :span="6">
                <el-select style="width:100%" v-model="searchList.classid" clearable  placeholder="按班级查询">
                    <el-option
                    v-for="item in classList"
                    :key="item.classid"
                    :label="item.classid"
                    :value="item.classid">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select style="width:100%" v-model="searchList.major" clearable  placeholder="按专业查询">
                    <el-option
                    v-for="(item, index) in classList" 
                    :key="index"
                    :label="item.major"
                    :value="item.major">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>

       
        <el-row>
            <el-col>
                <el-button type="primary" round>查询</el-button>
                <el-button type="primary" @click="handleCreate()" style="float: right;">新建</el-button>
            </el-col>
        </el-row>      
        <el-table
        :data="info"
        style="width: 100%"
        height="1080px"
        v-loading="loading"
        :default-sort = "{prop: 'date', order: 'descending'}"
        >
            <el-table-column
            prop="sid"
            align="center"
            label="学号"
            sortable
            width="160px">
            </el-table-column>

            <el-table-column
            label="姓名"
            align="center"
            width="80px">
            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                <p>姓名: {{ scope.row.sname }}</p>
                <p>住址: {{ scope.row.saddress }}</p>
                <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.sname }}</el-tag>
                </div>
                </el-popover>
            </template>
            </el-table-column>
           
            <el-table-column
            prop="sgender"
            align="center"
            label="性别"
            width="80px">
            </el-table-column>

            <el-table-column
            label="生日"
            align="center"
            width="180px">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.sbirthday }}</span>
            </template>
            </el-table-column>
            

            <el-table-column
            prop="major"
            align="center"
            label="专业"
            width="100px">
            </el-table-column>

            <el-table-column
            prop="classid"
            align="center"
            label="班级号"
            width="180px">
            </el-table-column>

            <el-table-column
            prop="sphone"
            align="center"
            label="电话号码"
            width="180px">
            </el-table-column>

            <el-table-column
            prop="sremark"
            label="备注"
            sortable
            width="100px">
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
        <el-dialog title="新增个人信息" :visible.sync="dialogFormVisible">
            <el-form ref="addFormData" :model="addFormData" :rules="rules" label-position="right" label-width="100px">

                <el-row :gutter="10">
                    <el-col :span="10">
                        <el-form-item label="学号" prop="sid">
                            <el-input v-model="addFormData.sid" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="姓名" prop="sname">
                            <el-input v-model="addFormData.sname" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="性别" prop="sgender" lable="性别">
                            <el-select v-model="addFormData.sgender"  placeholder="请选择">
                                <el-option
                                v-for="item in [{value: '男',label: '男'},{value: '女',label: '女'}]"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                
                <el-row :gutter="10">
                    <el-col :span="10">
                        <el-form-item label="班级号" prop="classid" >
                            <el-select  v-model="addFormData.classid" clearable  placeholder="请选择班级名称">
                                <el-option
                                v-for="item in classList"
                                :key="item.classid"
                                :label="item.classid"
                                :value="item.classid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="专业" prop="major">
                            <el-select style="width:100%" v-model="addFormData.major" clearable >
                                <el-option
                                v-for="(item, index) in classList" 
                                :key="index"
                                :label="item.major"
                                :value="item.major">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="10">
                        <el-form-item  label="出生日期">
                            <el-date-picker placeholder="选择时间" v-model="addFormData.sbirthday" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item  label="家庭住址">
                            <el-input  v-model="addFormData.saddress" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="10">
                        <el-form-item  label="电话号码">
                            <el-input  v-model="addFormData.sphone" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item  label="备注">
                            <el-input  v-model="addFormData.sremark" ></el-input>
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
                searchList: {}, //查询条件

                classList: [], //
                addFormData: {
                    sid:'',
                    sname:'',
                    sgender:'',
                    sbirthday:'',
                    major:'',
                    classid:'',
                    saddress:'',
                    sphone:'',
                    sremark:'',
                },//添加表单数据
                editFormData: {},//编辑表单数据
                dialogFormVisible: false,//增加表单是否可见
                dialogFormVisible4Edit:false,//编辑表单是否可见
                loading:false,//是否显示加载圈
                busy:true,//是否可以请求
                rules: {//校验规则
                sid: [{required: true, message: '学号不能为空', trigger: 'blur'}],
                sname: [{required: true, message: '姓名不能为空', trigger: 'blur'}],
                sgender: [{required: true, message: '性别不能为空', trigger: 'blur'}],
                major: [{required: true, message: '专业不能为空', trigger: 'blur'}],
                classid: [{required: true, message: '班级不能为空', trigger: 'blur'}],
                
                },
                info: [{},{}],
                multipleSelection:[]
            }
        },
        //钩子函数，VUE对象初始化完成后自动执行
        created() {
            this.getGrade();//需要触发的函数
            this.getClassIdAndMajor();
        },
        methods: {

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
                this.$axios.post(`http://localhost:8081/api/teacher/grade/`,{
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
                this.$axios.put("http://localhost:8081/api/teacher/grade/",{
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

            //查询学生全部信息
            getGrade(){
                this.$axios.get(`http://localhost:8081/api/admin/student/`,).then(res=>{
                    if (res.data.code === 200) {
                        this.info = res.data.data
                        console.log(this.info)
                    }else{
                        this.$message.error("更新失败")
                    }
                })
            },

            //查询所有班级id
            getClassIdAndMajor(){
                this.$axios.get(`http://localhost:8081/api/admin/classid/`,).then(res=>{
                    if (res.data.code === 200) {
                        this.classList = res.data.data
                        console.log(this.classList)
                    }else{
                        this.$message.error("查询")
                    }
                })
            }

            //
        }
    }
</script>