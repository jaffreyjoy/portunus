import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { checkDbConn } from './store';

checkDbConn();

Vue.config.productionTip = false

Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
