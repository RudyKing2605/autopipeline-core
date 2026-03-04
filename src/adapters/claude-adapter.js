import { BaseAdapter } from "./base-adapter.js";
import { execSync } from "child_process";

export class ClaudeAdapter extends BaseAdapter {

  async runTask(task) {

    console.log("Running task with Claude:", task.id);

    const prompt = `
Task: ${task.description}

Produce implementation steps and code where required.
`;

    try {

      const result = execSync(
        `claude "${prompt.replace(/"/g, '\\"')}"`,
        { encoding: "utf-8" }
      );

      return result;

    } catch (err) {

      console.error("Claude execution failed:", err.message);
      return null;

    }

  }

}