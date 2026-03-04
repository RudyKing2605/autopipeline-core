import fs from "fs";
import path from "path";

export function mergeTemplates(sourcePath, overridePath, targetPath) {

  if (!fs.existsSync(sourcePath)) return;

  fs.readdirSync(sourcePath).forEach(file => {

    const sourceFile = path.join(sourcePath, file);
    const overrideFile = overridePath ? path.join(overridePath, file) : null;
    const targetFile = path.join(targetPath, file);

    const stats = fs.statSync(sourceFile);

    if (stats.isDirectory()) {

      fs.mkdirSync(targetFile, { recursive: true });

      mergeTemplates(sourceFile, overrideFile, targetFile);

    } else {

      const finalSource =
        overrideFile && fs.existsSync(overrideFile)
          ? overrideFile
          : sourceFile;

      fs.copyFileSync(finalSource, targetFile);

    }

  });

}