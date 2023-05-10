import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/map",
  },
  {
    path: "/map",
    component: () => import("@/pages/map/index.vue"),
    meta: {
      title: "首页",
    },
    children: [],
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
