/**
 * Resolves a public asset path considering Vite's base URL and GitHub Pages repository subpath.
 * Works seamlessly in both local development ('/') and GitHub Pages ('/openconceptbangla/').
 *
 * @param {string} path - e.g. '/images/eteksolution/logo.png'
 * @returns {string} resolved asset URL with base prefix
 */
export function getAssetUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }

  // Normalize path removing leading slash or dot-slash
  let cleanPath = path;
  if (cleanPath.startsWith('./')) {
    cleanPath = cleanPath.slice(2);
  } else if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.slice(1);
  }

  const base = import.meta.env.BASE_URL || '/';
  return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
}

export default getAssetUrl;
