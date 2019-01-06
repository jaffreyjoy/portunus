import Home from './pages/Home.vue'
import Register from './pages/Register.vue'
import Drive from './pages/Drive.vue'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/app',
    name: 'Drive',
    component: Drive
  }
]