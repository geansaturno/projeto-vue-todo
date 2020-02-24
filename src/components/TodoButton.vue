<template>
  <button class="todo-btn btn"
    :class="{'btn-primary' : btnStyle == 'primary', 'btn-secondary' : btnStyle == 'secondary'}"
    @click="$emit('click')">
    {{text}}
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    btnStyle: {
      type: String,
      default: 'primary',
    },
  },
};
</script>

<style>

</style>
