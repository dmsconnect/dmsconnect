import fs from "fs";
import path from "path";
const argRoot = process.argv[2];
const APPS_DIR = path.resolve(argRoot, "./apps");

function getDirectories(srcPath) {
  return fs
    .readdirSync(srcPath)
    .filter((file) => fs.statSync(path.join(srcPath, file)).isDirectory());
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}



