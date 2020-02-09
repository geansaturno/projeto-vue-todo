export default class Task {
  constructor(name, done = false) {
    this.name = name;
    this.done = done;
    this.id = `${name}#${Date.now()}`;
  }
}
