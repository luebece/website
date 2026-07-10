const assert = require("assert");
const fs = require("fs");
const http = require("http");
const path = require("path");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json; charset=utf-8",
};

function createServer() {
  return http.createServer((request, response) => {
    try {
      const requestUrl = new URL(request.url, "http://127.0.0.1");
      const relative = decodeURIComponent(requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname);
      const filePath = path.resolve(ROOT, `.${relative}`);
      if (!filePath.startsWith(`${ROOT}${path.sep}`)) {
        response.writeHead(403).end("Forbidden");
        return;
      }
      const body = fs.readFileSync(filePath);
      response.writeHead(200, {
        "Cache-Control": "no-store",
        "Content-Type": MIME_TYPES[path.extname(filePath)] || "application/octet-stream",
      });
      response.end(body);
    } catch {
      response.writeHead(404).end("Not found");
    }
  });
}

async function main() {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  const baseUrl = `http://127.0.0.1:${address.port}`;
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  page.setDefaultTimeout(10000);
  await page.addInitScript(() => {
    const originalSetItem = Storage.prototype.setItem;
    window.__storageWrites = 0;
    Storage.prototype.setItem = function countedSetItem(...args) {
      window.__storageWrites += 1;
      return originalSetItem.apply(this, args);
    };
  });
  const browserErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") browserErrors.push(message.text());
  });
  page.on("pageerror", (error) => browserErrors.push(error.message));

  try {
    console.log("e2e: open app");
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.getByRole("combobox", { name: "학습일 선택" }).selectOption("3");
    await page.getByRole("tab", { name: "훈련장", exact: true }).click();
    await page.getByRole("button", { name: "정답 보기", exact: true }).click();
    await page.getByRole("tab", { name: "모의고사", exact: true }).click();
    assert.equal(
      await page.getByRole("button", { name: "실전 표준", exact: true }).getAttribute("aria-pressed"),
      "true",
    );
    await page.getByRole("button", { name: "새 시험 시작", exact: true }).click();
    const standardComposition = await page.evaluate(() => {
      const state = window.JEONGCHEOGI_AUDIT.stateSnapshot();
      const byId = new Map(window.JEONGCHEOGI_AUDIT.practice.map((item) => [item.id, item]));
      const picked = state.mockDraft.itemIds.map((id) => byId.get(id));
      return {
        mode: state.mockDraft.mode,
        code: picked.filter((item) => item.type === "code").length,
        sqlDb: picked.filter((item) => item.type === "sql" || item.type === "db").length,
        theory: picked.filter((item) => !["code", "sql", "db"].includes(item.type)).length,
      };
    });
    assert.deepEqual(standardComposition, { mode: "standard", code: 7, sqlDb: 4, theory: 9 });
    await page.locator("#mockAnswer").fill("새로고침 복원 답안");
    await page.locator("#mockFlag").check();

    console.log("e2e: reload active mock");
    await page.reload({ waitUntil: "domcontentloaded" });
    assert.equal(await page.locator("#daySelect").inputValue(), "3");
    assert.equal(await page.locator("#wrongCount").textContent(), "1");
    await page.getByRole("tab", { name: "모의고사", exact: true }).click();
    assert.equal(await page.locator("#mockAnswer").inputValue(), "새로고침 복원 답안");
    assert.equal(await page.locator("#mockFlag").isChecked(), true);
    assert.equal(await page.locator("#mockAnswered").textContent(), "1");
    assert.equal(await page.locator("#mockFlagged").textContent(), "1");

    const strictAliasChecks = await page.evaluate(() => {
      const items = window.JEONGCHEOGI_AUDIT.practice;
      const increment = items.find((item) => item.id === "x-c-003");
      const division = items.find((item) => item.id === "gm-java-011");
      const numeric = items.find((item) => item.id === "code-002");
      const recovery = window.JEONGCHEOGI_AUDIT.theoryPractice.find(
        (item) => item.id === "theory-master-recovery",
      );
      return {
        incrementCorrect: window.ANSWER_ENGINE.matches("6 5", increment),
        incrementWrong: window.ANSWER_ENGINE.matches("6 3", increment),
        divisionCorrect: window.ANSWER_ENGINE.matches("2.0", division),
        divisionWrong: window.ANSWER_ENGINE.matches("20", division),
        numericCorrect: window.ANSWER_ENGINE.matches("12", numeric),
        numericWrong: window.ANSWER_ENGINE.matches("-12", numeric),
        compositeCorrect: window.ANSWER_ENGINE.matches("REDO, UNDO", recovery),
        compositeWrong: window.ANSWER_ENGINE.matches("REDO", recovery),
      };
    });
    assert.deepEqual(strictAliasChecks, {
      incrementCorrect: true,
      incrementWrong: false,
      divisionCorrect: true,
      divisionWrong: false,
      numericCorrect: true,
      numericWrong: false,
      compositeCorrect: true,
      compositeWrong: false,
    });

    await page.evaluate(() => { window.__storageWrites = 0; });
    page.once("dialog", (dialog) => dialog.accept());
    await page.getByRole("button", { name: "최종 제출", exact: true }).click();
    assert.equal(await page.evaluate(() => window.__storageWrites), 1);
    console.log("e2e: submitted mock");
    await page.getByRole("tab", { name: "대시보드", exact: true }).click();
    assert.equal(await page.locator(".mock-history-row").count(), 1);
    await page.locator(".mock-history-row").click();
    assert.equal(await page.locator("#mockHistoryDetail .result-row").count(), 20);
    assert.ok((await page.locator("#mockHistoryDetail .domain-analysis-row").count()) >= 3);

    console.log("e2e: reload history");
    await page.reload({ waitUntil: "domcontentloaded" });
    assert.equal(await page.locator(".mock-history-row").count(), 1);
    await page.locator(".mock-history-row").click();
    assert.equal(await page.locator("#mockHistoryDetail .result-row").count(), 20);
    assert.ok((await page.locator("#mockHistoryDetail").innerText()).includes("실전 표준"));

    await page.getByRole("tab", { name: "모의고사", exact: true }).click();
    await page.getByRole("button", { name: "약점 집중", exact: true }).click();
    await page.getByRole("button", { name: "새 시험 시작", exact: true }).click();
    assert.equal(
      await page.evaluate(() => window.JEONGCHEOGI_AUDIT.stateSnapshot().mockDraft.mode),
      "weakness",
    );
    assert.deepEqual(browserErrors, []);

    console.log(
      JSON.stringify(
        {
          restoredDay: 3,
          restoredWrongCount: 1,
          restoredMockAnswer: true,
          restoredFlag: true,
          strictOutputAliases: true,
          standardComposition: "7/4/9",
          atomicSubmitWrites: 1,
          weaknessMode: true,
          persistedHistoryRows: 20,
          browserErrors: browserErrors.length,
        },
        null,
        2,
      ),
    );
  } finally {
    await context.close();
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
