import TaskListStorage from '@/libs/TaskListStorage';
import Task from '@/models/Task.model';


describe('TaskListStorage', () => {
  describe('Devo guardar e formatar os dados do localStogare', () => {
    it('Com 1 task', () => {
      const taskStorage = new TaskListStorage();
      const taskName = 'Ir ao dentista';
      const tasks = [
        new Task(taskName),
      ];

      taskStorage.setTasks(tasks);

      const storedTasks = taskStorage.getTasks();
      expect(storedTasks).toHaveLength(1);
      expect(storedTasks[0]).toBeInstanceOf(Task);
      expect(storedTasks[0].name).toBe(taskName);
    });

    it('Com 2 task', () => {
      const taskStorage = new TaskListStorage();
      const tasks = [
        new Task('Ir ao dentista'),
        new Task('Ir ao mercado'),
      ];

      taskStorage.setTasks(tasks);

      const storedTasks = taskStorage.getTasks();
      expect(storedTasks).toHaveLength(2);
      expect(storedTasks[1]).toBeInstanceOf(Task);
    });


    it('Com 5 task', () => {
      const taskStorage = new TaskListStorage();
      const tasks = [
        new Task('Ir ao dentista'),
        new Task('Ir ao médico'),
        new Task('Ir ao mercado'),
        new Task('Ir ao açougue'),
        new Task('Ir ao exame'),
      ];

      taskStorage.setTasks(tasks);

      const storedTasks = taskStorage.getTasks();
      expect(storedTasks).toHaveLength(5);
      expect(storedTasks[4]).toBeInstanceOf(Task);
    });

    it('Com 10 tasks', () => {
      const taskStorage = new TaskListStorage();
      const tasks = [
        new Task('Ir ao dentista'),
        new Task('Ir ao médico'),
        new Task('Ir ao mercado'),
        new Task('Ir ao açougue'),
        new Task('Lavar as mãos'),
        new Task('Comprar Cebola'),
        new Task('Comprar Alho'),
        new Task('Beber 2L de água'),
        new Task('Trazer marmita'),
        new Task('Levar dinheiro'),
      ];

      taskStorage.setTasks(tasks);

      const storedTasks = taskStorage.getTasks();
      expect(storedTasks).toHaveLength(10);
    });
  });
});
