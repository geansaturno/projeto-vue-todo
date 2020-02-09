<template>
  <div class="task" :class="{task_done: done}">
    <div class="task-status" @click="$emit('statusChange')"/>
    <div class="task-name">{{name}}</div>
  </div>
</template>

<script>
export default {
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
  display: flex;

  &-status {
    width: 20px;
    height: 20px;
    border: 2px solid #3333;
    border-radius: 50%;
  }

  &-name {
    padding-left: 10px;
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
