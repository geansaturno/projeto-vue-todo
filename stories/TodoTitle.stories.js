import TodoTitle from '../src/components/TodoTitle.vue';

export default { title: 'Title' };

export const Default = () => ({
  components: { TodoTitle },
  template: '<todo-title :text="\'Olá Storybook\'"></todo-title>',
});
