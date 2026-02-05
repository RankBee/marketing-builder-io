import { type Handler } from "@netlify/functions";

const handler: Handler = async () => {
  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ 
      ok: true, 
      source: "netlify-function",
      timestamp: new Date().toISOString()
    }),
  };
};

export { handler };
