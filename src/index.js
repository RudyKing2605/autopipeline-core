import { resolveStack } from "./core/stack-resolver.js";
import { generateControlPlaneWorkflow } from "./generators/workflow-generator.js";
import { generateControlPlaneWorkflows } from "./generators/control-plane-generator.js";
import { PhaseEngine } from "./core/phase-engine.js";
import { ReworkEngine } from "./core/rework-engine.js";
import fs from "fs";
import path from "path";

export function bootstrapProject(targetPath, config) {

  const resolved = resolveStack(config);

  console.log("Stack resolved:", resolved);

  generateControlPlaneWorkflow(targetPath);
  generateControlPlaneWorkflows(targetPath);

  const statePath = path.join(targetPath, "autopipeline-state.json");

  const initialState = {
    ...resolved,
    phase: "planning",
    awaiting_approval: true,
    rework_required: false,
    history: []
  };

  fs.writeFileSync(
    statePath,
    JSON.stringify(initialState, null, 2)
  );

  console.log("Autopipeline initialized.");

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