// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import firebase from 'firebase'
import VueApexCharts from 'vue-apexcharts'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VueAnalytics from 'vue-analytics'
import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'
Vue.use(Toaster, {
  timeout: 5000
})


Vue.use(VueAnalytics, {
  id: 'UA-64521211-3',
  router
})
Vue.use(Loading)
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
Vue.use(BootstrapVue);
Vue.config.productionTip = false

/* eslint-disable no-new */

let app;
firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      template: '<App/>',
      render: h => h(App)
    }).$mount('#app')
  }
})
