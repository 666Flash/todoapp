<template>
  <TaskForm
    heading="Сторінка редагування задачі"
    :id="idEx"
    :title="titleEx"
    :condition="completedEx"
    :due-to="dueToEx"
    button-name="Редагувати"
    @submit="editingTask"
  />
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useTasks } from '@/stores/tasks';
import TaskForm from '@/common/TaskForm.vue';
import { TaskData } from '@/common/model/task';

interface Props {
  id: string
}

const props = defineProps<Props>();
const tasksEditing = useTasks();
const editing = tasksEditing.tasks.find((el) => el.id === props.id);
const idEx = editing?.id;
const titleEx = editing?.title;
const completedEx = editing?.completed;
const dueToEx = editing?.dueTo;

function editingTask(data: TaskData) {
  tasksEditing.change(data.title, data.completed, data.dueTo, data.id);
}
</script>
