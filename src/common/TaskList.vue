<template>
  <div v-if="tasksStore.listCheck">
    <TransitionGroup tag="ul" name="fade">
      <TransitionGroup
        class="home__group"
        v-for="items in groupByDueTo(tasksStore.tasks)"
        :key="items.id"
        tag="ul"
        name="fade"
      >
        <TransitionGroup
          class="container"
          v-for="item in items"
          :key="item.id"
          tag="ul"
          name="fade"
        >
          <div class="home__tasks">
            {{ item.title }}
          </div>
          <div class="home__tasks">
            <button type="button" class="home__completed"
              v-if="item.completed" @click="tasksStore.changeStatus(item.id)">
              Виконано
            </button>
            <button
              type="button"
              class="home__completed"
              v-else
              @click="tasksStore.changeStatus(item.id)"
            >
              Не виконано
            </button>
          </div>
          <div class="home__tasks">
              {{ parsingDate(item.dueTo) }}
          </div>
          <section class="home__tasks section__tasks-button">
            <router-link
              class="home__button-edit"
              :to="routerEditing(item.id)"
            >
              Редагування задачі
            </router-link>
            <button
              type="button"
              @click="tasksStore.deleteForId(item.id), tasksStore.listCheck"
              class="home__button-delete"
            >
              Видалення задачі
            </button>
          </section>
        </TransitionGroup>
      </TransitionGroup>
    </TransitionGroup>
  </div>
  <div v-else>Не має жодної задачі!!!</div>
</template>

<script setup lang="ts">
import { useTasks } from '@/stores/tasks';
import parsingDate from '@/common/utils/date';

const tasksStore = useTasks();

function routerEditing(id: string) {
  return {
    path: `/${id}/edit`,
  };
}

tasksStore.sortByDueTo();
const groupByDueTo = tasksStore.groupBy('dueTo');
</script>

<style>
.home__group {
  padding: 1%;
}
.container {
  display: flex;
  flex-direction:row;
  justify-content: center;
  flex-wrap: wrap;
}
.home__tasks {
  flex: auto;
  padding: 1%;
  border: 1px solid rgb(16, 201, 195);
}
.home__completed {
  border: none;
  background-color: rgb(255, 255, 255);
}
.section__tasks-button {
  border: none;
}
.home__button-edit {
  font-weight: bold;
  text-decoration: none;
  padding: 1.5% 3%;
  margin: 2%;
  color: rgb(255, 255, 255);
  background-color: rgb(200, 201, 198);
  border: 1px solid rgb(200, 201, 198);
}
.home__button-edit:hover {
  background-color: rgb(16, 201, 65);
  border: 1px solid rgb(16, 201, 65);
}
.home__button-delete {
  font-weight: bold;
  text-decoration: none;
  padding: 1.5% 3%;
  margin: 2%;
  color: rgb(255, 255, 255);
  background-color: rgb(200, 201, 198);
  border: 1px solid rgb(200, 201, 198);
}
.home__button-delete:hover {
  background-color: rgb(201, 16, 19);
  border: 1px solid rgb(201, 16, 19);
}
.fade-move, .fade-enter-active, .fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}
.v-enter-active, .v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from, .v-leave-to {
  opacity: 0;
}
</style>
