/* eslint-disable import/prefer-default-export */
import { defineStore } from 'pinia';
import { uid } from 'uid/secure';
import Task from '../common/composables/task';

interface TasksState {
  tasks: Task[];
}

export const useTasks = defineStore('tasks', {
  state: (): TasksState => ({
    tasks: [],
  }),
  // getters: {
  //   doubleCount: (state) => state.count * 2,
  // },
  actions: {
    increment(title: string, completed: boolean, dueTo: Date) {
      this.tasks.push(new Task(uid(), title, completed, dueTo));
    },
    remove(removed: string) {
      this.tasks = this.tasks.filter((tasks) => tasks.id !== removed);
    },
    changes(changed: string) {
      this.tasks = this.tasks.map((tasks) => ({
        ...tasks,
        completed: tasks.id === changed ? !tasks.completed : tasks.completed,
      }));
    },
    change(removed: string, title: string, completed: boolean, dueTo: Date) {
      this.tasks = this.tasks.map((tasks) => ({
        ...tasks,
        title: tasks.id === removed ? title : tasks.title,
      }));
      this.tasks = this.tasks.map((tasks) => ({
        ...tasks,
        completed: tasks.id === removed ? completed : tasks.completed,
      }));
      this.tasks = this.tasks.map((tasks) => ({
        ...tasks,
        dueTo: tasks.id === removed ? dueTo : tasks.dueTo,
      }));
    },
  },
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
