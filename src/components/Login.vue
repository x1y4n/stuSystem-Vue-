<template>
  <div class="login-container">
    <i class="bi bi-house"></i>
    <form action="" class="form-login" v-show="!isShow" >
      <ul class="login-nav">
        <li class="login-nav__item active">
          <a href="#" @click="show()">用户登录</a>
        </li>
        <li class="login-nav__item">
				<a href="#" @click="show()">用户注册</a>
			</li>
      </ul>
      <label for="login-input-user" class="login__label">
        用户名
      </label>
      <input id="login-input-user" v-model="username" class="login__input" type="text" />
      <label for="login-input-password" class="login__label">
        密码
      </label>
      <input id="login-input-password" v-model="password" class="login__input" type="password" />
      
      <label  class="login__label">
      登陆方式
      </label>
        <el-radio-group v-model="radio" size="small">
          <el-radio-button label="学生"></el-radio-button>
          <el-radio-button label="教师"></el-radio-button>
          <el-radio-button label="管理员"></el-radio-button>
        </el-radio-group>
      <!-- <label for="login-sign-up" class="login__label--checkbox">
        <input id="login-sign-up" type="checkbox" class="login__input--checkbox" />
        保持登陆
      </label> -->
      <button type="button" class="login__submit" @click="login" >登陆</button>
    </form>

    <form action="" class="form-login" v-show="isShow" >
      <ul class="login-nav">
        <li class="login-nav__item ">
          <a href="#" @click="show()">用户登录</a>
        </li>
        <li class="login-nav__item active">
				<a href="#" @click="show()">用户注册</a>
			</li>
      </ul>

      <label for="login-input-user" class="login__label">
        请输入您的id
      </label>
      <input id="login-input-user" v-model="registerForm.id" class="login__input" type="text" />

      <label for="login-input-user" class="login__label">
        请输入您要注册的用户名
      </label>
      <input id="login-input-user" v-model="registerForm.username" class="login__input" type="text" />

      <label for="login-input-password" class="login__label">
        请输入您的密码
      </label>
      <input id="login-input-password" v-model="registerForm.password" class="login__input" type="password" />
      
      <label  class="login__label">
      请选择账号类型
      </label>
        <el-radio-group v-model="radio" size="small">
          <el-radio-button label="学生"></el-radio-button>
          <el-radio-button label="教师"></el-radio-button>
        </el-radio-group>
      <!-- <label for="login-sign-up" class="login__label--checkbox">
        <input id="login-sign-up" type="checkbox" class="login__input--checkbox" />
        保持登陆
      </label> -->
      <button type="button" class="login__submit" @click="register()" >登陆</button>
    </form>
</div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      username: '',
      password: '',
      radio: '学生',
      url: ' ',
      isShow:false,
      registerForm:{username:'',password:'',}
    }
  },
  watch:{

  },
  methods: {
    show() {
      this.isShow = !this.isShow
    },
    login () {
      // console.log(this.$store.state.userInfo.sid)
      switch(this.radio){
        case '学生':
          this.url = `/api/user/student`
          break
        case '教师':
          this.url = `/api/user/teacher`
          break
        case '管理员':
          this.url = `/api/user/admin`
          break
      }
      console.log(this.url)
      axios.post(this.url, {
        username: this.username,
        password: this.password
      })
        .then((res) => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
            this.$store.commit('SET_TOKEN', this.username)
            this.$store.commit('SET_USERINFO', res.data.data)
            // console.log(sessionStorage.getItem("userInfo"))
            // 用localStorage缓存token值
            if(this.radio=='管理员'){
              this.$router.push({path: '/admin'})
              }else{this.$router.push({path: '/index'})}
            } 
            else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(failResponse => {
        })
    },
    register(){
      switch(this.radio){
        case '学生':
          this.url = `/api/user/suser`
          this.$axios.post(this.url,{
          "sid":this.registerForm.id,
          "username":this.registerForm.username,
          "password":this.registerForm.password
          }).then(res=>{
            alert(res.data.msg)
            this.$router.go(0)
          })
          break
        case '教师':
          this.url = `/api/user/tuser`
          this.$axios.post(this.url,{
            "tid":this.registerForm.id,
            "username":this.registerForm.username,
            "password":this.registerForm.password
          }).then(res=>{
            alert(res.data.msg)
            this.$router.go(0)
          })
          break
      }
    }

  }
}
</script>

