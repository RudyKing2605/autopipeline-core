import fs from "fs";
import path from "path";

export function generateControlPlaneWorkflow(targetPath) {

  const workflow = `
name: Control Plane Listener

on:
  repository_dispatch:

jobs:
  route-event:
    runs-on: ubuntu-latest
    steps:
      - name: Print Event
        run: |
          echo "Event: \${{ github.event.action }}"
          echo "Payload:"
          echo '\${{ toJson(github.event.client_payload) }}'
`;

  const workflowDir = path.join(targetPath, ".github/workflows");

  fs.mkdirSync(workflowDir, { recursive: true });
  fs.writeFileSync(
    path.join(workflowDir, "control-plane.yml"),
    workflow
  );

}