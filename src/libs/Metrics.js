
export default class Metrics {
  constructor() {
    this.googleAnalitics = {
      sendMetrics: (obj) => {
        console.log(obj);
      },
    };
  }

  metrics(obj) {
    this.googleAnalitics.sendMetrics(obj);
  }
}
