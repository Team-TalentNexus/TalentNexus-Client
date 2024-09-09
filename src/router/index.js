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
      }
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


// 添加一个 JWT 解析工具来解析 token
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = decodeURIComponent(atob(base64Url).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(base64);
  } catch (error) {
    return null;
  }
}

// 路由守卫
router.beforeEach((to, from, next) => {
  console.log(to);
  const token = localStorage.getItem('token'); // 从 localStorage 获取 JWT token
  if (token) {
    if(to.path === '/') {
      next();
    }
    const decodedToken = parseJwt(token); // 解析 token

    if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
      const userRole = decodedToken.role; // 从 token 中获取用户角色

      // 控制不同用户的页面访问
      if (to.path.startsWith('/company') && userRole !== 'Company') {
        if (to.path !== '/403') {
          next({ path: '/403' });
        } else {
          next();
        }
      } else if (to.path.startsWith('/seeker') && userRole !== 'Seeker') {
        if (to.path !== '/403') {
          next({ path: '/403' });
        } else {
          next();
        }
      } else {
        next(); // 用户有权限访问该页面
      }
    } else {
      // token 过期或无效，重定向到登录页面
      if (to.path !== '/login') {
        next({ path: '/login' });
      } else {
        next();
      }
    }
  } else if (
    to.path !== '/login' && 
    to.path !== '/register' && 
    to.path !== '/cLogin' && 
    to.path !== '/cRegister' && 
    to.path !== '/' // 允许访问首页
  ) {
    // 未登录用户访问受保护页面，重定向到登录页面
    next({ path: '/login' });
  } else {
    next(); // 允许访问不需要身份验证的页面
  }
});

export default router
