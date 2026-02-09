// Builder.io Gen 2 SDK — no global init needed; API key is passed per-call.
export const BUILDER_API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY || '';

// Re-export the pieces pages need
export { fetchOneEntry, Content } from '@builder.io/sdk-react';
