import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../pages/home/Home.vue";
import Main from "../pages/main/Main.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/main", component: Main },
  { path: "/playground", component: () => import("../pages/playground/Playground.vue") }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;