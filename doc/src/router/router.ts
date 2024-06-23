import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../pages/home/Home.vue";
import Main from "../pages/main/Main.vue";
import Section from "../components/section/Section.vue"
import Playground from "../pages/playground/Playground.vue"
import sectionList from "../documents/sectionList";

const routes = [
  { path: "/", meta: { KeepAlive: true }, component: Home },
  { path: "/main", meta: { KeepAlive: true }, component: Main, redirect: `/main/${sectionList[0].title}`, children: [{ path: ':section', component: Section }] },
  { path: "/playground", meta: { KeepAlive: true }, component: Playground }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;