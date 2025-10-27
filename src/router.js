import { createWebHistory, createRouter } from "vue-router";
import RegisterForm from '@/components/RegisterForm.vue'


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

  {
    path: "/category_list",
    alias: "/category_list",
    name: "category_list",
    component: () => import("./components/category/CategoryList"),
  },
  {
    path: "/add_category",
    alias: "/add_category",
    name: "add_category",
    component: () => import("./components/category/CategoryCreate"),
  },
  {
    path: "/edit_category/:id",
    name: "edit_category",
    component: () => import("./components/category/CategoryEdit"),
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;