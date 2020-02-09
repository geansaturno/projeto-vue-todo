<template>
  <div id="app">
    <todo-title :text="'Tarefas'"/>
  </div>
</template>

<script>
import TodoTitle from '@/components/TodoTitle.vue';

export default {
  name: 'App',
  components: {
    TodoTitle,
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
