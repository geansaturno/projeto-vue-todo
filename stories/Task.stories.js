import Task from '../src/components/Task.vue';

export default { title: 'Task' };

export const Default = () => ({
  components: { Task },
  template: '<task :name="\'Ir ao médico\'" :action="function(){}"></task>',
});

export const Done = () => ({
  components: { Task },
  template: '<task :name="\'Ir ao mercado\'" :done="true" :action="function(){}"></task>',
});
