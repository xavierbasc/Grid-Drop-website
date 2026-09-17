// La exportación estática no antepone basePath a <img>, <link> ni url(), así
// que se hace aquí. El valor coincide con next.config.mjs.
const BASE_PATH = process.env.NODE_ENV === 'production' ? '/Grid-Drop-website' : '';

/** Prefija una ruta absoluta del sitio (p. ej. "/shots/menu.png"). */
export function asset(path: string): string {
  return path.startsWith('/') ? BASE_PATH + path : path;
}
