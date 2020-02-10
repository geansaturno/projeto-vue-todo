<template>
    <div class="task-creator">
        <input type="text" class="task-creator-input" placeholder="O que deve ser feito?"
          @keyup.enter="addTask"
          v-model="taskName"
        >
    </div>
</template>

<script>
import Task from '@/models/Task.model';

export default {
  data() {
    return {
      taskName: '',
    };
  },
  methods: {
    addTask() {
      const task = new Task(this.taskName);
      this.taskName = '';
      this.$emit('newTask', task);
    },
  },
};
</script>

<style lang="scss">

.task-creator {
  &-input{
    width: 100%;
    font-size: 20px;
    padding: 10px;
  }
}

</style>
