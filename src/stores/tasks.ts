import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { uid } from 'uid/secure';
import Task from '@/common/model/task';

export const useTasks = defineStore('tasks', () => {
  const tasks = ref<Task[]>([]);
  const numberOfTasks = computed(() => tasks.value.length);
  const completedTasks = computed(() => tasks.value.filter(
    (task) => task.completed === true,
  ).length);
  const unfinishedTasks = computed(() => tasks.value.filter(
    (task) => task.completed === false,
  ).length);
  const listCheck = computed(() => {
    if (tasks.value.length < 1) {
      return false;
    }
    return true;
  });

  function addTask(title: string, completed: boolean, dueTo: Date) {
    tasks.value.push(new Task(uid(), title, completed, dueTo));
  }
  function sortByStatus(sort: boolean) {
    tasks.value = tasks.value.sort((a: any, b: any) => {
      if (sort) {
        if (a.completed > b.completed) {
          return 1;
        }
        if (a.completed < b.completed) {
          return -1;
        }
      } else {
        if (a.completed < b.completed) {
          return 1;
        }
        if (a.completed > b.completed) {
          return -1;
        }
      }
      return 0;
    });
  }
  function sortByDueTo() {
    tasks.value = tasks.value.sort((a: any, b: any) => {
      if (a.dueTo > b.dueTo) {
        return 1;
      }
      if (a.dueTo < b.dueTo) {
        return -1;
      }
      return 0;
    });
  }
  function groupBy(key: string) {
    return function group(array: any) {
      return array.reduce((acc: any, obj: any) => {
        const property = obj[key];
        acc[property] = acc[property] || [];
        acc[property].push(obj);
        return acc;
      }, {});
    };
  }
  function completedCheckbox(finished: boolean) {
    let completedText = '';
    if (finished) {
      completedText = 'Виконано';
    } else {
      completedText = 'Не виконано';
    }
    return completedText;
  }
  function deleteForId(removed: string) {
    tasks.value = tasks.value.filter((task) => task.id !== removed);
  }
  function changeStatus(changed: string) {
    tasks.value = tasks.value.map((task) => ({
      ...task,
      completed: task.id === changed ? !task.completed : task.completed,
    }));
  }
  function change(title: string, completed: boolean, dueTo: Date, removed: string) {
    tasks.value = tasks.value.map((task) => ({
      ...task,
      title: task.id === removed ? title : task.title,
      completed: task.id === removed ? completed : task.completed,
      dueTo: task.id === removed ? dueTo : task.dueTo,
    }));
  }

  return {
    tasks,
    numberOfTasks,
    completedTasks,
    unfinishedTasks,
    addTask,
    listCheck,
    sortByStatus,
    sortByDueTo,
    groupBy,
    completedCheckbox,
    deleteForId,
    changeStatus,
    change,
  };
});

export const useEditing = defineStore('editing', {
  state: () => ({
    editing: '',
  }),
  actions: {
    change(changed: string) {
      console.log(changed);
      this.editing = changed;
    },
  },
});
