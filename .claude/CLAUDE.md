# Grid Drop — web — CLAUDE.md

Web del juego Grid Drop (código del juego en `../grid-drop`, que tiene el
estado general en `.claude/rules/STATE.md`). Next.js 14 con exportación
estática, Tailwind y lucide-react. Textos de la página en **inglés**.

- Publicada en <https://xavierbasc.github.io/Grid-Drop-website/>.
- Repo `git@github.com:xavierbasc/Grid-Drop-website.git`, rama `main`. Cada push
  compila y despliega con `.github/workflows/deploy.yml` (Pages en modo
  «GitHub Actions», ya activado). Seguir el despliegue con
  `gh run list -R xavierbasc/Grid-Drop-website`.

```bash
npm install
npm run dev                          # http://localhost:3000 (sin basePath)
NODE_ENV=production npm run build    # out/ con el prefijo /Grid-Drop-website
```

## Reglas de contenido

- **El juego es de pago (2,99 $).** Nada de «free», «gratis» ni `offers` a 0
  en el JSON-LD.
- **No se menciona** TerraShell ni el stack técnico (C++, SDL3, libxmp).
  La única excepción es la política de privacidad, que habla de «the game
  framework» sin nombrarlo para explicar los permisos que listan las tiendas.
- Plataformas en `components/Download.tsx`: todas *coming soon* hasta que haya
  `url`. Cuando la ficha de App Store esté a la venta, iPhone y macOS apuntan a
  `https://apps.apple.com/app/id6813004684`.

## Estructura

| Ruta | Qué |
|---|---|
| `app/page.tsx` | portada: Hero, PlaySection (demo), Features, Levels, Gallery, Controls, Soundtrack, Download |
| `app/privacy/page.tsx` | política de privacidad (URL que usa App Store Connect) |
| `lib/game.ts` | port de las reglas del juego (`Board.h`, `Constants.h`, `Game::TryPlace`). Si cambian allí, se cambian aquí |
| `components/PlayDemo.tsx` | demo jugable: arrastre con ratón y dedo (la pieza sube 2,3 celdas sobre el pulgar), toque-toque, teclado (`1 2 3`, flechas, `Enter`, `Esc`). Récord en `localStorage` (`griddrop.best`) |
| `components/BlockTitle.tsx` | rótulo de bloques con los glifos 5×7 de `BitmapFont.h` |
| `lib/asset.ts` | antepone el basePath a `<img>`, `<link>` y rutas manuales; la exportación no lo hace |
| `lib/site.ts` | URL canónica, nombre, lema, descripción |
| `public/shots/` | capturas del juego (`--screenshot`) a 2× por vecino más cercano |
| `public/og-image.png` | 1200×630, generada con Pillow |

## Trampas ya pisadas

- La clase CSS del bloque es **`gblock`**, no `block`: `block` es la utilidad
  `display: block` de Tailwind y cualquier elemento con ella se pintaba como un
  bloque rojo.
- Las clases propias (`gblock`, `panel`, `btn`…) van en `@layer components`: si
  no, ganan a las utilidades (`absolute`, `hidden`) y rompen la maquetación.
- Las capturas de la galería **no** llevan `image-rendering: pixelated`: se
  muestran por debajo de 1× y el vecino más cercano destroza el texto.
- `tsc` puede dar errores fantasma de `downlevelIteration` con un
  `tsconfig.tsbuildinfo` viejo: borrarlo (está en `.gitignore`).

## Probar

Chromium de Playwright instalado en `~/Library/Caches/ms-playwright/chromium-1234`
(el Mac es Intel: `chrome-mac-x64`). Con `playwright-core` en una carpeta
temporal y `executablePath` apuntando ahí se prueba la demo con ratón, toque
(CDP `Input.dispatchTouchEvent`) y teclado, sirviendo `out/` bajo
`/Grid-Drop-website/` con `python3 -m http.server`.
