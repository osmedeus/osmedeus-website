const projectRoot = process.cwd();
const outDir = `${projectRoot}/out`;
const nextStaticDir = `${projectRoot}/.next-static`;
const distDir = `${projectRoot}/dist`;

const dirExists = (dirPath) => {
  const result = Bun.spawnSync({
    cmd: ["test", "-d", dirPath],
    stdout: "ignore",
    stderr: "ignore",
  });
  return result.exitCode === 0;
};

const nextStaticExists = dirExists(nextStaticDir);
const outExists = dirExists(outDir);

const srcDir = nextStaticExists ? nextStaticDir : outExists ? outDir : null;
if (!srcDir) {
  throw new Error(
    `Missing export output directory: ${nextStaticDir} (or ${outDir})`
  );
}

const run = (cmd) => {
  const result = Bun.spawnSync({
    cmd,
    stdout: "inherit",
    stderr: "inherit",
  });

  if (result.exitCode !== 0) {
    throw new Error(`Command failed (${result.exitCode}): ${cmd.join(" ")}`);
  }
};

run(["rm", "-rf", distDir]);

try {
  run(["mv", srcDir, distDir]);
} catch {
  run(["cp", "-R", srcDir, distDir]);
  run(["rm", "-rf", srcDir]);
}
