<template>
  <TaskForm
    heading="Сторінка редагування задачі"
    :id="editingIdEx"
    :title="titleEx"
    :complet="completedEx"
    :due-to="dueToEx"
    button-name="Редагувати"
    :submit="editingTask"
  />
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { useTasks } from '@/stores/tasks';
import TaskForm from '@/common/TaskForm.vue';

interface Props {
  id: string
}
const props = defineProps<Props>();
const tasksEditing = useTasks();
const editing = tasksEditing.tasks.find((el) => el.id === props.id);
const editingIdEx = editing?.id;
const titleEx = ref(editing?.title);
const completedEx = ref(editing?.completed);
const dueToEx = editing?.dueTo;

const editingTask = (title: string, completed: boolean, dueTo: string, editingId: string) => {
  tasksEditing.change(title, completed, new Date(Date.parse(dueTo)), editingId);
};
</script>
