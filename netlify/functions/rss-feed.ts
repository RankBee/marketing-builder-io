import { type Handler } from "@netlify/functions";

const BUILDER_API_KEY = '4d7724b1d3ab0bbf970850bf7f';
const BUILDER_API_URL = 'https://cdn.builder.io/api/v3/content/blog-post';

const handler: Handler = async () => {
  try {
    const response = await fetch(
      `${BUILDER_API_URL}?apiKey=${BUILDER_API_KEY}&limit=100&sort=-createdAt`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `Failed to fetch blog posts: ${response.statusText}` }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=60",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch blog posts' }),
    };
  }
};

export { handler };
