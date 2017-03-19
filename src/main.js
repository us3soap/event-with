// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import firebase from 'firebase'
import auth from './services/firebaseService'
import { firebaseConfig } from './configs'

Vue.use(VueMaterial)

const initApp = () => {
  firebase.initializeApp(firebaseConfig)
}

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

initApp()

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
