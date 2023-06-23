<template>
  <CreatesEditingTask
    heading="Сторінка редагування задачі"
    :id=editingIdEx
    :title=titleEx
    :completedFalse=completedFalseEx
    :completedTrue=completedTrueEx
    :dueTo=dueToEx
    buttonName="Редагувати"
    :addEditingTask=addEditingTask
  />
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { useTasks } from '@/stores/tasks';
import CreatesEditingTask from '@/common/CreatesEditingTask.vue';

interface Props {
  id: string
}
const props = defineProps<Props>();
const tasksEditing = useTasks();
const editing = tasksEditing.tasks.find((el) => el.id === props.id);
const editingIdEx = editing?.id;
const titleEx = ref(editing?.title);
const dueToEx = editing?.dueTo;
const completedFalseEx = ref(false);
const completedTrueEx = ref(false);

if (editing?.completed) {
  completedTrueEx.value = true;
} else {
  completedFalseEx.value = true;
}

const addEditingTask = (title: string, completed: boolean, dueTo: string, editingId: string) => {
  tasksEditing.change(title, completed, new Date(Date.parse(dueTo)), editingId);
};
</script>
