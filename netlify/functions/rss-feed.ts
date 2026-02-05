import { type Handler } from "@netlify/functions";

const GHOST_BASE = "https://geo.rankbee.ai";
const KEY = process.env.GHOST_CONTENT_API_KEY || '4d7724b1d3ab0bbf970850bf7f';

const handler: Handler = async () => {
  try {
    if (!KEY) {
      return {
        statusCode: 500,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ error: "Missing GHOST_CONTENT_API_KEY" }),
      };
    }

    const url = `${GHOST_BASE}/ghost/api/content/posts/?key=${encodeURIComponent(KEY)}&limit=100&include=tags,authors&order=-published_at`;

    console.log(`Fetching from Ghost: ${url.replace(KEY, 'KEY_REDACTED')}`);

    const response = await fetch(url, {
      redirect: "follow",
      headers: {
        accept: "application/json",
        "user-agent": "RankBee-Netlify/1.0",
      },
    });

    const text = await response.text();
    const contentType = response.headers.get("content-type") || "";

    console.log(`Ghost returned: status=${response.status}, content-type=${contentType}, length=${text.length}`);

    // If response is not JSON, return error
    if (!contentType.includes("application/json")) {
      console.error("Ghost returned non-JSON response");
      return {
        statusCode: 502,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          error: "Ghost API returned non-JSON response",
          status: response.status,
          contentType: contentType,
          body: text.slice(0, 500),
        }),
      };
    }

    // If status is not OK, return the error from Ghost
    if (response.status < 200 || response.status >= 300) {
      console.error(`Ghost returned error status ${response.status}`);
      let errorData;
      try {
        errorData = JSON.parse(text);
      } catch {
        errorData = { raw: text.slice(0, 500) };
      }
      return {
        statusCode: response.status,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          error: "Ghost API returned error",
          status: response.status,
          details: errorData,
        }),
      };
    }

    // Success! Return the Ghost response as-is
    console.log("Successfully fetched posts from Ghost");
    return {
      statusCode: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "public, s-maxage=300, stale-while-revalidate=60",
        "Access-Control-Allow-Origin": "*",
      },
      body: text,
    };
  } catch (error) {
    console.error("Error in rss-feed function:", error);
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        error: "Internal server error",
        details: String(error),
      }),
    };
  }
};

export { handler };
