import { existsSync, readFileSync } from "node:fs";
import { spawn } from "node:child_process";
import path from "node:path";

const mode = process.argv[2] ?? "dev";
const envLocalPath = path.resolve(process.cwd(), ".env.local");

function readEnvLocal(filePath) {
  if (!existsSync(filePath)) {
    return {};
  }

  const content = readFileSync(filePath, "utf8");
  const entries = {};

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    entries[key] = value;
  }

  return entries;
}

const fileEnv = readEnvLocal(envLocalPath);
const port = process.env.NEXT_PORT_LOCAL ?? fileEnv.NEXT_PORT_LOCAL ?? "3050";
const command = process.execPath;
const nextBin = path.resolve(
  process.cwd(),
  "node_modules",
  "next",
  "dist",
  "bin",
  "next",
);

const child = spawn(command, [nextBin, mode, "--port", port], {
  stdio: "inherit",
  env: {
    ...process.env,
    ...fileEnv,
    NEXT_PORT_LOCAL: port,
  },
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
