import fs from "fs";
import path from "path";

export function generateControlPlaneWorkflows(targetPath) {

  const workflowsDir = path.join(targetPath, ".github/workflows");

  fs.mkdirSync(workflowsDir, { recursive: true });

  const workflow = `
name: Control Plane

on:
  workflow_dispatch:

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Notify Control Plane
        run: |
          curl -X POST "\${{ secrets.CONTROL_PLANE_URL }}/github-callback"
`;

  fs.writeFileSync(
    path.join(workflowsDir, "control-plane.yml"),
    workflow
  );

  console.log("Control plane workflow generated");

}