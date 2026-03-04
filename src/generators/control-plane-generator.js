import fs from "fs";
import path from "path";

export function generateControlPlaneWorkflows(targetPath) {

  const workflowsDir = path.join(targetPath, ".github/workflows");

  fs.mkdirSync(workflowsDir, { recursive: true });

  const planningWorkflow = `
name: Planning Phase

on:
  repository_dispatch:
    types: [approve_planning]

jobs:
  planning:
    runs-on: ubuntu-latest
    steps:
      - name: Run Planning Agent
        run: echo "Planning agent would execute here"

      - name: Notify Control Plane
        run: |
          curl -X POST "\${{ secrets.CONTROL_PLANE_URL }}/github-callback" \
          -H "Content-Type: application/json" \
          -d '{"message":"Planning completed. Awaiting development approval."}'
`;

  fs.writeFileSync(
    path.join(workflowsDir, "planning.yml"),
    planningWorkflow
  );

}