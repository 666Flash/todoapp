<template>
  <TaskForm
    heading="Сторінка створення задачі"
    id=""
    title=""
    :complet="false"
    :due-to="dueToEx"
    button-name="Створити"
    :submit="addTask"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTasks } from '@/stores/tasks';
import TaskForm from '@/common/TaskForm.vue';

const dueToEx = new Date();
const taskStop = useTasks();
const addTask = (title: string, completed: boolean, dueTo: string) => {
  taskStop.addtask(title, completed, new Date(Date.parse(dueTo)));
};
</script>
