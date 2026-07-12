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
const failures = [];

function verifyQuestion(question, language, execute) {
  try {
    const output = execute();
    const wanted = expected(question);
    if (output !== wanted) {
      throw new Error(`expected ${JSON.stringify(wanted)}, actual ${JSON.stringify(output)}`);
    }
    return true;
  } catch (error) {
    failures.push(`${question.id} (${language}): ${error.message}`);
    return false;
  }
}

try {
  const python = findPython();
  assert.ok(python, "Python runtime is required for Python and SQL L3 verification");

  for (const question of questions.filter((item) => item.domain === "Python")) {
    if (verifyQuestion(question, "Python", () => run(python, ["-c", question.code]))) {
      report.Python += 1;
    }
  }

  const sqlRunner = [
    "import base64, sqlite3, sys",
    "sql = base64.b64decode(sys.argv[1]).decode('utf-8')",
    "row = sqlite3.connect(':memory:').execute(sql).fetchone()",
    "print(row[0])",
  ].join("\n");
  for (const question of questions.filter((item) => item.domain === "SQL")) {
    const encoded = Buffer.from(question.code, "utf8").toString("base64");
    if (verifyQuestion(question, "SQL", () => run(python, ["-c", sqlRunner, encoded]))) {
      report.SQL += 1;
    }
  }

  if (commandAvailable("gcc")) {
    let count = 0;
    for (const question of questions.filter((item) => item.domain === "C")) {
      if (verifyQuestion(question, "C", () => {
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
        return run(binary, [], {
          env: { ASAN_OPTIONS: "detect_leaks=1:halt_on_error=1" },
        });
      })) count += 1;
    }
    report.C = count;
  } else if (isCi) {
    assert.fail("gcc is required in CI for C L3 verification");
  }

  if (commandAvailable("javac", ["-version"]) && commandAvailable("java", ["-version"])) {
    let count = 0;
    for (const question of questions.filter((item) => item.domain === "Java")) {
      if (verifyQuestion(question, "Java", () => {
        const itemDir = path.join(work, question.id);
        fs.mkdirSync(itemDir);
        fs.writeFileSync(path.join(itemDir, "Main.java"), question.code);
        run("javac", ["-Xlint:all", "Main.java"], { cwd: itemDir });
        return run("java", ["-cp", itemDir, "Main"], { cwd: itemDir });
      })) count += 1;
    }
    report.Java = count;
  } else if (isCi) {
    assert.fail("javac/java are required in CI for Java L3 verification");
  }

  if (failures.length) throw new Error(failures.join("\n"));
  console.log(JSON.stringify(report, null, 2));
} catch (error) {
  const message = String(error?.stack || error)
    .replaceAll("%", "%25")
    .replaceAll("\r", "%0D")
    .replaceAll("\n", "%0A");
  console.error(`::error title=L3 execution verification failed::${message}`);
  throw error;
} finally {
  fs.rmSync(work, { recursive: true, force: true });
}