<style>
body {
background-color: #e9e9e9;
font-family: 'Montserrat', sans-serif;
font-size: 16px;
line-height: 1.25;
letter-spacing: 1px;
}

* {
box-sizing: border-box;
transition: .25s all ease;
}

.login-container {
display: block;
position: relative;
z-index: 0;
margin: 4rem auto 0;
padding: 5rem 4rem 0 4rem;
width: 100%;
max-width: 525px;
min-height: 680px;
background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/283591/login-background.jpg);
box-shadow: 0 50px 70px -20px rgba(0, 0, 0, 0.85);
}

.login-container:after {
content: '';
display: inline-block;
position: absolute;
z-index: 0;
top: 0;
right: 0;
bottom: 0;
left: 0;
background-image: radial-gradient(ellipse at left bottom, rgba(22, 24, 47, 1) 0%,rgba(38, 20, 72, .9) 59%, rgba(17, 27, 75, .9) 100%);
box-shadow: 0 -20px 150px -20px rgba(0, 0, 0, 0.5);
}

.form-login {
  position: relative;
  z-index: 1;
  padding-bottom: 4.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
}

.login-nav {
position: relative;
padding: 0;
margin: 0 0 6em 1rem;
}

.login-nav__item {
list-style: none;
display: inline-block;
}

.login-nav__item + .login-nav__item {
margin-left: 2.25rem;
}

.login-nav__item a {
position: relative;
color: rgba(255, 255, 255, 0.5);
text-decoration: none;
text-transform: uppercase;
font-weight: 500;
font-size: 1.25rem;
padding-bottom: .5rem;
transition: .20s all ease;
}

.login-nav__item.active a,
.login-nav__item a:hover{
color: #ffffff;
transition: .15s all ease;
}

.login-nav__item a:after {
content: '';
display: inline-block;
height: 10px;
background-color: rgb(255, 255, 255);
position: absolute;
right: 100%;
bottom: -1px;
left: 0;
border-radius: 50%;
transition: .15s all ease;
}

.login-nav__item a:hover:after,
.login-nav__item.active a:after{
background-color: rgb(17, 97, 237);
height: 2px;
right: 0;
bottom: 2px;
border-radius: 0;
transition: .20s all ease;
}
.login__label {
display: block;
padding-left: 1rem;
}

.login__label,
.login__label--checkbox {
color: rgba(255, 255, 255, 0.5);
text-transform: uppercase;
font-size: .75rem;
margin-bottom: 1rem;
}

.login__label--checkbox {
display: inline-block;
position: relative;
padding-left: 1.5rem;
margin-top: 2rem;
margin-left: 1rem;
color: #ffffff;
font-size: .75rem;
text-transform: inherit;
}

.login__input {
color: white;
font-size: 1.15rem;
width: 100%;
padding: .5rem 1rem;
border: 2px solid transparent;
outline: none;
border-radius: 1.5rem;
background-color: rgba(255, 255, 255, 0.25);
letter-spacing: 1px;
}

.login__input:hover,
.login__input:focus{
color: white;
border: 2px solid rgba(255, 255, 255, 0.5);
background-color: transparent;
}

.login__input + .login__label {
margin-top: 1.5rem;
}

.login__input--checkbox {
position: absolute;
top: .1rem;
left: 0;
margin: 0;
}

.login__submit {
color: #ffffff;
font-size: 1rem;
font-family: 'Montserrat', sans-serif;
text-transform: uppercase;
letter-spacing: 1px;
margin-top: 1rem;
padding: .75rem;
border-radius: 2rem;
display: block;
width: 100%;
background-color: rgba(17, 97, 237, .75);
border: none;
cursor: pointer;
}

.login__submit:hover {
background-color: rgba(17, 97, 237, 1);
}

.login__forgot {
display: block;
margin-top: 3rem;
text-align: center;
color: rgba(255, 255, 255, 0.75);
font-size: .75rem;
text-decoration: none;
position: relative;
z-index: 1;
}

.login__forgot:hover {
color: rgb(17, 97, 237);
}
</style>
