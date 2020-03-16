import Metrics from '@/libs/Metrics';
import MetricsModel from '@/models/Metrics.model';

describe('Lib de métricas', () => {
  let metrics;

  it('Deve disparar as métricas com o objeto recebido', () => {
    metrics = new Metrics();
    metrics.googleAnalitics.sendMetrics = jest.fn();

    const desiredObject = new MetricsModel('meio', 'clique');

    metrics.send(desiredObject);
    expect(metrics.googleAnalitics.sendMetrics.mock.calls[0][0]).toStrictEqual(desiredObject);
  });
});
