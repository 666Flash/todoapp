interface TaskData {
  id: string;
  title: string;
  completed: boolean;
  dueTo: Date;
}

export default class Task implements TaskData {
  id: string;

  title: string;

  completed: boolean;

  dueTo: Date;

  constructor(id: string, title: string, completed: boolean, dueTo: Date) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.dueTo = dueTo;
  }
}
