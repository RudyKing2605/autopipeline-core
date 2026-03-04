import fs from "fs";
import path from "path";

export function generateWorkflow(targetPath) {

  const workflowsDir = path.join(targetPath, ".github/workflows");

  fs.mkdirSync(workflowsDir, { recursive: true });

  const workflow = `
name: Autopipeline Planning

on:
  repository_dispatch:
    types: [approve_planning]

jobs:
  planning:
    runs-on: ubuntu-latest
    steps:
      - name: Planning Step
        run: echo "Planning phase executed"
`;

  fs.writeFileSync(
    path.join(workflowsDir, "planning.yml"),
    workflow
  );

  console.log("Planning workflow generated");

}