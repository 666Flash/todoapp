<template>
  <router-view/>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
</template>

<script setup lang="ts">
// import { ref } from 'vue';
// import { uid } from 'uid/secure';
// import Task from './composables/task';
import { useTasks } from './stores/tasks';

// const tasks = useTasks();
// const tasks = ref<Task[]>([]);
// tasks.push(new Task(uid(), 'Murphy', false, new Date()));
// tasks.push(new Task(uid(), 'Yxbxmzxm', true, new Date()));

const tasksIncrement = useTasks();
tasksIncrement.increment('Murphy', false, new Date(Date.parse('2023-06-30')));
tasksIncrement.increment('gasjdjss', true, new Date(Date.parse('2023-06-30')));
tasksIncrement.increment('Yxbxmzxm', true, new Date(Date.parse('2023-04-27')));
tasksIncrement.increment('agshsjajaj', false, new Date(Date.parse('2023-04-27')));

// methods: {
//   removeFromList(id) {
//     this.list = this.list.filter(item => item.id !== id)
//   }
//   removeItem: function() {
//     // генерируем событие 'remove' и передаём id элемента
//     this.$emit('remove', this.item.id);
//   }
//   removeFromCompleted(id) {
//     tasks._rawValue. = this.list.filter(item => item.id !== id)
//   }
// };
</script>

<!-- <script>
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home = { template: './views/HomeView.vue' };
const Creates = { template: './views/AboutView.vue' };

const routes = [
  { path: '/home', component: Home },
  { path: '/creates', component: Creates },
];

const router = new VueRouter({
  routes, // сокращённая запись для `routes: routes`
});

const app = new Vue({
  router,
}).$mount('#app');
</script> -->

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
