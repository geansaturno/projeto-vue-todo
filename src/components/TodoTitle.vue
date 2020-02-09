<template>
    <div>
        <h1 class="main-title">{{text}}</h1>
    </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>

</style>
