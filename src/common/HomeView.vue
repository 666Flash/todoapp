<script setup lang="ts">
import { ref } from 'vue';
// import routerEditing from 'vue-router';
import { useTasks } from '../stores/tasks';
// import { routerEditing } from '../router/index';

const tasksStore = useTasks();
const show = ref(true);
// const routerEditing(id: string) = routerEditing();
// const editingStore = useEditing();

function routerEditing(id: string) {
  return {
    path: `/edit/${id}`,
  };
}

function pad(n: number, s = String(n)) {
  return s.length < 2 ? `0${s}` : s;
}

// tasksStore.increment('Murphy', false);
// tasksStore.increment('Yxbxmzxm', true);
// console.log(tasksStore);

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

const homeButton = {
  id: 'button-home',
  class: 'home__button',
  to: '/create',
};
</script>

<template>
  <Transition>
    <div class="home" v-if="show">
      <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
      <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
      <TransitionGroup tag="ul" name="fade">
        <form class="container" v-for="item in tasksStore.tasks" :key="item.id">
        <!-- @remove="removeFromList(item.id) -->
          <div class="home__tasks">
            {{ item.title }}
          </div>
          <div class="home__tasks">
            <button type="button" class="home__completed"
              v-if="item.completed" @click="tasksStore.changes(item.id)">
              Виконано
            </button>
            <button
              type="button"
              class="home__completed"
              v-else
              @click="tasksStore.changes(item.id)"
            >
              Не виконано
            </button>
          </div>
          <div class="home__tasks">
            {{ (item.dueTo.getFullYear() + '-'
              + pad(item.dueTo.getMonth()+1) + '-'
              + pad(item.dueTo.getDate())) }}
          </div>
          <section class="home__tasks section__tasks-button">
            <router-link
              class="home__button-edit"
              :to="routerEditing(item.id)"
            >
              Редагування задачі
            </router-link>
              <!-- to="/editing" :props=item.id>Редагування задачі</router-link> -->
            <button
              type="button"
              @click="tasksStore.remove(item.id)"
              class="home__button-delete"
            >
              Видалення задачі
            </button>
          </section>
        </form>
      </TransitionGroup>
      <section class="section__button">
        <router-link
          type="button"
          v-bind="homeButton"
          @click="show = !show"
        >
          Cтворення новоЇ задачі
        </router-link>
      </section>
      <div class="statistics">
        <section class="statistics__section">
          <p class="statistics__quantity">
            Загальна кількість задач - {{tasksStore.tasks.length}}
          </p>
        </section>
        <section class="statistics__section">
          <p class="statistics__performed">
            Кількість виконаних задач -
            {{tasksStore.tasks.filter((tasks) => tasks.completed === true).length}}
          </p>
        </section>
        <section class="statistics__section">
          <p class="statistics__notexecuted">
            Кількість невиконаних задач -
            {{tasksStore.tasks.filter((tasks) => tasks.completed === false).length}}
          </p>
        </section>
      </div>
    </div>
  </Transition>
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
  background-color: rgb(16, 201, 65);
  border: 1px solid rgb(16, 201, 65);
}
.home__button-delete {
  font-weight: bold;
  text-decoration: none;
  padding: 1.5% 3%;
  margin: 2%;
  color: rgb(255, 255, 255);
  background-color: rgb(201, 16, 19);
  border: 1px solid rgb(201, 16, 19);
}
.section__button {
  padding: 3%;
}
.home__button {
  font-weight: bold;
  text-decoration: none;
  padding: 1.5% 3%;
  margin: 2%;
  color: rgb(255, 255, 255);
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
