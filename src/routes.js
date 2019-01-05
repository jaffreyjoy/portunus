import Home from './pages/Home.vue'
import Register from './pages/Register.vue'
import Terms from './pages/Terms.vue'

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
    path: '/terms',
    name: 'Terms',
    component: Terms
  }
]