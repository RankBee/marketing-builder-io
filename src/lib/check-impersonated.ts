export const isImpersonated = (): boolean => {
  if (typeof document === 'undefined') return false;
  return document.cookie
  .split(';')
  .map(cookie => cookie.trim())
  .some(cookie => cookie === 'is_impersonated=true');
};