<template>
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
</template>

<script setup lang="ts">
import { useTasks } from '@/stores/tasks';

const tasksStore = useTasks();
</script>

<style>
.statistics__section {
  margin: 0 2%;
}
</style>
