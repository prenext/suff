#!/usr/bin/env node

import { execSync } from "child_process";
import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";
import express from "express";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const command = args[0];

if (!command) {
  console.error("No command provided.");
  process.exit(1);
}

const packageJsonPath = path.join(process.cwd(), "package.json");
const packageJson = fs.readJsonSync(packageJsonPath);

const language = packageJson.main.endsWith(".ts") ? "TypeScript" : "JavaScript";
const serverFile = path.resolve(process.cwd(), ".server/index.js");
const nodeModulesBin = path.join(__dirname, "../node_modules/.bin");

// Function to ensure .server directory exists
const ensureServerDir = () => {
  const serverDir = path.dirname(serverFile);
  if (!fs.existsSync(serverDir)) {
    console.log(`.server directory not found. Creating ${serverDir}...`);
    fs.ensureDirSync(serverDir);
  }
};

const setupRoutes = (app) => {
  const routesDir = path.join(process.cwd(), "routes");
  if (!fs.existsSync(routesDir)) {
    console.error(`Routes directory not found: ${routesDir}`);
    return;
  }

  const routeFolders = fs.readdirSync(routesDir);

  routeFolders.forEach(async (folder) => {
    const folderPath = path.join(routesDir, folder);
    if (fs.statSync(folderPath).isDirectory()) {
      const router = express.Router();

      const controllerFiles = fs
        .readdirSync(folderPath)
        .filter((file) => file.endsWith(".js") || file.endsWith(".ts"));
      controllerFiles.forEach(async (file) => {
        const method = path.basename(file, path.extname(file));
        const filePath = path.join(folderPath, file);

        try {
          if (method === "middleware") {
            const middleware = await import(filePath);
            if (typeof middleware.default !== "function") {
              throw new Error(
                `Middleware file ${file} does not export a default async function`
              );
            }
            console.log(`Loading middleware from ${filePath}`);
            app.use(`/${folder}`, middleware.default);
          } else {
            const controller = await import(filePath);
            if (typeof controller.default !== "function") {
              throw new Error(
                `Controller file ${file} does not export a default async function`
              );
            }
            console.log(`Loading controller from ${filePath}`);
            router[method.toLowerCase()]("/", controller.default);
          }
        } catch (error) {
          console.error(`Error loading file ${filePath}:`, error);
        }
      });

      // Log the route setup to help debug issues
      console.log(`Setting up routes for /${folder}`);
      app.use(`/${folder}`, router);
    }
  });
};

const commands = {
  build: () => {
    ensureServerDir();
    console.log("Building the project...");
    execSync(`node ${serverFile}`, { stdio: "inherit" });
  },
  start: () => {
    ensureServerDir();
    console.log("Starting the project...");
    setupRoutes(express()); // Ensure routes are set up before starting
    execSync(
      language === "JavaScript"
        ? `node ${serverFile}`
        : `${path.join(nodeModulesBin, "ts-node")} ${serverFile}`,
      { stdio: "inherit" }
    );
  },
  dev: () => {
    ensureServerDir();
    console.log("Starting server in development mode...");
    setupRoutes(express()); // Ensure routes are set up before starting
    execSync(
      language === "JavaScript"
        ? `${path.join(nodeModulesBin, "nodemon")} ${serverFile}`
        : `${path.join(nodeModulesBin, "nodemon")} --exec ${path.join(
            nodeModulesBin,
            "ts-node"
          )} ${serverFile}`,
      { stdio: "inherit" }
    );
  },
  test: () => {
    console.log("Running tests...");
    execSync("npm test", { stdio: "inherit" });
  },
};

if (!commands[command]) {
  console.error(`Unknown command: ${command}`);
  process.exit(1);
}

commands[command]();
