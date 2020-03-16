<template>
  <div id="app">
    <todo-title :text="'Tarefas'"/>
    <task-creator @newTask="addTask"/>
    <ul class="task-list">
      <transition-group name="side-fade">
        <li class="task-list-item" v-for="(task, index) in tasks" v-bind:key="task.id">
          <task :name="task.name" :done="task.done" @statusChange="changeTaskStatus(index)"
            @deleteTask="removeTask(index)"/>
        </li>
      </transition-group>
    </ul>
    <todo-button :customClass="'delete-all'" :text="'Apagar Concluidos'" :btnStyle="'secondary'"
    @click="removeDones"/>
  </div>
</template>

<script>
import TodoTitle from '@/components/TodoTitle.vue';
import TaskCreator from '@/components/TaskCreator.vue';
import TodoButton from '@/components/TodoButton.vue';
import Task from '@/components/Task.vue';

import TaskListStorage from '@/libs/TaskListStorage';
import Metrics from '@/libs/Metrics';

import Metric from '@/models/Metrics.model';

const storage = new TaskListStorage();

export default {
  name: 'App',
  components: {
    TodoTitle,
    TaskCreator,
    TodoButton,
    Task,
  },
  mounted() {
    this.tasks = storage.getTasks();
  },
  data() {
    return {
      tasks: [
      ],
      metrics: new Metrics(),
    };
  },
  methods: {
    changeTaskStatus(index) {
      this.tasks[index].done = !this.tasks[index].done;
      this.metrics.send(new Metric(`posicao-${index + 1}`, 'change-status'));
    },
    addTask(task) {
      if (this.tasks.length < 10) {
        this.tasks.push(task);
      }

      storage.setTasks(this.tasks);
    },
    removeDones() {
      this.tasks = this.tasks.filter((task) => !task.done);
      storage.setTasks(this.tasks);
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
      storage.setTasks(this.tasks);
    },
    toggleTaskStatus(taskIndex) {
      this.tasks[taskIndex].done = !this.tasks[taskIndex].done;
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

.task-list {
  margin-bottom: 10px;
}

.task {
    &-list {
      list-style: none;
      padding: 0;
      margin: 0 auto;
      &-item {
        &:first-child .task{
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }

        &:last-child .task{
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          border-bottom: 1px solid #efeefe
        }
      }
    }
  }

  .side-fade-enter-active, .side-fade-leave-active {
    transition: opacity .5s, translate .5s;
  }

  .side-fade-enter, .side-fade-leave-to {
    opacity: 0;
  }
</style>
