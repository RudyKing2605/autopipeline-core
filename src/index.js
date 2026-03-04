import { resolveStack } from "./core/stack-resolver.js";
import { generateWorkflow } from "./generators/workflow-generator.js";
import { generateControlPlaneWorkflows } from "./generators/control-plane-generator.js";
import { PhaseEngine } from "./core/phase-engine.js";
import { ReworkEngine } from "./core/rework-engine.js";
import { generateState } from "./generators/state-generator.js";
import { generateProject } from "./generators/project-generator.js";
import { generatePlan } from "./core/planner-engine.js";
import fs from "fs";
import path from "path";

export function bootstrapProject(targetPath, config) {

  console.log("BOOTSTRAP STARTED");

  const resolved = resolveStack(config);

  console.log("Stack resolved:", resolved);

  // Generate pipeline state
  generateState(targetPath, resolved);
  console.log("State generated");

  // Generate base CI workflows
  generateWorkflow(targetPath);
  console.log("Workflow generated");

  // Generate control plane workflows
  generateControlPlaneWorkflows(targetPath);
  console.log("Control plane workflows generated");

  //Generate Project scaffolding
  generateProject(targetPath, resolved);
  console.log("Project generated");
  
  // Generate execution plan
  generatePlan(targetPath, resolved);
  console.log("Execution plan generated");

  console.log("Autopipeline bootstrap complete.");

}

export function loadState(targetPath) {

  const statePath = path.join(targetPath, "autopipeline-state.json");

  return JSON.parse(fs.readFileSync(statePath));

}

export function saveState(targetPath, state) {

  const statePath = path.join(targetPath, "autopipeline-state.json");

  fs.writeFileSync(
    statePath,
    JSON.stringify(state, null, 2)
  );

}

export { PhaseEngine, ReworkEngine };