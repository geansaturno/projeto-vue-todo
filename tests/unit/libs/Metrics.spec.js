import Metrics from '@/libs/Metrics';

describe('Lib de métricas', () => {
  let cp;

  it('Deve disparar as métricas com o objeto recebido', () => {
    cp = new Metrics();
    cp.googleAnalitics.sendMetrics = jest.fn();

    const desiredObject = {
      position: 'meio',
      label: 'clique',
    };

    cp.metrics(desiredObject);
    expect(cp.googleAnalitics.sendMetrics.mock.calls[0][0]).toBe(desiredObject);
  });
});
