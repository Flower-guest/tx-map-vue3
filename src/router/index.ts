import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/map",
    component: () => import("@/pages/map/index.vue"),
    meta: {
      title: "首页",
    },
    children: [],
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/pages/index/navBar.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("@/components/test.vue"),
  },
  {
    path: "/customer",
    name: "customer",
    component: () => import("@/pages/customer/customer.vue"),
  },
  {
    path: "/detail",
    component: () => import("@/pages/customer/detail.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
