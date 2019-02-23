import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'
import Settings from '@/components/Settings'
import Score from '../components/Settings_group/Scores.vue'
import Profile from '../components/Settings_group/Profile.vue'
import Password from '../components/Settings_group/Password.vue'
import Friends from '../components/Settings_group/Friends.vue'
import firebase from "firebase";

Vue.use(Router)

const routes = [{
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/settings/profile',
    name: 'profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/settings/password',
    name: 'password',
    component: Password,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/settings/score',
    name: 'score',
    component: Score,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/settings/friend',
    name: 'friend',
    component: Friends,
    meta: {
      requiresAuth: true
    }
  }
]

let router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  //Check for requiedAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //Check if NOT logged in 
    if (!firebase.auth().currentUser) {
      //Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      //Proceed to the route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {

    //Check if is logged in 
    if (firebase.auth().currentUser) {
      //Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      //Proceed to the route
      next();
    }

  } else {
    next()
  }
})

Vue.config.productionTip = false



export default router;
