import TodoTitle from '@/components/TodoTitle.vue';
import { shallowMount } from '@vue/test-utils';

describe('Componente Title', () => {
  it('Deve ser um elemento h1', () => {
    const cp = shallowMount(TodoTitle, {
      propsData: {
        text: 'Title',
      },
    });
    expect(cp.get('h1'));
  });

  const expectedTitle = 'Olá Mundo';
  it(`Deve conter o texto ${expectedTitle}`, () => {
    const cp = shallowMount(TodoTitle, {
      propsData: {
        text: expectedTitle,
      },
    });

    expect(cp.get('.main-title').text()).toBe(expectedTitle);
  });
});
