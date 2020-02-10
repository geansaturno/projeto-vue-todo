import TaskCreator from '../src/components/TaskCreator.vue';

export default { title: 'TaskCreator' };

export const Default = () => ({
  components: { TaskCreator },
  template: '<task-creator/>',
});
