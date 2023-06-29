<template>
  <router-view v-slot="{ Component }">
    <transition>
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { useTasks } from '@/stores/tasks';

const taskStop = useTasks();
taskStop.addTask('Murphy', false, new Date(Date.parse('2023-06-30')));
taskStop.addTask('gasjdjss', true, new Date(Date.parse('2023-06-30')));
taskStop.addTask('Yxbxmzxm', true, new Date(Date.parse('2023-04-27')));
taskStop.addTask('agshsjajaj', false, new Date(Date.parse('2023-04-27')));
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
