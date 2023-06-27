<template>
  <TaskForm
    heading="Сторінка редагування задачі"
    :id="idEx"
    :title="titleEx"
    :complet="completedEx"
    :due-to="dueToEx"
    button-name="Редагувати"
    :submit="editingTask"
  />
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useTasks } from '@/stores/tasks';
import TaskForm from '@/common/TaskForm.vue';

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

const editingTask = (title: string, completed: boolean, dueTo: string, editingId: string) => {
  tasksEditing.change(title, completed, new Date(Date.parse(dueTo)), editingId);
};
</script>
