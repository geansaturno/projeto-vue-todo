import TodoButton from '../src/components/TodoButton.vue';

export default { title: 'Todo Button' };

export const Default = () => ({
  components: { TodoButton },
  template: '<todo-button :text="\'Apagar\'"></todo-button>',
});

export const Criar = () => ({
  components: { TodoButton },
  template: '<todo-button :text="\'Criar\'"></todo-button>',
});

export const Secundário = () => ({
  components: { TodoButton },
  template: '<todo-button :text="\'Apagar\'" :btnStyle="\'secondary\'"></todo-button>',
});

export const Perigo = () => ({
  components: { TodoButton },
  template: '<todo-button :text="\'Apagar\'" :btnStyle="\'danger\'"></todo-button>',
});

export const Icone = () => ({
  components: { TodoButton },
  template: '<todo-button :text="\'Apagar\'" :btnStyle="\'danger\'" :icon="\'trash\'"></todo-button>',
});
