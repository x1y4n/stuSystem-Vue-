import Vue from 'vue'
import Router from 'vue-router'
import AppIndex from '../components/home/AppIndex.vue'
import Home from '../components/Home.vue'
import StudentSearch from '../components/student/SearchIndex.vue'
import SearchSelf from '../components/student/search/SearchSelf.vue'
import SearchClass from '../components/student/search/SearchClass.vue'
import SearchCourse from '../components/student/search/SearchCourse.vue'
import CourseTable from '../components/student/search/CourseTable.vue'
import SearchGrade from '../components/student/search/SearchGrade.vue'
import Login from '@/components/Login.vue'
import Test from '@/components/Test.vue'
import { name } from 'file-loader'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/test',
      name: 'test',
      component: Test
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      // home页面并不需要被访问
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex,
          meta: {
            requireAuth: false
          }
        },
        {
          path: '/studentSearch',
          name: 'SearchIndex',
          component: StudentSearch,
          redirect: '/studentSearch/searchSelf',
          children:[
            {
              path: '/studentSearch/searchSelf',
              name: 'SearchSelf',
              component: SearchSelf
            },
            {
              path: '/studentSearch/searchClass',
              name: 'SearchClass',
              component: SearchClass
            },
            {
              path: '/studentSearch/searchCourse',
              name: 'SearchCourse',
              component: SearchCourse
            },
            {
              path: '/studentSearch/courseTable',
              name: 'CourseTable',
              component: CourseTable
            },
            {
              path: '/studentSearch/searchGrade',
              name: 'SearchGrade',
              component: SearchGrade
            }
          ]
        }
      ]
    }
  ]
})
