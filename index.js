import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backendEntry = pathToFileURL(path.join(__dirname, "backend", "src", "server.js")).href;

import(backendEntry).then(() => {
  console.log("✅ Backend started from root index.js");
}).catch((error) => {
  console.error("❌ Failed to start backend:", error);
  process.exit(1);
});
