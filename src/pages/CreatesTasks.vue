<template>
  <CreatesEditingTask
    heading="Сторінка створення задачі"
    id=""
    title=""
    :completed=false
    :completeds=completeds
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

const completeds = ref<[any]>([{ id: 0, text: 'Будь ласка, оберіть варіант', completed: false }]);
completeds.value.push({ id: 1, text: 'Не виконано', completed: false });
completeds.value.push({ id: 2, text: 'Виконано', completed: true });
</script>
