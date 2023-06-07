<template>
    <div style="margin-left: 10px;">
        <el-row>
            <el-col>
                <el-button type="primary" @click="handleCreate()" round>添加用户</el-button>
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
            prop="sid"
            align="center"
            label="学号"
            width="200px">
            </el-table-column>

            <el-table-column
            prop="username"
            align="center"
            label="账号名称"
            width="200px">
            </el-table-column>

            <el-table-column
            prop="password"
            align="center"
            label="账号密码"
            width="200px">
            </el-table-column>

            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 新增标签弹层 -->
        <el-dialog title="新增学生用户" :visible.sync="dialogFormVisible">
            <el-form ref="FormData" :model="FormData" :rules="rules" label-position="right" label-width="100px">
                <el-row :gutter="10">
                    <el-col :span="10">
                        <el-form-item label="sid" prop="sid">
                            <el-input v-model="FormData.sid" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="账号" prop="username">
                            <el-input v-model="FormData.username" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="FormData.password" ></el-input>
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
        <el-dialog title="编辑学生用户信息" :visible.sync="dialogFormVisible4Edit">
            <el-form ref="FormData" :model="FormData" :rules="rules" label-position="right" label-width="100px">
                <el-row :gutter="10">
                    <el-col :span="10">
                        <el-form-item label="sid" prop="sid">
                            <el-input v-model="FormData.sid" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="账号" prop="username">
                            <el-input v-model="FormData.username" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="FormData.password" ></el-input>
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
                classList: [], //
                FormData: {
                    sid:'',
                    username:'',
                    password:'',
                },//添加/编辑表单数据

                dialogFormVisible: false,//增加表单是否可见
                dialogFormVisible4Edit:false,//编辑表单是否可见
                loading:false,//是否显示加载圈
                busy:true,//是否可以请求
                rules: {//校验规则
                username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
                password: [{required: true, message: '密码不能为空', trigger: 'blur'}],
                },
                info: [],
                multipleSelection:[]
            }
        },
        //钩子函数，VUE对象初始化完成后自动执行
        created() {
            //需要触发的函数
            this.getUserInfo();
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

            //添加用户
            handleAdd() {
                // 发送Ajax请求
                this.$axios.post(`/api/user/suser/`,{
                    sid:this.FormData.sid,
                    username:this.FormData.username,
                    password:this.FormData.password,
                }).then(res=>{
                    if (res.data.code === 200) {
                        this.$message.success("添加成功")
                        this.dialogFormVisible=false
                        this.getUserInfo()
                    }else{
                        this.$message.error("添加失败")
                    }
                })
            },

            //编辑用户信息
            handleEdit(){
                this.$axios.put("/api/user/suser/",{
                    sid:this.FormData.sid,
                    username:this.FormData.username,
                    password:this.FormData.password,
                }).then(res=>{
                    this.resetForm()
                    if (res.data.code === 200) {
                        this.$message.success("更新成功")
                        this.dialogFormVisible4Edit=false
                        this.getUserInfo()
                    }else{
                        this.$message.error("更新失败")
                    }
                })
            },

            //删除用户信息
            handleDelete(row) {
                //1. 弹出提示框
                this.$confirm("此操作将永久删除当前数据，是否继续？", "提示", {
                    type: 'info'
                }).then(() => {
                    console.log(row)
                    this.$axios.delete(`/api/user/suser/`,{data:{"sid":row.sid}}).then((res) => {
                        if (res.data.code === 200) {
                            this.$message.success("删除成功")
                        } else if (res.data.code === 404) {
                            this.$message.error("删除失败")
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    }).finally(() => {
                        this.getUserInfo();
                    })
                }).catch(()=>{
                    this.$message.success("取消删除操作")
                })
            },
            
            //查询全部用户信息
            getUserInfo(){
                this.$axios.get(`/api/user/suser/`,).then(res=>{
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