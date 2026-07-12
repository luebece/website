const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const scripts = [
  "advanced-2025-core.js",
  "advanced-2025-c.js",
  "advanced-2025-java.js",
  "advanced-2025-python-sql.js",
];
const context = {
  window: { CODE_SQL_ACADEMY: { C: {}, Java: {}, Python: {}, SQL: {} } },
};
vm.createContext(context);
for (const file of scripts) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), "utf8"), context, { filename: file });
}

const questions = context.window.ADVANCED_2025.questions;
const work = fs.mkdtempSync(path.join(os.tmpdir(), "jeongcheogi-l3-"));
const isCi = String(process.env.CI).toLowerCase() === "true";

function commandAvailable(command, args = ["--version"]) {
  const result = spawnSync(command, args, { encoding: "utf8" });
  return !result.error && result.status === 0;
}

function findPython() {
  for (const command of ["python3", "python"]) {
    if (commandAvailable(command)) return command;
  }
  const localPrograms = process.env.LOCALAPPDATA
    ? path.join(process.env.LOCALAPPDATA, "Programs", "Python")
    : null;
  if (localPrograms && fs.existsSync(localPrograms)) {
    const candidates = fs.readdirSync(localPrograms)
      .map((folder) => path.join(localPrograms, folder, "python.exe"))
      .filter((candidate) => fs.existsSync(candidate))
      .sort()
      .reverse();
    if (candidates[0] && commandAvailable(candidates[0])) return candidates[0];
  }
  return null;
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd || work,
    encoding: "utf8",
    env: { ...process.env, ...(options.env || {}) },
    timeout: 20_000,
  });
  assert.ifError(result.error);
  assert.equal(
    result.status,
    0,
    `${command} ${args.join(" ")} failed\nSTDOUT:\n${result.stdout}\nSTDERR:\n${result.stderr}`,
  );
  return String(result.stdout).replaceAll("\r\n", "\n").trim();
}

function expected(question) {
  return String(question.answer).replaceAll("\r\n", "\n").trim();
}

const report = { C: "skipped", Java: "skipped", Python: 0, SQL: 0 };

try {
  const python = findPython();
  assert.ok(python, "Python runtime is required for Python and SQL L3 verification");

  for (const question of questions.filter((item) => item.domain === "Python")) {
    const output = run(python, ["-c", question.code]);
    assert.equal(output, expected(question), `${question.id}: Python output mismatch`);
    report.Python += 1;
  }

  const sqlRunner = [
    "import base64, sqlite3, sys",
    "sql = base64.b64decode(sys.argv[1]).decode('utf-8')",
    "row = sqlite3.connect(':memory:').execute(sql).fetchone()",
    "print(row[0])",
  ].join("\n");
  for (const question of questions.filter((item) => item.domain === "SQL")) {
    const encoded = Buffer.from(question.code, "utf8").toString("base64");
    const output = run(python, ["-c", sqlRunner, encoded]);
    assert.equal(output, expected(question), `${question.id}: SQL output mismatch`);
    report.SQL += 1;
  }

  if (commandAvailable("gcc")) {
    let count = 0;
    for (const question of questions.filter((item) => item.domain === "C")) {
      const source = path.join(work, `${question.id}.c`);
      const binary = path.join(work, `${question.id}${process.platform === "win32" ? ".exe" : ""}`);
      fs.writeFileSync(source, question.code);
      run("gcc", [
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-Werror",
        "-fsanitize=address,undefined",
        source,
        "-o",
        binary,
      ]);
      const output = run(binary, [], {
        env: { ASAN_OPTIONS: "detect_leaks=1:halt_on_error=1" },
      });
      assert.equal(output, expected(question), `${question.id}: C output mismatch`);
      count += 1;
    }
    report.C = count;
  } else if (isCi) {
    assert.fail("gcc is required in CI for C L3 verification");
  }

  if (commandAvailable("javac", ["-version"]) && commandAvailable("java", ["-version"])) {
    let count = 0;
    for (const question of questions.filter((item) => item.domain === "Java")) {
      const itemDir = path.join(work, question.id);
      fs.mkdirSync(itemDir);
      fs.writeFileSync(path.join(itemDir, "Main.java"), question.code);
      run("javac", ["-Xlint:all", "Main.java"], { cwd: itemDir });
      const output = run("java", ["-cp", itemDir, "Main"], { cwd: itemDir });
      assert.equal(output, expected(question), `${question.id}: Java output mismatch`);
      count += 1;
    }
    report.Java = count;
  } else if (isCi) {
    assert.fail("javac/java are required in CI for Java L3 verification");
  }

  console.log(JSON.stringify(report, null, 2));
} finally {
  fs.rmSync(work, { recursive: true, force: true });
}
