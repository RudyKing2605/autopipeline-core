import { ClaudeAdapter } from "../adapters/claude-adapter.js";

export async function runAgentTasks(tasks) {

  const adapter = new ClaudeAdapter();

  for (const task of tasks) {

    console.log("Executing task:", task.id);

    const result = await adapter.runTask(task);

    console.log("Result:", result);

  }

}