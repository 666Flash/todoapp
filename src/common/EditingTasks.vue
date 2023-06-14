<template>
  <form class="editing">
    <header class="editing__header">Сторінка редагування задачі</header>
    <input
      v-model.trim="editingTitle"
      class="editing__input"
      :class="{ error: isRed }"/>
    <div class="editing__section">
      <select class="editing__select" v-model="editingCompleted">
        <option v-for="item in completeds" :key="item.id" :value="item.completed">
          {{ item.text }}
        </option>
      </select>
      <input
        class="editing__date"
        :class="{ errorDate: isRedDate }"
        type="date"
        v-model="departureDate"/>
    </div>
    <div class="editing-section__button">
      <router-link
      type="button"
      v-bind="editingButton"
      @click=choiceCompleted
      >
        Редагувати
      </router-link>
      <button type="reset" v-bind="clearButton">Очистити</button>
      <router-link v-bind="cancelButton">Скасувати</router-link>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { useTasks } from '../stores/tasks';

interface Props {
  id: string
}
const props = defineProps<Props>();
const tasksEditing = useTasks();
const router = useRouter();

const editingTask = (editingId: string, title: string, completed: boolean, dueTo: string) => {
  tasksEditing.change(editingId, title, completed, new Date(Date.parse(dueTo)));
};

function pad(n: number, s = String(n)) {
  return s.length < 2 ? `0${s}` : s;
}
function dateToString(date: Date) {
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`);
}

const editing = tasksEditing.tasks.find((el) => el.id === props.id);
const editingId = editing?.id;
const editingTitle = ref(editing?.title);
const editingCompleted = ref(editing?.completed);
const dueToGetMonth = editing?.dueTo.getMonth();
const departureDate = ref(dateToString(new Date(Date.parse(`${editing?.dueTo.getFullYear()}-${dueToGetMonth + 1}-${editing?.dueTo.getDate()}`))));
const isRed = ref(false);
const isRedDate = ref(false);

const completeds = ref<[any]>([{ id: 0, text: 'Не виконано', completed: false }]);
completeds.value.push({ id: 1, text: 'Виконано', completed: true });

function choiceCompleted() {
  let flag = true;

  if (editingTitle.value === '') {
    isRed.value = true;
    flag = false;
  } else {
    isRed.value = false;
  }
  if (departureDate.value.length !== 10) {
    isRedDate.value = true;
    flag = false;
  } else {
    isRedDate.value = false;
  }
  if (departureDate.value.length === 10
    && new Date(Date.parse(departureDate.value)) < new Date(Date.now())
    && editingCompleted.value === false) {
    isRedDate.value = true;
    flag = false;
  } else {
    isRedDate.value = false;
  }
  if (flag === true) {
    console.log(departureDate.value);
    editingTask(editingId, editingTitle.value, editingCompleted.value, departureDate.value);
    router.push('/');
  }
}

const editingButton = {
  id: 'button-editing',
  class: 'editing__button',
  to: '#',
};
const clearButton = {
  id: 'button-clear',
  class: 'editing__button',
};
const cancelButton = {
  id: 'button-cancel',
  class: 'editing__button',
  to: '/',
};
</script>

<style scoped>
.editing__header {
  padding: 2%;
}
.editing__input {
  width: 50%;
  height: 50px;
  padding: 0.5%;
  font-style: italic;
  font-family: Arial;
  text-align: left;
  background-color: white;
}
.editing__section {
  padding: 2% 0 1%;
}
.editing__button {
  font-weight: bold;
  text-decoration: none;
  padding: 1.5% 3%;
  margin: 2%;
  color: rgb(255, 255, 255);
  background-color: rgb(16, 201, 195);
  border: 1px solid rgb(16, 201, 195);
}
.editing__date {
  margin: 0 2%;
  background-color: rgb(255, 255, 255);
}
.error {
  width: 50%;
  height: 50px;
  padding: 0.5%;
  font-style: italic;
  font-family: Arial;
  text-align: left;
  background-color: #fc6363;
}
.errorDate {
  background-color: #fc6363;
}
</style>
