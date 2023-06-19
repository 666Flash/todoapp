<script setup lang="ts">
import { ref } from 'vue';
// import routerEditing from 'vue-router';
import { useTasks } from '@/stores/tasks';

const tasksStore = useTasks();
const show = ref(true);
const sortStan = ref(true);
// const routerEditing(id: string) = routerEditing();
// const editingStore = useEditing();

function routerEditing(id: string) {
  return {
    path: `/${id}/edit`,
  };
}

function pad(n: number, s = String(n)) {
  return s.length < 2 ? `0${s}` : s;
}

tasksStore.sortByDueTo();
const groupByDueTo = tasksStore.groupBy('dueTo');

// tasksStore.increment('Murphy', false);
// tasksStore.increment('Yxbxmzxm', true);
// console.log(tasksStore.tasks[0]);

// methods: {
//   removeFromList(id) {
//     this.list = this.list.filter(item => item.id !== id)
//   }
//   removeItem: function() {
//     // генерируем событие 'remove' и передаём id элемента
//     this.$emit('remove', this.item.id);
//   }
//   removeFromCompleted(id) {
//     tasks._rawValue. = this.list.filter(item => item.id !== id)
//   }
// };
</script>

<template>
  <div class="home" v-if="show">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
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
        <!-- @remove="removeFromList(item.id) -->
          <div class="home__tasks">
            {{ item.title }}
          </div>
          <div class="home__tasks">
            <button type="button" class="home__completed"
              v-if="item.completed" @click="tasksStore.togolStatus(item.id)">
              Виконано
            </button>
            <button
              type="button"
              class="home__completed"
              v-else
              @click="tasksStore.togolStatus(item.id)"
            >
              Не виконано
            </button>
          </div>
          <div class="home__tasks">
            {{ (pad(item.dueTo.getDate()) + '.'
              + pad(item.dueTo.getMonth()+1) + '.'
              + item.dueTo.getFullYear()) }}
          </div>
          <section class="home__tasks section__tasks-button">
            <router-link
              class="home__button-edit"
              @click="show = !show"
              :to="routerEditing(item.id)"
            >
              Редагування задачі
            </router-link>
              <!-- to="/editing" :props=item.id>Редагування задачі</router-link> -->
            <button
              type="button"
              @click="tasksStore.delete(item.id)"
              class="home__button-delete"
            >
              Видалення задачі
            </button>
          </section>
        </TransitionGroup>
      </TransitionGroup>
    </TransitionGroup>
    <section class="section__button">
      <router-link
        type="button"
        id="button-home"
        class="home__button"
        to="/create"
        @click="show = !show"
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
      <section class="statistics__section">
        <p class="statistics__quantity">
          Загальна кількість задач - {{tasksStore.numberOfTasks}}
        </p>
      </section>
      <section class="statistics__section">
        <p class="statistics__performed">
          Кількість виконаних задач -
          {{tasksStore.completedTasks}}
        </p>
      </section>
      <section class="statistics__section">
        <p class="statistics__notexecuted">
          Кількість невиконаних задач -
          {{tasksStore.unfinishedTasks}}
        </p>
      </section>
    </div>
  </div>
</template>

// <!-- <script setup lang="ts">
// import { defineComponent } from 'vue';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

// export default defineComponent({
//   name: 'HomeView',
//   components: {
//     HelloWorld,
//   },
// });
// </script> -->

<style scoped>
.home {
  padding: 0% 1% 2%;
}
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
.statistics__section {
  margin: 0 2%;
}

.fade-move, .fade-enter-active, .fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}
/* .fade-leave-active {
  position: absolute;
} */

.v-enter-active, .v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from, .v-leave-to {
  opacity: 0;
}
</style>
