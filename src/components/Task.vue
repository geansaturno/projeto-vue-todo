<template>
  <div class="task" :class="{task_done: done}">
    <div class="task-status" @click="action()"/>
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
    action: Function,
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
    ::before {
      content: "0";
    }
  }

  &-name {
    padding-left: 10px;
    ::before {
      content: "0";
    }
  }

  &_done {
    .task {
      &-name {
        text-decoration: line-through;
        font-style: italic;
      }
      &-status {
        background-color: aquamarine;
      }
    }
  }
}
</style>
