
<template>
    <ul class="task-list">
      <li class="task-list-item" v-for="(task, index) in tasks" v-bind:key="task.id">
        <task :name="task.name" :done="task.done" @statusChange="toggleTaskStatus(index)"/>
      </li>
    </ul>
</template>

<script>
import Task from '@/components/Task.vue';

export default {
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  methods: {
    toggleTaskStatus(taskIndex) {
      this.tasks[taskIndex].done = !this.tasks[taskIndex].done;
    },
  },
  components: {
    Task,
  },
};
</script>

<style lang="scss">
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

</style>
