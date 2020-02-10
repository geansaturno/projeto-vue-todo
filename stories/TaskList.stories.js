import TaskList from '@/components/TaskList.vue';
import Task from '@/models/Task.model';

const tasks = [
  new Task('Ir ao dentista'),
  new Task('Ir ao mercado'),
  new Task('Marcar Consulta', true),
  new Task('Limpar a casa'),
];

export default { title: 'TaskList' };

export const Default = () => ({
  components: { TaskList },
  data() {
    return {
      tasks,
    };
  },
  template: '<task-list :tasks="tasks"></task-list>',
});
