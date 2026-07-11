(function (global) {
  "use strict";

  const ORDER_HINT =
    /순서|순서대로|차례|처음부터|끝까지|바깥에서|안쪽으로|왼쪽부터|오른쪽부터|각각|반대 방향|처리 순서|단계/;
  const OUTPUT_HINT = /출력값|출력 값|출력 결과|실행 결과|결과값/;
  const NUMERIC_PATTERN = /^[+-]?\d+(?:\.\d+)?$/;

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

  function normalizeLiteral(value) {
    return String(value ?? "").normalize("NFKC").trim();
  }

  function normalizeSqlLiteral(value) {
    const input = String(value ?? "").normalize("NFKC").trim();
    let output = "";
    let quote = null;
    let pendingSpace = false;
    for (let index = 0; index < input.length; index += 1) {
      const character = input[index];
      if (quote) {
        output += character;
        if (character === quote) {
          if (input[index + 1] === quote) {
            output += input[index + 1];
            index += 1;
          } else {
            quote = null;
          }
        }
        continue;
      }
      if (character === "'" || character === '"') {
        if (pendingSpace && output && !output.endsWith("(")) output += " ";
        output += character;
        quote = character;
        pendingSpace = false;
      } else if (/\s/.test(character)) {
        pendingSpace = true;
      } else if (/[(),*]/.test(character)) {
        output = output.replace(/\s+$/, "");
        output += character;
        pendingSpace = false;
      } else {
        if (pendingSpace && output && !output.endsWith("(")) output += " ";
        output += character.toLowerCase();
        pendingSpace = false;
      }
    }
    const normalized = output.trim();
    return normalized.endsWith(";") ? normalized.slice(0, -1).trimEnd() : normalized;
  }

  function unique(values) {
    return [...new Set(values.filter(Boolean))];
  }

  function flatCandidates(item) {
    return unique([item.answer, ...(item.accept || [])].map(String));
  }

  function outputCandidates(item) {
    return unique([item.answer, ...(item.outputAccept || [])].map(String));
  }

  function numericCandidates(item) {
    return unique([item.answer, ...(item.numericAccept || [])].map(String));
  }

  function isSymbolSensitiveAnswer(item) {
    if (OUTPUT_HINT.test(String(item.question || ""))) return true;
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

  function partitionGroupLists(item) {
    const sizes = item.partitionSizes || [];
    const lists = groupCandidates(item);
    if (
      !sizes.length ||
      sizes.some((size) => !Number.isInteger(size) || size < 1) ||
      sizes.reduce((sum, size) => sum + size, 0) !== lists.length
    ) {
      return [];
    }
    let offset = 0;
    return sizes.map((size) => {
      const partition = lists.slice(offset, offset + size);
      offset += size;
      return partition;
    });
  }

  function splitPartitionSegments(rawUser) {
    return String(rawUser)
      .normalize("NFKC")
      .split(/\s*(?:\/|\||;|\n)\s*/)
      .map((segment) => compactTerm(segment))
      .filter(Boolean);
  }

  function matchesPartitions(rawUser, item) {
    const partitions = partitionGroupLists(item);
    const segments = splitPartitionSegments(rawUser);
    if (!partitions.length || segments.length !== partitions.length) return false;
    return partitions.every(
      (lists, index) =>
        lists.length &&
        lists.every((list) => list.length) &&
        consumeSet(segments[index], lists, 0, new Map()),
    );
  }

  function countPartitionMatches(rawUser, item) {
    const partitions = partitionGroupLists(item);
    const segments = splitPartitionSegments(rawUser);
    if (!partitions.length || segments.length !== partitions.length) return 0;
    return partitions.reduce((total, lists, index) => {
      const matched = consumeSetPartial(segments[index], lists, 0, new Map());
      return total + Math.max(0, matched);
    }, 0);
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

  function bitCount(value) {
    let count = 0;
    let remaining = value;
    while (remaining) {
      count += remaining & 1;
      remaining >>>= 1;
    }
    return count;
  }

  function consumeSetPartial(remaining, lists, usedMask, memo) {
    if (!remaining.length) return bitCount(usedMask);
    const key = `${usedMask}:${remaining}`;
    if (memo.has(key)) return memo.get(key);

    let best = -1;
    for (let index = 0; index < lists.length; index += 1) {
      if (usedMask & (1 << index)) continue;
      for (const candidate of lists[index]) {
        if (!remaining.startsWith(candidate)) continue;
        best = Math.max(
          best,
          consumeSetPartial(
            remaining.slice(candidate.length),
            lists,
            usedMask | (1 << index),
            memo,
          ),
        );
      }
    }
    memo.set(key, best);
    return best;
  }

  function consumeOrderedPartial(remaining, lists, nextIndex, memo) {
    if (!remaining.length) return 0;
    const key = `${nextIndex}:${remaining}`;
    if (memo.has(key)) return memo.get(key);

    let best = -1;
    for (let index = nextIndex; index < lists.length; index += 1) {
      for (const candidate of lists[index]) {
        if (!remaining.startsWith(candidate)) continue;
        const rest = consumeOrderedPartial(
          remaining.slice(candidate.length),
          lists,
          index + 1,
          memo,
        );
        if (rest >= 0) best = Math.max(best, rest + 1);
      }
    }
    memo.set(key, best);
    return best;
  }

  function answerMode(item) {
    if (item.answerMode) return item.answerMode;
    if (item.groups?.length) {
      return ORDER_HINT.test(String(item.question || "")) ? "ordered" : "set";
    }
    if (isSymbolSensitiveAnswer(item)) return "output";
    if (NUMERIC_PATTERN.test(String(item.answer || "").normalize("NFKC").trim())) {
      return "numeric";
    }
    return "term";
  }

  function evaluate(user, item) {
    const rawUser = String(user ?? "").trim();
    const mode = answerMode(item);
    if (!rawUser) return { correct: false, mode, reason: "empty" };

    if (mode === "numeric") {
      const normalizedUser = rawUser.normalize("NFKC");
      const correct = numericCandidates(item).some(
        (candidate) => String(candidate).normalize("NFKC").trim() === normalizedUser,
      );
      return { correct, mode, reason: correct ? "exact-numeric" : "numeric-mismatch" };
    }

    if (mode === "output") {
      const normalizedUser = normalizeOutput(rawUser);
      const correct = outputCandidates(item).some(
        (candidate) => normalizeOutput(candidate) === normalizedUser,
      );
      return { correct, mode, reason: correct ? "exact-output" : "output-mismatch" };
    }

    if (mode === "literal") {
      const normalizedUser = normalizeLiteral(rawUser);
      const correct = flatCandidates(item).some(
        (candidate) => normalizeLiteral(candidate) === normalizedUser,
      );
      return { correct, mode, reason: correct ? "exact-literal" : "literal-mismatch" };
    }

    if (mode === "sql-literal") {
      const normalizedUser = normalizeSqlLiteral(rawUser);
      const correct = flatCandidates(item).some(
        (candidate) => normalizeSqlLiteral(candidate) === normalizedUser,
      );
      return { correct, mode, reason: correct ? "exact-sql-literal" : "sql-literal-mismatch" };
    }

    if (mode === "partitioned") {
      const correct = matchesPartitions(rawUser, item);
      return { correct, mode, reason: correct ? "partitioned-match" : "partitioned-mismatch" };
    }

    const normalizedUser = compactTerm(rawUser);
    if (!normalizedUser) return { correct: false, mode, reason: "empty" };

    if (compactTerm(item.answer) === normalizedUser) {
      return { correct: true, mode, reason: "canonical" };
    }

    if (
      item.wholeAccept?.some((candidate) => compactTerm(candidate) === normalizedUser)
    ) {
      return { correct: true, mode, reason: "whole-alias" };
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
      mode === "ordered" || mode === "mapped"
        ? consumeOrdered(normalizedUser, lists, 0, new Map())
        : consumeSet(normalizedUser, lists, 0, new Map());
    return { correct, mode, reason: correct ? `${mode}-match` : `${mode}-mismatch` };
  }

  function score(user, item, maxPoints = 5) {
    const maximum = Number.isFinite(maxPoints) && maxPoints > 0 ? maxPoints : 5;
    const result = evaluate(user, item);
    const totalGroups = item.groups?.length || 1;
    if (result.correct) {
      return {
        ...result,
        points: maximum,
        maxPoints: maximum,
        matchedGroups: totalGroups,
        totalGroups,
      };
    }

    if (!item.groups?.length) {
      return {
        ...result,
        points: 0,
        maxPoints: maximum,
        matchedGroups: 0,
        totalGroups,
      };
    }

    if (result.mode === "partitioned") {
      const matchedGroups = countPartitionMatches(user, item);
      const points = Math.round(((maximum * matchedGroups) / totalGroups) * 2) / 2;
      return {
        ...result,
        points,
        maxPoints: maximum,
        matchedGroups,
        totalGroups,
      };
    }

    const normalizedUser = compactTerm(user);
    const lists = groupCandidates(item);
    if (!normalizedUser || !lists.length || lists.some((list) => !list.length) || lists.length > 20) {
      return {
        ...result,
        points: 0,
        maxPoints: maximum,
        matchedGroups: 0,
        totalGroups,
      };
    }

    const matchedGroups =
      result.mode === "ordered" || result.mode === "mapped"
        ? consumeOrderedPartial(normalizedUser, lists, 0, new Map())
        : consumeSetPartial(normalizedUser, lists, 0, new Map());
    const safeMatches = Math.max(0, matchedGroups);
    const points = Math.round(((maximum * safeMatches) / totalGroups) * 2) / 2;
    return {
      ...result,
      points,
      maxPoints: maximum,
      matchedGroups: safeMatches,
      totalGroups,
    };
  }

  global.ANSWER_ENGINE = Object.freeze({
    answerMode,
    compactTerm,
    evaluate,
    matches: (user, item) => evaluate(user, item).correct,
    normalizeLiteral,
    normalizeOutput,
    normalizeSqlLiteral,
    numericPattern: NUMERIC_PATTERN,
    score,
  });
})(typeof window === "undefined" ? globalThis : window);
