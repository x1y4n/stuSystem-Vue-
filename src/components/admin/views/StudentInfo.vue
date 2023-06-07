<template>
    <div style="margin-left: 10px;">
        <el-row :gutter="20" style="margin-top: 20px;">
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
                <el-button type="primary" round @click="doQuery()">查询</el-button>
                <el-button type="primary" @click="handleCreate()" round>添加</el-button>
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
                    <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
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
            <el-form ref="FormData" :model="FormData" :rules="rules" label-position="right" label-width="100px">
                <el-row :gutter="10">
                    <el-col :span="10">
                        <el-form-item label="学号" prop="sid">
                            <el-input v-model="FormData.sid" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="姓名" prop="sname">
                            <el-input v-model="FormData.sname" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="性别" prop="sgender" lable="性别">
                            <el-select v-model="FormData.sgender"  placeholder="请选择">
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
                            <el-select  v-model="FormData.classid" clearable  placeholder="请选择班级名称">
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
                            <el-select style="width:100%" v-model="FormData.major" clearable >
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
                            <el-date-picker 
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择时间" 
                            v-model="FormData.sbirthday"
                            style="width: 100%;">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item  label="家庭住址">
                            <el-input  v-model="FormData.saddress" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="10">
                        <el-form-item  label="电话号码">
                            <el-input  v-model="FormData.sphone" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item  label="备注">
                            <el-input  v-model="FormData.sremark" ></el-input>
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
                        <el-form-item label="学号"  prop="sid">
                            <el-input v-model="FormData.sid" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="姓名" prop="sname">
                            <el-input v-model="FormData.sname" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="性别" prop="sgender" lable="性别">
                            <el-select v-model="FormData.sgender"  placeholder="请选择">
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
                            <el-select  v-model="FormData.classid" clearable  placeholder="请选择班级名称">
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
                            <el-select style="width:100%" v-model="FormData.major" clearable >
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
                            <el-date-picker 
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择时间" 
                            v-model="FormData.sbirthday"
                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item  label="家庭住址">
                            <el-input  v-model="FormData.saddress" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="10">
                        <el-form-item  label="电话号码">
                            <el-input  v-model="FormData.sphone" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item  label="备注">
                            <el-input  v-model="FormData.sremark" ></el-input>
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
                    sid:'',
                    sname:'',
                    classid:'',
                    major:'',
                }, //查询条件
                classList: [], //
                FormData: {
                    sid:'',
                    sname:'',
                    sgender:'',
                    sbirthday:'',
                    major:'',
                    classid:'',
                    saddress:'',
                    sphone:'',
                    sremark:'',
                },//添加/编辑表单数据

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
                info: [],
                multipleSelection:[]
            }
        },
        //钩子函数，VUE对象初始化完成后自动执行
        created() {
            this.getStudentInfo();//需要触发的函数
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
                console.log(this.FormData);
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.handleEdit()
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },

            //查询学生
            doQuery(){
                this.$axios.post(`api/admin/student/query/`,{
                    sid:this.searchList.sid,
                    sname:this.searchList.sname,
                    classid:this.searchList.classid,
                    major:this.searchList.major,
                }).then(res=>{
                    if (res.data.code === 200) {
                        this.$message.success("查询成功")
                        this.info = res.data.data
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

            //添加学生信息
            handleAdd() {
                // 发送Ajax请求
                this.$axios.post(`api/admin/student/`,{
                    "sid": this.FormData.sid,
                    "sname": this.FormData.sname,
                    "sgender": this.FormData.sgender,
                    "sbirthday": this.FormData.sbirthday,
                    "major": this.FormData.major,
                    "classid": this.FormData.classid,
                    "saddress": this.FormData.saddress,
                    "sphone": this.FormData.sphone,
                    "sremark":this.FormData.sremark
                }).then(res=>{
                    if (res.data.code === 200) {
                        this.$message.success("添加成功")
                        this.dialogFormVisible=false
                        this.getStudentInfo()
                    }else{
                        this.$message.error("添加失败")
                    }
                })
            },

            //删除学生信息
            handleDelete(row) {
                //1. 弹出提示框
                this.$confirm("此操作将永久删除当前数据，是否继续？", "提示", {
                    type: 'info'
                }).then(() => {
                    console.log(row)
                    this.$axios.delete(`/api/admin/student/`,{data:{"sid":row.sid}}).then((res) => {
                        if (res.data.code === 200) {
                            this.$message.success("删除成功")
                        } else if (res.data.code === 404) {
                            this.$message.error("删除失败")
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    }).finally(() => {
                        this.getStudentInfo();
                    })
                }).catch(()=>{
                    this.$message.success("取消删除操作")
                })
            },

            //编辑学生信息
            handleEdit(){
                this.$axios.put("/api/admin/student/",{
                    "sid": this.FormData.sid,
                    "sname": this.FormData.sname,
                    "sgender": this.FormData.sgender,
                    "sbirthday": this.FormData.sbirthday,
                    "major": this.FormData.major,
                    "classid": this.FormData.classid,
                    "saddress": this.FormData.saddress,
                    "sphone": this.FormData.sphone,
                    "sremark":this.FormData.sremark
                }).then(res=>{
                    this.resetForm()
                    if (res.data.code === 200) {
                        this.$message.success("更新成功")
                        this.dialogFormVisible4Edit=false
                        this.getStudentInfo()
                    }else{
                        this.$message.error("更新失败")
                    }
                })
            },

             //查询学生全部信息
             getStudentInfo(){
                this.$axios.get(`/api/admin/student/`,).then(res=>{
                    if (res.data.code === 200) {
                        this.info = res.data.data
                        console.log(this.info)
                    }else{
                        this.$message.error("查询失败")
                    }
                })
            },

            //查询所有班级id
            getClassIdAndMajor(){
                this.$axios.get(`/api/admin/classid/`,).then(res=>{
                    if (res.data.code === 200) {
                        this.classList = res.data.data
                        console.log(this.classList)
                    }else{
                        this.$message.error("查询")
                    }
                })
            }

        }
    }
</script>