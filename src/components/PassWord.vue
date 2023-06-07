<template>
  <el-form
    class="login-box1"
    ref="loginForm"
    :model="loginForm"
    :rules="rules"
    label-width="100px"
  >
    <h3 class="login-title">修改密码</h3>
    <el-form-item label="原密码" prop="oldpassword">
      <el-input
        type="password"
        show-password
        auto-complete="off"
        placeholder="请输入原密码"
        v-model="loginForm.oldpassword"
      ></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="password">
      <el-input
        type="password"
        show-password
        auto-complete="off"
        placeholder="请设置新密码"
        v-model="loginForm.password"
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="password2">
      <el-input
        type="password"
        show-password
        auto-complete="off"
        placeholder="请确认新密码"
        v-model="loginForm.password2"
      ></el-input>
    </el-form-item>
    <el-form-item style="float:right">
      <el-button type="primary" @click.native.prevent="changePassword()"
        >保存</el-button
      >
      <el-button @click="$refs['loginForm'].resetFields()">重置</el-button>
    </el-form-item>
  </el-form>
</template>
 
<script>
 
export default {
  name: "reset",
  data() {
    const validateNewPassword = (rule, value, callback) => {
      if (value === this.loginForm.oldpassword) {
        callback(new Error("新密码不能与原密码相同!"));
      } else {
        callback();
      }
    };
    const validateNewPassword2 = (rule, value, callback) => {
      if (value !== this.loginForm.password) {
        callback(new Error("与新密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        oldpassword: "",
        password: "",
        password2: "",
      },
      type:'',
      // 表单校验
      rules: {
        oldpassword: [
          { required: true, message: "请输入原密码", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请设置新密码", trigger: "blur" },
          { validator: validateNewPassword, trigger: "blur" },
        ],
        password2: [
          { required: true, message: "请确认新密码", trigger: "blur" },
          { validator: validateNewPassword2, trigger: "blur" },
        ],
      },
    };
  },
  created() {
    // this.getCookie()
  },
  methods: {
    /** 提交按钮 */
    changePassword(){
      if(JSON.parse(localStorage.getItem('userInfo')).sid!=null){
        this.loginForm.username = JSON.parse(localStorage.getItem('userInfo')).username
        this.type='suser'
        this.handleLogin(JSON.parse(localStorage.getItem('userInfo')).sid)
      }else if(JSON.parse(localStorage.getItem('userInfo')).tid!=null){
        this.loginForm.username = JSON.parse(localStorage.getItem('userInfo')).username
        this.type='tuser'
        this.handleLogin(JSON.parse(localStorage.getItem('userInfo')).tid)
      }
    },
    
    handleLogin(userId) {
      this.$refs.loginForm.validate().then((valid) => {
        if (valid) {
          this.$axios.get(`/api/user/`+this.type+`/`+userId)
            .then((res) => {
              // debugger;
              if (res.data.data.password == this.loginForm.oldpassword) {
                if(this.type == 'suser'){
                  this.$axios.put(`/api/user/`+this.type,{
                      sid : userId,
                      username:this.loginForm.username,
                      password:this.loginForm.password,
                  }).then(res=>{
                    alert("修改成功");
                    this.$store.commit("REMOVE_INFO")
                    this.$router.push({path: '/login'})
                  });
                }else{
                  this.$axios.put(`/api/user/`+this.type,{
                      tid : userId,
                      username:this.loginForm.username,
                      password:this.loginForm.password,
                  }).then(res=>{
                    alert("修改成功");
                    this.$store.commit("REMOVE_INFO")
                    this.$router.push({path: '/login'})
                  });
                }
              } else {
                alert("密码错误");
              }
            })
            .catch(() => {});
        }
      });
    },
  },
};


</script>


<style lang="scss">
.user-account-key {
  width: 500px;
  margin: 100px auto;
}
.login-box1 {
  border: 1px solid #dcdfe6;
  width: 500px;
  height: 340px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}
.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>