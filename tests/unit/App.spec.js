import { mount } from '@vue/test-utils';
import App from '@/App.vue';
import Vue from 'vue';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Ao criar uma Task, ela deve ser adicionada na lista de Tasks', async () => {
    const cp = mount(App);
    const inputTask = cp.get('.task-creator-input');
    const taskName = 'Ir ao cabelereiro';
    inputTask.setValue(taskName);
    inputTask.trigger('keyup.enter');

    await Vue.nextTick();
    const taskList = cp.findAll('.task-list-item');
    expect(
      taskList
        .at(taskList.length - 1)
        .get('.task-name')
        .text(),
    ).toBe(taskName);
  });

  it('Ao criar uma task ela deve ser adicionada no localstorage', async () => {
    let cp = mount(App);
    const inputTask = cp.get('.task-creator-input');
    const taskName = 'Ir ao cabelereiro';
    inputTask.setValue(taskName);
    inputTask.trigger('keyup.enter');

    await Vue.nextTick();

    cp = mount(App);
    await Vue.nextTick();

    const taskList = cp.findAll('.task-list-item');
    expect(taskList.length).toBe(1);
    expect(
      taskList
        .at(taskList.length - 1)
        .get('.task-name')
        .text(),
    ).toBe(taskName);
  });

  it('Ao criar tres task elas devem ser adicionadas no localstorage', async () => {
    let cp = mount(App);
    const inputTask = cp.get('.task-creator-input');

    const tasksName = ['Ir ao cabelereiro', 'ir o shopping', 'ir ao pediatra'];
    tasksName.forEach((taskName) => {
      inputTask.setValue(taskName);
      inputTask.trigger('keyup.enter');
    });

    await Vue.nextTick();

    cp = mount(App);
    await Vue.nextTick();

    const taskList = cp.findAll('.task-list-item');
    expect(taskList.length).toBe(3);
    tasksName.forEach((taskName, index) => {
      expect(
        taskList
          .at(index)
          .get('.task-name')
          .text(),
      ).toBe(taskName);
    });
  });
});
