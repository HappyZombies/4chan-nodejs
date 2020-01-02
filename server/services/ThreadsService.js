const Threads = require("../models/Threads");

class ThreadsService {
  async getThread() {
    return await Threads.query();
  }
}

module.exports = ThreadsService;
