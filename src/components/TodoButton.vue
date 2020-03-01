<template>
  <button class="todo-btn btn"
    :class="{
      'btn-primary' : btnStyle == 'primary',
      'btn-secondary' : btnStyle == 'secondary',
      'btn-danger' : btnStyle == 'danger'
      }"
    @click="$emit('click')">
    {{text}}
    <i v-if="icon" :data-feather="icon"/>
  </button>
</template>

<script>
import feather from 'feather-icons';

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
    icon: {
      type: String,
      default: '',
    },
  },
  mounted() {
    feather.replace();
  },
};
</script>

<style>

</style>
