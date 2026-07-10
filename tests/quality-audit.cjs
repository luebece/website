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

const bootStoredState = {
  version: 2,
  day: 3,
  done: { "gm-java-011": true },
  wrong: { "x-c-003": 2 },
  checks: { "day-3-0": true },
  log: [{ id: "x-c-003", correct: false, time: 1_700_000_000_000 }],
  mockBest: 65,
  mastery: {},
  mockDraft: {
    id: "boot-restore-test",
    mode: "weakness",
    itemIds: ["x-c-003", "gm-java-011"],
    index: 1,
    answers: { "x-c-003": "6 5" },
    flags: { "gm-java-011": true },
    startedAt: 1_700_000_000_000,
    deadline: 4_700_000_000_000,
  },
  mockHistory: [
    {
      id: "history-restore-test",
      mode: "weakness",
      completedAt: 1_700_000_100_000,
      strictScore: 50,
      learningScore: 62.5,
      timedOut: false,
      results: [
        { itemId: "x-c-003", input: "6 5", correct: true, points: 5, maxPoints: 5 },
        { itemId: "gm-java-011", input: "20", correct: false, points: 0, maxPoints: 5 },
        { itemId: "unknown", input: "discard", correct: true, points: 5, maxPoints: 5 },
      ],
    },
  ],
};

