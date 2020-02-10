import { shallowMount } from '@vue/test-utils';
import TaskCreator from '@/components/TaskCreator.vue';
import Task from '@/models/Task.model';
import Vue from 'vue';

describe('TakCreator', () => {
  it('Deve enviar a tarefa por evento quando teclar enter', () => {
    const cp = shallowMount(TaskCreator);

    const inputFiled = cp.get('.task-creator-input');
    inputFiled.setValue('Ir ao Mercado');
    inputFiled.trigger('keyup.enter');

    expect(cp.emitted('newTask')).toBeDefined();
  });

  it('A tarefa enviada por evento deve ser uma Task', () => {
    const cp = shallowMount(TaskCreator);

    const inputFiled = cp.get('.task-creator-input');
    inputFiled.setValue('Marcar dentista');
    inputFiled.trigger('keyup.enter');

    expect(cp.emitted('newTask')[0][0] instanceof Task).toBeTruthy();
  });

  it('A tarefa enviada por evento deve ter o mesmo nome do digitado', () => {
    const cp = shallowMount(TaskCreator);

    const inputFiled = cp.get('.task-creator-input');
    const desiredName = 'Marcar dentista';
    inputFiled.setValue(desiredName);
    inputFiled.trigger('keyup.enter');

    expect(cp.emitted('newTask')[0][0].name).toBe(desiredName);
  });

  it('A tarefa enviada tem que ter o estado inicial de false', () => {
    const cp = shallowMount(TaskCreator);

    const inputFiled = cp.get('.task-creator-input');
    inputFiled.setValue('Marcar dentista');
    inputFiled.trigger('keyup.enter');

    expect(cp.emitted('newTask')[0][0].done).toBe(false);
  });

  it('Após a tarefa ser enviada, o campo deve ser apagado', async () => {
    const cp = shallowMount(TaskCreator);

    const inputFiled = cp.get('.task-creator-input');
    inputFiled.setValue('Marcar dentista');
    inputFiled.trigger('keyup.enter');

    await Vue.nextTick();
    expect(inputFiled.element.value).toBe('');
  });
});
