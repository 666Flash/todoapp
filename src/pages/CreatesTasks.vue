<template>
  <CreatesEditingTask
    heading="Сторінка створення задачі"
    id=""
    title=""
    :completedFalse=false
    :completedTrue=false
    :dueTo=dueToEx
    buttonName="Створити"
    :addEditingTask=addEditingTask
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTasks } from '@/stores/tasks';
import CreatesEditingTask from '@/common/CreatesEditingTask.vue';

const dueToEx = new Date();
const taskStop = useTasks();
const addEditingTask = (title: string, completed: boolean, dueTo: string) => {
  taskStop.addtask(title, completed, new Date(Date.parse(dueTo)));
};
</script>
