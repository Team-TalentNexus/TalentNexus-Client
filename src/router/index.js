import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home.vue'
import Publish_Job from '@/components/Publish_Job.vue'
import Resume from '@/components/Resume.vue'
import Test from '@/components/Test.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import UserInfoView from '@/views/UserInfoView.vue'
import EmployeeHomeView from '@/views/EmployeeHomeView.vue'
import Position from '@/components/Position.vue'
import Company from '@/components/Company.vue'
import Jobs from '@/views/Jobs.vue'
import AllJobs from '@/components/AllJobs.vue'
import ActiveJobs from '@/components/ActiveJobs.vue'
import CompletedJobs from '@/components/CompletedJobs.vue'
import CLogin from '@/views/CLoginView.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'home',
    component:Home,
  },
  {
    path: '/company',
    component: Company, // 公司组件
    children: [
      {
        path: 'jobs',
        component: Jobs, // 招聘管理的主页面（包含 tabs）
        children: [
          {
            path: '', // 默认显示的子路由，可以是 "全部"的内容
            component: AllJobs
          },
          {
            path: 'active', // 对应正在招的子路由
            component: ActiveJobs
          },
          {
            path: 'completed', // 对应已招满的子路由
            component: CompletedJobs
          }
        ]
      }
    ]
  },
  {
    path: '/company/publish_job',
    name: 'Publish_Job',
    component: Publish_Job,
  },
  {
    path: '/seeker/resume',
    name: 'Resume',
    component: Resume,
  },
  {
    path:'/test',
    name:'Test',
    component:Test,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path:'/cLogin',
    name:'cLogin',
    component:CLogin
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: UserInfoView
  },
  {
    path: '/employeeHome',
    name: 'employeeHome',
    component: EmployeeHomeView
  },
  {
    path:'/position',
    name:'position',
    component:Position
  },
  {
    path: '/jobs/detail/:id',
    name: 'JobDetail',
    component: () => import('@/components/JobDetail.vue'), // 使用动态加载
    props: true  // 允许通过 props 传递路由参数
  }
  
]

const router = new VueRouter({
  routes
})

export default router
