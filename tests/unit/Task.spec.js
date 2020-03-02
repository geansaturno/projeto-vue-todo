import { shallowMount } from '@vue/test-utils';
import Task from '@/components/Task.vue';

describe('Taks', () => {
  describe('Comportamento padrão', () => {
    const taskName = 'Ir ao Mercado';
    const cp = shallowMount(Task, {
      propsData: {
        name: taskName,
      },
    });

    it('Deve ter o campo do nome', () => {
      expect(cp.get('.task-name').text()).toBe(taskName);
    });

    describe('Eventos', () => {
      it('No clique deve disparar um evento de \'statusChange\'', () => {
        cp.get('.task-status').trigger('click');
        expect(cp.emitted('statusChange')).not.toBeUndefined();
      });

      it('No clique em remover deve enviar o evento de deleteTask', () => {
        cp.get('.task-delete').trigger('click');
        expect(cp.emitted('deleteTask')).not.toBeUndefined();
      });
    });
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
