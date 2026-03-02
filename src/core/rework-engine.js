export class ReworkEngine {

  constructor(state) {
    this.state = state;
  }

  addFeedback(source, message) {

    if (!this.state.feedback) {
      this.state.feedback = [];
    }

    this.state.feedback.push({
      source,
      message,
      timestamp: new Date().toISOString()
    });

  }

  clearFeedback() {
    this.state.feedback = [];
  }

}