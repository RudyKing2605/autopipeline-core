export class BaseAdapter {

  constructor(config = {}) {
    this.config = config;
  }

  async runTask(task) {
    throw new Error("runTask() must be implemented by adapter");
  }

}