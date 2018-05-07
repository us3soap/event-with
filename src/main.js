// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import VueFire from 'vuefire'
import auth from './services/firebaseService'
import VueAnalytics from 'vue-analytics'

Vue.use(VueFire)
Vue.use(VueMaterial)

Vue.use(VueAnalytics, {
  id: 'UA-115464945-1',
  router
})
Vue.config.productionTip = false

Vue.use(VueMaterial)

Vue.material.registerTheme({
  default: {
    primary: 'blue',
    accent: 'red'
  },
  green: {
    primary: 'green',
    accent: 'pink'
  },
  orange: {
    primary: 'orange',
    accent: 'green'
  }
})

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  auth.authUser().then(() => {
    next()
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
