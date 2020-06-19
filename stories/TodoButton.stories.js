import { action } from '@storybook/addon-actions';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import TodoButton from '../src/components/TodoButton.vue';

export default {
  title: 'Todo Button',
  components: TodoButton,
  decorators: [withKnobs],
};

export const Default = () => ({
  components: { TodoButton },
  template: '<todo-button :text="btnText" @click="click"></todo-button>',
  props: {
    btnText: {
      default: text('Texto', 'Enviar'),
    },
  },
  methods: {
    click: action('Clicado'),
  },
});

export const ComEstilo = () => ({
  components: { TodoButton },
  template: '<todo-button :text="btnText" @click="click" :btnStyle="btnStyle"></todo-button>',
  props: {
    btnText: {
      default: text('Texto', 'Voltar'),
    },
    btnStyle: {
      default: select('Estilo', ['primary', 'secondary', 'danger'], 'secondary'),
    },
  },
  methods: {
    click: action('Clicado'),
  },
});

export const ComIcone = () => ({
  components: { TodoButton },
  template: '<todo-button :text="btnText" @click="click" :btnStyle="btnStyle" :icon="btnIcon"></todo-button>',
  props: {
    btnText: {
      default: text('Texto', ''),
    },
    btnStyle: {
      default: select('Estilo', ['primary', 'secondary', 'danger'], 'secondary'),
    },
    btnIcon: {
      default: select('Icone', ['trash', 'x', 'cast', 'at-sign', 'award', 'battery', 'bell', 'bell-off'], 'trash'),
    },
  },
  methods: {
    click: action('Clicado'),
  },
});
