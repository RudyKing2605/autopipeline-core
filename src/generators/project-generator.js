import fs from "fs";
import path from "path";
import { mergeTemplates } from "../core/template-engine.js";

export function generateProject(targetPath, stackConfig) {

  const templatesRoot = path.resolve(
    path.dirname(new URL(import.meta.url).pathname),
    "../templates"
  );

  const baseTemplate = path.join(templatesRoot, "base");

  const stackTemplate = path.join(
    templatesRoot,
    "stacks",
    `${stackConfig.project_type}-${stackConfig.frontend}`
  );

  console.log("Generating project from templates...");

  mergeTemplates(baseTemplate, null, targetPath);

  if (fs.existsSync(stackTemplate)) {
    mergeTemplates(stackTemplate, null, targetPath);
  } else {
    console.warn("Stack template not found:", stackTemplate);
  }

  console.log("Project scaffolding complete.");

}