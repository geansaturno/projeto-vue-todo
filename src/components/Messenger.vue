<template>
  <div class="alert" :class="`alert-${theme}`" role="alert">{{text}}</div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      default: 'primary',
    },
  },
};
</script>

<style>
</style>
