import { type Handler } from "@netlify/functions";

const RSS_FEED_URL = 'https://geo.rankbee.ai/rss/';

const handler: Handler = async () => {
  try {
    const response = await fetch(RSS_FEED_URL);

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `Failed to fetch RSS feed: ${response.statusText}` }),
      };
    }

    const xmlText = await response.text();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=60",
        "Access-Control-Allow-Origin": "*",
      },
      body: xmlText,
    };
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch RSS feed' }),
    };
  }
};

export { handler };
