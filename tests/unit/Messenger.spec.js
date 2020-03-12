import { shallowMount } from '@vue/test-utils';
import Messenger from '@/components/Messenger.vue';


describe('Messenger', () => {
  const buildComponent = (text, theme) => shallowMount(Messenger, {
    propsData: {
      text,
      theme,
    },
  });

  it('Deve conter um texto', () => {
    const text = 'Seja bem vindo!!';

    const cp = buildComponent(text);

    expect(cp.text()).toBe(text);
  });

  it('Deve conter a classe alert', () => {
    const cp = buildComponent('Olá');

    expect(cp.classes()).toContain('alert');
  });

  describe('Estilos', () => {
    it('Deve ter o estilo primary', () => {
      const cp = buildComponent('Olá');

      expect(cp.classes()).toContain('alert-primary');
    });

    it('Deve ter o estilo danger', () => {
      const cp = buildComponent('Você tem certeza disso?', 'danger');

      expect(cp.classes()).toContain('alert-danger');
    });

    it('Deve ter o estilo success', () => {
      const cp = buildComponent('Tudo pronto', 'succes');

      expect(cp.classes()).toContain('alert-succes');
    });
  });
});
