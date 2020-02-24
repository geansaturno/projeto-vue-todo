import Task from '@/models/Task.model';

export default class TaskListStorage {
  constructor() {
    this.storage = localStorage;
    this.storageKeyName = 'taskList';
  }

  setTasks(data) {
    const dataString = JSON.stringify(data);
    this.storage.setItem(this.storageKeyName, dataString);
  }

  getTasks() {
    const dataString = this.storage.getItem(this.storageKeyName);
    const data = JSON.parse(dataString);

    const tasks = [];

    if (data && data.forEach) {
      data.forEach((task) => {
        const { name, done } = task;
        const newTask = new Task(name, done);
        tasks.push(newTask);
      });
    }

    return tasks;
  }
}
