export class PhaseEngine {

  constructor(state) {
    this.state = state;
  }

  currentPhase() {
    return this.state.phase;
  }

  requireApproval() {
    this.state.awaiting_approval = true;
  }

  approve() {
    this.state.awaiting_approval = false;
  }

  nextPhase() {

    const flow = [
      "planning",
      "developing",
      "reviewing",
      "testing",
      "deploying"
    ];

    const index = flow.indexOf(this.state.phase);

    if (index === -1 || index === flow.length - 1) {
      return this.state.phase;
    }

    this.state.phase = flow[index + 1];
    this.state.awaiting_approval = true;

    return this.state.phase;
  }

  markRework(reason) {
    this.state.rework_required = true;
    this.state.history.push({
      phase: this.state.phase,
      reason,
      timestamp: new Date().toISOString()
    });
  }

  clearRework() {
    this.state.rework_required = false;
  }

}