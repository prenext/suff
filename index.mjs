import express from "express";
import fs from "fs-extra";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const routesDir = path.join(__dirname, "../routes");

const loadMiddleware = async (dir) => {
  const middlewares = [];
  const files = await fs.readdir(dir);
  for (const file of files) {
    if (file.endsWith("middleware.js") || file.endsWith("middleware.ts")) {
      const middlewareModule = await import(path.join(dir, file));
      if (
        typeof middlewareModule.default !== "function" ||
        middlewareModule.default.constructor.name !== "AsyncFunction"
      ) {
        throw new Error(`${file} must export a default async function`);
      }
      middlewares.push(middlewareModule.default);
    }
  }
  return middlewares;
};

const loadRoutes = async (dir) => {
  const folders = await fs.readdir(dir);
  for (const folder of folders) {
    const folderPath = path.join(dir, folder);
    if ((await fs.stat(folderPath)).isDirectory()) {
      const router = express.Router();
      const middlewares = await loadMiddleware(folderPath);

      const files = await fs.readdir(folderPath);
      for (const file of files) {
        const [method] = file.split(".");
        if (["get", "post", "put", "patch", "delete"].includes(method)) {
          const routeModule = await import(path.join(folderPath, file));
          if (
            typeof routeModule.default !== "function" ||
            routeModule.default.constructor.name !== "AsyncFunction"
          ) {
            throw new Error(`${file} must export a default async function`);
          }
          router[method]("/", ...middlewares, routeModule.default);
        }
      }

      app.use(`/${folder}`, router);
    }
  }
};

loadRoutes(routesDir)
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error setting up routes:", err);
  });
