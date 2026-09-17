import { Block } from './Block';

// Glifos 5×7 de src/Core/BitmapFont.h: el mismo rótulo de bloques que el menú
// del juego (Game::DrawBlockTitle), con el mismo reparto de colores.
const GLYPHS: Record<string, string[]> = {
  G: ['01110', '10001', '10000', '10111', '10001', '10001', '01111'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  I: ['01110', '00100', '00100', '00100', '00100', '00100', '01110'],
  D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
  O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  P: ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
};

function Word({ text, px, colorOffset, delay }: { text: string; px: number; colorOffset: number; delay: number }) {
  return (
    <div className="flex" style={{ gap: px }}>
      {[...text].map((ch, i) => (
        <div
          key={i}
          className="relative animate-bob"
          style={{ width: 5 * px, height: 7 * px, animationDelay: `${-(delay + i * 0.32)}s` }}
        >
          {GLYPHS[ch].flatMap((row, y) =>
            [...row].map((bit, x) =>
              bit === '1' ? (
                <Block
                  key={`${x}-${y}`}
                  color={1 + ((i + colorOffset) % 7)}
                  className={`absolute ${px < 10 ? 'gblock-sm' : ''}`}
                  style={{ left: x * px, top: y * px, width: px, height: px }}
                />
              ) : null,
            ),
          )}
        </div>
      ))}
    </div>
  );
}

/** "GRID / DROP" en bloques. `px` es el lado de cada bloque. */
export default function BlockTitle({ px = 12, inline = false }: { px?: number; inline?: boolean }) {
  return (
    <div
      role="img"
      aria-label="Grid Drop"
      className={`flex ${inline ? 'flex-row' : 'flex-col'} items-center`}
      style={{ gap: inline ? px * 3 : px * 2 }}
    >
      <Word text="GRID" px={px} colorOffset={0} delay={0} />
      <Word text="DROP" px={px} colorOffset={4} delay={1.3} />
    </div>
  );
}
