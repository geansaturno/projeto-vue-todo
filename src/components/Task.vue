<template>
  <div class="task" :class="{task_done: done}">
    <div class="task-status" @click="$emit('statusChange')"/>
    <div class="task-name">{{name}}</div>
    <div class="task-delete" @click="$emit('deleteTask')">
      <todo-button :icon="'trash'" :btnStyle="'danger'"/>
    </div>
  </div>
</template>

<script>
import TodoButton from '@/components/TodoButton.vue';

export default {
  components: {
    TodoButton,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.task {
  padding: 5px 10px;
  border: 1px solid #efefef;
  border-bottom: none;
  display: flex;
  align-items: center;

  &-status {
    width: 20px;
    height: 20px;
    border: 2px solid #3333;
    border-radius: 50%;
  }

  &-name {
    padding: 0 10px;
    flex-grow: 1;
    text-align: left;
  }

  &_done {
    .task {
      &-name {
        text-decoration: line-through;
        font-style: italic;
      }
      &-status {
        background-color: chartreuse;
      }
    }
  }
}
</style>
