import fs from "fs";
import path from "path";

export function getRunnableTasks(targetPath) {

  const planPath = path.join(targetPath, "autopipeline-plan.json");
  const statePath = path.join(targetPath, "autopipeline-state.json");

  const plan = JSON.parse(fs.readFileSync(planPath));
  const state = JSON.parse(fs.readFileSync(statePath));

  const currentPhase = state.phase;

  const phase = plan.phases.find(p => p.name === currentPhase);

  if (!phase) return [];

  const completed = state.completed_tasks || [];

  const runnable = phase.tasks.filter(task => {

    return task.depends_on.every(dep => completed.includes(dep));

  });

  return runnable;

}