# Grid Drop — web

Sitio de [Grid Drop](https://github.com/xavierbasc/Grid-Drop): Next.js 14 con
exportación estática, Tailwind y despliegue en GitHub Pages
(<https://xavierbasc.github.io/Grid-Drop-website/>).

```bash
npm install
npm run dev                          # http://localhost:3000
NODE_ENV=production npm run build    # genera out/ con el prefijo /Grid-Drop-website
```

Cada push a `main` compila y publica con `.github/workflows/deploy.yml`.

## Qué hay

| Ruta | Contenido |
|---|---|
| `lib/game.ts` | port de `Board.h`, `Constants.h` y `Game::TryPlace`: formas, reparto, líneas, racha y niveles. Si cambian en el juego, se cambian aquí |
| `components/PlayDemo.tsx` | la demo jugable: arrastre con ratón y dedo (la pieza sube sobre el pulgar), toque-toque y teclado (`1 2 3`, flechas, `Enter`, `Esc`). El récord va a `localStorage` |
| `components/BlockTitle.tsx` | el rótulo de bloques con los glifos de `BitmapFont.h` |
| `components/Download.tsx` | plataformas; todas en «coming soon» hasta que haya `url` |
| `app/privacy/` | política de privacidad (las tiendas piden una URL propia) |
| `public/shots/` | capturas de `--screenshot` escaladas a 2× por vecino más cercano |
| `lib/asset.ts` | prefijo de `basePath` para `<img>` y `<link>`, que la exportación no reescribe |

Reglas de contenido, trampas y cómo probar: `.claude/CLAUDE.md`. El juego es
de pago: la web no debe decir que sea gratis.

La clase de bloque se llama `gblock` y no `block`: `block` es la utilidad
`display: block` de Tailwind y cualquier elemento con ella se pintaba como un
bloque rojo.
