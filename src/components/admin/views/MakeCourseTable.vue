<template>
    <div style="margin-left: 10px;">
        <div class="jumbotron jumbotron-fluid" style="text-align: center">
            <div class="container">
                <h1 class="display-4">选修课程排课</h1>
            </div>
        </div>
            <el-form ref="FormData" :model="FormData" :rules="rules" label-position="right" label-width="200px">
                <el-row :gutter="10">
                    <el-col :span="10">
                        <el-form-item  label="请选择课程编号"  >
                            <el-select @change="change" style="width:100%" v-model="FormData.courseid" clearable  placeholder="课程号">
                                <el-option
                                v-for="item in selectList.courseid"
                                :key="item.courseid"
                                :label="item.courseid"
                                :value="item.courseid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="课程名称为"  >
                            <el-input v-model="this.name" disabled ></el-input>
                        </el-form-item>
                    </el-col>     
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="10">
                        <el-form-item label="班级名称为"  >

                            <el-select style="width:100%" v-model="FormData.classid" clearable  placeholder="按班级查询">
                                <el-option
                                v-for="item in selectList.class"
                                :key="item.classid"
                                :label="item.classid"
                                :value="item.classid"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col> 
                   
                    <el-col :span="10">
                        <el-form-item label="教室地址" prop="address" >
                            <el-input v-model="FormData.address" ></el-input>
                        </el-form-item>
                    </el-col>   

                    <el-col :span="6">
                        <el-form-item label="星期数" prop="week" >
                            <el-select v-model="FormData.week" >
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
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
                <el-button type="primary" style="margin-left:  500px;"  @click="resetForm()">重置</el-button>

                <el-button type="primary" style="margin-left:  500px;"  @click="submitForm('FormData')">添加</el-button>
            </div>
    </div>
  </template>
  <script>
    export default{
        data(){
            return {
                name :'',
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
                selectList: {teacherid:[],class:[{id:'',name:''}] },
                FormData: {
                    courseid:'',
                    classid:'',
                    address:'',
                    start: '',
                    end:'',
                    week:'',
                },//添加/编辑表单数据
                loading:false,//是否显示加载圈
                busy:true,//是否可以请求
                rules: {//校验规则
                // coursename: [{required: true, message: '课程名不能为空', trigger: 'blur'}],
                // courseid: [{required: true, message: '课程号不能为空', trigger: 'blur'}],
                },
                info: [],
                multipleSelection:[]
            }
        },
        //钩子函数，VUE对象初始化完成后自动执行
        created() {
            this.getCourseId();//需要触发的函数
            this.getClassIdAndMajor()
        },
        methods: {
            // chnage触发
            change(e) {
            this.$axios.get(`/api/classtable/course/`+e).then(res=>{
                this.name = res.data.data.coursename
            })
            },

            //编辑验证
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.handleAdd()
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
           
            //重置表单
            resetForm() {
                this.FormData = {};
                this.name='';
            },

            //编辑课程表信息
            handleAdd(){
                this.$axios.post("/api/classtable",{
                    "courseid": this.FormData.courseid,
                    "classid": this.FormData.classid,
                    "address": this.FormData.address,
                    "start": this.FormData.start,
                    "end": this.FormData.end,
                    "week": this.FormData.week,
                }).then(res=>{
                    this.resetForm()
                    if (res.data.code === 200) {
                        alert("更新成功")
                        this.$router.push('/courseTable')
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

             //查询所有课程id
             getCourseId(){
                this.$axios.get(`/api/admin/student/courseid`,).then(res=>{
                    if (res.data.code === 200) {
                        this.selectList.courseid = res.data.data
                    }else{
                        this.$message.error("查询失败")
                    }
                })
            },

            //查询所有班级id
            getClassIdAndMajor(){
                this.$axios.get(`/api/admin/classid/`,).then(res=>{
                    if (res.data.code === 200) {
                        this.selectList.class = res.data.data
                        console.log(this.selectList)
                    }else{
                        this.$message.error("查询")
                    }
                })
            }
        }
    }
  </script>