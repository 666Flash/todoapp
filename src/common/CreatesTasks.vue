<template>
  <form class="create">
    <header class="create__header">Сторінка створення задачі</header>
    <input
      v-model.trim="title"
      class="create__input"
      :class="{ error: isRed }"
      placeholder="Дані по задачі"/>
    <div class="create__section">
      <select class="create__select" v-model="completed">
        <option v-for="item in completeds" :key="item.id" :value="item.completed">
          {{ item.text }}
        </option>
      </select>
      <input
        class="create__date"
        :class="{ errorDate: isRedDate }"
        type="date"
        v-model="departureDate"/>
    </div>
    <!-- <select v-model="test" class="create__select">
      <option disabled value="">Будь ласка, оберіть варіант</option>
      <option>Не виконано</option>
      <option>Виконано</option>
    </select> -->
    <div class="create-section__button">
      <router-link
      type="button"
      v-bind="createButton"
      @click=choiceCompleted
      >
        <!-- <router-link type="button" v-bind="createButton" @click=addTask(title,completed)> -->
        Створити
      </router-link>
      <button type="reset" v-bind="clearButton">Очистити</button>
      <router-link v-bind="cancelButton">Скасувати</router-link>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTasks } from '../stores/tasks';

function pad(n: number, s = String(n)) {
  return s.length < 2 ? `0${s}` : s;
}
function dateToString(date: Date) {
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`);
}
const departureDate = ref(dateToString(new Date()));

const tasksIncrement = useTasks();
const addTask = (title: string, completed: boolean, dueTo: string) => {
  // tasksIncrement.increment(title, completed, new Date());
  tasksIncrement.increment(title, completed, new Date(Date.parse(dueTo)));
};

const title = ref('');
const completed = ref(false);
const isRed = ref(false);
const isRedDate = ref(false);
const router = useRouter();

const completeds = ref<[any]>([{ id: 0, text: 'Будь ласка, оберіть варіант', completed: false }]);
completeds.value.push({ id: 1, text: 'Не виконано', completed: false });
completeds.value.push({ id: 2, text: 'Виконано', completed: true });

function choiceCompleted() {
  let flag = true;

  if (title.value === '') {
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
    && completed.value === false) {
    isRedDate.value = true;
    flag = false;
  } else {
    isRedDate.value = false;
  }
  if (flag === true) {
    console.log(departureDate.value);
    addTask(title.value, completed.value, departureDate.value);
    router.push('/');
  }
}

const createButton = {
  id: 'button-create',
  class: 'create__button',
  to: '#',
};
const clearButton = {
  id: 'button-clear',
  class: 'create__button',
};
const cancelButton = {
  id: 'button-cancel',
  class: 'create__button',
  to: '/',
};
</script>

<style scoped>
.create__header {
  padding: 2%;
}
.create__input {
  width: 50%;
  height: 50px;
  padding: 0.5%;
  font-style: italic;
  font-family: Arial;
  text-align: left;
  background-color: white;
}
.create__section {
  padding: 2% 0 1%;
  margin: 0 2%;
}
.create__date {
  margin: 0 2%;
  background-color: rgb(255, 255, 255);
}
.create__button {
  font-weight: bold;
  text-decoration: none;
  padding: 1.5% 3%;
  margin: 2%;
  color: rgb(255, 255, 255);
  background-color: rgb(16, 201, 195);
  border: 1px solid rgb(16, 201, 195);
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
