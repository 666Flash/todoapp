import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/pages/HomeView.vue';
import { home, create, editing } from '@/router/routers';

// export function routerEditing(id: string) {
//   return {
//     name: `/editing/${id}`,
//   };
// }

const routes: Array<RouteRecordRaw> = [
  {
    path: home,
    name: 'home',
    component: HomeView,
  },
  {
    path: create,
    name: 'create',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/pages/CreatesTasks.vue'),
  },
  {
    path: editing,
    name: 'editing',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/pages/EditingTasks.vue'),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
