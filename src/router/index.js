import Vue from 'vue'
import Router from 'vue-router'
import mainView from '@/views/mainView'
import loginView from '@/views/loginView'
import applyView from '@/views/applyView'
import applyFirst from '@/views/applyComp/first.vue'
import applySecond from '@/views/applyComp/second.vue'
import applyThird from '@/views/applyComp/third.vue'
import recordView from '@/views/recordView'
import recordList from '@/views/recordComp/list.vue'
import recordRelease from '@/views/recordComp/release.vue'
import recordDetail from '@/views/recordComp/detail.vue'
import recordAllPublish from '@/views/recordComp/allPublish.vue'
import recordApplyList from '@/views/recordComp/apply.vue'
import recordEvaluate from '@/views/recordComp/evaluate.vue'
import registerView from '@/views/registerView.vue'
import registerChoose from '@/views/registerComp/choose.vue'
import registerCustomer from '@/views/registerComp/customer.vue'
import registerSuccess from '@/views/registerComp/success.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/index.html',
      component :mainView
    },
    {
      path: '/mainView',
      name: 'main',
      component: mainView
    },
    {
      path: "/loginView",
      name : 'loginView',
      component:loginView
    },
    {
      path: "/applyView/",
      component:applyView,
      children:[
        {
          path: 'first',
          component:applyFirst
        },
        {
          path: 'second',
          component:applySecond
        },
        {
          path: 'third',
          component:applyThird
        }
      ]
    },
    {
      path:'/recordView/',
      component:recordView,
      children:[
        {
          path:'list',
          component:recordList
        },{
          path:'release',
          component:recordRelease
        },{
          path:'detail',
          component:recordDetail
        },{
          path:'all',
          component:recordAllPublish
        },{
          path:'apply',
          component:recordApplyList
        },{
          path:'evaluate',
          component:recordEvaluate
        }
      ]
    },
    {
      path:'/registerView/',
      component:registerView,
      children:[
        {
          path:'choose',
          component:registerChoose,
        },
        {
          path:'customer',
          component:registerCustomer
        },
        {
          path:'success',
          component:registerSuccess
        }
      ]
    },
    {
      path:'/',
      component :mainView
    },
  ]
})
