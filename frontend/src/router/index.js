import { createRouter, createWebHistory } from "vue-router";

import { useAuthStore } from "../stores/auth";

import Login from "@/views/Login.vue";

import DashboardLayout from "@/layouts/DashboardLayout.vue";
import Dashboard from "@/views/Dashboard.vue";

import CategoryIndex from "@/views/CategoryIndex.vue";
import CategoryCreate from "@/views/CategoryCreate.vue";
import CategoryShow from "@/views/CategoryShow.vue";
import CategoryDelete from "@/views/CategoryDelete.vue";

import TaskIndex from "@/views/TaskIndex.vue";
import TaskCreate from "@/views/TaskCreate.vue";
import TaskShow from "@/views/TaskShow.vue";
import TaskDelete from "@/views/TaskDelete.vue";

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/",
      name: "home",
      component: DashboardLayout,
      meta: { requiresAuth: true },
      redirect: { name: "dashboard" },
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: Dashboard,
        },
        {
          path: "categories",
          redirect: { name: "category.index" },
          children: [
            {
              path: "",
              name: "category.index",
              component: CategoryIndex,
            },
            {
              path: "create",
              name: "category.create",
              component: CategoryCreate,
            },
            {
              path: ":id",
              name: "category.show",
              props: true,
              component: CategoryShow,
            },
            {
              path: ":id/delete",
              name: "category.delete",
              props: true,
              component: CategoryDelete,
            },
          ],
        },
        {
          path: "tasks",
          redirect: { name: "task.index" },
          children: [
            {
              path: "",
              name: "task.index",
              component: TaskIndex,
            },
            {
              path: "create",
              name: "task.create",
              component: TaskCreate,
              props: (route) => ({ categoryId: route.query.categoryId }),
            },
            {
              path: ":id",
              name: "task.show",
              props: true,
              component: TaskShow,
            },
            {
              path: ":id/delete",
              name: "task.delete",
              props: true,
              component: TaskDelete,
            },
          ],
        },
      ],
    },
  ],
});

router.beforeEach((to, from) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;
  if (to.meta.requiresAuth) {
    if (isAuthenticated) return true;
    return { name: "login" };
  }
  if (to.name == "login" && isAuthenticated) return { name: "dashboard" };
  return true;
});
export default router;
