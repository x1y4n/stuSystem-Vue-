<template>
    <div style="margin-left: 10px;">
        <el-row :gutter="20" style="margin-top: 20px;">
            <el-col :span="6">
                <el-date-picker
                v-model="searchList.classtime" 
                type="year"
                value-format="yyyy"
                placeholder="选择入年年份">
                </el-date-picker>
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
        height="700px"
        v-loading="loading"
        :default-sort = "{prop: 'date', order: 'descending'}"
        >
            <el-table-column
            prop="classid"
            align="center"
            label="班级号"
            width="300px">
            </el-table-column>

            <el-table-column
            prop="major"
            align="center"
            label="专业"
            width="200px">
            </el-table-column>

            <el-table-column
            label="入学年份"
            align="center"
            width="300px">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.classtime }}</span>
            </template>
            </el-table-column>

            <el-table-column
            prop="num"
            align="center"
            label="班级人数"
            width="200px">
            </el-table-column>

            <el-table-column
            label="辅导员"
            align="center"
            width="200px">
            <template slot-scope="scope">
                <el-tag>{{ scope.row.fdy }}</el-tag>
            </template>
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
        <el-dialog title="新增班级信息" :visible.sync="dialogFormVisible">
            <el-form ref="FormData" :model="FormData" :rules="rules" label-position="right" label-width="100px">
                <el-row :gutter="10">
                    <el-col :span="10">
                        <el-form-item label="班级号" prop="classid">
                            <el-input v-model="FormData.classid" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="辅导员" prop="fdy">
                            <el-input v-model="FormData.fdy" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="专业" prop="major">
                            <el-input v-model="FormData.major" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="10">
                        <el-form-item  label="入学年份">
                            <el-date-picker
                            v-model="FormData.classtime" 
                            type="year"
                            value-format="yyyy"
                            placeholder="请选择年份">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="班级人数" prop="major">
                            <el-input v-model="FormData.num" ></el-input>
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
        <el-dialog title="编辑班级信息" :visible.sync="dialogFormVisible4Edit">
            <el-form ref="FormData" :model="FormData" :rules="rules" label-position="right" label-width="100px">
                <el-row :gutter="10">
                    <el-col :span="10">
                        <el-form-item label="班级号" prop="classid">
                            <el-input v-model="FormData.classid" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="辅导员" prop="fdy">
                            <el-input v-model="FormData.fdy" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="专业" prop="major">
                            <el-input v-model="FormData.major" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="10">
                        <el-form-item  label="入学年份">
                            <el-date-picker
                            v-model="FormData.classtime" 
                            type="year"
                            value-format="yyyy"
                            placeholder="请选择年份">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="班级人数" prop="major">
                            <el-input v-model="FormData.num" ></el-input>
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
                    classid:'',
                    major:'',
                    classtime:''
                }, //查询条件
                classList: [], //
                FormData: {
                    classid:'',
                    major:'',
                    num:'',
                    classtime:'',
                    fdy:''
                },//添加/编辑表单数据

                dialogFormVisible: false,//增加表单是否可见
                dialogFormVisible4Edit:false,//编辑表单是否可见
                loading:false,//是否显示加载圈
                busy:true,//是否可以请求
                rules: {//校验规则
                major: [{required: true, message: '专业不能为空', trigger: 'blur'}],
                classid: [{required: true, message: '班级不能为空', trigger: 'blur'}],
                },
                info: [],
                multipleSelection:[]
            }
        },
        //钩子函数，VUE对象初始化完成后自动执行
        created() {
            this.getClasstInfo();//需要触发的函数
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

            //根据条件查询班级
            doQuery(){
                this.$axios.post(`/api/admin/class/query/`,{
                    classid:this.searchList.classid,
                    major:this.searchList.major,
                    classtime: this.searchList.classtime
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

            //添加班级
            handleAdd() {
                // 发送Ajax请求
                this.$axios.post(`/api/admin/class/`,{
                    "classid": this.FormData.classid,
                    "major": this.FormData.major,
                    "num": this.FormData.num,
                    "classtime": this.FormData.classtime,
                    "fdy": this.FormData.fdy
                }).then(res=>{
                    if (res.data.code === 200) {
                        this.$message.success("添加成功")
                        this.dialogFormVisible=false
                        this.getClasstInfo()
                    }else{
                        this.$message.error("添加失败")
                    }
                })
            },

            //编辑学生信息
            handleEdit(){
                this.$axios.put("/api/admin/class/",{
                    "classid": this.FormData.classid,
                    "major": this.FormData.major,
                    "num": this.FormData.num,
                    "classtime": this.FormData.classtime,
                    "fdy": this.FormData.fdy
                }).then(res=>{
                    this.resetForm()
                    if (res.data.code === 200) {
                        this.$message.success("更新成功")
                        this.dialogFormVisible4Edit=false
                        this.getClasstInfo()
                    }else{
                        this.$message.error("更新失败")
                    }
                })
            },

            //删除班级信息
            handleDelete(row) {
                //1. 弹出提示框
                this.$confirm("此操作将永久删除当前数据，是否继续？", "提示", {
                    type: 'info'
                }).then(() => {
                    console.log(row)
                    this.$axios.delete(`/api/admin/class/`,{data:{"classid":row.classid}}).then((res) => {
                        if (res.data.code === 200) {
                            this.$message.success("删除成功")
                        } else if (res.data.code === 404) {
                            this.$message.error("删除失败")
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    }).finally(() => {
                        this.getClasstInfo();
                    })
                }).catch(()=>{
                    this.$message.success("取消删除操作")
                })
            },
            
            //查询全部班级信息
            getClasstInfo(){
                this.$axios.get(`/api/admin/class/`,).then(res=>{
                    if (res.data.code === 200) {
                        this.info = res.data.data
                    }else{
                        this.$message.error("更新失败")
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