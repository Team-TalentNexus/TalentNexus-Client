import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home.vue'
import Publish_Job from '@/components/Publish_Job.vue'
import Resume from '@/components/Resume.vue'
import Test from '@/components/Test.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import UserInfoView from '@/views/UserInfoView.vue'
import Position from '@/components/Position.vue'
import Company from '@/components/Company.vue'
import Jobs from '@/views/Jobs.vue'
import AllJobs from '@/components/AllJobs.vue'
import ActiveJobs from '@/components/ActiveJobs.vue'
import CompletedJobs from '@/components/CompletedJobs.vue'
import CLogin from '@/views/CLoginView.vue'
import JobDetail from '@/components/JobDetail.vue'
import CRegisterView from '@/views/CRegisterView.vue'
import Seeker from '@/views/Seeker.vue'
import JobList from '@/components/JobList.vue'
import ResumeManagement from '@/components/ResumeManagement.vue'
import CompanyHome from "@/components/CompanyHome.vue"
import SeekerHome from '@/components/SeekerHome.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/seeker',
    component: Seeker,
    children: [
      {
        path: 'joblist',
        component: JobList,
      },
      {
        path: 'resume_management',
        component: ResumeManagement
      },
      {

        path: 'resume_management/add_resume',
        name: 'CreateResume',
        component: Resume,

      },
      {
        path:'home',
        component:SeekerHome,
      }
    ]
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
      },
      {
        path: '/jobs/detail/:id',
        name: 'JobDetail',
        component: JobDetail,
        props: true  // 允许通过 props 传递路由参数
      },
      {
        path: '/jobs/detail/resumedetail/:id',
        name: 'ResumeDetail',
        component: () => import('@/components/ResumeDetail.vue'),
        props: true,
      },
      {
        path: 'position',
        component: Position,
      },
      {
        path:'home',
        component:CompanyHome,
      },
    ]
  },
  {
    path: '/company/publish_job',
    name: 'Publish_Job',
    component: Publish_Job,
  },

  {
    path: '/test',
    name: 'Test',
    component: Test,
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
    path: '/cLogin',
    name: 'cLogin',
    component: CLogin
  },
  {
    path: '/cRegister',
    naem: 'cRegister',
    component: CRegisterView,
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: UserInfoView
  },
  {
    path: '/position',
    name: 'position',
    component: Position
  },
]

const router = new VueRouter({
  routes
})

export default router
