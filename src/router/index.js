import Vue from 'vue'
import Router from 'vue-router'
import mainView from '@/views/mainView'
import loginView from '@/views/loginView'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/index.html',
      component :mainView
    },
    {
      path: '/homepage',
      name: 'main',
      component: mainView
    },
    {
      path: "/loginView",
      name : 'loginView',
      component:loginView
    },
    {
      path:'/',
      component :mainView
    },
  ]
})
