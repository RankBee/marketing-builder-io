// Shared sanitize-html configuration used by both Ghost blog and Hinto KB sanitizers.
// Keep a single source of truth so allow-lists stay in sync.

import type { IOptions } from 'sanitize-html';
import sanitize from 'sanitize-html';

const ALLOWED_TAGS: string[] = sanitize.defaults.allowedTags.concat([
  'img', 'figure', 'figcaption', 'video', 'source', 'iframe',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'details', 'summary',
  'main', 'section', 'article', 'nav', 'mark', 'sub', 'sup',
  'dl', 'dt', 'dd',
]);

const ALLOWED_ATTRIBUTES: IOptions['allowedAttributes'] = {
  ...sanitize.defaults.allowedAttributes,
  '*': ['class', 'id', 'style'],
  img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
  a: ['href', 'target', 'rel', 'title', 'data-article-id'],
  iframe: ['src', 'width', 'height', 'frameborder', 'allowfullscreen'],
  video: ['src', 'controls', 'autoplay', 'muted', 'loop', 'poster', 'width', 'height'],
  source: ['src', 'type'],
  ol: ['start'],
};

const ALLOWED_SCHEMES = ['http', 'https', 'mailto'];

export const sharedSanitizeOptions: IOptions = {
  allowedTags: ALLOWED_TAGS,
  allowedAttributes: ALLOWED_ATTRIBUTES,
  allowedSchemes: ALLOWED_SCHEMES,
};
