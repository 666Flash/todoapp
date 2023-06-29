<template>
  <div class="home">
    <TaskList />
    <section class="section__button">
      <router-link
        type="button"
        id="button-home"
        class="home__button"
        to="/create"
      >
        Cтворення новоЇ задачі
      </router-link>
    </section>
    <div class="statistics">
      <button
        @click="tasksStore.sortByStatus(sortStan), sortStan = !sortStan"
      >
        Cортувати по статусу
      </button>
      <HomeStatistics />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTasks } from '@/stores/tasks';
import TaskList from '@/common/TaskList.vue';
import HomeStatistics from '@/common/HomeStatistics.vue';

const tasksStore = useTasks();
const sortStan = ref(true);
</script>

<style scoped>
.home {
  padding: 0% 1% 2%;
}
.section__button {
  padding: 3%;
}
.home__button {
  font-weight: bold;
  text-decoration: none;
  padding: 0.5% 1%;
  margin: 2%;
  color: rgb(255, 255, 255);
  background-color: rgb(200, 201, 198);
  border: 1px solid rgb(200, 201, 198);
  transition: all 700ms linear 250ms;
}
.home__button:hover {
  padding: 1.5% 3%;
  background-color: rgb(16, 201, 195);
  border: 1px solid rgb(16, 201, 195);
}
.statistics {
  display: flex;
  flex-direction:row;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
