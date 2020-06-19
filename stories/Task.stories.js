import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import Task from '../src/components/Task.vue';

export default {
  title: 'Task',
  components: Task,
  decorators: [withKnobs],
};

export const Default = () => ({
  components: { Task },
  template: '<task :name="name" :done="done"></task>',
  props: {
    name: {
      default: text('Texto', 'Ir ao médico'),
    },
    done: {
      default: boolean('Done ?', false),
    },
  },
});
