import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import EmployeeDetail from "@/views/EmployeeDetail.vue";

const routes = [
  {
    path: "/",
    component: Home,
    name: "home",
  },
  {
    path: "/employee/:id",
    component: EmployeeDetail,
    name: "employee_detail",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_URL),
  routes,
});

export default router;
