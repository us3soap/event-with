import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import EventPrivate from '@/components/EventPrivate'
import Available from '@/components/Available'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/event/available',
      name: 'available',
      component: Available
    },
    {
      path: '/event/new',
      name: 'event',
      component: EventPrivate
    }
  ]
})
