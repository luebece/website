(function () {
  const bank = {
    questions: [],
    ids: new Set(),
    chapters: { C: [], Java: [], Python: [], SQL: [] },
    forms: {},
  };

  const typeByDomain = {
    C: "code",
    Java: "code",
    Python: "code",
    SQL: "sql",
  };

  function normalizeSolution(solution = {}) {
    return {
      summary: solution.summary || "코드를 위에서 아래로 한 줄씩 추적한다.",
      steps: [...(solution.steps || [])],
      table: [...(solution.table || [])],
      traps: [...(solution.traps || [])],
    };
  }

  function addChapter(domain, chapter) {
    const rows = bank.chapters[domain];
    if (!rows) return;
    const existing = rows.find((item) => item.id === chapter.id);
    if (existing) {
      existing.practiceIds = [...new Set([
        ...existing.practiceIds,
        ...(chapter.practiceIds || []),
      ])];
      return;
    }
    rows.push({
      id: chapter.id,
      title: chapter.title,
      concept: chapter.concept,
      memory: chapter.memory,
      bridgeSteps: [...(chapter.bridgeSteps || [])],
      practiceIds: [...(chapter.practiceIds || [])],
    });
  }

  function addL3(spec) {
    if (bank.ids.has(spec.id)) throw new Error(`duplicate 2025+ question: ${spec.id}`);
    bank.ids.add(spec.id);
    const solution = normalizeSolution(spec.solution);
    const code = String(spec.code || "").trim();
    const question = `${spec.prompt || "다음 코드의 출력값을 쓰시오."}\n\n${code}`;
    const chapterId = spec.chapter?.id || spec.chapterId;
    const options = {
      answerMode: spec.answerMode || "output",
      era: "2025+",
      difficulty: spec.difficulty || 5,
      tier: "L3",
      concepts: [...(spec.concepts || [])],
      prerequisites: [...new Set([chapterId, ...(spec.prerequisites || [])].filter(Boolean))],
      estimatedMinutes: spec.estimatedMinutes || 8,
      traceSteps: spec.traceSteps || Math.max(8, solution.steps.length),
      sourceRounds: [...(spec.sourceRounds || [])],
      sourceType: "reconstruction-derived-original-variant",
      confidence: spec.confidence || "internally-verified",
      solution,
      mistakes: [...(spec.mistakes || [])],
      verification: spec.verification || null,
    };
    const row = [
      spec.id,
      spec.domain,
      typeByDomain[spec.domain],
      spec.level || "must",
      question,
      spec.accept || [spec.answer],
      spec.answer,
      solution.summary,
      [spec.domain, "2025+", "L3", "기출급", "최신복합", ...(spec.tags || [])],
      options,
    ];
    bank.questions.push({ ...spec, code, question, solution, options });
    window.CODE_SQL_PRACTICE_ROWS = [...(window.CODE_SQL_PRACTICE_ROWS || []), row];

    if (spec.chapter) {
      addChapter(spec.domain, {
        ...spec.chapter,
        practiceIds: [spec.id, ...(spec.chapter.practiceIds || [])],
      });
    } else if (spec.chapterId) {
      addChapter(spec.domain, {
        id: spec.chapterId,
        practiceIds: [spec.id],
      });
    }
  }

  function attachChapters() {
    const academy = window.CODE_SQL_ACADEMY || {};
    Object.entries(bank.chapters).forEach(([domain, chapters]) => {
      if (!academy[domain]) return;
      academy[domain].advancedChapters = chapters.map((chapter) => {
        const question = bank.questions.find((item) =>
          chapter.practiceIds.includes(item.id),
        );
        return {
          ...chapter,
          walkthrough: question
            ? {
                code: question.code,
                steps: question.solution.steps,
                table: question.solution.table,
                traps: question.solution.traps,
                output: question.answer,
              }
            : null,
        };
      });
    });
  }

  bank.addChapter = addChapter;
  bank.addL3 = addL3;
  bank.attachChapters = attachChapters;
  window.ADVANCED_2025 = bank;
})();