const context = {
  localStorage: {
    getItem: (key) => key === "jeongcheogi_5day_trainer_v1"
      ? JSON.stringify(bootStoredState)
      : null,
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

const bootRestored = audit.stateSnapshot();
assert.equal(bootRestored.day, 3, "saved day was not restored during app initialization");
assert.equal(bootRestored.wrong["x-c-003"], 2, "saved wrong answer was not restored");
assert.equal(bootRestored.mockDraft.id, "boot-restore-test", "mock draft was not restored");
assert.equal(bootRestored.mockDraft.mode, "weakness");
assert.equal(bootRestored.mockDraft.answers["x-c-003"], "6 5");
assert.equal(bootRestored.mockDraft.flags["gm-java-011"], true);
assert.equal(bootRestored.mockHistory.length, 1);
assert.equal(bootRestored.mockHistory[0].results.length, 2);
assert.equal(bootRestored.mockHistory[0].results[1].input, "20");
assert.equal(bootRestored.mockHistory[0].mode, "weakness");
assert.equal(bootRestored.mockBest, null, "weakness-only legacy best leaked into standard best");

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
const validTypes = new Set([
  "code",
  "db",
  "design",
  "integration",
  "netos",
  "package",
  "req",
  "security",
  "server",
  "sql",
  "test",
  "theory",
]);
const validLevels = new Set(["must", "high", "mid"]);
const forbiddenControls = /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/;
for (const item of items) {
  assert.match(item.id, /^[a-z0-9-]+$/, `${item.id}: invalid id format`);
  assert.ok(validTypes.has(item.type), `${item.id}: unknown type ${item.type}`);
  assert.ok(validLevels.has(item.level), `${item.id}: unknown level ${item.level}`);
  assert.ok(String(item.domain).trim(), `${item.id}: empty domain`);
  assert.ok(String(item.question).trim().length >= 5, `${item.id}: question is too short`);
  assert.ok(String(item.explain).trim().length >= 5, `${item.id}: explanation is too short`);
  assert.ok(!forbiddenControls.test(item.question), `${item.id}: control character in question`);
  assert.ok(!forbiddenControls.test(item.answer), `${item.id}: control character in answer`);
  assert.ok(Array.isArray(item.tags) && item.tags.length > 0, `${item.id}: missing tags`);
  assert.equal(
    new Set(item.tags.map((tag) => String(tag).normalize("NFKC").toLowerCase())).size,
    item.tags.length,
    `${item.id}: duplicate tags`,
  );
  assert.ok((item.accept || []).every((alias) => typeof alias === "string" && alias.trim()), `${item.id}: invalid alias`);
  if (item.groups) {
    assert.ok(item.groups.length >= 2, `${item.id}: grouped answer has fewer than two groups`);
    assert.ok(
      item.groups.every(
        (group) => Array.isArray(group) && group.length && group.every((alias) => String(alias).trim()),
      ),
      `${item.id}: invalid grouped answer`,
    );
  }
  if (item.answerMode === "partitioned") {
    assert.ok(Array.isArray(item.partitionSizes), `${item.id}: missing partition sizes`);
    assert.equal(
      item.partitionSizes.reduce((sum, size) => sum + size, 0),
      item.groups.length,
      `${item.id}: partition sizes do not cover every answer group`,
    );
  }
}

const exactQuestionGroups = new Map();
for (const item of items) {
  const key = item.question.normalize("NFKC").toLowerCase().replace(/\s+/g, " ").trim();
  if (!exactQuestionGroups.has(key)) exactQuestionGroups.set(key, []);
  exactQuestionGroups.get(key).push(item);
}
let compatibleDuplicateQuestions = 0;
for (const duplicates of exactQuestionGroups.values()) {
  if (duplicates.length < 2) continue;
  for (const source of duplicates) {
    for (const target of duplicates) {
      assert.ok(
        engine.matches(source.answer, target),
        `${source.id}/${target.id}: identical question has conflicting answers`,
      );
    }
  }
  compatibleDuplicateQuestions += 1;
}

const explicitOutputPrompt = /출력값|출력 값|출력 결과|실행 결과|결과값/;
for (const item of items.filter((candidate) => explicitOutputPrompt.test(candidate.question))) {
  if (item.groups) continue;
  assert.equal(engine.answerMode(item), "output", `${item.id}: explicit output prompt is not strict output`);
}
const questionAnswerKeys = audit.practice.map((item) =>
  `${item.question}||${item.answer}`.replace(/\s+/g, " ").trim(),
);
assert.equal(
  new Set(questionAnswerKeys).size,
  questionAnswerKeys.length,
  "duplicate manual practice question and answer",
);

let rejectedOutputAliases = 0;
for (const item of items) {
  assert.ok(item.answer, `${item.id}: empty canonical answer`);
  assert.ok(item.explain, `${item.id}: empty explanation`);
  assert.ok(engine.matches(item.answer, item), `${item.id}: canonical answer rejected`);
  assert.ok(
    !engine.matches(`틀림${item.answer}오답`, item),
    `${item.id}: wrapped garbage accepted`,
  );

  if (!item.groups && engine.answerMode(item) !== "output") {
    for (const alias of item.accept) {
      assert.ok(engine.matches(alias, item), `${item.id}: declared alias rejected: ${alias}`);
    }
  }

  if (engine.answerMode(item) === "output") {
    for (const alias of item.accept || []) {
      if (engine.normalizeOutput(alias) === engine.normalizeOutput(item.answer)) continue;
      assert.ok(!engine.matches(alias, item), `${item.id}: unsafe output alias accepted: ${alias}`);
      rejectedOutputAliases += 1;
    }
  }
}

assert.ok(rejectedOutputAliases >= 60, "too few unsafe output aliases were regression-tested");

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
for (const invalid of ["중복 NULL", "중복, NULL", "unique null"]) {
  assert.ok(!engine.matches(invalid, unordered), `primary-key negation was lost: ${invalid}`);
}
assert.ok(engine.matches("UNIQUE, NOT NULL", unordered));

for (const id of ["master-sql-null-count-q1", "master-sql-null-count-q2"]) {
  const countNull = audit.practice.find((item) => item.id === id);
  assert.ok(countNull, `${id}: COUNT/NULL fixture missing`);
  assert.ok(engine.matches("COUNT(컬럼)은 NULL 제외, COUNT(*)는 행 전체", countNull));
  for (const invalid of ["COUNT NULL COUNT", "컬럼 제외 행", "COUNT 제외 전체"]) {
    assert.ok(!engine.matches(invalid, countNull), `${id}: fragments accepted: ${invalid}`);
  }
}

const dbDesignProcedure = audit.practice.find((item) => item.id === "master-db-design-q2");
assert.ok(dbDesignProcedure, "DB design procedure fixture missing");
assert.equal(engine.answerMode(dbDesignProcedure), "ordered");
assert.ok(
  !engine.matches("구현, 물리적 설계, 논리적 설계, 개념적 설계, 요구사항 분석", dbDesignProcedure),
  "reversed DB design procedure was accepted",
);

for (const id of ["master-crypto-q1", "master-crypto-q2"]) {
  const crypto = audit.practice.find((item) => item.id === id);
  assert.ok(crypto, `${id}: crypto classification fixture missing`);
  assert.equal(engine.answerMode(crypto), "partitioned");
  assert.ok(engine.matches("SEED, AES, DES, ARIA / ECC, RSA", crypto));
  assert.ok(!engine.matches("AES, DES, ARIA, SEED, RSA, ECC", crypto));
  assert.ok(!engine.matches("AES, RSA, DES, ECC / ARIA, SEED", crypto));
  assert.ok(
    engine.score("AES, DES, ARIA, SEED, RSA, ECC", crypto, 5).points < 5,
    `${id}: unpartitioned answer received full learning credit`,
  );
  assert.ok(
    engine.score("RSA, ECC / AES, DES, ARIA, SEED", crypto, 5).points < 5,
    `${id}: reversed partitions received full learning credit`,
  );
  assert.equal(engine.score("AES, DES / RSA", crypto, 5).points, 2.5);
}

const literalItems = items.filter((item) => engine.answerMode(item) === "literal");
assert.equal(literalItems.length, 18, "unexpected literal item count");
for (const item of literalItems) {
  assert.ok(engine.matches(item.answer, item), `${item.id}: literal answer rejected`);
  const spaced = [...item.answer].join(" ");
  assert.ok(!engine.matches(spaced, item), `${item.id}: spaced literal accepted`);
  const upper = item.answer.toUpperCase();
  if (upper !== item.answer) {
    assert.ok(!engine.matches(upper, item), `${item.id}: literal case was ignored`);
  }
}
const genericLiteral = literalItems.find((item) => item.id === "gm-java-gen-008");
assert.ok(!engine.matches("ListInteger", genericLiteral));
assert.ok(!engine.matches("Integer", genericLiteral));
const itemsLiteral = literalItems.find((item) => item.id === "gm-py-009");
assert.ok(!engine.matches("items", itemsLiteral));
assert.ok(engine.matches("d.items()", itemsLiteral));
assert.ok(engine.matches("append()", items.find((item) => item.id === "code-015")));
assert.ok(engine.matches("extend()", items.find((item) => item.id === "gm-py-006")));

const sqlLiteralItems = items.filter((item) => engine.answerMode(item) === "sql-literal");
assert.equal(sqlLiteralItems.length, 4, "unexpected SQL literal item count");
for (const item of sqlLiteralItems) {
  if (item.id === "cq-sql-012") continue;
  assert.ok(engine.matches(item.answer.toLowerCase(), item), `${item.id}: lowercase SQL rejected`);
}
const likeLiteral = sqlLiteralItems.find((item) => item.id === "cq-sql-012");
assert.ok(engine.matches("like 'A%'", likeLiteral));
assert.ok(!engine.matches("like 'a%'", likeLiteral), "SQL string literal case was ignored");
const distinctLiteral = sqlLiteralItems.find((item) => item.id === "db-002");
assert.ok(engine.matches("count ( distinct dept )", distinctLiteral));
assert.ok(!engine.matches("count distinct dept", distinctLiteral));

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

const strictNumericItems = items.filter((item) => engine.answerMode(item) === "numeric");
assert.equal(strictNumericItems.length, 4, "unexpected strict numeric item count");
for (const item of strictNumericItems) {
  assert.ok(engine.matches(item.answer, item), `${item.id}: numeric canonical answer rejected`);
  assert.ok(!engine.matches(`-${item.answer}`, item), `${item.id}: negative sign was ignored`);
  assert.ok(!engine.matches(`+${item.answer}`, item), `${item.id}: positive sign was ignored`);
}

const caseSensitiveOutput = {
  answer: "Ab",
  accept: ["Ab"],
  groups: null,
  question: "코드 출력값은?",
  type: "code",
};
assert.ok(engine.matches("Ab", caseSensitiveOutput));
assert.ok(!engine.matches("ab", caseSensitiveOutput), "output letter case was ignored");

const groupedScoreFixture = {
  answer: "REDO, UNDO",
  accept: [],
  groups: [["redo"], ["undo"]],
  question: "회복 연산 두 가지를 쓰시오.",
  type: "db",
};
assert.equal(engine.score("REDO, UNDO", groupedScoreFixture).points, 5);
assert.equal(engine.score("REDO", groupedScoreFixture).points, 2.5);
assert.equal(
  engine.score("틀림REDO오답", groupedScoreFixture).points,
  0,
  "partial scoring accepted wrapped garbage",
);

const orderedScoreFixture = {
  ...groupedScoreFixture,
  question: "REDO와 UNDO를 이 순서대로 쓰시오.",
};
assert.equal(engine.answerMode(orderedScoreFixture), "ordered");
assert.equal(
  engine.score("UNDO, REDO", orderedScoreFixture).points,
  0,
  "reversed ordered answer received partial points",
);

const countStar = audit.practice.find((item) => item.id === "cq-sql-002");
assert.ok(countStar, "COUNT(*) fixture missing");
assert.ok(engine.matches("COUNT(*)", countStar));
assert.ok(!engine.matches("COUNT", countStar), "COUNT accepted in place of COUNT(*)");

const postIncrementOutput = audit.practice.find((item) => item.id === "x-c-003");
assert.ok(postIncrementOutput, "x-c-003 fixture missing");
assert.ok(engine.matches("6 5", postIncrementOutput));
assert.ok(!engine.matches("6 3", postIncrementOutput), "wrong x-c-003 alias was accepted");
assert.ok(!engine.matches("63", postIncrementOutput), "separator-free x-c-003 alias was accepted");

const integerDivisionOutput = audit.practice.find((item) => item.id === "gm-java-011");
assert.ok(integerDivisionOutput, "gm-java-011 fixture missing");
assert.ok(engine.matches("2.0", integerDivisionOutput));
assert.ok(!engine.matches("20", integerDivisionOutput), "decimal-free Java output was accepted");

const singletonTerm = audit.practice.find((item) => item.id === "code-008");
assert.ok(singletonTerm, "code-008 fixture missing");
assert.equal(engine.answerMode(singletonTerm), "term", "code concept was treated as program output");
assert.ok(engine.matches("싱글톤", singletonTerm), "valid code-concept alias was rejected");

const strictCompositeTheory = audit.theoryPractice.filter(
  (item) => item.groups?.length && item.answerMode === "set",
);
const ungroupedCommaTheory = audit.theoryPractice
  .filter((item) => item.answer.includes(",") && !item.groups?.length)
  .map((item) => item.id);
assert.deepEqual(
  Array.from(ungroupedCommaTheory),
  [],
  `comma-listed theory answer lacks grouped grading: ${ungroupedCommaTheory.join(", ")}`,
);
for (const id of [
  "theory-deep-ui-002",
  "theory-deep-db-005",
  "theory-deep-sec-008",
  "theory-deep-test-004",
]) {
  assert.ok(
    strictCompositeTheory.some((item) => item.id === id),
    `${id}: required composite grading fixture missing`,
  );
}
for (const item of strictCompositeTheory) {
  for (const group of item.groups) {
    assert.ok(
      !engine.matches(group[0], item),
      `${item.id}: one component was accepted as the whole composite answer`,
    );
  }
  for (const alias of item.wholeAccept || []) {
    assert.ok(engine.matches(alias, item), `${item.id}: whole-category alias rejected`);
    assert.ok(
      !engine.matches(`틀림${alias}오답`, item),
      `${item.id}: wrapped whole-category alias accepted`,
    );
  }
}
const recoveryComposite = strictCompositeTheory.find(
  (item) => item.id === "theory-master-recovery",
);
assert.ok(recoveryComposite, "REDO/UNDO composite fixture missing");
assert.ok(!engine.matches("재실행", recoveryComposite));
assert.ok(engine.matches("재실행, 취소", recoveryComposite));
const routingComposite = strictCompositeTheory.find(
  (item) => item.id === "theory-master-routing",
);
assert.ok(engine.matches("라우팅 프로토콜", routingComposite));

const domainAnalysis = audit.analyzeMockDomains([
  { item: postIncrementOutput, correct: true, points: 5, maxPoints: 5 },
  { item: integerDivisionOutput, correct: false, points: 2.5, maxPoints: 5 },
]);
assert.equal(domainAnalysis.length, 2);
assert.deepEqual(
  Array.from(domainAnalysis.map((row) => row.strictRate)).sort((a, b) => a - b),
  [0, 100],
);

const standardFormSignatures = new Set();
for (const form of ["A", "B", "C", "D", "E"]) {
  const selected = audit.buildStandardMockForm(form);
  const repeated = audit.buildStandardMockForm(form);
  assert.deepEqual(
    Array.from(selected, (item) => item.id),
    Array.from(repeated, (item) => item.id),
    `${form} form is not reproducible`,
  );
  assert.equal(selected.length, 20, `${form} form item count`);
  assert.equal(new Set(selected.map((item) => item.id)).size, 20, `${form} form duplicate`);
  assert.equal(selected.filter((item) => item.type === "code").length, 7);
  assert.equal(selected.filter((item) => item.type === "sql").length, 2);
  assert.equal(selected.filter((item) => item.type === "db").length, 2);
  assert.equal(selected.filter((item) => !["code", "sql", "db"].includes(item.type)).length, 9);
  assert.equal(selected.filter((item) => item.tags.includes("C")).length, 3);
  assert.equal(selected.filter((item) => item.tags.includes("Java")).length, 3);
  assert.equal(selected.filter((item) => item.tags.includes("Python")).length, 1);
  assert.equal(selected.filter((item) => item.level === "must").length, 7);
  assert.equal(new Set(selected.map((item) => item.domain)).size, 13);
  standardFormSignatures.add(selected.map((item) => item.id).join("|"));
}
assert.equal(standardFormSignatures.size, 5, "standard forms are not distinct");
assert.ok(audit.sameMockSeries(
  { mode: "standard", form: "A", formVersion: 1 },
  { mode: "standard", form: "A", formVersion: 1 },
));
assert.ok(!audit.sameMockSeries(
  { mode: "standard", form: "A", formVersion: 1 },
  { mode: "standard", form: "B", formVersion: 1 },
));
assert.ok(!audit.sameMockSeries(
  { mode: "standard", form: "A", formVersion: 1 },
  { mode: "standard", form: "A", formVersion: 2 },
));

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

const transitionNow = 1_700_000_000_000;
const firstCorrect = audit.masteryTransition(null, true, transitionNow);
assert.equal(firstCorrect.stage, 1);
assert.equal(firstCorrect.nextReview, transitionNow + 24 * 60 * 60 * 1000);
const secondCorrect = audit.masteryTransition(firstCorrect, true, transitionNow);
assert.equal(secondCorrect.stage, 2);
assert.equal(secondCorrect.nextReview, transitionNow + 3 * 24 * 60 * 60 * 1000);
const afterWrong = audit.masteryTransition(secondCorrect, false, transitionNow);
assert.equal(afterWrong.stage, 1);
assert.equal(afterWrong.streak, 0);
assert.equal(afterWrong.nextReview, transitionNow + 10 * 60 * 1000);
assert.ok(!audit.isMasteryDue(afterWrong, afterWrong.nextReview - 1));
assert.ok(audit.isMasteryDue(afterWrong, afterWrong.nextReview));

const firstItemId = items[0].id;
const secondItemId = items[1].id;
const normalizedDraft = audit.normalizeMockDraft({
  id: "test-draft",
  itemIds: [firstItemId, secondItemId, "unknown", firstItemId],
  index: 99,
  answers: { [firstItemId]: "answer", unknown: "discard" },
  flags: { [secondItemId]: true, unknown: true },
  startedAt: transitionNow,
  deadline: transitionNow + 150 * 60 * 1000,
});
assert.deepEqual(Array.from(normalizedDraft.itemIds), [firstItemId, secondItemId]);
assert.equal(normalizedDraft.index, 1);
assert.equal(normalizedDraft.mode, "legacy");
assert.equal(normalizedDraft.answers[firstItemId], "answer");
assert.equal(normalizedDraft.answers.unknown, undefined);
assert.equal(normalizedDraft.flags[secondItemId], true);

const migratedLegacyState = audit.normalizeState({
  version: 2,
  mockBest: 80,
  mockDraft: {
    id: "old-draft",
    itemIds: [firstItemId],
    startedAt: transitionNow,
    deadline: transitionNow + 150 * 60 * 1000,
  },
  mockHistory: [{
    id: "old-history",
    completedAt: transitionNow,
    strictScore: 80,
    learningScore: 80,
    results: [],
  }],
});
assert.equal(migratedLegacyState.version, 4);
assert.equal(migratedLegacyState.mockDraft.mode, "legacy");
assert.equal(migratedLegacyState.mockHistory[0].mode, "legacy");
assert.equal(migratedLegacyState.mockBest, null, "legacy score became a standard best");

const migratedMixedState = audit.normalizeState({
  version: 2,
  mockBest: 95,
  mockHistory: [
    { id: "old", strictScore: 95 },
    { id: "standard", mode: "standard", strictScore: 75 },
    { id: "weakness", mode: "weakness", strictScore: 90 },
  ],
});
assert.equal(migratedMixedState.mockHistory[1].mode, "legacy-standard");
assert.equal(migratedMixedState.mockBest, null, "random standard score leaked into fixed-form best");
assert.equal(audit.normalizeMockMode("unknown"), "legacy");

const migratedV3RandomState = audit.normalizeState({
  version: 3,
  mockBest: 88,
  mockDraft: {
    id: "v3-random-draft",
    mode: "standard",
    itemIds: [firstItemId],
    startedAt: transitionNow,
    deadline: transitionNow + 150 * 60 * 1000,
  },
  mockHistory: [{ id: "v3-random", mode: "standard", strictScore: 88 }],
});
assert.equal(migratedV3RandomState.mockDraft.mode, "legacy-standard");
assert.equal(migratedV3RandomState.mockDraft.form, null);
assert.equal(migratedV3RandomState.mockHistory[0].mode, "legacy-standard");
assert.equal(migratedV3RandomState.mockBest, null);

const migratedV3FixedState = audit.normalizeState({
  version: 3,
  mockBest: 95,
  mockHistory: [{ id: "v3-fixed", mode: "standard", form: "A", strictScore: 75 }],
});
assert.equal(migratedV3FixedState.mockHistory[0].mode, "standard");
assert.equal(migratedV3FixedState.mockHistory[0].formVersion, 1);
assert.equal(migratedV3FixedState.mockBest, 75);

const currentStateBest = audit.normalizeState({
  version: 4,
  mockBest: 95,
  mockBestFormVersion: 1,
  mockHistory: [{
    id: "recent-standard",
    mode: "standard",
    form: "A",
    formVersion: 1,
    strictScore: 75,
  }],
});
assert.equal(currentStateBest.mockBest, 95, "current all-time standard best was discarded");

const backupState = audit.emptyState();
backupState.day = 4;
backupState.done[firstItemId] = true;
backupState.wrong[secondItemId] = 2;
backupState.mockDraft = normalizedDraft;
const backup = audit.createExportPayload(backupState);
assert.equal(backup.app, "jeongcheogi-trainer");
assert.equal(backup.version, 4);
const imported = audit.normalizeImportedState(backup);
assert.equal(imported.day, 4);
assert.equal(imported.done[firstItemId], true);
assert.equal(imported.wrong[secondItemId], 2);
assert.equal(imported.mockBest, null, "null mock score was converted to zero");
assert.equal(imported.mastery[firstItemId].stage, 2, "legacy done record was not migrated");
assert.equal(imported.mockDraft.id, "test-draft");
const restoredFromStorage = audit.readStateFromStorage({
  getItem: (key) => key === "jeongcheogi_5day_trainer_v1" ? JSON.stringify(backupState) : null,
});
assert.equal(restoredFromStorage.day, 4);
assert.equal(restoredFromStorage.mockDraft.answers[firstItemId], "answer");
let storedPayload = null;
assert.equal(
  audit.writeStateToStorage({ setItem: (_key, value) => { storedPayload = value; } }, backupState),
  true,
);
assert.equal(JSON.parse(storedPayload).day, 4);
assert.equal(
  audit.writeStateToStorage({ setItem: () => { throw new Error("quota"); } }, backupState),
  false,
);
assert.throws(
  () => audit.normalizeImportedState({ app: "other-app", state: {} }),
  /이 앱에서 내보낸/,
);

const html = fs.readFileSync("index.html", "utf8");
const serviceWorker = fs.readFileSync("sw.js", "utf8");
const assetRefs = [
  ...[...html.matchAll(/<script src="([^"]+)"/g)].map((match) => match[1]),
  ...[...html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map(
    (match) => match[1],
  ),
];
for (const ref of assetRefs) {
  assert.ok(ref.endsWith("?v=18"), `unversioned executable asset: ${ref}`);
  assert.ok(fs.existsSync(ref.split("?")[0]), `missing executable asset: ${ref}`);
  assert.ok(serviceWorker.includes(`"./${ref}"`), `service worker does not cache: ${ref}`);
}
assert.ok(
  serviceWorker.includes('CACHE_NAME = "jeongcheogi-trainer-v18"'),
  "service worker cache version mismatch",
);
for (const id of [
  "reviewDueCount",
  "exportProgress",
  "importProgress",
  "importProgressButton",
  "mockArea",
  "mockHistoryList",
  "mockHistoryDetail",
  "mockTrend",
]) {
  assert.ok(html.includes(`id="${id}"`), `missing required UI control: ${id}`);
}
assert.ok(html.includes('data-mode="review"'), "review drill mode is missing");
assert.ok(html.includes('role="tablist"'), "tab navigation semantics are missing");
assert.ok(html.includes('data-mock-mode="standard"'), "standard mock mode is missing");
assert.ok(html.includes('data-mock-mode="weakness"'), "weakness mock mode is missing");
for (const form of ["A", "B", "C", "D", "E"]) {
  assert.ok(html.includes(`data-mock-form="${form}"`), `standard ${form} form control missing`);
}
assert.ok(html.includes('maxlength="1000"'), "answer length limit is missing");
assert.ok(
  fs.readFileSync("app.js", "utf8").includes('id="mockAnswer" rows="3" maxlength="1000"'),
  "mock answer length limit is missing",
);
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
assert.equal(packageJson.scripts["build:release"], "node scripts/build-release.cjs");
assert.ok(fs.existsSync("scripts/build-release.cjs"), "release ZIP builder is missing");
assert.ok(fs.existsSync("USAGE.txt"), "release usage guide is missing");
assert.ok(
  fs.readFileSync("scripts/build-release.cjs", "utf8").includes('"USAGE.txt"'),
  "release ZIP does not include its usage guide",
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
      unsafeOutputAliasesRejected: rejectedOutputAliases,
      compatibleDuplicateQuestions,
      strictNumericItems: strictNumericItems.length,
      strictCompositeTheory: strictCompositeTheory.length,
      orderedReversalsRejected: reversedOrderedChecked,
      coverageReady: `${coverage.filter((item) => item.ready).length}/${coverage.length}`,
      modeCounts,
      executableAssets: assetRefs.length,
    },
    null,
    2,
  ),
);
