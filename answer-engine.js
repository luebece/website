(function (global) {
  "use strict";

  const ORDER_HINT =
    /순서|순서대로|차례|처음부터|끝까지|바깥에서|안쪽으로|왼쪽부터|오른쪽부터|각각|반대 방향|처리 순서|단계/;
  const OUTPUT_HINT = /출력값|출력 값|출력 결과|실행 결과|결과값/;

  function text(value) {
    return String(value ?? "").normalize("NFKC").toLowerCase().trim();
  }

  function compactTerm(value) {
    return text(value).replace(/[^0-9a-z가-힣]/g, "");
  }

  function normalizeOutput(value) {
    return String(value ?? "")
      .normalize("NFKC")
      .trim()
      .replace(/\r\n?/g, "\n")
      .split("\n")
      .map((line) => line.trim().replace(/[ \t]+/g, " "))
      .join("\n")
      .replace(/\s*([,;])\s*/g, "$1")
      .trim();
  }

  function unique(values) {
    return [...new Set(values.filter(Boolean))];
  }

  function flatCandidates(item) {
    return unique([item.answer, ...(item.accept || [])].map(String));
  }

  function isSymbolSensitiveAnswer(item) {
    if (item.type === "code" || OUTPUT_HINT.test(String(item.question || ""))) return true;
    if (
      item.type === "sql" &&
      flatCandidates(item).some((candidate) => /[()*%_'"<>=]/.test(String(candidate)))
    ) {
      return true;
    }
    return flatCandidates(item).some((candidate) => {
      const value = text(candidate);
      return (
        (!compactTerm(candidate) && Boolean(value)) ||
        (/^[+\-]?\d/.test(value) && /[.\-]/.test(value)) ||
        /^[+\-]?\d+(?:[.,\s\n;+\-]\d+)+$/.test(value)
      );
    });
  }

  function splitCanonical(answer, count) {
    const parts = String(answer || "")
      .split(/\s*(?:,|->|→|⇒|;|\n)\s*/)
      .map((part) => part.trim())
      .filter(Boolean);
    return parts.length === count ? parts : [];
  }

  function groupCandidates(item) {
    const groups = item.groups || [];
    const canonical = splitCanonical(item.answer, groups.length);
    return groups.map((group, index) =>
      unique([...(group || []), canonical[index]].map(compactTerm)),
    );
  }

  function consumeOrdered(remaining, lists, index, memo) {
    if (index === lists.length) return remaining.length === 0;
    const key = `${index}:${remaining}`;
    if (memo.has(key)) return memo.get(key);
    const matched = lists[index].some(
      (candidate) =>
        remaining.startsWith(candidate) &&
        consumeOrdered(remaining.slice(candidate.length), lists, index + 1, memo),
    );
    memo.set(key, matched);
    return matched;
  }

  function consumeSet(remaining, lists, usedMask, memo) {
    const fullMask = (1 << lists.length) - 1;
    if (usedMask === fullMask) return remaining.length === 0;
    const key = `${usedMask}:${remaining}`;
    if (memo.has(key)) return memo.get(key);

    for (let index = 0; index < lists.length; index += 1) {
      if (usedMask & (1 << index)) continue;
      for (const candidate of lists[index]) {
        if (
          remaining.startsWith(candidate) &&
          consumeSet(remaining.slice(candidate.length), lists, usedMask | (1 << index), memo)
        ) {
          memo.set(key, true);
          return true;
        }
      }
    }
    memo.set(key, false);
    return false;
  }

  function answerMode(item) {
    if (item.answerMode) return item.answerMode;
    if (item.groups?.length) {
      return ORDER_HINT.test(String(item.question || "")) ? "ordered" : "set";
    }
    return isSymbolSensitiveAnswer(item) ? "output" : "term";
  }

  function evaluate(user, item) {
    const rawUser = String(user ?? "").trim();
    const mode = answerMode(item);
    if (!rawUser) return { correct: false, mode, reason: "empty" };

    if (mode === "output") {
      const normalizedUser = normalizeOutput(rawUser);
      const correct = flatCandidates(item).some(
        (candidate) => normalizeOutput(candidate) === normalizedUser,
      );
      return { correct, mode, reason: correct ? "exact-output" : "output-mismatch" };
    }

    const normalizedUser = compactTerm(rawUser);
    if (!normalizedUser) return { correct: false, mode, reason: "empty" };

    if (compactTerm(item.answer) === normalizedUser) {
      return { correct: true, mode, reason: "canonical" };
    }

    if (!item.groups?.length) {
      const correct = (item.accept || []).some(
        (candidate) => compactTerm(candidate) === normalizedUser,
      );
      return { correct, mode, reason: correct ? "alias" : "term-mismatch" };
    }

    const lists = groupCandidates(item);
    if (!lists.length || lists.some((list) => !list.length) || lists.length > 20) {
      return { correct: false, mode, reason: "invalid-groups" };
    }

    const correct =
      mode === "ordered"
        ? consumeOrdered(normalizedUser, lists, 0, new Map())
        : consumeSet(normalizedUser, lists, 0, new Map());
    return { correct, mode, reason: correct ? `${mode}-match` : `${mode}-mismatch` };
  }

  global.ANSWER_ENGINE = Object.freeze({
    answerMode,
    compactTerm,
    evaluate,
    matches: (user, item) => evaluate(user, item).correct,
    normalizeOutput,
  });
})(typeof window === "undefined" ? globalThis : window);
