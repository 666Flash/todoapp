<template>
  <form class="create" @submit.prevent="choiceCompleted">
    <header class="create__header">{{ heading }}</header>
    <input
      v-model.trim="title"
      class="create__input"
      :class="{ error: isRed }"
      placeholder="Дані по задачі"/>
    <div class="create__section">
      <div id="create__checkboxes" class="create__checkboxes">
        <label for="false">
          <input
            type="checkbox"
            id="false"
            value="completed"
            v-model="completed"
            @click="completedCheckbox(!completed)" />
          {{ completedText }}
        </label>
      </div>
      <input
        class="create__date"
        :class="{ errorDate: isRedDate }"
        type="date"
        v-model="departureDate"/>
    </div>
    <div class="create-section__button">
      <button
      type="submit"
      id="button-create"
      class="create__button"
      to="#"
      >
        {{ buttonName }}
      </button>
      <button type="reset" id="button-clear" class="create__button">Очистити</button>
      <router-link
        id="button-cancel"
        class="create__button"
        to="/"
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
  complet: boolean
  dueTo: Date
  buttonName: string
  submit: any
}
const props = defineProps<Props>();

const title = ref(props.title);
const completed = ref(props.complet);

const completedText = ref();
function completedCheckbox(complit: boolean) {
  console.log('complit');
  console.log(complit);
  if (complit) {
    completedText.value = 'Виконано';
  } else {
    completedText.value = 'Не виконано';
  }
}
completedCheckbox(completed.value);

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
    props.submit(title.value, completed.value, departureDate.value, props.id);
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
.create__checkboxes {
  margin: 0 45% 0 46%;
  text-align: left;
}
.create__date {
  margin: 1% 2%;
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
