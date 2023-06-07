import Vue from 'vue'
import Router from 'vue-router'
import AppIndex from '../components/home/AppIndex.vue'
import Home from '../components/Home.vue'
import StudentSearch from '../components/student/SearchIndex.vue'
import TeacherSearch from '../components/teacher/SearchIndex.vue'

import SearchSelf2 from '../components/teacher/search/SearchSelf.vue'
import CourseTable2 from '../components/teacher/search/CourseTable.vue'
import SearchGrade2 from '../components/teacher/search/SearchGrade.vue'
import SearchCourse2 from '../components/teacher/search/SearchCourse.vue'


import SearchSelf from '../components/student/search/SearchSelf.vue'
import SearchClass from '../components/student/search/SearchClass.vue'
import SearchCourse from '../components/student/search/SearchCourse.vue'
import CourseTable from '../components/student/search/CourseTable.vue'
import SearchGrade from '../components/student/search/SearchGrade.vue'
import Login from '@/components/Login.vue'
import Password from '@/components/PassWord.vue'
import { name } from 'file-loader'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/admin',
      name: 'admin',
      component: () => import("../components/admin/sideMenu/Main.vue"),
      children:[
        {
        path:'/stuInfo',
        name: 'stuInfo',
        component: () => import("@/components/admin/views/StudentInfo.vue")
      },
      {
        path:'/stuGrade',
        name: 'stuGrade',
        component: () => import("@/components/admin/views/StudentGrade.vue")
      },
      {
        path:'/classInfo',
        name: 'classInfo',
        component: () => import("@/components/admin/views/ClassInfo.vue")
      },
      {
        path:'/courseInfo',
        name: 'courseInfo',
        component: () => import("@/components/admin/views/CourseInfo.vue")
      },
      {
        path:'/courseTable',
        name: 'courseTable',
        component: () => import("@/components/admin/views/CourseTable.vue")
      },
      {
        path:'/makeCourseTable',
        name: 'makeCourseTable',
        component: () => import("@/components/admin/views/MakeCourseTable.vue")
      },
      {
        path:'/userStu',
        name: 'userStu',
        component: () => import("@/components/admin/views/UserStu.vue")
      },
      {
        path:'/userTea',
        name: 'userTea',
        component: () => import("@/components/admin/views/UserTea.vue")
      },
      {
        path:'/userAdm',
        name: 'userAdm',
        component: () => import("@/components/admin/views/UserAdm.vue")
      }
    ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {path: '/',
    redirect:'/index'
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
            requireAuth: true
          },
        },
        {
          path:'/password',
          name: 'password',
          component: Password
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
              component: SearchSelf,
              meta: {
                requireAuth: true
              },
            },
            {
              path: '/studentSearch/searchClass',
              name: 'SearchClass',
              component: SearchClass,
              meta: {
                requireAuth: true
              },
            },
            {
              path: '/studentSearch/searchCourse',
              name: 'SearchCourse',
              component: SearchCourse,
              meta: {
                requireAuth: true
              },
            },
            {
              path: '/studentSearch/courseTable',
              name: 'CourseTable',
              component: CourseTable,
              meta: {
                requireAuth: true
              },
            },
            {
              path: '/studentSearch/searchGrade',
              name: 'SearchGrade',
              component: SearchGrade,
              meta: {
                requireAuth: true
              },
            }
          ]
        },
        {
          path: '/teacherSearch',
          name: 'TeacherIndex',
          component: TeacherSearch,
          redirect: '/teacherSearch/searchSelf',
          children:[
            {
              path: '/teacherSearch/searchSelf',
              name: 'SearchSelf2',
              component: SearchSelf2,
              meta: {
                requireAuth: true
              },
            },
            {
              path: '/teacherSearch/courseTable',
              name: 'CourseTable2',
              component: CourseTable2,
              meta: {
                requireAuth: true
              },
            },
            {
              path: '/teacherSearch/searchGrade',
              name: 'SearchGrade2',
              component: SearchGrade2,
              meta: {
                requireAuth: true
              },
            },
            {
              path: '/teacherSearch/searchCourse',
              name: 'SearchCourse2',
              component: SearchCourse2,
              meta: {
                requireAuth: true
              },
            }
          ]
        }
      ]
    }
  ]
})
