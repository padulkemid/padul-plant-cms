import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

const guard = (to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.name !== 'Login' && !token) {
    next('/');
  } else if (to.name == 'Login' && token) {
    next('/home');
  } else {
    next();
  }
};

router.beforeEach(guard);

export default router;
