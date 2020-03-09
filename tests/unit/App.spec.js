import { mount } from '@vue/test-utils';
import App from '@/App.vue';

import Vue from 'vue';

describe('App', () => {
  afterEach(() => {
    localStorage.clear();
  });

  describe('Criando tasks', () => {
    describe('Criando uma task', () => {
      it('A task deve ser exibida na lista', async () => {
        const cp = mount(App);
        const inputTask = cp.get('.task-creator-input');
        const taskName = 'Ir ao cabelereiro';
        inputTask.setValue(taskName);
        inputTask.trigger('keyup.enter');

        await Vue.nextTick();
        expect(cp.get('.task')).toBeDefined();
        expect(cp.get('.task-name').text()).toBe(taskName);
        expect(cp.findAll('.task').length).toBe(1);
      });

      it('A task deve ser salva no localStorage', async () => {
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
    });

    describe('Criando 3 tasks', () => {
      const tasksName = ['Ir ao cabelereiro', 'ir o shopping', 'ir ao pediatra'];

      it('As tasks devem ser exibidas na lista', async () => {
        const cp = mount(App);
        const inputTask = cp.get('.task-creator-input');

        tasksName.forEach(async (taskName) => {
          inputTask.setValue(taskName);
          inputTask.trigger('keyup.enter');
        });

        await Vue.nextTick();
        expect(cp.findAll('.task').length).toBe(3);

        const taskList = cp.findAll('.task-name');
        tasksName.forEach((taskName, index) => {
          expect(
            taskList
              .at(index)
              .text(),
          ).toBe(taskName);
        });
      });

      it('As tasks devem ser adicionadas no localstorage', async () => {
        let cp = mount(App);
        const inputTask = cp.get('.task-creator-input');

        tasksName.forEach(async (taskName) => {
          inputTask.setValue(taskName);
          inputTask.trigger('keyup.enter');
        });

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
  });

  describe('Marcando task como done', () => {
    const tasksName = ['Ir ao cabelereiro', 'ir o shopping', 'ir ao pediatra'];

    it('Ao marcar a primeira Task como done, ela deve receber o status de Done', async () => {
      const cp = mount(App);
      const inputTask = cp.get('.task-creator-input');

      tasksName.forEach(async (taskName) => {
        inputTask.setValue(taskName);
        inputTask.trigger('keyup.enter');
      });

      await Vue.nextTick();

      cp.get('.task-status').trigger('click');

      await Vue.nextTick();

      const tasks = cp.findAll('.task');

      expect(tasks.at(0).classes()).toContain('task_done');
      expect(tasks.at(1).classes()).not.toContain('task_done');
    });

    it('Ao marcar a primeira e a ultima Task como done, elas devem receber o status de Done', async () => {
      const cp = mount(App);
      const inputTask = cp.get('.task-creator-input');

      tasksName.forEach(async (taskName) => {
        inputTask.setValue(taskName);
        inputTask.trigger('keyup.enter');
      });

      await Vue.nextTick();

      const tasks = cp.findAll('.task');

      tasks.at(0).get('.task-status').trigger('click');
      tasks.at(2).get('.task-status').trigger('click');

      await Vue.nextTick();

      expect(tasks.at(0).classes()).toContain('task_done');
      expect(tasks.at(1).classes()).not.toContain('task_done');
      expect(tasks.at(2).classes()).toContain('task_done');
    });
  });

  describe('Deletando uma Tarefas', () => {
    it('Quando deletar a tarefa, deve ser removida da lista', async () => {
      const cp = mount(App);
      const inputTask = cp.get('.task-creator-input');

      const tasksName = ['Ir ao cabelereiro', 'ir o shopping', 'ir ao pediatra'];
      tasksName.forEach((taskName) => {
        inputTask.setValue(taskName);
        inputTask.trigger('keyup.enter');
      });
      await Vue.nextTick();

      cp.findAll('.task-delete').at(1).trigger('click');
      await Vue.nextTick();

      expect(cp.findAll('.task')).toHaveLength(2);
      expect(cp.findAll('.task-name').at(1).text()).toBe(tasksName[2]);
    });

    it('Quando deletar a tarefa, ela deve ser removida do localstorage', async () => {
      let cp = mount(App);
      const inputTask = cp.get('.task-creator-input');

      const tasksName = ['Ir ao cabelereiro', 'ir o shopping', 'ir ao pediatra'];
      tasksName.forEach((taskName) => {
        inputTask.setValue(taskName);
        inputTask.trigger('keyup.enter');
      });
      await Vue.nextTick();

      cp.findAll('.task-delete').at(1).trigger('click');
      await Vue.nextTick();

      cp = mount(App);
      await Vue.nextTick();

      expect(cp.findAll('.task')).toHaveLength(2);
      expect(cp.findAll('.task-name').at(1).text()).toBe(tasksName[2]);
    });
  });

  describe('Deletando todas as tarefas', () => {
    it('Ao clicar em apagar, deve limpar as tarefas concluidas e atualizar o localStorage', async () => {
      let cp = mount(App);
      const inputTask = cp.get('.task-creator-input');

      const tasksName = ['Ir ao cabelereiro', 'ir o shopping', 'ir ao pediatra'];
      tasksName.forEach((taskName) => {
        inputTask.setValue(taskName);
        inputTask.trigger('keyup.enter');
      });

      await Vue.nextTick();

      let taskList = cp.findAll('.task-list-item');
      taskList.at(0).get('.task-status').trigger('click');
      await Vue.nextTick();

      cp.get('.delete-all').trigger('click');
      await Vue.nextTick();

      taskList = cp.findAll('.task-list-item');

      expect(taskList).toHaveLength(2);

      cp = mount(App);
      await Vue.nextTick();
      taskList = cp.findAll('.task-list-item');

      expect(taskList).toHaveLength(2);
    });
  });
});
