import { mount } from '@vue/test-utils';
import TaskList from '@/components/TaskList.vue';
import Task from '@/models/Task.model';

describe('Taks List', () => {
  it('Deve Exibir 3 Tasks', () => {
    const cp = mount(TaskList, {
      propsData: {
        tasks: [
          new Task('Ir ao mercado'),
          new Task('Marcar consulta'),
          new Task('Marcar Dentista'),
        ],
      },
    });

    expect(cp.findAll('.task').length).toBe(3);
  });

  it('Ao marcar a primeira Task como done, ela deve receber o status de Done', () => {
    const primeiraTask = new Task('Ir ao mercado');
    const segundaTask = new Task('Marcar consulta');

    const cp = mount(TaskList, {
      propsData: {
        tasks: [
          primeiraTask,
          segundaTask,
          new Task('Marcar Dentista'),
        ],
      },
    });
    cp.get('.task-status').trigger('click');

    expect(primeiraTask.done).toBeTruthy();
    expect(segundaTask.done).not.toBeTruthy();
  });
});
