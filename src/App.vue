<template>
  <div id="app">
    <todo-title :text="'Tarefas'"/>
    <task-list :tasks="tasks"/>
  </div>
</template>

<script>
import TodoTitle from '@/components/TodoTitle.vue';
import TaskList from '@/components/TaskList.vue';

import Task from '@/models/Task.model';

export default {
  name: 'App',
  components: {
    TodoTitle,
    TaskList,
  },
  data() {
    return {
      tasks: [
        new Task('Ir ao dentista'),
        new Task('Ir ao mercado'),
        new Task('Marcar Consulta', true),
        new Task('Limpar a casa'),
      ],
    };
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
  margin-top: 60px;
}
</style>
