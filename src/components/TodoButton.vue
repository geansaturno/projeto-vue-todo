<template>
  <button class="todo-btn btn"
    :class="`btn-${btnStyle} ${customClass}` "
    @click="$emit('click')">
    {{text}}
    <i v-if="icon" v-html="getSvg"/>
  </button>
</template>

<script>
import feather from 'feather-icons';

export default {
  props: {
    text: {
      type: String,
      default: '',
    },
    customClass: {
      type: String,
      default: '',
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
  computed: {
    getSvg() {
      return feather.icons[this.icon].toSvg();
    },
  },
};
</script>

<style>

</style>
