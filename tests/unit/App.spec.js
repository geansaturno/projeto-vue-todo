import { mount } from '@vue/test-utils';
import App from '@/App.vue';

import Task from '@/models/Task.model';
import MetricsModel from '@/models/Metrics.model';

import Vue from 'vue';

describe('Lista de tarefas', () => {
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

  const checkTask = async (index) => {
    const taskList = cp.findAll('.task-status');
    taskList.at(index).trigger('click');
    await Vue.nextTick();
  };

  const mockMetrics = () => {
    cp.vm.metrics.send = jest.fn();
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
        const newTaskName = 'Comprar miojo';
        await createTask(newTaskName);

        const tasks = cp.findAll('.task-name');
        expect(tasks).toHaveLength(10);
        tasks.wrappers.forEach((task) => {
          expect(task.text()).not.toBe(newTaskName);
        });
      });

      it('Verificar se o método addTask não adiciona a 11ª task', () => {
        cp = mount(App);
        cp.vm.$data.tasks = [
          new Task('Ir ao mercado'),
          new Task('Ir ao médico'),
          new Task('Ir ao dentista'),
          new Task('Finalizar trabalho'),
          new Task('Ler o livro'),
          new Task('Estudar matemática'),
          new Task('Comprar mochila'),
          new Task('Comprar macarrão'),
          new Task('Comprar cebola'),
          new Task('Comprar alho'),
        ];

        cp.vm.addTask(new Task('Comprar cenouras'));

        expect(cp.vm.$data.tasks).toHaveLength(10);
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

    describe('Metricas', () => {
      it('Deve disparar a métrica corretas do primeiro item ', async () => {
        cp = mount(App);
        await createTasks(tasksName);
        mockMetrics();
        checkTask(0);

        expect(cp.vm.metrics.send.mock.calls[0][0]).toStrictEqual(new MetricsModel('posicao-1', 'change-status'));
      });

      it('Deve enviar as métricas corretas do terceiro item', async () => {
        cp = mount(App);
        await createTasks(tasksName);
        mockMetrics();
        checkTask(2);

        expect(cp.vm.metrics.send.mock.calls[0][0]).toStrictEqual(new MetricsModel('posicao-3', 'change-status'));
      });
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
    it('Ao clicar em apagar, deve limpar as tarefas concluidas', async () => {
      // Arrange
      cp = mount(App);
      await createTasks(tasksName);

      // Act
      await checkTask(0);
      cp.get('.delete-all').trigger('click');
      await Vue.nextTick();

      // Assert
      const taskList = cp.findAll('.task-name');
      expect(taskList).toHaveLength(2);
      taskList.wrappers.forEach((task) => {
        expect(task.text()).not.toBe(tasksName[0]);
      });
    });

    it('Ao clicar em apagar, deve atualizar o localStorage', async () => {
      // Arrange
      cp = mount(App);
      await createTasks(tasksName);

      // Act
      await checkTask(0);
      cp.get('.delete-all').trigger('click');
      await Vue.nextTick();

      // Assert
      cp = mount(App);
      await Vue.nextTick();
      const taskList = cp.findAll('.task-name');

      expect(taskList).toHaveLength(2);
      taskList.wrappers.forEach((task) => {
        expect(task.text()).not.toBe(tasksName[0]);
      });
    });
  });
});
