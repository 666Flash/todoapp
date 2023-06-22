<template>
  <form class="create" v-if="show">
    <header class="create__header">{{ heading }}</header>
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
    <div class="create-section__button">
      <router-link
      type="button"
      id="button-create"
      class="create__button"
      to="#"
      @click=choiceCompleted
      >
        {{ buttonName }}
      </router-link>
      <button type="reset" id="button-clear" class="create__button">Очистити</button>
      <router-link
        id="button-cancel"
        class="create__button"
        to="/"
        @click="show = !show"
      >
        Скасувати
      </router-link>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { useRouter } from 'vue-router';

interface Props {
  heading: string
  id: string
  title: string
  completed: boolean
  dueTo: Date
  buttonName: string
  addEditingTask: any
}
const props = defineProps<Props>();

console.log(props.dueTo);
const title = ref(props.title);
const completed = ref(props.completed);
const show = ref(true);
function pad(n: number, s = String(n)) {
  return s.length < 2 ? `0${s}` : s;
}
function dateToString(date: Date) {
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`);
}
const dueToGetMonth = props.dueTo.getMonth();
const departureDate = ref(dateToString(new Date(Date.parse(`${props.dueTo.getFullYear()}-${dueToGetMonth + 1}-${props.dueTo.getDate()}`))));

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
    && new Date(Date.parse(departureDate.value)) < new Date(Date.now() - 86400000)) {
    isRedDate.value = true;
    flag = false;
  } else {
    isRedDate.value = false;
  }
  if (flag === true) {
    console.log(departureDate.value);
    props.addEditingTask(title.value, completed.value, departureDate.value, props.id);
    router.push('/');
  }
}
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
.v-enter-active, .v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from, .v-leave-to {
  opacity: 0;
}
</style>
