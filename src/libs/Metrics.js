
export default class Metrics {
  constructor() {
    this.googleAnalitics = {
      sendMetrics: (obj) => {
        console.log(obj);
      },
    };
  }

  send(obj) {
    this.googleAnalitics.sendMetrics(obj);
  }
}
