import fs from "fs";
import path from "path";

export function generateState(targetPath, stackConfig) {

  const state = {
    phase: "planning",
    awaiting_approval: true,
    rework_required: false,
    stack: stackConfig,
    history: []
  };

  const statePath = path.join(targetPath, "autopipeline-state.json");

  fs.writeFileSync(
    statePath,
    JSON.stringify(state, null, 2)
  );

  console.log("Pipeline state initialized.");

}