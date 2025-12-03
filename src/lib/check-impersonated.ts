export const isImpersonated = (): boolean => {
  if (typeof document === 'undefined') return false;
  return document.cookie.includes('is_impersonated=true');
};