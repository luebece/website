const assert = require("assert");
const fs = require("fs");
const vm = require("vm");

const scripts = [
  "theory-deep.js",
  "theory-mega.js",
  "code-sql-mastery.js",
  "code-sql-conquest.js",
  "code-sql-grandmaster.js",
  "code-java-generics.js",
  "exam-master-theory.js",
  "exam-master-code-c.js",
  "exam-master-code-jps.js",
  "exam-master-academy.js",
  "exam-coverage.js",
  "answer-engine.js",
  "app.js",
];

const context = {
  localStorage: {
    getItem: () => null,
    setItem: () => {},
  },
  window: {},
};
vm.createContext(context);
for (const file of scripts) {
  vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });
}

const engine = context.window.ANSWER_ENGINE;
const audit = context.window.JEONGCHEOGI_AUDIT;
const coverage = context.window.EXAM_COVERAGE || [];
const skills = context.window.EXAM_SKILLS || {};
const items = [...audit.practice, ...audit.theoryPractice];

assert.deepEqual(
  [...audit.scope.map((item) => item.officialNo)].sort((a, b) => a - b),
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  "2026 official scope mapping is incomplete",
);
const officialScopeTitles = [
  "현행 시스템 분석 및 요구사항 확인",
  "데이터 입출력 구현",
  "통합 구현",
  "서버 프로그램 구현",
  "인터페이스 구현",
  "화면 설계",
  "애플리케이션 테스트",
  "SQL 응용",
  "소프트웨어 개발 보안 구축",
  "프로그래밍 언어 활용",
  "응용 SW 기초 기술 활용",
  "제품소프트웨어 패키징",
];
for (const item of audit.scope) {
  assert.equal(
    item.title,
    officialScopeTitles[item.officialNo - 1],
    `official scope ${item.officialNo} title mismatch`,
  );
}

assert.equal(audit.practice.length, 586, "manual practice count changed");
assert.equal(audit.theoryPractice.length, 551, "theory practice count changed");
assert.equal(items.length, 1137, "total graded item count changed");

const ids = items.map((item) => item.id);
assert.equal(new Set(ids).size, ids.length, "duplicate graded item id");
const questionAnswerKeys = audit.practice.map((item) =>
  `${item.question}||${item.answer}`.replace(/\s+/g, " ").trim(),
);
assert.equal(
  new Set(questionAnswerKeys).size,
  questionAnswerKeys.length,
  "duplicate manual practice question and answer",
);

for (const item of items) {
  assert.ok(item.answer, `${item.id}: empty canonical answer`);
  assert.ok(item.explain, `${item.id}: empty explanation`);
  assert.ok(engine.matches(item.answer, item), `${item.id}: canonical answer rejected`);
  assert.ok(
    !engine.matches(`틀림${item.answer}오답`, item),
    `${item.id}: wrapped garbage accepted`,
  );

  if (!item.groups) {
    for (const alias of item.accept) {
      assert.ok(engine.matches(alias, item), `${item.id}: declared alias rejected: ${alias}`);
    }
  }
}

const ordered = items.filter((item) => engine.answerMode(item) === "ordered");
let reversedOrderedChecked = 0;
for (const item of ordered) {
  const parts = String(item.answer)
    .split(/\s*(?:,|->|→|⇒|;|\n)\s*/)
    .filter(Boolean);
  if (parts.length !== item.groups.length || parts.length < 2) continue;
  const reversed = [...parts].reverse().join(", ");
  if (engine.compactTerm(reversed) === engine.compactTerm(item.answer)) continue;
  assert.ok(!engine.matches(reversed, item), `${item.id}: reversed ordered answer accepted`);
  reversedOrderedChecked += 1;
}
assert.ok(reversedOrderedChecked >= 40, "too few ordered answers were regression-tested");

