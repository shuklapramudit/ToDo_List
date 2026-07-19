import { spawn } from "node:child_process";

const backend = spawn("npm", ["--prefix", "backend", "start"], {
  stdio: "inherit",
  env: process.env,
});

backend.on("exit", (code) => {
  process.exit(code);
});
