import { type Handler } from "@netlify/functions";

const GHOST_BASE = "https://geo.rankbee.ai";
const KEY = process.env.GHOST_CONTENT_API_KEY || '4d7724b1d3ab0bbf970850bf7f';

async function tryFetch(url: string) {
  const res = await fetch(url, {
    redirect: "follow",
    headers: {
      accept: "application/json",
      "user-agent": "RankBee-Netlify/1.0",
    },
  });

  const text = await res.text();
  const ct = res.headers.get("content-type") || "";

  return { url, status: res.status, ct, text };
}

const handler: Handler = async () => {
  if (!KEY) {
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ error: "Missing env var GHOST_CONTENT_API_KEY" }),
    };
  }

  const candidates = [
    `${GHOST_BASE}/ghost/api/content/posts/?key=${encodeURIComponent(KEY)}&limit=10&include=tags,authors&order=-published_at`,
    `${GHOST_BASE}/ghost/api/v3/content/posts/?key=${encodeURIComponent(KEY)}&limit=10&include=tags,authors&order=-published_at`,
    `${GHOST_BASE}/ghost/api/v5/content/posts/?key=${encodeURIComponent(KEY)}&limit=10&include=tags,authors&order=-published_at`,
  ];

  let last: any = null;

  for (const url of candidates) {
    console.log(`Trying Ghost endpoint: ${url.replace(KEY, 'KEY_REDACTED')}`);
    const r = await tryFetch(url);
    last = r;

    console.log(`Response: status=${r.status}, content-type=${r.ct}, body-length=${r.text.length}`);

    // If it looks like JSON and status is OK, return it as-is.
    if (r.status >= 200 && r.status < 300 && r.ct.includes("application/json")) {
      console.log("Success! Returning Ghost response");
      return {
        statusCode: 200,
        headers: {
          "content-type": "application/json; charset=utf-8",
          "cache-control": "no-store",
          "Access-Control-Allow-Origin": "*",
        },
        body: r.text,
      };
    }
  }

  // Failed all candidates — return debug info as JSON (so frontend never chokes on HTML)
  console.log("All Ghost endpoints failed, returning error");
  return {
    statusCode: 502,
    headers: { 
      "content-type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      error: "Ghost fetch failed (not JSON or non-2xx)",
      tried: candidates.map(c => c.replace(KEY, 'KEY_REDACTED')),
      lastAttempt: {
        url: last?.url?.replace(KEY, 'KEY_REDACTED'),
        status: last?.status,
        contentType: last?.ct,
        bodyHead: (last?.text || "").slice(0, 500),
      },
    }),
  };
};

export { handler };
