import { action } from '@storybook/addon-actions';
import TaskCreator from '../src/components/TaskCreator.vue';

export default { title: 'TaskCreator' };

export const Default = () => ({
  components: { TaskCreator },
  template: '<task-creator @newTask="showTask"/>',
  methods: {
    showTask: action('task enviada'),
  },
});
