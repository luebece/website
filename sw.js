const CACHE_NAME = "jeongcheogi-trainer-v22";

const ASSETS = [
  "./",
  "./index.html",
  "./styles.css?v=22",
  "./theory-deep.js?v=22",
  "./theory-mega.js?v=22",
  "./code-sql-mastery.js?v=22",
  "./code-sql-conquest.js?v=22",
  "./code-sql-grandmaster.js?v=22",
  "./code-java-generics.js?v=22",
  "./exam-master-theory.js?v=22",
  "./exam-master-code-c.js?v=22",
  "./exam-master-code-jps.js?v=22",
  "./exam-master-academy.js?v=22",
  "./advanced-2025-core.js?v=22",
  "./advanced-2025-c.js?v=22",
  "./advanced-2025-java.js?v=22",
  "./advanced-2025-python-sql.js?v=22",
  "./advanced-theory-applied.js?v=22",
  "./advanced-2025-forms.js?v=22",
  "./exam-coverage.js?v=22",
  "./answer-engine.js?v=22",
  "./app.js?v=22",
  "./pwa.js?v=22",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
].map((path) => new URL(path, self.location).href);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) => Promise.all(names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const requestUrl = new URL(request.url);

  if (request.method !== "GET" || requestUrl.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(new URL("./index.html", self.location).href, copy));
          return response;
        })
        .catch(() => caches.match(new URL("./index.html", self.location).href)),
    );
    return;
  }

  if (request.destination === "script" || request.destination === "style") {
    event.respondWith(
      fetch(request, { cache: "no-cache" })
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request)),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      });
    }),
  );
});
