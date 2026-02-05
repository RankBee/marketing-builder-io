import { type Handler } from "@netlify/functions";

const GHOST_CONTENT_API_KEY = '4d7724b1d3ab0bbf970850bf7f';
const GHOST_BASE_URL = 'https://geo.rankbee.ai';

const handler: Handler = async () => {
  try {
    // Try the base endpoint first (no version specified)
    const url = `${GHOST_BASE_URL}/ghost/api/content/posts/?key=${encodeURIComponent(GHOST_CONTENT_API_KEY)}&limit=100&include=tags,authors&order=-published_at`;
    
    console.log('Fetching from Ghost API:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    const text = await response.text();
    
    console.log(`Ghost API returned status ${response.status}`);
    
    if (!response.ok) {
      console.error('Ghost API error response:', text.substring(0, 500));
      return {
        statusCode: response.status,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ 
          error: `Ghost API returned ${response.status}`,
          details: text.substring(0, 500)
        }),
      };
    }

    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error('Failed to parse Ghost response as JSON:', text.substring(0, 500));
      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ 
          error: 'Ghost API returned non-JSON response',
          body: text.substring(0, 500)
        }),
      };
    }

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
    console.error('Error fetching from Ghost API:', error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ 
        error: 'Failed to fetch blog posts',
        details: String(error)
      }),
    };
  }
};

export { handler };
