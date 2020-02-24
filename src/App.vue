<template>
  <div id="app">
    <todo-title :text="'Tarefas'"/>
    <task-creator @newTask="addTask"/>
    <task-list :tasks="tasks"/>
  </div>
</template>

<script>
import TodoTitle from '@/components/TodoTitle.vue';
import TaskCreator from '@/components/TaskCreator.vue';
import TaskList from '@/components/TaskList.vue';

import TaskListStorage from '@/libs/TaskListStorage';

const storage = new TaskListStorage();

export default {
  name: 'App',
  components: {
    TodoTitle,
    TaskCreator,
    TaskList,
  },
  mounted() {
    this.tasks = storage.getTasks();
  },
  data() {
    return {
      tasks: [
      ],
    };
  },
  methods: {
    addTask(task) {
      this.tasks.push(task);
      storage.setTasks(this.tasks);
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 550px;
  margin: 60px auto 0;
}
</style>
