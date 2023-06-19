<!-- <template>
  <createsEditing>
    <form class="create" v-if="show">
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
      <div class="create-section__button">
        <router-link
        type="button"
        id="button-create"
        class="create__button"
        to="#"
        @click=choiceCompleted
        >
          Створити
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
  </createsEditing>
</template>

<script setup lang="ts">
import { ref, defineComponent } from 'vue';
import CreatesTasks from '@/pages/CreatesTasks.vue';

const createsEditing = defineComponent({
  name: 'CreatesEditingTask',
  components: {
    CreatesTasks,
  },
});

const show = ref(true);
const title = ref('');
const completed = ref(false);
const isRed = ref(false);
const isRedDate = ref(false);

const completeds = ref<[any]>([{ id: 0, text: 'Будь ласка, оберіть варіант', completed: false }]);
completeds.value.push({ id: 1, text: 'Не виконано', completed: false });
completeds.value.push({ id: 2, text: 'Виконано', completed: true });
</script> -->
