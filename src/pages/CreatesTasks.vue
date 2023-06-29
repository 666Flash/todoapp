<template>
  <TaskForm
    heading="Сторінка створення задачі"
    id=""
    title=""
    :condition="false"
    :due-to="dueToEx"
    button-name="Створити"
    @submit="addTask"
  />
</template>

<script setup lang="ts">
import { useTasks } from '@/stores/tasks';
import TaskForm from '@/common/TaskForm.vue';
import { TaskData } from '@/common/model/task';

const dueToEx = new Date();
const taskStop = useTasks();

function addTask(data: Omit<TaskData, 'id'>) {
  taskStop.addTask(data.title, data.completed, data.dueTo);
}
</script>