const unordered = audit.practice.find((item) => item.id === "cq-sql-013");
assert.ok(unordered, "unordered fixture missing");
assert.equal(engine.answerMode(unordered), "set");
assert.ok(engine.matches("NULL 불가, 중복 불가", unordered), "unordered set reversal rejected");

const distinct = items.find((item) =>
  [...(item.accept || []), item.answer].some((value) =>
    String(value).toLowerCase().includes("distinct"),
  ),
);
assert.ok(distinct, "DISTINCT fixture missing");
assert.ok(!engine.matches("틀림DISTINCT오답", distinct), "garbage DISTINCT accepted");

const numeric = (answer) => ({
  answer,
  accept: [answer],
  groups: null,
  question: "코드 출력값은?",
  type: "code",
});
assert.ok(engine.matches("-6", numeric("-6")));
assert.ok(!engine.matches("6", numeric("-6")), "negative sign was ignored");
assert.ok(engine.matches("2.0", numeric("2.0")));
assert.ok(!engine.matches("20", numeric("2.0")), "decimal point was ignored");

const caseSensitiveOutput = {
  answer: "Ab",
  accept: ["Ab"],
  groups: null,
  question: "코드 출력값은?",
  type: "code",
};
assert.ok(engine.matches("Ab", caseSensitiveOutput));
assert.ok(!engine.matches("ab", caseSensitiveOutput), "output letter case was ignored");

const countStar = audit.practice.find((item) => item.id === "cq-sql-002");
assert.ok(countStar, "COUNT(*) fixture missing");
assert.ok(engine.matches("COUNT(*)", countStar));
assert.ok(!engine.matches("COUNT", countStar), "COUNT accepted in place of COUNT(*)");

const undefinedIncrement = audit.practice.filter((item) =>
  /x\+\+\s*\+\s*\+\+x|\+\+x\s*\+\s*x\+\+/.test(item.question),
);
assert.deepEqual(undefinedIncrement, [], "undefined C increment expression remains in practice");

assert.equal(coverage.length, 260, "coverage row count changed");
assert.equal(coverage.filter((item) => item.ready).length, 260, "coverage link missing");
for (const row of coverage) {
  assert.ok(skills[row.skillId], `${row.id}: missing skill ${row.skillId}`);
  assert.ok(row.practiceIds.length >= 2, `${row.id}: fewer than two linked drills`);
  for (const id of row.practiceIds) {
    assert.ok(ids.includes(id), `${row.id}: missing practice ${id}`);
  }
}

const modeCounts = items.reduce((counts, item) => {
  const mode = engine.answerMode(item);
  counts[mode] = (counts[mode] || 0) + 1;
  return counts;
}, {});

const html = fs.readFileSync("index.html", "utf8");
const serviceWorker = fs.readFileSync("sw.js", "utf8");
const assetRefs = [
  ...[...html.matchAll(/<script src="([^"]+)"/g)].map((match) => match[1]),
  ...[...html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map(
    (match) => match[1],
  ),
];
for (const ref of assetRefs) {
  assert.ok(ref.endsWith("?v=13"), `unversioned executable asset: ${ref}`);
  assert.ok(fs.existsSync(ref.split("?")[0]), `missing executable asset: ${ref}`);
  assert.ok(serviceWorker.includes(`"./${ref}"`), `service worker does not cache: ${ref}`);
}
assert.ok(
  serviceWorker.includes('CACHE_NAME = "jeongcheogi-trainer-v13"'),
  "service worker cache version mismatch",
);
assert.ok(
  fs.readFileSync("app.js", "utf8").includes("2026.1.1~2026.12.31"),
  "2026 official criteria source missing",
);

console.log(
  JSON.stringify(
    {
      gradedItems: items.length,
      maliciousWrappersRejected: items.length,
      orderedReversalsRejected: reversedOrderedChecked,
      coverageReady: `${coverage.filter((item) => item.ready).length}/${coverage.length}`,
      modeCounts,
      executableAssets: assetRefs.length,
    },
    null,
    2,
  ),
);
