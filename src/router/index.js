import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import Search_By_Date from '../views/SearchByDate.vue'
import Favourites from '../views/Favourites.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import firebase from 'firebase'
Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/searchbydate',
    name: 'Search-By-Date',
    component: Search_By_Date
  },
  {
    path: '/favourites',
    name: 'Favouritea',
    component: Favourites,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('/login')
  else if (!requiresAuth && currentUser) next('/')
  else next()

});

export default router
