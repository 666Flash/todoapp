import { defineStore } from 'pinia';
import { uid } from 'uid/secure';
import Task from '@/common/mobel/task';

interface TasksState {
  tasks: Task[];
}

export const useTasks = defineStore('tasks', {
  state: (): TasksState => ({
    tasks: [],
  }),
  getters: {
    numberOfTasks: (state) => state.tasks.length,
    completedTasks: (state) => state.tasks.filter((tasks) => tasks.completed === true).length,
    unfinishedTasks: (state) => state.tasks.filter((tasks) => tasks.completed === false).length,
  },
  actions: {
    addtask(title: string, completed: boolean, dueTo: Date) {
      this.tasks.push(new Task(uid(), title, completed, dueTo));
    },
    sortByStatus(sort: boolean) {
      this.tasks = this.tasks.sort((a, b) => {
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
    },
    sortByDueTo() {
      this.tasks = this.tasks.sort((a, b) => {
        if (a.dueTo > b.dueTo) {
          return 1;
        }
        if (a.dueTo < b.dueTo) {
          return -1;
        }
        return 0;
      });
    },
    groupBy(key: string) {
      return function group(array: any) {
        return array.reduce((acc: any, obj: any) => {
          const property = obj[key];
          acc[property] = acc[property] || [];
          acc[property].push(obj);
          return acc;
        }, {});
      };
    },
    delete(removed: string) {
      this.tasks = this.tasks.filter((tasks) => tasks.id !== removed);
      if (this.tasks.length < 1) {
        alert('Не має жодної задачі!!!');
      }
    },
    togolStatus(changed: string) {
      this.tasks = this.tasks.map((tasks) => ({
        ...tasks,
        completed: tasks.id === changed ? !tasks.completed : tasks.completed,
      }));
    },
    change(title: string, completed: boolean, dueTo: Date, removed: string) {
      this.tasks = this.tasks.map((tasks) => ({
        ...tasks,
        title: tasks.id === removed ? title : tasks.title,
        completed: tasks.id === removed ? completed : tasks.completed,
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
