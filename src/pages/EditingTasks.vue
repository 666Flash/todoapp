<template>
  <CreatesEditingTask
    heading="Сторінка редагування задачі"
    :id=editingIdEx
    :title=titleEx
    :completed=completedEx
    :completeds=completeds
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
const completedEx = ref(editing?.completed);
const addEditingTask = (title: string, completed: boolean, dueTo: string, editingId: string) => {
  tasksEditing.change(title, completed, new Date(Date.parse(dueTo)), editingId);
};

const completeds = ref<[any]>([{ id: 1, text: 'Не виконано', completed: false }]);
completeds.value.push({ id: 2, text: 'Виконано', completed: true });
</script>
