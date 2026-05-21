const { spawnSync } = require("node:child_process");

const prettierCli = require.resolve("prettier/bin/prettier.cjs");

const targets = process.argv.slice(2);
const args = ["--write", ...(targets.length ? targets : ["src/**/*.js", "server.js"])];

const result = spawnSync(process.execPath, [prettierCli, ...args], {
  stdio: "inherit",
});

if (result.error) {
  console.error(
    "Prettier run nahi ho paya. Pehle `npm install` run karke dependencies install karo."
  );
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 0);
