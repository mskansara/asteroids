import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import Search_By_Date from '../views/SearchByDate.vue'
import Favourites from '../views/Favourites.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
Vue.use(VueRouter)

const routes = [
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
    component: Favourites
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
  routes
})

export default router
