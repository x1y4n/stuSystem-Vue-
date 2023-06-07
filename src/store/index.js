import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // token: "",
    // 用户的信息可以直接从浏览器中取出来
    token: localStorage.getItem('token'),
    // 反序列化操作
    userInfo: JSON.parse(localStorage.getItem('userInfo'))
  },
  mutations: {
    // 给token赋值
    SET_TOKEN: (state, token) => {
      state.token = token
      // 将信息存储到浏览器中，以至于浏览器关闭时信息还在
      localStorage.setItem('token', token)
    },
    // 给userinfo赋值
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      // session会在每次浏览器关闭时清空，在重新登录后再生成
      // 由于sessionStorage不能存储对象，所以要将其存储成字符串的形式
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      
    },
    // 移除用户信息
    REMOVE_INFO: (state) => {
      // 移除用户信息时将用户所有的信息都置为空
      state.token = ''
      state.userInfo = {}
      localStorage.clear();
      // localStorage.setItem('token', '')
      // localStorage.setItem('userInfo', JSON.stringify(''))
    }

  },
  getters: {
    /** 类似get请求 */
    // 获取用户信息
    getUser: state => {
      return state.userInfo
    }
  },
  actions: {},
  modules: {}
})
