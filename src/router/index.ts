import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../common/HomeView.vue';

// export function routerEditing(id: string) {
//   return {
//     name: `/editing/${id}`,
//   };
// }

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/create',
    name: 'create',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../common/CreatesTasks.vue'),
  },
  {
    path: '/:id/edit',
    name: 'editing',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../common/EditingTasks.vue'),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
