import { mount } from '@vue/test-utils';
import App from '@/App.vue';

import Vue from 'vue';

describe('App', () => {
  afterEach(() => {
    localStorage.clear();
  });

  let cp;
  const tasksName = ['Ir ao cabelereiro', 'ir o shopping', 'ir ao pediatra'];

  const createTask = async (taskName) => {
    const inputTask = cp.get('.task-creator-input');
    inputTask.setValue(taskName);
    inputTask.trigger('keyup.enter');

    await Vue.nextTick();
  };

  const createTasks = async (tasks) => {
    const inputTask = cp.get('.task-creator-input');
    tasks.forEach(async (taskName) => {
      inputTask.setValue(taskName);
      inputTask.trigger('keyup.enter');
    });

    await Vue.nextTick();
  };

  describe('Criando tasks', () => {
    describe('Criando uma task', () => {
      it('A task deve ser exibida na lista', async () => {
        cp = mount(App);
        const taskName = 'Ir ao cabelereiro';
        await createTask(taskName);

        expect(cp.get('.task')).toBeDefined();
        expect(cp.get('.task-name').text()).toBe(taskName);
        expect(cp.findAll('.task').length).toBe(1);
      });

      it('A task deve ser salva no localStorage', async () => {
        cp = mount(App);
        const taskName = 'Ir ao cabelereiro';
        await createTask(taskName);

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
      it('As tasks devem ser exibidas na lista', async () => {
        cp = mount(App);
        await createTasks(tasksName);

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
        cp = mount(App);
        await createTasks(tasksName);

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
    it('Ao marcar a primeira Task como done, ela deve receber o status de Done', async () => {
      cp = mount(App);
      await createTasks(tasksName);

      cp.get('.task-status').trigger('click');
      await Vue.nextTick();

      const tasks = cp.findAll('.task');
      expect(tasks.at(0).classes()).toContain('task_done');
      expect(tasks.at(1).classes()).not.toContain('task_done');
    });

    it('Ao marcar a primeira e a ultima Task como done, elas devem receber o status de Done', async () => {
      cp = mount(App);
      await createTasks(tasksName);

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
      cp = mount(App);
      await createTasks(tasksName);

      cp.findAll('.task-delete').at(1).trigger('click');
      await Vue.nextTick();

      expect(cp.findAll('.task')).toHaveLength(2);
      expect(cp.findAll('.task-name').at(1).text()).toBe(tasksName[2]);
    });

    it('Quando deletar a tarefa, ela deve ser removida do localstorage', async () => {
      cp = mount(App);
      await createTasks(tasksName);

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
      cp = mount(App);
      await createTasks(tasksName);

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

  describe('Criando mais de 10 tasks', () => {
    it('Não deve permitir criar a 11ª tarefa', async () => {
      cp = mount(App);
      await createTasks([
        'Ir ao mercado',
        'Ir ao médico',
        'Ir ao dentista',
        'Finalizar trabalho',
        'Ler o livro',
        'Estudar matemática',
        'Comprar mochila',
        'Comprar macarrão',
        'Comprar cebola',
        'Comprar alho',
      ]);
      await createTask('Comprar miojo');

      expect(cp.findAll('.task')).toHaveLength(10);
    });
  });
});
