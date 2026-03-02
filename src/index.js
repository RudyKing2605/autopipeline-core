import { resolveStack } from "./core/stack-resolver.js";
import { generateControlPlaneWorkflow } from "./generators/workflow-generator.js";
import fs from "fs";
import path from "path";

export function bootstrapProject(targetPath, config) {

  const resolved = resolveStack(config);

  console.log("Stack resolved:", resolved);

  generateControlPlaneWorkflow(targetPath);

  const statePath = path.join(targetPath, "autopipeline-state.json");

  fs.writeFileSync(
    statePath,
    JSON.stringify(resolved, null, 2)
  );

  console.log("Autopipeline initialized.");

}