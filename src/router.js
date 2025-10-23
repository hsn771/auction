import { createWebHistory, createRouter } from "vue-router";
import RegisterForm from '@/components/RegisterForm.vue'
// import Dashboard from '@/views/Dashboard.vue'

const routes =  [
  {
    path: "/",
    alias: "/login",
    name: "login",
    component: () => import("./components/LoginForm")
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterForm,
    meta: { layout: 'auth' }
  },
  {
    path: "/dashboard",
    alias: "/dashboard",
    name: "dashboard",
    component: () => import("./components/Dashboard")
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;