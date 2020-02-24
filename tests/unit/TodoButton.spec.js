import { shallowMount } from '@vue/test-utils';
import TodoButton from '@/components/TodoButton.vue';

describe('Todo Button', () => {
  describe('Texto', () => {
    let text = 'Apagar';

    it(`Deve criar um botão com o texto ${text}`, () => {
      const cp = shallowMount(TodoButton, { propsData: { text } });
      expect(cp.text()).toBe(text);
    });


    text = 'Criar';
    it(`Deve criar um botão com o texto ${text}`, () => {
      const cp = shallowMount(TodoButton, { propsData: { text } });
      expect(cp.text()).toBe(text);
    });
  });

  describe('Estilo', () => {
    it('Deve ter o estilo primario por padrão', () => {
      const cp = shallowMount(TodoButton, { propsData: { text: 'Apagar' } });

      expect(cp.classes()).toContain('btn-primary');
    });

    it('Se passar o estilo como primário deve ser primário', () => {
      const cp = shallowMount(TodoButton, { propsData: { text: 'Apagar', btnStyle: 'primary' } });

      expect(cp.classes()).toContain('btn-primary');
    });

    it('Se passar o estilo como secundário deve ser secundário', () => {
      const cp = shallowMount(TodoButton, { propsData: { text: 'Apagar', btnStyle: 'secondary' } });

      expect(cp.classes()).toContain('btn-secondary');
    });
  });

  describe('Evento', () => {
    it('Deve disparar o evento de clique quando receber o clique', () => {
      const cp = shallowMount(TodoButton, { propsData: { text: 'Apagar' } });

      cp.trigger('click');
      expect(cp.emitted('click')).toBeDefined();
      expect(cp.emitted('click')).toHaveLength(1);
    });
  });
});
