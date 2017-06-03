import Vue from 'vue'
import Router from 'vue-router'
//一级模块
import signIn from '@/views/signIn'
import Hsingyan from '@/views/Hsingyan'
import Index from '@/views/content'
import HomePage from '@/views/homePage'
import Work from '@/views/work'
import Setting from '@/views/setting'
//work 二级模块
import AddressList from '@/views/addressList'
import NewsAnnouncement from '@/components/newsAnnouncement'
import Approval from '@/components/approval'
import Plan from '@/components/plan'
import Log from '@/components/log'
//work 三级模块
import ApprovalPerson from '@/components/approvalPerson'
//Setting 二级模块
import Information from '@/components/information'
import ChangePassword from '@/components/changePassword'
import RecentNew from '@/components/recentNew'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'signIn',
      component: signIn
    },
     {
      path: '/hsingyan',
      name: 'hsingyan',
      component: Hsingyan,
       redirect:'/hsingyan/homePage',
       children:[
         {path:'homePage',component:HomePage},
         {
           path:'work',
           component:Work,
           redirect:'/hsingyan/work/newsAnnouncement',
           children:[
             {path:'newsAnnouncement',component:NewsAnnouncement},
             {path:'approval',component:Approval},
             {path:'approvalPerson',component:ApprovalPerson},
             {path:'plan',component:Plan},
             {path:'log',component:Log},
           ]
         },
         {path:'addressList',component:AddressList},
         {
           path:'setting',
           component:Setting,
           redirect:'/hsingyan/setting/information',
           children:[
             {path:'information',component:Information},
             {path:'changePassword',component:ChangePassword},
             {path:'recentNew',component:RecentNew},
           ]
         },
       ]
    },
  ]
})
