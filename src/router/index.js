import Vue from 'vue'
import VueRouter from 'vue-router'
import Company from '@/components/Company.vue'
import Publish_Job from '@/components/Publish_Job.vue'
import Resume from '@/components/Resume.vue'
import Test from '@/components/Test.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import UserInfoView from '@/views/UserInfoView.vue'
import EmployeeHomeView from '@/views/EmployeeHomeView.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/company',
    name: 'Company',
    component: Company,
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
    path: '/userInfo',
    name: 'userInfo',
    component: UserInfoView
  },
  {
    path: '/employeeHome',
    name: 'employeeHome',
    component: EmployeeHomeView
  }
]

const router = new VueRouter({
  routes
})

export default router
