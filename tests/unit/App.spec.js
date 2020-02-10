import { mount } from '@vue/test-utils';
import App from '@/App.vue';
import Vue from 'vue';

describe('App', () => {
  it('Ao criar uma Task, ela deve ser adicionada na lista de Tasks', async () => {
    const cp = mount(App);

    const inputTask = cp.get('.task-creator-input');
    const taskName = 'Ir ao cabelereiro';
    inputTask.setValue(taskName);
    inputTask.trigger('keyup.enter');

    await Vue.nextTick();
    const taskList = cp.findAll('.task-list-item');
    expect(taskList.at(taskList.length - 1).get('.task-name').html()).toMatch(taskName);
  });
});
