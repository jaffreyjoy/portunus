import Home from './pages/Home.vue'
import Register from './pages/Register.vue'
import Record from './pages/Record.vue'
import Login from './pages/Login.vue'
import Terms from './pages/Terms.vue'
import Drive from './pages/Drive.vue'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/app',
    name: 'Drive',
    component: Drive
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/record',
    name: 'Record',
    component: Record
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/terms',
    name: 'Terms',
    component: Terms
  }
]