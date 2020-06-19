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

  describe('Estilo Padrão', () => {
    it('O estilo padrão deve ser primary', () => {
      const cp = shallowMount(TodoButton, { propsData: { text: 'Apagar' } });

      expect(cp.classes()).toContain('btn-primary');
    });
  });

  describe('Estilo primário', () => {
    const expectedClass = 'btn-primary';
    it(`Deve ter a classe ${expectedClass}`, () => {
      const cp = shallowMount(TodoButton, { propsData: { text: 'Apagar', btnStyle: 'primary' } });

      expect(cp.classes()).toContain(expectedClass);
    });
  });

  describe('Estilo secundário', () => {
    const expectedClass = 'btn-secondary';

    it(`Deve ter a classe ${expectedClass}`, () => {
      const cp = shallowMount(TodoButton, { propsData: { text: 'Apagar', btnStyle: 'secondary' } });

      expect(cp.classes()).toContain(expectedClass);
    });
  });

  describe('Estilo Perigo', () => {
    const expectedClass = 'btn-danger';

    it(`Deve ter a classe ${expectedClass}`, () => {
      const cp = shallowMount(TodoButton, { propsData: { text: 'Apagar', btnStyle: 'danger' } });

      expect(cp.classes()).toContain(expectedClass);
    });
  });

  describe('Com icone', () => {
    it('Deve ter o icone de lixeira', () => {
      const desiredIcon = 'trash';

      const cp = shallowMount(TodoButton, { propsData: { text: 'Apagar', icon: desiredIcon } });

      expect(cp.get(`svg.feather.feather-${desiredIcon}`)).toBeDefined();
    });
  });

  describe('Com estilo customizado', () => {
    const expectedClass = 'button-test';

    it(`Deve ter a classe ${expectedClass}`, () => {
      const cp = shallowMount(TodoButton, { propsData: { text: 'Testar', customClass: expectedClass } });

      expect(cp.classes()).toContain(expectedClass);
    });

    it(`Não deve ter a classe ${expectedClass}`, () => {
      const cp = shallowMount(TodoButton, { propsData: { text: 'Testar' } });

      expect(cp.classes()).not.toContain(expectedClass);
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
