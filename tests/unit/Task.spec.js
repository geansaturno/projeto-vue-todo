import { shallowMount } from '@vue/test-utils';
import Task from '@/components/Task.vue';

describe('Taks', () => {
  it('Deve ter o campo do nome', () => {
    const taskName = 'Ir ao Mercado';

    const cp = shallowMount(Task, {
      propsData: {
        name: taskName,
      },
    });

    expect(cp.get('.task-name').text()).toBe(taskName);
  });

  it('No clique deve executar a ação desejada', () => {
    let number = 0;
    const expectedFunction = () => {
      number += 2;
    };

    const cp = shallowMount(Task, {
      propsData: {
        name: 'Marcar exame',
        done: true,
        action: expectedFunction,
      },
    });

    cp.get('.task-status').trigger('click');

    expect(number).toBe(2);
  });

  describe('Task Done', () => {
    it('Deve ter o estilo de done', () => {
      const cp = shallowMount(Task, {
        propsData: {
          name: 'Marcar exame',
          done: true,
        },
      });

      expect(cp.classes()).toContain('task_done');
    });
  });

  describe('Task undone', () => {
    it('Não deve ter o estilo done', () => {
      const cp = shallowMount(Task, {
        propsData: {
          name: 'Marcar exame',
        },
      });

      expect(cp.classes()).not.toContain('task_done');
    });
  });
});
