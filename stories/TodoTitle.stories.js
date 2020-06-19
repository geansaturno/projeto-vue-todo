import { text, withKnobs } from '@storybook/addon-knobs';
import TodoTitle from '../src/components/TodoTitle.vue';

export default {
  title: 'Title',
  components: TodoTitle,
  decorators: [withKnobs],
};

export const Default = () => ({
  components: { TodoTitle },
  template: '<todo-title :text="text"></todo-title>',
  props: {
    text: {
      default: text('Texto', 'Olá Storybook'),
    },
  },
});
